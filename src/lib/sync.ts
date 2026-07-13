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
  storeRemoteAnswerDocument,
  type LocalAnswerRecord,
  type SharedStoreName,
} from './offline-db';
import { DEFAULT_PREFERENCES, mergePreferences, preferencesSchema, type Preferences } from './preferences';
import { EMPTY_PROGRESS, mergeProgress, progressSchema, type ProgressDocument } from './progress';
import {
  isSubmissionValid,
  reconcileAnswerDocument,
  type AnswerDocument,
  type AnswerMap,
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
      await storeRemoteAnswerDocument({
        profileId,
        documentId,
        document,
        remoteVersion: remote.version,
        remoteCreatedAt: remote.createdAt,
      });
      announceAnswer(documentId);
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
): Promise<void> {
  const record = await getSharedDocumentRecord(storeName, profileId);
  await requestGate.wait();
  const envelope = await readKv(documentId);
  let remote: Preferences | ProgressDocument | null = null;

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
  }

  if (!record) {
    if (!remote || !envelope) return;
    await markSharedDocumentSynced({
      storeName,
      profileId,
      expectedLocalRevision: 0,
      synchronizedDocument: remote,
      remoteVersion: envelope.version,
      remoteCreatedAt: envelope.created_at,
    });
    return;
  }

  if (record.outboxState === 'clean') {
    if (!remote || !envelope) return;
    await markSharedDocumentSynced({
      storeName,
      profileId,
      expectedLocalRevision: record.localRevision,
      synchronizedDocument: remote,
      remoteVersion: envelope.version,
      remoteCreatedAt: envelope.created_at,
    });
    return;
  }

  let merged: Preferences | ProgressDocument;
  if (storeName === 'preferences') {
    const local = preferencesSchema.safeParse(record.current);
    const base = preferencesSchema.safeParse(record.base);
    merged = mergePreferences(
      local.success ? local.data : DEFAULT_PREFERENCES,
      base.success ? base.data : null,
      remote as Preferences | null,
    );
  } else {
    const local = progressSchema.safeParse(record.current);
    merged = mergeProgress(local.success ? local.data : EMPTY_PROGRESS, remote as ProgressDocument | null);
  }

  await requestGate.wait();
  const written = await writeKv(documentId, merged);
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
        }
      }
      const catalog = await loadSyncCatalog();
      const entriesById = new Map(
        catalog.map((entry) => [
          buildAnswerDocumentId(profileId, entry.contestStorageId, entry.subjectStorageId),
          entry,
        ]),
      );
      const records = await listPendingAnswerRecords(profileId);
      for (const record of records) {
        const entry = entriesById.get(record.documentId);
        if (!entry) {
          failures += 1;
          await markAnswerSyncError(record.documentId, 'Documento não existe no catálogo atual', null);
          continue;
        }

        await acquireSyncLease(leaseName, ownerId, 30_000);
        try {
          await synchronizeRecord(profileId, record.documentId, entry.questionSet);
        } catch (error) {
          failures += 1;
          const message = error instanceof Error ? error.message : 'Falha de sincronização';
          const nextAttemptAt = error instanceof KvClientError ? Date.now() + 10_000 : null;
          await markAnswerSyncError(record.documentId, message, nextAttemptAt);
        }
      }

      const progressRecord = await getSharedDocumentRecord('progress', profileId);
      const progressKey = `${profileId}:progress`;
      if (
        progressRecord?.outboxState === 'pending' ||
        Date.now() - (lastSharedSyncAt.get(progressKey) ?? 0) >= 30_000
      ) {
        try {
          await synchronizeSharedDocument(profileId, 'progress', buildProgressDocumentId(profileId));
          lastSharedSyncAt.set(progressKey, Date.now());
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
