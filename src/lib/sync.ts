import { z } from 'zod';
import { syncQuestionSetSchema, type AnswerableQuestionSet } from './content-schema';
import { NewerQuestionSetRevisionError, parseRemoteAnswerDocument } from './document-schema';
import {
  buildAnswerDocumentId,
  buildPreferencesDocumentId,
  buildProgressDocumentId,
  buildReadingPreferencesDocumentId,
  buildStudiedDocumentId,
  getActiveAlias,
} from './identity';
import { KvClientError, readKv, writeKv } from './kv-client';
import {
  acquireSyncLease,
  getLocalAnswerRecord,
  getSharedDocumentRecord,
  listPendingAnswerRecords,
  markAnswerSynced,
  markAnswerSyncError,
  markSharedDocumentError,
  markSharedDocumentSynced,
  quarantineRemoteDocument,
  releaseSyncLease,
  renewSyncLease,
  saveProgressIfPreferencesUnchanged,
  storeRemoteAnswerDocument,
  SyncLeaseLostError,
  whenLocalWritesSettled,
  type LocalAnswerRecord,
  type LocalSharedDocumentRecord,
  type SharedStoreName,
} from './offline-db';
import {
  DEFAULT_PREFERENCES,
  preferencesSchema,
  type Preferences,
} from './preferences';
import {
  EMPTY_PROGRESS,
  materializeSubjectProgress,
  PREFERENCES_PROGRESS_DIRTY_FIELD,
  progressSchema,
  progressSubjectId,
  sanitizeProgressForCorrectionMode,
  type ProgressDocument,
} from './progress';
import {
  createEmptyAnswerDocument,
  reconcileAnswerDocument,
  type AnswerDocument,
  type CorrectionMode,
} from './questionnaire';
import { studiedSchema, type StudiedDocument } from './studied';
import { readingPreferencesSchema, type ReadingPreferences } from './reading-preferences';

const syncCatalogSchema = z
  .object({
    schemaVersion: z.literal(1),
    subjects: z.array(
      z
        .object({
          contestStorageId: z.string(),
          subjectStorageId: z.string(),
          questionSet: syncQuestionSetSchema,
        })
        .strict(),
    ),
  })
  .strict();

type SyncCatalogEntry = z.infer<typeof syncCatalogSchema>['subjects'][number];

interface RemoteDocument<T> {
  document: T;
  version: number;
  createdAt: string | null;
}

interface ProfilePreflight {
  catalog: SyncCatalogEntry[];
  preferences: RemoteDocument<Preferences> | null;
  estudados: RemoteDocument<StudiedDocument> | null;
  leitura: RemoteDocument<ReadingPreferences> | null;
  answers: Array<{
    documentId: string;
    entry: SyncCatalogEntry;
    remote: RemoteDocument<AnswerDocument> | null;
  }>;
  progress: RemoteDocument<ProgressDocument> | null;
}

export interface ProfilePreparationResult {
  remoteDocumentCount: number;
}

export interface ProfilePreparationOptions {
  onPreflightComplete?: (result: ProfilePreparationResult) => void;
}

interface SharedSyncOptions {
  expectedLocalRevision?: number | null;
  requiredCleanPreferencesRevision?: number | null;
  requiredCleanAnswerDocumentIds?: ReadonlySet<string>;
  allowedProgressSubjectIds?: ReadonlySet<string>;
  progressCorrectionMode?: CorrectionMode;
}

type EnsureSyncLease = () => Promise<void>;

function progressUpdateForPreferences(preferences: Preferences) {
  return {
    dirtyFields: [PREFERENCES_PROGRESS_DIRTY_FIELD],
    updateCurrent: (current: unknown, sharedCurrent: unknown) => {
      const parsed = progressSchema.safeParse(current);
      const appliedPreferences = preferencesSchema.safeParse(sharedCurrent);
      return sanitizeProgressForCorrectionMode(
        parsed.success ? parsed.data : EMPTY_PROGRESS,
        appliedPreferences.success
          ? appliedPreferences.data.correctionMode
          : preferences.correctionMode,
      ).document;
    },
  };
}

export type VersionResolution = 'adopt-remote' | 'publish-local' | 'noop';

type VersionedLocalRecord = Pick<LocalAnswerRecord, 'remoteVersion' | 'outboxState'>;

export function resolveVersionAction(
  local: VersionedLocalRecord | null,
  remoteVersion: number | null,
): VersionResolution {
  if (!local) return remoteVersion === null ? 'noop' : 'adopt-remote';

  const observedVersion = local.remoteVersion ?? 0;
  const currentRemoteVersion = remoteVersion ?? 0;
  if (currentRemoteVersion > observedVersion) return 'adopt-remote';
  if (currentRemoteVersion < observedVersion) return 'publish-local';
  return local.outboxState === 'pending' ? 'publish-local' : 'noop';
}

class RequestGate {
  private lastRequestAt = 0;

  async wait(): Promise<void> {
    const delay = Math.max(0, this.lastRequestAt + 500 - Date.now());
    if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay));
    this.lastRequestAt = Date.now();
  }
}

const requestGate = new RequestGate();
const leaseName = 'answer-sync';
const ownerId = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
let serialQueue: Promise<unknown> = Promise.resolve();
let runtimeStarted = false;
let broadcast: BroadcastChannel | null = null;
const activeProfileSyncs = new Map<string, Promise<boolean>>();
const rerunProfiles = new Set<string>();
const lastSharedSyncAt = new Map<string, number>();

function enqueue<T>(operation: () => Promise<T>): Promise<T> {
  const queued = serialQueue.then(operation, operation);
  serialQueue = queued.catch(() => undefined);
  return queued;
}

function announce(state: 'offline' | 'syncing' | 'synced' | 'error', message: string): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('concursos:sync-status', { detail: { state, message } }));
}

function announceAnswer(documentId: string): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('concursos:answer-synced', { detail: { documentId } }));
}

function dispatchUnsupportedAnswerRevision(documentId: string): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent('concursos:answer-revision-unsupported', { detail: { documentId } }),
  );
}

function announceUnsupportedAnswerRevision(documentId: string): void {
  dispatchUnsupportedAnswerRevision(documentId);
  broadcast?.postMessage({ type: 'answer-revision-unsupported', documentId });
}

function scheduleBackgroundSync(): void {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;
  void navigator.serviceWorker.ready
    .then((registration) => {
      const syncRegistration = registration as ServiceWorkerRegistration & {
        sync?: { register(tag: string): Promise<void> };
      };
      return syncRegistration.sync?.register('concursos-sync');
    })
    .catch(() => undefined);
}

async function loadSyncCatalog(): Promise<SyncCatalogEntry[]> {
  const response = await fetch('/sync-catalog.json', { cache: 'no-store' });
  if (!response.ok) throw new Error(`Não foi possível carregar o catálogo de sincronização: ${response.status}`);
  return syncCatalogSchema.parse(await response.json()).subjects;
}

async function materializeProfileProgress(
  profileId: string,
  catalog: SyncCatalogEntry[],
  preferences: Preferences,
): Promise<ProgressDocument> {
  const subjects: ProgressDocument['subjects'] = {};
  for (const entry of catalog) {
    const documentId = buildAnswerDocumentId(
      profileId,
      entry.contestStorageId,
      entry.subjectStorageId,
    );
    const record = await getLocalAnswerRecord(documentId);
    const document = reconcileAnswerDocument(
      record?.current ?? createEmptyAnswerDocument(entry.questionSet.questionSetRevision),
      entry.questionSet,
    );
    subjects[progressSubjectId(entry.contestStorageId, entry.subjectStorageId)] =
      materializeSubjectProgress(
        entry.questionSet,
        document,
        preferences.correctionMode,
        record?.remoteVersion ?? 0,
      );
  }
  return { schemaVersion: 1, subjects };
}

async function refreshProfileProgress(
  profileId: string,
  catalog: SyncCatalogEntry[],
  preferences: Preferences,
  expectedPreferencesRevision: number | null,
): Promise<boolean> {
  const document = await materializeProfileProgress(profileId, catalog, preferences);
  const current = await getSharedDocumentRecord('progress', profileId);
  const parsedCurrent = progressSchema.safeParse(current?.current);
  if (parsedCurrent.success && JSON.stringify(parsedCurrent.data) === JSON.stringify(document)) {
    return false;
  }
  const saved = await saveProgressIfPreferencesUnchanged(
    profileId,
    expectedPreferencesRevision,
    document,
    Object.keys(document.subjects),
  );
  if (!saved) throw new Error('As preferências mudaram durante o recálculo do progresso');
  return true;
}

export function recreationWarning(
  record: Pick<LocalAnswerRecord | LocalSharedDocumentRecord, 'remoteVersion' | 'remoteCreatedAt'>,
  remoteVersion: number | null,
  remoteCreatedAt: string | null,
): string | null {
  if (record.remoteVersion !== null && (remoteVersion === null || remoteVersion < record.remoteVersion)) {
    return 'A versão remota regrediu; o registro pode ter sido excluído e recriado.';
  }
  if (record.remoteCreatedAt && remoteCreatedAt && record.remoteCreatedAt !== remoteCreatedAt) {
    return 'A data de criação remota mudou; o registro pode ter sido excluído e recriado.';
  }
  return null;
}

async function validatedRemote(
  profileId: string,
  documentId: string,
  questionSet: AnswerableQuestionSet,
  ensureLease: EnsureSyncLease,
): Promise<RemoteDocument<AnswerDocument> | null> {
  await ensureLease();
  await requestGate.wait();
  await ensureLease();
  const envelope = await readKv(documentId, {
    beforeRetry: async () => {
      await ensureLease();
      return true;
    },
  });
  await ensureLease();
  if (!envelope) return null;

  try {
    return {
      document: parseRemoteAnswerDocument(envelope.json, questionSet),
      version: envelope.version,
      createdAt: envelope.created_at,
    };
  } catch (error) {
    if (error instanceof NewerQuestionSetRevisionError) throw error;
    const reason = error instanceof Error ? error.message : 'Documento remoto inválido';
    await quarantineRemoteDocument({ profileId, documentId, reason, value: envelope.json });
    throw new Error(reason);
  }
}

async function synchronizeRecord(
  profileId: string,
  documentId: string,
  questionSet: AnswerableQuestionSet,
  ensureLease: EnsureSyncLease,
): Promise<void> {
  const remote = await validatedRemote(profileId, documentId, questionSet, ensureLease);
  await applyAnswerRemote(profileId, documentId, questionSet, remote, ensureLease);
}

async function applyAnswerRemote(
  profileId: string,
  documentId: string,
  questionSet: AnswerableQuestionSet,
  remote: RemoteDocument<AnswerDocument> | null,
  ensureLease: EnsureSyncLease,
): Promise<void> {
  const record = await getLocalAnswerRecord(documentId);
  const action = resolveVersionAction(record ?? null, remote?.version ?? null);

  if (action === 'noop') {
    const warning = record
      ? recreationWarning(record, remote?.version ?? null, remote?.createdAt ?? null)
      : null;
    if (record && remote && warning) {
      await markAnswerSynced({
        documentId,
        expectedLocalRevision: record.localRevision,
        synchronizedDocument: record.current,
        remoteVersion: remote.version,
        remoteCreatedAt: remote.createdAt,
        conflictWarning: warning,
      });
      announceAnswer(documentId);
    }
    return;
  }

  if (action === 'adopt-remote' && remote) {
    const document = reconcileAnswerDocument(remote.document, questionSet);
    if (!record) {
      const stored = await storeRemoteAnswerDocument({
        profileId,
        documentId,
        document,
        remoteVersion: remote.version,
        remoteCreatedAt: remote.createdAt,
      });
      if (stored) announceAnswer(documentId);
      return;
    }

    await markAnswerSynced({
      documentId,
      expectedLocalRevision: record.localRevision,
      synchronizedDocument: document,
      remoteVersion: remote.version,
      remoteCreatedAt: remote.createdAt,
      conflictWarning: recreationWarning(record, remote.version, remote.createdAt),
    });
    announceAnswer(documentId);
    return;
  }

  if (!record) return;
  const localDocument = reconcileAnswerDocument(record.current, questionSet);
  await requestGate.wait();
  await ensureLease();
  const written = await writeKv(documentId, localDocument, {
    beforeRetry: async () => {
      await ensureLease();
      return true;
    },
  });
  await ensureLease();
  const expectedVersion = remote?.version ?? 0;
  const warnings = [
    recreationWarning(record, remote?.version ?? null, remote?.createdAt ?? null),
    written.version > expectedVersion + 1
      ? 'Outra escrita ocorreu entre a leitura e a gravação; a API não oferece recuperação histórica.'
      : null,
  ].filter(Boolean);

  await markAnswerSynced({
    documentId,
    expectedLocalRevision: record.localRevision,
    synchronizedDocument: localDocument,
    remoteVersion: written.version,
    remoteCreatedAt: written.created_at,
    conflictWarning: warnings.length > 0 ? warnings.join(' ') : null,
  });
  announceAnswer(documentId);
}

async function sharedSyncPreconditionsMet(
  profileId: string,
  record: LocalSharedDocumentRecord | undefined,
  options: SharedSyncOptions,
): Promise<boolean> {
  if (
    options.expectedLocalRevision !== undefined &&
    (options.expectedLocalRevision === null
      ? record !== undefined
      : record?.localRevision !== options.expectedLocalRevision)
  ) {
    return false;
  }
  if (options.requiredCleanPreferencesRevision !== undefined) {
    const preferencesRecord = await getSharedDocumentRecord('preferences', profileId);
    const matchesExpectedRevision =
      options.requiredCleanPreferencesRevision === null
        ? preferencesRecord === undefined
        : preferencesRecord?.localRevision === options.requiredCleanPreferencesRevision;
    if (!matchesExpectedRevision || preferencesRecord?.outboxState === 'pending') return false;
  }
  return true;
}

async function validatedSharedRemote<T extends Preferences | ProgressDocument | StudiedDocument | ReadingPreferences>(
  profileId: string,
  storeName: SharedStoreName,
  documentId: string,
  ensureLease: EnsureSyncLease,
): Promise<RemoteDocument<T> | null> {
  await ensureLease();
  await requestGate.wait();
  await ensureLease();
  const envelope = await readKv(documentId, {
    beforeRetry: async () => {
      await ensureLease();
      return true;
    },
  });
  await ensureLease();
  if (!envelope) return null;

  const schema =
    storeName === 'preferences'
      ? preferencesSchema
      : storeName === 'estudados'
        ? studiedSchema
        : storeName === 'leitura'
          ? readingPreferencesSchema
          : progressSchema;
  const parsed = schema.safeParse(envelope.json);
  if (!parsed.success) {
    const reason = `Documento remoto de ${storeName} inválido`;
    await quarantineRemoteDocument({ profileId, documentId, reason, value: envelope.json });
    await markSharedDocumentError(storeName, profileId, reason);
    throw new Error(reason);
  }
  return {
    document: parsed.data as T,
    version: envelope.version,
    createdAt: envelope.created_at,
  };
}

async function synchronizeSharedDocument(
  profileId: string,
  storeName: SharedStoreName,
  documentId: string,
  ensureLease: EnsureSyncLease,
  options: SharedSyncOptions = {},
): Promise<boolean> {
  let record = await getSharedDocumentRecord(storeName, profileId);
  if (!(await sharedSyncPreconditionsMet(profileId, record, options))) return false;
  const remote = await validatedSharedRemote<Preferences | ProgressDocument | StudiedDocument | ReadingPreferences>(
    profileId,
    storeName,
    documentId,
    ensureLease,
  );
  record = await getSharedDocumentRecord(storeName, profileId);
  if (!(await sharedSyncPreconditionsMet(profileId, record, options))) return false;
  return applySharedRemote(profileId, storeName, documentId, remote, ensureLease, options);
}

async function applySharedRemote(
  profileId: string,
  storeName: SharedStoreName,
  documentId: string,
  remoteSnapshot: RemoteDocument<Preferences | ProgressDocument | StudiedDocument | ReadingPreferences> | null,
  ensureLease: EnsureSyncLease,
  options: SharedSyncOptions = {},
  allowPublish = true,
): Promise<boolean> {
  const record = await getSharedDocumentRecord(storeName, profileId);
  if (!(await sharedSyncPreconditionsMet(profileId, record, options))) return false;
  let remote = remoteSnapshot?.document ?? null;
  let remoteProgressChanged = false;

  if (remote && storeName === 'progress') {
    if (options.allowedProgressSubjectIds) {
      const progress = remote as ProgressDocument;
      const subjects = Object.fromEntries(
        Object.entries(progress.subjects).filter(([subjectId]) =>
          options.allowedProgressSubjectIds?.has(subjectId),
        ),
      );
      remoteProgressChanged = Object.keys(subjects).length !== Object.keys(progress.subjects).length;
      remote = {
        schemaVersion: 1,
        subjects,
      };
    }
    const sanitized = sanitizeProgressForCorrectionMode(
      remote as ProgressDocument,
      options.progressCorrectionMode,
    );
    remote = sanitized.document;
    remoteProgressChanged ||= sanitized.changed;
  }

  const action = resolveVersionAction(record ?? null, remoteSnapshot?.version ?? null);
  if (action === 'noop') {
    const warning = record
      ? recreationWarning(record, remoteSnapshot?.version ?? null, remoteSnapshot?.createdAt ?? null)
      : null;
    if (record && remoteSnapshot && (warning || remoteProgressChanged)) {
      await markSharedDocumentSynced({
        storeName,
        profileId,
        expectedLocalRevision: record.localRevision,
        synchronizedDocument: remoteProgressChanged ? remote : record.current,
        remoteVersion: remoteSnapshot.version,
        remoteCreatedAt: remoteSnapshot.createdAt,
        conflictWarning: warning,
        pendingDocument: remoteProgressChanged ? remote : undefined,
        pendingDirtyFields:
          storeName === 'progress' && remoteProgressChanged
            ? Object.keys((remote as ProgressDocument).subjects)
            : undefined,
      });
    }
    return true;
  }

  if (action === 'adopt-remote' && remote && remoteSnapshot) {
    const remotePreferences = storeName === 'preferences' ? (remote as Preferences) : null;
    const localPreferences =
      storeName === 'preferences' && record
        ? preferencesSchema.safeParse(record.current)
        : null;
    const preferenceCorrectionChanged = remotePreferences !== null && (
      record
        ? !localPreferences?.success ||
          localPreferences.data.correctionMode !== remotePreferences.correctionMode
        : remotePreferences.correctionMode !== DEFAULT_PREFERENCES.correctionMode
    );
    await markSharedDocumentSynced({
      storeName,
      profileId,
      expectedLocalRevision: record?.localRevision ?? 0,
      synchronizedDocument: remote,
      remoteVersion: remoteSnapshot.version,
      remoteCreatedAt: remoteSnapshot.createdAt,
      conflictWarning: record
        ? recreationWarning(record, remoteSnapshot.version, remoteSnapshot.createdAt)
        : null,
      pendingDocument: remoteProgressChanged ? remote : undefined,
      pendingDirtyFields:
        storeName === 'progress' && remoteProgressChanged
          ? Object.keys((remote as ProgressDocument).subjects)
          : undefined,
      progressUpdate: preferenceCorrectionChanged
        ? progressUpdateForPreferences(remotePreferences)
        : undefined,
    });
    return true;
  }

  if (!record) return true;
  if (!allowPublish) return true;
  let localDocument: Preferences | ProgressDocument | StudiedDocument | ReadingPreferences;
  let preferenceCorrectionChanged = false;
  if (storeName === 'preferences') {
    const local = preferencesSchema.safeParse(record.current);
    const base = preferencesSchema.safeParse(record.base);
    if (!local.success) throw new Error('Documento local de preferences inválido');
    localDocument = local.data;
    preferenceCorrectionChanged =
      (base.success ? base.data.correctionMode : DEFAULT_PREFERENCES.correctionMode) !==
        localDocument.correctionMode;
  } else if (storeName === 'estudados') {
    const local = studiedSchema.safeParse(record.current);
    if (!local.success) throw new Error('Documento local de estudados inválido');
    localDocument = local.data;
  } else if (storeName === 'leitura') {
    const local = readingPreferencesSchema.safeParse(record.current);
    if (!local.success) throw new Error('Documento local de leitura inválido');
    localDocument = local.data;
  } else {
    const local = progressSchema.safeParse(record.current);
    if (!local.success) throw new Error('Documento local de progress inválido');
    localDocument = sanitizeProgressForCorrectionMode(
      local.data,
      options.progressCorrectionMode,
    ).document;
  }

  await requestGate.wait();
  const progressWriteStillCurrent = async (): Promise<boolean> => {
    if (storeName !== 'progress') return true;
    const currentProgress = await getSharedDocumentRecord('progress', profileId);
    const currentPreferences = await getSharedDocumentRecord('preferences', profileId);
    const progressMatches =
      options.expectedLocalRevision === undefined ||
      (options.expectedLocalRevision === null
        ? currentProgress === undefined
        : currentProgress?.localRevision === options.expectedLocalRevision);
    const preferencesMatch =
      options.requiredCleanPreferencesRevision === undefined ||
      ((options.requiredCleanPreferencesRevision === null
        ? currentPreferences === undefined
        : currentPreferences?.localRevision === options.requiredCleanPreferencesRevision) &&
        currentPreferences?.outboxState !== 'pending');
    const currentPendingAnswers = options.requiredCleanAnswerDocumentIds
      ? await listPendingAnswerRecords(profileId)
      : [];
    const hasPendingCurrentAnswer = currentPendingAnswers.some((answer) =>
      options.requiredCleanAnswerDocumentIds?.has(answer.documentId),
    );
    return progressMatches && preferencesMatch && !hasPendingCurrentAnswer;
  };
  if (!(await progressWriteStillCurrent())) return false;
  await ensureLease();
  const written = await writeKv(
    documentId,
    localDocument,
    {
      beforeRetry: async () => {
        await ensureLease();
        return progressWriteStillCurrent();
      },
    },
  );
  await ensureLease();
  await markSharedDocumentSynced({
    storeName,
    profileId,
    expectedLocalRevision: record.localRevision,
    synchronizedDocument: localDocument,
    remoteVersion: written.version,
    remoteCreatedAt: written.created_at,
    conflictWarning: [
      recreationWarning(record, remoteSnapshot?.version ?? null, remoteSnapshot?.createdAt ?? null),
      written.version > (remoteSnapshot?.version ?? 0) + 1
        ? 'Outra escrita ocorreu durante a sincronização deste documento global.'
        : null,
    ].filter(Boolean).join(' ') || null,
    progressUpdate:
      storeName === 'preferences' && preferenceCorrectionChanged
        ? progressUpdateForPreferences(localDocument as Preferences)
        : undefined,
  });
  return true;
}

function assertProgressCompatibleWithCatalog(
  progress: ProgressDocument,
  catalog: SyncCatalogEntry[],
  source: string,
): void {
  const entries = new Map(
    catalog.map((entry) => [
      progressSubjectId(entry.contestStorageId, entry.subjectStorageId),
      entry,
    ]),
  );
  for (const [subjectId, subject] of Object.entries(progress.subjects)) {
    const entry = entries.get(subjectId);
    if (entry && subject.questionSetRevision > entry.questionSet.questionSetRevision) {
      throw new NewerQuestionSetRevisionError(
        subject.questionSetRevision,
        entry.questionSet.questionSetRevision,
        source,
      );
    }
  }
}

async function validateLocalPreflightState(
  profileId: string,
  preflight: ProfilePreflight,
): Promise<void> {
  const preferences = await getSharedDocumentRecord('preferences', profileId);
  if (
    preferences &&
    resolveVersionAction(preferences, preflight.preferences?.version ?? null) !== 'adopt-remote' &&
    !preferencesSchema.safeParse(preferences.current).success
  ) {
    throw new Error('Documento local de preferences inválido');
  }

  for (const answer of preflight.answers) {
    const record = await getLocalAnswerRecord(answer.documentId);
    if (
      record &&
      resolveVersionAction(record, answer.remote?.version ?? null) !== 'adopt-remote'
    ) {
      reconcileAnswerDocument(record.current, answer.entry.questionSet);
    }
  }
}

async function readProfilePreflight(
  profileId: string,
  ensureLease: EnsureSyncLease,
): Promise<ProfilePreflight> {
  await ensureLease();
  const catalog = await loadSyncCatalog();
  await ensureLease();
  const preferences = await validatedSharedRemote<Preferences>(
    profileId,
    'preferences',
    buildPreferencesDocumentId(profileId),
    ensureLease,
  );
  const estudados = await validatedSharedRemote<StudiedDocument>(
    profileId,
    'estudados',
    buildStudiedDocumentId(profileId),
    ensureLease,
  );
  const leitura = await validatedSharedRemote<ReadingPreferences>(
    profileId,
    'leitura',
    buildReadingPreferencesDocumentId(profileId),
    ensureLease,
  );
  const answers: ProfilePreflight['answers'] = [];
  // Keep reads serial so the shared request gate and lease cover every catalog entry.
  for (const entry of catalog) {
    const documentId = buildAnswerDocumentId(
      profileId,
      entry.contestStorageId,
      entry.subjectStorageId,
    );
    const remote = await validatedRemote(profileId, documentId, entry.questionSet, ensureLease);
    answers.push({ documentId, entry, remote });
  }
  const progressDocumentId = buildProgressDocumentId(profileId);
  const progress = await validatedSharedRemote<ProgressDocument>(
    profileId,
    'progress',
    progressDocumentId,
    ensureLease,
  );
  if (progress) {
    try {
      assertProgressCompatibleWithCatalog(progress.document, catalog, 'de progresso remoto');
    } catch (error) {
      const reason = error instanceof Error ? error.message : 'Progresso remoto incompatível';
      await quarantineRemoteDocument({
        profileId,
        documentId: progressDocumentId,
        reason,
        value: progress.document,
      });
      await markSharedDocumentError('progress', profileId, reason);
      throw error;
    }
  }

  const preflight = { catalog, preferences, estudados, leitura, answers, progress };
  await validateLocalPreflightState(profileId, preflight);
  return preflight;
}

async function applyProfilePreflight(
  profileId: string,
  preflight: ProfilePreflight,
  ensureLease: EnsureSyncLease,
): Promise<void> {
  const preferencesApplied = await applySharedRemote(
    profileId,
    'preferences',
    buildPreferencesDocumentId(profileId),
    preflight.preferences,
    ensureLease,
  );
  if (!preferencesApplied) throw new Error('As preferências mudaram durante a vinculação');

  // Estudados é um documento global independente (sem acoplamento a preferences/progress).
  const estudadosApplied = await applySharedRemote(
    profileId,
    'estudados',
    buildStudiedDocumentId(profileId),
    preflight.estudados,
    ensureLease,
  );
  if (!estudadosApplied) throw new Error('Os assuntos estudados mudaram durante a vinculação');

  const leituraApplied = await applySharedRemote(
    profileId,
    'leitura',
    buildReadingPreferencesDocumentId(profileId),
    preflight.leitura,
    ensureLease,
  );
  if (!leituraApplied) throw new Error('As preferências de leitura mudaram durante a vinculação');

  const preferencesRecord = await getSharedDocumentRecord('preferences', profileId);
  if (preferencesRecord?.outboxState === 'pending') {
    throw new Error('As preferências mudaram durante a vinculação');
  }
  const parsedPreferences = preferencesRecord
    ? preferencesSchema.safeParse(preferencesRecord.current)
    : { success: true as const, data: DEFAULT_PREFERENCES };
  if (!parsedPreferences.success) throw new Error('Documento local de preferences inválido');
  const preferences = parsedPreferences.data;
  const expectedPreferencesRevision = preferencesRecord?.localRevision ?? null;

  const answerDocumentIds = new Set<string>();
  for (const answer of preflight.answers) {
    answerDocumentIds.add(answer.documentId);
    await applyAnswerRemote(
      profileId,
      answer.documentId,
      answer.entry.questionSet,
      answer.remote,
      ensureLease,
    );
  }

  const pendingAnswers = await listPendingAnswerRecords(profileId);
  if (pendingAnswers.some((record) => answerDocumentIds.has(record.documentId))) {
    throw new Error('As respostas mudaram durante a vinculação');
  }

  const allowedProgressSubjectIds = new Set(
    preflight.catalog.map((entry) =>
      progressSubjectId(entry.contestStorageId, entry.subjectStorageId),
    ),
  );
  const progressOptions: SharedSyncOptions = {
    requiredCleanPreferencesRevision: expectedPreferencesRevision,
    requiredCleanAnswerDocumentIds: answerDocumentIds,
    allowedProgressSubjectIds,
    progressCorrectionMode: preferences.correctionMode,
  };
  // Observe/adopt progress first, but publish only after rebuilding it from resolved answers.
  const progressPrepared = await applySharedRemote(
    profileId,
    'progress',
    buildProgressDocumentId(profileId),
    preflight.progress,
    ensureLease,
    progressOptions,
    false,
  );
  if (!progressPrepared) throw new Error('O progresso mudou durante a vinculação');

  const hasAnswerState = (await Promise.all(
    preflight.answers.map((answer) => getLocalAnswerRecord(answer.documentId)),
  )).some(Boolean);
  const progressBeforeRefresh = await getSharedDocumentRecord('progress', profileId);
  if (!hasAnswerState && !progressBeforeRefresh && !preflight.progress) return;

  await refreshProfileProgress(
    profileId,
    preflight.catalog,
    preferences,
    expectedPreferencesRevision,
  );
  const progressRecord = await getSharedDocumentRecord('progress', profileId);
  const progressApplied = await applySharedRemote(
    profileId,
    'progress',
    buildProgressDocumentId(profileId),
    preflight.progress,
    ensureLease,
    { ...progressOptions, expectedLocalRevision: progressRecord?.localRevision ?? null },
  );
  if (!progressApplied) throw new Error('O progresso mudou durante a vinculação');

  const finalPreferences = await getSharedDocumentRecord('preferences', profileId);
  const finalEstudados = await getSharedDocumentRecord('estudados', profileId);
  const finalLeitura = await getSharedDocumentRecord('leitura', profileId);
  const finalPendingAnswers = await listPendingAnswerRecords(profileId);
  const finalProgress = await getSharedDocumentRecord('progress', profileId);
  if (
    finalPreferences?.outboxState === 'pending' ||
    finalEstudados?.outboxState === 'pending' ||
    finalLeitura?.outboxState === 'pending' ||
    finalPendingAnswers.some((record) => answerDocumentIds.has(record.documentId)) ||
    finalProgress?.outboxState === 'pending'
  ) {
    throw new Error('O perfil mudou durante a vinculação; tente novamente');
  }
}

async function runWithLease(operation: (ensureLease: EnsureSyncLease) => Promise<void>): Promise<boolean> {
  const acquired = await acquireSyncLease(leaseName, ownerId, 30_000);
  if (!acquired) return false;

  let leaseError: unknown;
  let heartbeatPromise = Promise.resolve();
  const renewLease = async () => {
    if (leaseError) throw leaseError;
    try {
      await renewSyncLease(leaseName, ownerId, 30_000);
    } catch (error) {
      leaseError = error;
      throw error;
    }
  };
  const ensureLease = async () => {
    await heartbeatPromise;
    if (leaseError) throw leaseError;
    await renewLease();
  };
  const heartbeat = setInterval(() => {
    heartbeatPromise = heartbeatPromise.then(renewLease).catch(() => undefined);
  }, 10_000);

  try {
    await operation(ensureLease);
    await ensureLease();
    return true;
  } finally {
    clearInterval(heartbeat);
    await heartbeatPromise;
    await releaseSyncLease(leaseName, ownerId);
  }
}

export async function prepareProfileAlias(
  profileId: string,
  options: ProfilePreparationOptions = {},
): Promise<ProfilePreparationResult> {
  let result: ProfilePreparationResult | undefined;
  const acquired = await enqueue(() =>
    runWithLease(async (ensureLease) => {
      await whenLocalWritesSettled();
      const preflight = await readProfilePreflight(profileId, ensureLease);
      result = {
        remoteDocumentCount:
          Number(preflight.preferences !== null) +
          Number(preflight.estudados !== null) +
          Number(preflight.leitura !== null) +
          preflight.answers.filter((answer) => answer.remote !== null).length +
          Number(preflight.progress !== null),
      };
      options.onPreflightComplete?.(result);
      await ensureLease();
      await applyProfilePreflight(profileId, preflight, ensureLease);
    }),
  );
  if (!acquired || !result) throw new Error('Outra sincronização está preparando este perfil');
  return result;
}

export function synchronizeAnswerDocument(
  profileId: string,
  documentId: string,
  questionSet: AnswerableQuestionSet,
): Promise<boolean> {
  return enqueue(() =>
    runWithLease(async (ensureLease) => {
      try {
        await synchronizeRecord(profileId, documentId, questionSet, ensureLease);
      } catch (error) {
        if (error instanceof NewerQuestionSetRevisionError) {
          announceUnsupportedAnswerRevision(documentId);
        }
        announce('error', error instanceof Error ? error.message : 'Falha de sincronização');
        await markAnswerSyncError(
          documentId,
          error instanceof Error ? error.message : 'Falha de sincronização',
          error instanceof KvClientError ? Date.now() + 10_000 : null,
        );
        throw error;
      }
    }),
  );
}

export function syncPendingProfile(profileId: string): Promise<boolean> {
  const active = activeProfileSyncs.get(profileId);
  if (active) {
    rerunProfiles.add(profileId);
    return active.then(() => {
      if (rerunProfiles.delete(profileId)) return syncPendingProfile(profileId);
      return true;
    });
  }

  const operation = enqueue(() =>
    runWithLease(async (ensureLease) => {
      announce('syncing', 'Sincronizando alterações pendentes...');
      let failures = 0;
      let preferenceSyncFailed = false;
      const preferencesRecord = await getSharedDocumentRecord('preferences', profileId);
      const preferencesKey = `${profileId}:preferences`;
      if (
        preferencesRecord?.outboxState === 'pending' ||
        Date.now() - (lastSharedSyncAt.get(preferencesKey) ?? 0) >= 30_000
      ) {
        try {
          await synchronizeSharedDocument(
            profileId,
            'preferences',
            buildPreferencesDocumentId(profileId),
            ensureLease,
          );
          lastSharedSyncAt.set(preferencesKey, Date.now());
        } catch (error) {
          if (error instanceof SyncLeaseLostError) throw error;
          failures += 1;
          preferenceSyncFailed = true;
        }
      }
      const preferencesStillPending =
        (await getSharedDocumentRecord('preferences', profileId))?.outboxState === 'pending';
      if (preferencesStillPending && !preferenceSyncFailed) failures += 1;

      // Estudados: documento global independente, mesma máquina de sincronização.
      const estudadosRecord = await getSharedDocumentRecord('estudados', profileId);
      const estudadosKey = `${profileId}:estudados`;
      let estudadosSyncFailed = false;
      if (
        estudadosRecord?.outboxState === 'pending' ||
        Date.now() - (lastSharedSyncAt.get(estudadosKey) ?? 0) >= 30_000
      ) {
        try {
          await synchronizeSharedDocument(
            profileId,
            'estudados',
            buildStudiedDocumentId(profileId),
            ensureLease,
          );
          lastSharedSyncAt.set(estudadosKey, Date.now());
        } catch (error) {
          if (error instanceof SyncLeaseLostError) throw error;
          failures += 1;
          estudadosSyncFailed = true;
        }
      }
      const estudadosStillPending =
        (await getSharedDocumentRecord('estudados', profileId))?.outboxState === 'pending';
      if (estudadosStillPending && !estudadosSyncFailed) failures += 1;

      // Preferências de leitura: documento global independente, mesma máquina de sincronização.
      const leituraRecord = await getSharedDocumentRecord('leitura', profileId);
      const leituraKey = `${profileId}:leitura`;
      let leituraSyncFailed = false;
      if (
        leituraRecord?.outboxState === 'pending' ||
        Date.now() - (lastSharedSyncAt.get(leituraKey) ?? 0) >= 30_000
      ) {
        try {
          await synchronizeSharedDocument(
            profileId,
            'leitura',
            buildReadingPreferencesDocumentId(profileId),
            ensureLease,
          );
          lastSharedSyncAt.set(leituraKey, Date.now());
        } catch (error) {
          if (error instanceof SyncLeaseLostError) throw error;
          failures += 1;
          leituraSyncFailed = true;
        }
      }
      const leituraStillPending =
        (await getSharedDocumentRecord('leitura', profileId))?.outboxState === 'pending';
      if (leituraStillPending && !leituraSyncFailed) failures += 1;

      await ensureLease();
      const catalog = await loadSyncCatalog();
      await ensureLease();
      const allowedProgressSubjectIds = new Set(
        catalog.map((entry) => progressSubjectId(entry.contestStorageId, entry.subjectStorageId)),
      );
      const entriesById = new Map(
        catalog.map((entry) => [
          buildAnswerDocumentId(profileId, entry.contestStorageId, entry.subjectStorageId),
          entry,
        ]),
      );
      const records = await listPendingAnswerRecords(profileId);
      let synchronizedAnswer = false;
      const attemptedAnswerIds = new Set<string>();
      for (const record of records) {
        const entry = entriesById.get(record.documentId);
        if (!entry) {
          failures += 1;
          await markAnswerSyncError(record.documentId, 'Documento não existe no catálogo atual', null);
          continue;
        }

        attemptedAnswerIds.add(record.documentId);
        try {
          await synchronizeRecord(profileId, record.documentId, entry.questionSet, ensureLease);
          synchronizedAnswer = true;
        } catch (error) {
          if (error instanceof SyncLeaseLostError) throw error;
          if (error instanceof NewerQuestionSetRevisionError) {
            announceUnsupportedAnswerRevision(record.documentId);
          }
          failures += 1;
          const message = error instanceof Error ? error.message : 'Falha de sincronização';
          const nextAttemptAt = error instanceof KvClientError ? Date.now() + 10_000 : null;
          await markAnswerSyncError(record.documentId, message, nextAttemptAt);
        }
      }

      const progressBeforeAnswerRefresh = await getSharedDocumentRecord('progress', profileId);
      let fullAnswerRefreshFailed = false;
      if (
        progressBeforeAnswerRefresh?.dirtyFields.includes(PREFERENCES_PROGRESS_DIRTY_FIELD) &&
        !preferenceSyncFailed &&
        !preferencesStillPending
      ) {
        for (const [documentId, entry] of entriesById) {
          if (attemptedAnswerIds.has(documentId)) continue;
          try {
            await synchronizeRecord(profileId, documentId, entry.questionSet, ensureLease);
            synchronizedAnswer = true;
          } catch (error) {
            if (error instanceof SyncLeaseLostError) throw error;
            if (error instanceof NewerQuestionSetRevisionError) {
              announceUnsupportedAnswerRevision(documentId);
            }
            failures += 1;
            fullAnswerRefreshFailed = true;
            const message = error instanceof Error ? error.message : 'Falha de sincronização';
            const nextAttemptAt = error instanceof KvClientError ? Date.now() + 10_000 : null;
            await markAnswerSyncError(documentId, message, nextAttemptAt);
          }
        }
      }

      const remainingAnswers = await listPendingAnswerRecords(profileId);
      const remainingCurrentAnswers = remainingAnswers.filter((record) =>
        entriesById.has(record.documentId),
      );
      if (remainingCurrentAnswers.length > 0) failures += 1;
      const progressPreferencesRecord = await getSharedDocumentRecord('preferences', profileId);
      const parsedProgressPreferences = progressPreferencesRecord
        ? preferencesSchema.safeParse(progressPreferencesRecord.current)
        : { success: true as const, data: DEFAULT_PREFERENCES };
      const progressPreferences = parsedProgressPreferences.success
        ? parsedProgressPreferences.data
        : null;
      const progressPreferencesReady =
        !preferenceSyncFailed &&
        progressPreferencesRecord?.outboxState !== 'pending' &&
        progressPreferences !== null;
      if (!parsedProgressPreferences.success) failures += 1;
      if (
        progressPreferencesRecord?.outboxState === 'pending' &&
        !preferencesStillPending
      ) {
        failures += 1;
      }
      const expectedPreferencesRevision = progressPreferencesRecord?.localRevision ?? null;
      let progressRecord = await getSharedDocumentRecord('progress', profileId);
      let progressRefreshFailed = fullAnswerRefreshFailed;
      if (
        remainingCurrentAnswers.length === 0 &&
        progressPreferencesReady &&
        !progressRefreshFailed &&
        (synchronizedAnswer || progressRecord?.outboxState === 'pending')
      ) {
        try {
          await refreshProfileProgress(
            profileId,
            catalog,
            progressPreferences,
            expectedPreferencesRevision,
          );
          progressRecord = await getSharedDocumentRecord('progress', profileId);
        } catch {
          failures += 1;
          progressRefreshFailed = true;
        }
      }
      const finalPendingAnswers = await listPendingAnswerRecords(profileId);
      const finalPendingCurrentAnswers = finalPendingAnswers.filter((record) =>
        entriesById.has(record.documentId),
      );
      if (finalPendingCurrentAnswers.length > 0 && remainingCurrentAnswers.length === 0) failures += 1;
      const progressKey = `${profileId}:progress`;
      if (
        finalPendingCurrentAnswers.length === 0 &&
        progressPreferencesReady &&
        !progressRefreshFailed &&
        (progressRecord?.outboxState === 'pending' ||
          Date.now() - (lastSharedSyncAt.get(progressKey) ?? 0) >= 30_000)
      ) {
        try {
          const synchronized = await synchronizeSharedDocument(
            profileId,
            'progress',
            buildProgressDocumentId(profileId),
            ensureLease,
            {
              expectedLocalRevision: progressRecord?.localRevision ?? null,
              requiredCleanPreferencesRevision: expectedPreferencesRevision,
              requiredCleanAnswerDocumentIds: new Set(entriesById.keys()),
              allowedProgressSubjectIds,
              progressCorrectionMode: progressPreferences.correctionMode,
            },
          );
          if (synchronized) lastSharedSyncAt.set(progressKey, Date.now());
          else failures += 1;
        } catch (error) {
          if (error instanceof SyncLeaseLostError) throw error;
          failures += 1;
        }
      }

      announce(
        failures === 0 ? 'synced' : 'error',
        failures === 0 ? 'Alterações sincronizadas.' : `${failures} documento(s) continuam pendentes.`,
      );
    }),
  );
  activeProfileSyncs.set(profileId, operation);
  void operation.finally(() => {
    if (activeProfileSyncs.get(profileId) === operation) activeProfileSyncs.delete(profileId);
  }).catch(() => undefined);
  return operation;
}

export function requestProfileSync(profileId = getActiveAlias()): Promise<boolean> {
  if (!profileId || typeof navigator === 'undefined' || !navigator.onLine) {
    announce('offline', 'Sem conexão. As alterações permanecem salvas localmente.');
    scheduleBackgroundSync();
    return Promise.resolve(false);
  }
  broadcast?.postMessage({ type: 'sync-request', profileId });
  return syncPendingProfile(profileId).catch((error) => {
    announce('error', error instanceof Error ? error.message : 'Falha de sincronização');
    scheduleBackgroundSync();
    return false;
  });
}

export function startSyncCoordinator(): void {
  if (runtimeStarted || typeof window === 'undefined') return;
  runtimeStarted = true;

  if ('BroadcastChannel' in window) {
    broadcast = new BroadcastChannel('concursos-sync');
    broadcast.addEventListener('message', (event) => {
      if (event.data?.type === 'sync-request' && typeof event.data.profileId === 'string') {
        void syncPendingProfile(event.data.profileId).catch((error) => {
          announce('error', error instanceof Error ? error.message : 'Falha de sincronização');
        });
      } else if (
        event.data?.type === 'answer-revision-unsupported' &&
        typeof event.data.documentId === 'string'
      ) {
        dispatchUnsupportedAnswerRevision(event.data.documentId);
      }
    });
  }

  window.addEventListener('online', () => void requestProfileSync());
  window.addEventListener('focus', () => void requestProfileSync());
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') void requestProfileSync();
  });
  window.addEventListener('concursos:sync-request', () => void requestProfileSync());
  void requestProfileSync();
}
