import { z } from 'zod';
import { questionSetSchema, type QuestionSet } from './content-schema';
import { parseRemoteAnswerDocument } from './document-schema';
import {
  buildAnswerDocumentId,
  buildPreferencesDocumentId,
  buildProgressDocumentId,
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
  saveProgressIfPreferencesUnchanged,
  saveSharedDocument,
  storeRemoteAnswerDocument,
  type LocalAnswerRecord,
  type SharedStoreName,
} from './offline-db';
import {
  DEFAULT_PREFERENCES,
  mergePreferences,
  preferencesSchema,
  type Preferences,
} from './preferences';
import {
  EMPTY_PROGRESS,
  invalidateProgressForCorrectionMode,
  materializeSubjectProgress,
  mergeProgress,
  PREFERENCES_PROGRESS_DIRTY_FIELD,
  progressSchema,
  progressSubjectId,
  type ProgressDocument,
} from './progress';
import {
  isSubmissionValid,
  createEmptyAnswerDocument,
  reconcileAnswerDocument,
  type AnswerDocument,
  type AnswerMap,
  type CorrectionMode,
  type StoredAnswer,
} from './questionnaire';

const syncCatalogSchema = z
  .object({
    schemaVersion: z.literal(1),
    subjects: z.array(
      z
        .object({
          contestStorageId: z.string(),
          subjectStorageId: z.string(),
          questionSet: questionSetSchema,
        })
        .strict(),
    ),
  })
  .strict();

type SyncCatalogEntry = z.infer<typeof syncCatalogSchema>['subjects'][number];

interface SharedSyncOptions {
  expectedLocalRevision?: number | null;
  requiredCleanPreferencesRevision?: number | null;
  requiredCleanAnswerDocumentIds?: ReadonlySet<string>;
  allowedProgressSubjectIds?: ReadonlySet<string>;
  progressCorrectionMode?: CorrectionMode;
}

export interface MergeAnswerResult {
  document: AnswerDocument;
  conflictingQuestionIds: string[];
}

function sameAnswer(left: StoredAnswer | undefined, right: StoredAnswer | undefined): boolean {
  return left?.optionId === right?.optionId && left?.questionRevision === right?.questionRevision;
}

export function mergeAnswerDocuments(
  localDocument: AnswerDocument,
  baseDocument: AnswerDocument | null,
  remoteDocument: AnswerDocument | null,
  questionSet: QuestionSet,
): MergeAnswerResult {
  const local = reconcileAnswerDocument(localDocument, questionSet);
  const base = baseDocument ? reconcileAnswerDocument(baseDocument, questionSet) : null;
  const remote = remoteDocument ? reconcileAnswerDocument(remoteDocument, questionSet) : null;
  const answers: AnswerMap = {};
  const conflictingQuestionIds: string[] = [];

  for (const question of questionSet.questions) {
    const localAnswer = local.answers[question.id];
    const baseAnswer = base?.answers[question.id];
    const remoteAnswer = remote?.answers[question.id];
    const localChanged = !sameAnswer(localAnswer, baseAnswer);
    const remoteChanged = !sameAnswer(remoteAnswer, baseAnswer);
    let selected: StoredAnswer | undefined;

    if (!localChanged && remoteChanged) selected = remoteAnswer;
    else if (localChanged && !remoteChanged) selected = localAnswer;
    else if (sameAnswer(localAnswer, remoteAnswer)) selected = localAnswer;
    else if (localChanged && remoteChanged) {
      selected = remoteAnswer;
      conflictingQuestionIds.push(question.id);
    } else selected = localAnswer ?? remoteAnswer;

    if (selected) answers[question.id] = selected;
  }

  const merged: AnswerDocument = {
    schemaVersion: 1,
    questionSetRevision: questionSet.questionSetRevision,
    answers,
    submission: null,
  };

  for (const candidate of [remote?.submission, local.submission]) {
    if (!candidate) continue;
    merged.submission = candidate;
    if (isSubmissionValid(merged, questionSet)) break;
    merged.submission = null;
  }

  return { document: merged, conflictingQuestionIds };
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

async function refreshProfileProgress(
  profileId: string,
  catalog: SyncCatalogEntry[],
  preferences: Preferences,
  expectedPreferencesRevision: number | null,
): Promise<void> {
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
  const saved = await saveProgressIfPreferencesUnchanged(
    profileId,
    expectedPreferencesRevision,
    { schemaVersion: 1, subjects },
    Object.keys(subjects),
  );
  if (!saved) throw new Error('As preferências mudaram durante o recálculo do progresso');
}

function sanitizeProgressForCorrectionMode(
  progress: ProgressDocument,
  correctionMode: CorrectionMode | undefined,
): { document: ProgressDocument; changed: boolean } {
  if (correctionMode !== 'on-submit') return { document: progress, changed: false };
  let changed = false;
  const subjects = Object.fromEntries(
    Object.entries(progress.subjects).map(([subjectId, subject]) => {
      if (subject.submitted || subject.correct === undefined) return [subjectId, subject];
      changed = true;
      const { correct: _correct, ...withoutCorrect } = subject;
      return [subjectId, withoutCorrect];
    }),
  );
  return { document: changed ? { schemaVersion: 1, subjects } : progress, changed };
}

function recreationWarning(record: LocalAnswerRecord, remoteVersion: number, remoteCreatedAt: string | null): string | null {
  if (record.remoteVersion !== null && remoteVersion < record.remoteVersion) {
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
  questionSet: QuestionSet,
): Promise<{ document: AnswerDocument; version: number; createdAt: string | null } | null> {
  await requestGate.wait();
  const envelope = await readKv(documentId);
  if (!envelope) return null;

  try {
    return {
      document: parseRemoteAnswerDocument(envelope.json, questionSet),
      version: envelope.version,
      createdAt: envelope.created_at,
    };
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'Documento remoto inválido';
    await quarantineRemoteDocument({ profileId, documentId, reason, value: envelope.json });
    throw new Error(reason);
  }
}

async function synchronizeRecord(
  profileId: string,
  documentId: string,
  questionSet: QuestionSet,
): Promise<void> {
  const remote = await validatedRemote(profileId, documentId, questionSet);
  const record = await getLocalAnswerRecord(documentId);

  if (!record) {
    if (remote) {
      const document = reconcileAnswerDocument(remote.document, questionSet);
      const stored = await storeRemoteAnswerDocument({
        profileId,
        documentId,
        document,
        remoteVersion: remote.version,
        remoteCreatedAt: remote.createdAt,
      });
      if (stored) announceAnswer(documentId);
    }
    return;
  }

  if (record.outboxState === 'clean') {
    if (!remote) return;
    const merged = mergeAnswerDocuments(record.current, record.base, remote.document, questionSet);
    await markAnswerSynced({
      documentId,
      expectedLocalRevision: record.localRevision,
      synchronizedDocument: merged.document,
      remoteVersion: remote.version,
      remoteCreatedAt: remote.createdAt,
      conflictWarning: recreationWarning(record, remote.version, remote.createdAt),
    });
    announceAnswer(documentId);
    return;
  }

  const merged = remote
    ? mergeAnswerDocuments(record.current, record.base, remote.document, questionSet)
    : { document: reconcileAnswerDocument(record.current, questionSet), conflictingQuestionIds: [] };
  await requestGate.wait();
  const written = await writeKv(documentId, merged.document);
  const expectedVersion = remote?.version ?? 0;
  const warnings = [
    recreationWarning(record, remote?.version ?? expectedVersion, remote?.createdAt ?? null),
    merged.conflictingQuestionIds.length > 0
      ? `O remoto prevaleceu nas questões: ${merged.conflictingQuestionIds.join(', ')}.`
      : null,
    written.version > expectedVersion + 1
      ? 'Outra escrita ocorreu entre a leitura e a gravação; a API não oferece recuperação histórica.'
      : null,
  ].filter(Boolean);

  await markAnswerSynced({
    documentId,
    expectedLocalRevision: record.localRevision,
    synchronizedDocument: merged.document,
    remoteVersion: written.version,
    remoteCreatedAt: written.created_at,
    conflictWarning: warnings.length > 0 ? warnings.join(' ') : null,
  });
  announceAnswer(documentId);
}

async function synchronizeSharedDocument(
  profileId: string,
  storeName: SharedStoreName,
  documentId: string,
  options: SharedSyncOptions = {},
): Promise<boolean> {
  const record = await getSharedDocumentRecord(storeName, profileId);
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
  await requestGate.wait();
  const envelope = await readKv(documentId);
  let remote: Preferences | ProgressDocument | null = null;
  let remoteProgressSanitized = false;

  if (envelope) {
    const schema = storeName === 'preferences' ? preferencesSchema : progressSchema;
    const parsed = schema.safeParse(envelope.json);
    if (!parsed.success) {
      const reason = `Documento remoto de ${storeName} inválido`;
      await quarantineRemoteDocument({ profileId, documentId, reason, value: envelope.json });
      await markSharedDocumentError(storeName, profileId, reason);
      throw new Error(reason);
    }
    remote = parsed.data;
    if (storeName === 'progress' && options.allowedProgressSubjectIds) {
      const progress = remote as ProgressDocument;
      remote = {
        schemaVersion: 1,
        subjects: Object.fromEntries(
          Object.entries(progress.subjects).filter(([subjectId]) =>
            options.allowedProgressSubjectIds?.has(subjectId),
          ),
        ),
      };
    }
    if (storeName === 'progress') {
      const sanitized = sanitizeProgressForCorrectionMode(
        remote as ProgressDocument,
        options.progressCorrectionMode,
      );
      remote = sanitized.document;
      remoteProgressSanitized = sanitized.changed;
    }
  }

  if (!record) {
    if (!remote || !envelope) return true;
    await markSharedDocumentSynced({
      storeName,
      profileId,
      expectedLocalRevision: 0,
      synchronizedDocument: remote,
      remoteVersion: envelope.version,
      remoteCreatedAt: envelope.created_at,
      pendingDocument: remoteProgressSanitized ? remote : undefined,
      pendingDirtyFields:
        storeName === 'progress' && remoteProgressSanitized
          ? Object.keys((remote as ProgressDocument).subjects)
          : undefined,
    });
    if (
      storeName === 'preferences' &&
      (remote as Preferences).correctionMode !== DEFAULT_PREFERENCES.correctionMode
    ) {
      await invalidateProgressForCorrectionMode(
        profileId,
        (remote as Preferences).correctionMode,
      );
    }
    return true;
  }

  if (record.outboxState === 'clean') {
    if (!remote || !envelope) return true;
    const localPreferences =
      storeName === 'preferences' ? preferencesSchema.safeParse(record.current) : null;
    await markSharedDocumentSynced({
      storeName,
      profileId,
      expectedLocalRevision: record.localRevision,
      synchronizedDocument: remote,
      remoteVersion: envelope.version,
      remoteCreatedAt: envelope.created_at,
      pendingDocument: remoteProgressSanitized ? remote : undefined,
      pendingDirtyFields:
        storeName === 'progress' && remoteProgressSanitized
          ? Object.keys((remote as ProgressDocument).subjects)
          : undefined,
    });
    if (
      storeName === 'preferences' &&
      (!localPreferences?.success ||
        localPreferences.data.correctionMode !== (remote as Preferences).correctionMode)
    ) {
      await invalidateProgressForCorrectionMode(
        profileId,
        (remote as Preferences).correctionMode,
      );
    }
    return true;
  }

  let merged: Preferences | ProgressDocument;
  let preferenceCorrectionChanged = false;
  if (storeName === 'preferences') {
    const local = preferencesSchema.safeParse(record.current);
    const base = preferencesSchema.safeParse(record.base);
    merged = mergePreferences(
      local.success ? local.data : DEFAULT_PREFERENCES,
      base.success ? base.data : null,
      remote as Preferences | null,
    );
    preferenceCorrectionChanged =
      (local.success ? local.data.correctionMode : DEFAULT_PREFERENCES.correctionMode) !==
        merged.correctionMode ||
      (base.success ? base.data.correctionMode : DEFAULT_PREFERENCES.correctionMode) !==
        merged.correctionMode;
  } else {
    const local = progressSchema.safeParse(record.current);
    merged = mergeProgress(local.success ? local.data : EMPTY_PROGRESS, remote as ProgressDocument | null);
    merged = sanitizeProgressForCorrectionMode(
      merged,
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
  const written = await writeKv(
    documentId,
    merged,
    storeName === 'progress' ? { beforeRetry: progressWriteStillCurrent } : {},
  );
  await markSharedDocumentSynced({
    storeName,
    profileId,
    expectedLocalRevision: record.localRevision,
    synchronizedDocument: merged,
    remoteVersion: written.version,
    remoteCreatedAt: written.created_at,
    conflictWarning:
      envelope && written.version > envelope.version + 1
        ? 'Outra escrita ocorreu durante a sincronização deste documento global.'
        : null,
  });
  if (storeName === 'preferences' && preferenceCorrectionChanged) {
    await invalidateProgressForCorrectionMode(
      profileId,
      (merged as Preferences).correctionMode,
    );
  }
  return true;
}

async function runWithLease(operation: () => Promise<void>): Promise<boolean> {
  const acquired = await acquireSyncLease(leaseName, ownerId, 30_000);
  if (!acquired) return false;
  try {
    await operation();
    return true;
  } finally {
    await releaseSyncLease(leaseName, ownerId);
  }
}

export function synchronizeAnswerDocument(
  profileId: string,
  documentId: string,
  questionSet: QuestionSet,
): Promise<boolean> {
  return enqueue(() =>
    runWithLease(async () => {
      try {
        await synchronizeRecord(profileId, documentId, questionSet);
      } catch (error) {
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
    runWithLease(async () => {
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
          );
          lastSharedSyncAt.set(preferencesKey, Date.now());
        } catch {
          failures += 1;
          preferenceSyncFailed = true;
        }
      }
      const preferencesStillPending =
        (await getSharedDocumentRecord('preferences', profileId))?.outboxState === 'pending';
      if (preferencesStillPending && !preferenceSyncFailed) failures += 1;
      const catalog = await loadSyncCatalog();
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
        await acquireSyncLease(leaseName, ownerId, 30_000);
        try {
          await synchronizeRecord(profileId, record.documentId, entry.questionSet);
          synchronizedAnswer = true;
        } catch (error) {
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
          await acquireSyncLease(leaseName, ownerId, 30_000);
          try {
            await synchronizeRecord(profileId, documentId, entry.questionSet);
            synchronizedAnswer = true;
          } catch (error) {
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
        } catch {
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
