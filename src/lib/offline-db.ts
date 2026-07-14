import { deleteDB, openDB, type DBSchema, type IDBPDatabase } from 'idb';
import { NewerQuestionSetRevisionError } from './document-schema';
import type { AnswerDocument } from './questionnaire';

export const OFFLINE_DB_NAME = 'concursos-offline';
const OFFLINE_DB_VERSION = 1;

export type OutboxState = 'clean' | 'pending';

export interface LocalAnswerRecord {
  documentId: string;
  profileId: string;
  current: AnswerDocument;
  base: AnswerDocument | null;
  remoteVersion: number | null;
  remoteCreatedAt: string | null;
  dirtyQuestionIds: string[];
  outboxState: OutboxState;
  attempts: number;
  nextAttemptAt: number | null;
  lastError: string | null;
  conflictWarning: string | null;
  localRevision: number;
  updatedAt: number;
}

export interface LocalSharedDocumentRecord {
  profileId: string;
  current: unknown;
  base: unknown;
  remoteVersion: number | null;
  remoteCreatedAt: string | null;
  dirtyFields: string[];
  outboxState: OutboxState;
  attempts: number;
  lastError: string | null;
  conflictWarning: string | null;
  localRevision: number;
  updatedAt: number;
}

export interface OfflineContestRecord {
  contestStorageId: string;
  manifestHash: string;
  activeCacheName: string;
  downloadedAt: number;
  resourceCount: number;
}

export async function getOfflineContestRecord(
  contestStorageId: string,
): Promise<OfflineContestRecord | undefined> {
  return (await openOfflineDb()).get('downloads', contestStorageId);
}

export async function listOfflineContestRecords(): Promise<OfflineContestRecord[]> {
  return (await openOfflineDb()).getAll('downloads');
}

export function saveOfflineContestRecord(record: OfflineContestRecord): Promise<void> {
  return trackWrite(
    openOfflineDb().then(async (database) => {
      await database.put('downloads', record);
    }),
  );
}

export function deleteOfflineContestRecord(contestStorageId: string): Promise<void> {
  return trackWrite(
    openOfflineDb().then(async (database) => {
      await database.delete('downloads', contestStorageId);
    }),
  );
}

export interface SyncLeaseRecord {
  name: string;
  ownerId: string;
  expiresAt: number;
}

export interface QuarantineRecord {
  id?: number;
  profileId: string;
  documentId: string;
  reason: string;
  value: unknown;
  quarantinedAt: number;
}

interface ConcursosDbSchema extends DBSchema {
  responses: {
    key: string;
    value: LocalAnswerRecord;
    indexes: {
      'by-profile': string;
      'by-profile-outbox': [string, OutboxState];
    };
  };
  preferences: {
    key: string;
    value: LocalSharedDocumentRecord;
  };
  progress: {
    key: string;
    value: LocalSharedDocumentRecord;
  };
  downloads: {
    key: string;
    value: OfflineContestRecord;
  };
  leases: {
    key: string;
    value: SyncLeaseRecord;
  };
  quarantine: {
    key: number;
    value: QuarantineRecord;
  };
}

let databasePromise: Promise<IDBPDatabase<ConcursosDbSchema>> | undefined;
const pendingWrites = new Set<Promise<unknown>>();

function trackWrite<T>(write: Promise<T>): Promise<T> {
  pendingWrites.add(write);
  void write.finally(() => pendingWrites.delete(write)).catch(() => undefined);
  return write;
}

export function openOfflineDb(): Promise<IDBPDatabase<ConcursosDbSchema>> {
  databasePromise ??= openDB<ConcursosDbSchema>(OFFLINE_DB_NAME, OFFLINE_DB_VERSION, {
    upgrade(database) {
      const responses = database.createObjectStore('responses', { keyPath: 'documentId' });
      responses.createIndex('by-profile', 'profileId');
      responses.createIndex('by-profile-outbox', ['profileId', 'outboxState']);
      database.createObjectStore('preferences', { keyPath: 'profileId' });
      database.createObjectStore('progress', { keyPath: 'profileId' });
      database.createObjectStore('downloads', { keyPath: 'contestStorageId' });
      database.createObjectStore('leases', { keyPath: 'name' });
      database.createObjectStore('quarantine', { keyPath: 'id', autoIncrement: true });
    },
  });
  return databasePromise;
}

export async function getLocalAnswerRecord(documentId: string): Promise<LocalAnswerRecord | undefined> {
  return (await openOfflineDb()).get('responses', documentId);
}

export type SharedStoreName = 'preferences' | 'progress';

export interface SharedDocumentUpdate {
  storeName: SharedStoreName;
  dirtyFields: string[];
  updateCurrent: (
    current: unknown | undefined,
    documents: Readonly<Record<SharedStoreName, unknown | undefined>>,
  ) => unknown;
}

export async function getSharedDocumentRecord(
  storeName: SharedStoreName,
  profileId: string,
): Promise<LocalSharedDocumentRecord | undefined> {
  return (await openOfflineDb()).get(storeName, profileId);
}

export function saveSharedDocument(
  storeName: SharedStoreName,
  profileId: string,
  document: unknown,
  dirtyFields: string[],
): Promise<void> {
  return updateSharedDocuments(profileId, [
    { storeName, dirtyFields, updateCurrent: () => document },
  ]);
}

export function updateSharedDocuments(
  profileId: string,
  updates: SharedDocumentUpdate[],
): Promise<void> {
  const write = (async () => {
    const database = await openOfflineDb();
    const transaction = database.transaction(['preferences', 'progress'], 'readwrite');
    const updatedAt = Date.now();
    const records = {
      preferences: await transaction.objectStore('preferences').get(profileId),
      progress: await transaction.objectStore('progress').get(profileId),
    };
    const documents: Record<SharedStoreName, unknown | undefined> = {
      preferences: records.preferences?.current,
      progress: records.progress?.current,
    };

    for (const update of updates) {
      const store = transaction.objectStore(update.storeName);
      const existing = records[update.storeName];
      const current = update.updateCurrent(existing?.current, documents);
      documents[update.storeName] = current;
      await store.put({
        profileId,
        current,
        base: existing?.base ?? null,
        remoteVersion: existing?.remoteVersion ?? null,
        remoteCreatedAt: existing?.remoteCreatedAt ?? null,
        dirtyFields: [...new Set([...(existing?.dirtyFields ?? []), ...update.dirtyFields])].sort(),
        outboxState: 'pending',
        attempts: existing?.attempts ?? 0,
        lastError: null,
        conflictWarning: existing?.conflictWarning ?? null,
        localRevision: (existing?.localRevision ?? 0) + 1,
        updatedAt,
      });
    }
    await transaction.done;
  })();

  return trackWrite(write);
}

export function saveProgressIfPreferencesUnchanged(
  profileId: string,
  expectedPreferencesRevision: number | null,
  document: unknown,
  dirtyFields: string[],
): Promise<boolean> {
  const write = (async () => {
    const database = await openOfflineDb();
    const transaction = database.transaction(['preferences', 'progress'], 'readwrite');
    const preferences = await transaction.objectStore('preferences').get(profileId);
    const preferencesMatch =
      expectedPreferencesRevision === null
        ? preferences === undefined
        : preferences?.localRevision === expectedPreferencesRevision;
    if (!preferencesMatch || preferences?.outboxState === 'pending') {
      await transaction.done;
      return false;
    }

    const progressStore = transaction.objectStore('progress');
    const existing = await progressStore.get(profileId);
    await progressStore.put({
      profileId,
      current: document,
      base: existing?.base ?? null,
      remoteVersion: existing?.remoteVersion ?? null,
      remoteCreatedAt: existing?.remoteCreatedAt ?? null,
      dirtyFields: [...new Set([...(existing?.dirtyFields ?? []), ...dirtyFields])].sort(),
      outboxState: 'pending',
      attempts: existing?.attempts ?? 0,
      lastError: null,
      conflictWarning: existing?.conflictWarning ?? null,
      localRevision: (existing?.localRevision ?? 0) + 1,
      updatedAt: Date.now(),
    });
    await transaction.done;
    return true;
  })();

  return trackWrite(write);
}

export interface MarkSharedSyncedInput {
  storeName: SharedStoreName;
  profileId: string;
  expectedLocalRevision: number;
  synchronizedDocument: unknown;
  remoteVersion: number;
  remoteCreatedAt: string | null;
  conflictWarning?: string | null;
  pendingDocument?: unknown;
  pendingDirtyFields?: string[];
  progressUpdate?: {
    dirtyFields: string[];
    updateCurrent: (current: unknown | undefined, sharedCurrent: unknown) => unknown;
  };
}

export function markSharedDocumentSynced(input: MarkSharedSyncedInput): Promise<void> {
  const write = (async () => {
    if (input.progressUpdate && input.storeName !== 'preferences') {
      throw new Error('Progress can only be updated atomically with preferences');
    }
    const database = await openOfflineDb();
    const progressUpdate = input.progressUpdate;
    const transaction = progressUpdate
      ? database.transaction(['preferences', 'progress'], 'readwrite')
      : database.transaction(input.storeName, 'readwrite');
    const store = transaction.objectStore(input.storeName);
    const existing = await store.get(input.profileId);
    const progressStore = progressUpdate ? transaction.objectStore('progress') : null;
    const progress = progressStore ? await progressStore.get(input.profileId) : undefined;
    const changedDuringRequest = existing && existing.localRevision !== input.expectedLocalRevision;
    const keepPending = !changedDuringRequest && input.pendingDocument !== undefined;
    const current = changedDuringRequest
      ? existing.current
      : keepPending
        ? input.pendingDocument
        : input.synchronizedDocument;
    const updatedAt = Date.now();
    const updatedProgress = progressUpdate
      ? {
          profileId: input.profileId,
          current: progressUpdate.updateCurrent(progress?.current, current),
          base: progress?.base ?? null,
          remoteVersion: progress?.remoteVersion ?? null,
          remoteCreatedAt: progress?.remoteCreatedAt ?? null,
          dirtyFields: [
            ...new Set([...(progress?.dirtyFields ?? []), ...progressUpdate.dirtyFields]),
          ].sort(),
          outboxState: 'pending' as const,
          attempts: progress?.attempts ?? 0,
          lastError: null,
          conflictWarning: progress?.conflictWarning ?? null,
          localRevision: (progress?.localRevision ?? 0) + 1,
          updatedAt,
        }
      : null;
    await store.put({
      profileId: input.profileId,
      current,
      base: input.synchronizedDocument,
      remoteVersion: input.remoteVersion,
      remoteCreatedAt: input.remoteCreatedAt,
      dirtyFields: changedDuringRequest
        ? existing.dirtyFields
        : keepPending
          ? [...new Set(input.pendingDirtyFields ?? [])].sort()
          : [],
      outboxState: changedDuringRequest || keepPending ? 'pending' : 'clean',
      attempts: 0,
      lastError: null,
      conflictWarning: input.conflictWarning ?? null,
      localRevision: keepPending
        ? (existing?.localRevision ?? 0) + 1
        : existing?.localRevision ?? 0,
      updatedAt: changedDuringRequest ? existing.updatedAt : updatedAt,
    });

    if (progressStore && updatedProgress) {
      await progressStore.put(updatedProgress);
    }
    await transaction.done;
  })();

  return trackWrite(write);
}

export function markSharedDocumentError(
  storeName: SharedStoreName,
  profileId: string,
  message: string,
): Promise<void> {
  const write = (async () => {
    const database = await openOfflineDb();
    const transaction = database.transaction(storeName, 'readwrite');
    const existing = await transaction.store.get(profileId);
    if (existing) {
      await transaction.store.put({
        ...existing,
        attempts: existing.attempts + 1,
        lastError: message,
      });
    }
    await transaction.done;
  })();

  return trackWrite(write);
}

export async function loadAnswerDocument(documentId: string): Promise<AnswerDocument | null> {
  return (await getLocalAnswerRecord(documentId))?.current ?? null;
}

export interface SaveAnswerSnapshot {
  profileId: string;
  documentId: string;
  document: AnswerDocument;
  dirtyQuestionIds?: string[];
  transformLatestDocument?: (document: AnswerDocument) => AnswerDocument;
}

export function saveAnswerDocumentSnapshot(input: SaveAnswerSnapshot): Promise<LocalAnswerRecord> {
  const write = (async () => {
    const database = await openOfflineDb();
    const transaction = database.transaction('responses', 'readwrite');
    const existing = await transaction.store.get(input.documentId);
    if (
      existing &&
      existing.current.questionSetRevision > input.document.questionSetRevision
    ) {
      throw new NewerQuestionSetRevisionError(
        existing.current.questionSetRevision,
        input.document.questionSetRevision,
        'local',
      );
    }
    const dirtyQuestionIds = new Set(existing?.dirtyQuestionIds ?? []);
    for (const questionId of input.dirtyQuestionIds ?? []) dirtyQuestionIds.add(questionId);
    let current = input.transformLatestDocument
      ? input.transformLatestDocument(existing?.current ?? input.document)
      : input.document;

    if (!input.transformLatestDocument && existing && input.dirtyQuestionIds?.length) {
      const answers = { ...existing.current.answers };
      for (const questionId of input.dirtyQuestionIds) {
        const answer = input.document.answers[questionId];
        if (answer) answers[questionId] = answer;
        else delete answers[questionId];
      }
      current = { ...input.document, answers };
    }

    const record: LocalAnswerRecord = {
      documentId: input.documentId,
      profileId: input.profileId,
      current,
      base: existing?.base ?? null,
      remoteVersion: existing?.remoteVersion ?? null,
      remoteCreatedAt: existing?.remoteCreatedAt ?? null,
      dirtyQuestionIds: [...dirtyQuestionIds].sort(),
      outboxState: 'pending',
      attempts: existing?.attempts ?? 0,
      nextAttemptAt: null,
      lastError: null,
      conflictWarning: existing?.conflictWarning ?? null,
      localRevision: (existing?.localRevision ?? 0) + 1,
      updatedAt: Date.now(),
    };

    await transaction.store.put(record);
    await transaction.done;
    return record;
  })();

  return trackWrite(write);
}

export interface StoreRemoteAnswerInput {
  profileId: string;
  documentId: string;
  document: AnswerDocument;
  remoteVersion: number;
  remoteCreatedAt: string | null;
  conflictWarning?: string | null;
}

export function storeRemoteAnswerDocument(input: StoreRemoteAnswerInput): Promise<boolean> {
  const write = (async () => {
    const database = await openOfflineDb();
    const transaction = database.transaction('responses', 'readwrite');
    const existing = await transaction.store.get(input.documentId);
    if (existing) {
      await transaction.done;
      return false;
    }
    await transaction.store.put({
      documentId: input.documentId,
      profileId: input.profileId,
      current: input.document,
      base: input.document,
      remoteVersion: input.remoteVersion,
      remoteCreatedAt: input.remoteCreatedAt,
      dirtyQuestionIds: [],
      outboxState: 'clean',
      attempts: 0,
      nextAttemptAt: null,
      lastError: null,
      conflictWarning: input.conflictWarning ?? null,
      localRevision: 0,
      updatedAt: Date.now(),
    });
    await transaction.done;
    return true;
  })();

  return trackWrite(write);
}

export async function listPendingAnswerRecords(profileId: string): Promise<LocalAnswerRecord[]> {
  return (await openOfflineDb()).getAllFromIndex('responses', 'by-profile-outbox', [profileId, 'pending']);
}

export async function listProfileAnswerRecords(profileId: string): Promise<LocalAnswerRecord[]> {
  return (await openOfflineDb()).getAllFromIndex('responses', 'by-profile', profileId);
}

export interface ProfileImportAnswer {
  documentId: string;
  document: AnswerDocument;
  dirtyQuestionIds: string[];
}

export interface SaveProfileImportInput {
  profileId: string;
  answers: ProfileImportAnswer[];
  expectedAnswers: Array<{
    documentId: string;
    localRevision: number;
    remoteVersion: number | null;
    updatedAt: number;
  }>;
  preferences: unknown;
  progress: unknown;
  progressDirtyFields: string[];
}

export class ProfileImportConflictError extends Error {}

export function saveProfileImport(input: SaveProfileImportInput): Promise<void> {
  const write = (async () => {
    const database = await openOfflineDb();
    const transaction = database.transaction(['responses', 'preferences', 'progress'], 'readwrite');
    const responses = transaction.objectStore('responses');
    const now = Date.now();
    const currentAnswers = await responses.index('by-profile').getAll(input.profileId);
    const expectedAnswers = new Map(
      input.expectedAnswers.map(({ documentId, ...state }) => [documentId, state]),
    );
    const answersChanged =
      currentAnswers.length !== expectedAnswers.size ||
      currentAnswers.some((record) => {
        const expected = expectedAnswers.get(record.documentId);
        return (
          !expected ||
          expected.localRevision !== record.localRevision ||
          expected.remoteVersion !== record.remoteVersion ||
          expected.updatedAt !== record.updatedAt
        );
      });
    if (answersChanged) {
      transaction.abort();
      await transaction.done.catch(() => undefined);
      throw new ProfileImportConflictError('As respostas locais mudaram durante a importação');
    }

    const importedExistingAnswers = new Map<string, LocalAnswerRecord | undefined>();
    for (const answer of input.answers) {
      const existing = await responses.get(answer.documentId);
      importedExistingAnswers.set(answer.documentId, existing);
      if (existing && existing.profileId !== input.profileId) {
        transaction.abort();
        await transaction.done.catch(() => undefined);
        throw new Error('O documento importado pertence a outro perfil local');
      }
      if (existing && existing.current.questionSetRevision > answer.document.questionSetRevision) {
        transaction.abort();
        await transaction.done.catch(() => undefined);
        throw new NewerQuestionSetRevisionError(
          existing.current.questionSetRevision,
          answer.document.questionSetRevision,
          'local',
        );
      }
    }

    for (const answer of input.answers) {
      const existing = importedExistingAnswers.get(answer.documentId);
      await responses.put({
        documentId: answer.documentId,
        profileId: input.profileId,
        current: answer.document,
        base: existing?.base ?? null,
        remoteVersion: existing?.remoteVersion ?? null,
        remoteCreatedAt: existing?.remoteCreatedAt ?? null,
        dirtyQuestionIds: [...new Set([...(existing?.dirtyQuestionIds ?? []), ...answer.dirtyQuestionIds])].sort(),
        outboxState: 'pending',
        attempts: existing?.attempts ?? 0,
        nextAttemptAt: null,
        lastError: null,
        conflictWarning: existing?.conflictWarning ?? null,
        localRevision: (existing?.localRevision ?? 0) + 1,
        updatedAt: now,
      });
    }

    const preferences = transaction.objectStore('preferences');
    const existingPreferences = await preferences.get(input.profileId);
    await preferences.put({
      profileId: input.profileId,
      current: input.preferences,
      base: existingPreferences?.base ?? null,
      remoteVersion: existingPreferences?.remoteVersion ?? null,
      remoteCreatedAt: existingPreferences?.remoteCreatedAt ?? null,
      dirtyFields: [
        ...new Set([
          ...(existingPreferences?.dirtyFields ?? []),
          'questionLayout',
          'correctionMode',
          'shuffleQuestions',
        ]),
      ].sort(),
      outboxState: 'pending',
      attempts: existingPreferences?.attempts ?? 0,
      lastError: null,
      conflictWarning: existingPreferences?.conflictWarning ?? null,
      localRevision: (existingPreferences?.localRevision ?? 0) + 1,
      updatedAt: now,
    });

    const progress = transaction.objectStore('progress');
    const existingProgress = await progress.get(input.profileId);
    await progress.put({
      profileId: input.profileId,
      current: input.progress,
      base: existingProgress?.base ?? null,
      remoteVersion: existingProgress?.remoteVersion ?? null,
      remoteCreatedAt: existingProgress?.remoteCreatedAt ?? null,
      dirtyFields: [
        ...new Set([...(existingProgress?.dirtyFields ?? []), ...input.progressDirtyFields]),
      ].sort(),
      outboxState: 'pending',
      attempts: existingProgress?.attempts ?? 0,
      lastError: null,
      conflictWarning: existingProgress?.conflictWarning ?? null,
      localRevision: (existingProgress?.localRevision ?? 0) + 1,
      updatedAt: now,
    });

    await transaction.done;
  })();

  return trackWrite(write);
}

export interface MarkAnswerSyncedInput {
  documentId: string;
  expectedLocalRevision: number;
  synchronizedDocument: AnswerDocument;
  remoteVersion: number;
  remoteCreatedAt: string | null;
  conflictWarning: string | null;
}

export function markAnswerSynced(input: MarkAnswerSyncedInput): Promise<void> {
  const write = (async () => {
    const database = await openOfflineDb();
    const transaction = database.transaction('responses', 'readwrite');
    const existing = await transaction.store.get(input.documentId);
    if (!existing) {
      await transaction.done;
      return;
    }

    const changedDuringRequest = existing.localRevision !== input.expectedLocalRevision;
    await transaction.store.put({
      ...existing,
      current: changedDuringRequest ? existing.current : input.synchronizedDocument,
      base: input.synchronizedDocument,
      remoteVersion: input.remoteVersion,
      remoteCreatedAt: input.remoteCreatedAt,
      dirtyQuestionIds: changedDuringRequest ? existing.dirtyQuestionIds : [],
      outboxState: changedDuringRequest ? 'pending' : 'clean',
      attempts: 0,
      nextAttemptAt: null,
      lastError: null,
      conflictWarning: input.conflictWarning,
      updatedAt: changedDuringRequest ? existing.updatedAt : Date.now(),
    });
    await transaction.done;
  })();

  return trackWrite(write);
}

export function markAnswerSyncError(documentId: string, message: string, nextAttemptAt: number | null): Promise<void> {
  const write = (async () => {
    const database = await openOfflineDb();
    const transaction = database.transaction('responses', 'readwrite');
    const existing = await transaction.store.get(documentId);
    if (existing) {
      await transaction.store.put({
        ...existing,
        attempts: existing.attempts + 1,
        nextAttemptAt,
        lastError: message,
      });
    }
    await transaction.done;
  })();

  return trackWrite(write);
}

export function acquireSyncLease(name: string, ownerId: string, ttlMs: number, now = Date.now()): Promise<boolean> {
  const write = (async () => {
    const database = await openOfflineDb();
    const transaction = database.transaction('leases', 'readwrite');
    const existing = await transaction.store.get(name);
    if (existing && existing.ownerId !== ownerId && existing.expiresAt > now) {
      await transaction.done;
      return false;
    }

    await transaction.store.put({ name, ownerId, expiresAt: now + ttlMs });
    await transaction.done;
    return true;
  })();

  return trackWrite(write);
}

export class SyncLeaseLostError extends Error {
  constructor() {
    super('Outra aba assumiu a coordenação da sincronização');
    this.name = 'SyncLeaseLostError';
  }
}

export async function renewSyncLease(
  name: string,
  ownerId: string,
  ttlMs: number,
  now = Date.now(),
): Promise<void> {
  const write = (async () => {
    const database = await openOfflineDb();
    const transaction = database.transaction('leases', 'readwrite');
    const existing = await transaction.store.get(name);
    if (!existing || existing.ownerId !== ownerId || existing.expiresAt <= now) {
      await transaction.done;
      throw new SyncLeaseLostError();
    }
    await transaction.store.put({ name, ownerId, expiresAt: now + ttlMs });
    await transaction.done;
  })();

  return trackWrite(write);
}

export function releaseSyncLease(name: string, ownerId: string): Promise<void> {
  const write = (async () => {
    const database = await openOfflineDb();
    const transaction = database.transaction('leases', 'readwrite');
    const existing = await transaction.store.get(name);
    if (existing?.ownerId === ownerId) await transaction.store.delete(name);
    await transaction.done;
  })();

  return trackWrite(write);
}

export function quarantineRemoteDocument(record: Omit<QuarantineRecord, 'id' | 'quarantinedAt'>): Promise<void> {
  const write = (async () => {
    const database = await openOfflineDb();
    const transaction = database.transaction('quarantine', 'readwrite');
    await transaction.store.add({ ...record, quarantinedAt: Date.now() });
    await transaction.done;
  })();

  return trackWrite(write);
}

export async function hasPendingOutbox(profileId: string): Promise<boolean> {
  const database = await openOfflineDb();
  const [answerCount, preferences, progress] = await Promise.all([
    database.countFromIndex('responses', 'by-profile-outbox', [profileId, 'pending']),
    database.get('preferences', profileId),
    database.get('progress', profileId),
  ]);
  return answerCount > 0 || preferences?.outboxState === 'pending' || progress?.outboxState === 'pending';
}

export function discardPendingProfile(profileId: string): Promise<void> {
  const write = (async () => {
    const database = await openOfflineDb();
    const pending = await listPendingAnswerRecords(profileId);
    const transaction = database.transaction('responses', 'readwrite');

    for (const record of pending) {
      if (!record.base) {
        await transaction.store.delete(record.documentId);
        continue;
      }

      await transaction.store.put({
        ...record,
        current: record.base,
        dirtyQuestionIds: [],
        outboxState: 'clean',
        attempts: 0,
        nextAttemptAt: null,
        lastError: null,
        conflictWarning: null,
        localRevision: record.localRevision + 1,
        updatedAt: Date.now(),
      });
    }

    await transaction.done;

    for (const storeName of ['preferences', 'progress'] as const) {
      const sharedTransaction = database.transaction(storeName, 'readwrite');
      const shared = await sharedTransaction.store.get(profileId);
      if (shared?.outboxState === 'pending') {
        if (shared.base === null) {
          await sharedTransaction.store.delete(profileId);
        } else {
          await sharedTransaction.store.put({
            ...shared,
            current: shared.base,
            dirtyFields: [],
            outboxState: 'clean',
            attempts: 0,
            lastError: null,
            conflictWarning: null,
            localRevision: shared.localRevision + 1,
            updatedAt: Date.now(),
          });
        }
      }
      await sharedTransaction.done;
    }
  })();

  return trackWrite(write);
}

export async function whenLocalWritesSettled(): Promise<void> {
  const failures: unknown[] = [];
  while (pendingWrites.size > 0) {
    const results = await Promise.allSettled([...pendingWrites]);
    for (const result of results) {
      if (result.status === 'rejected') failures.push(result.reason);
    }
  }
  if (failures.length > 0) throw new AggregateError(failures, 'Uma ou mais gravações locais falharam.');
}

export async function deleteOfflineDatabase(): Promise<void> {
  if (databasePromise) {
    const database = await databasePromise;
    database.close();
    databasePromise = undefined;
  }
  await deleteDB(OFFLINE_DB_NAME);
}
