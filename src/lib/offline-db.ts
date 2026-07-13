import { deleteDB, openDB, type DBSchema, type IDBPDatabase } from 'idb';
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
  updatedAt: number;
}

export interface LocalSharedDocumentRecord {
  profileId: string;
  current: unknown;
  base: unknown;
  remoteVersion: number | null;
  remoteCreatedAt: string | null;
  outboxState: OutboxState;
  updatedAt: number;
}

export interface OfflineContestRecord {
  contestStorageId: string;
  manifestHash: string;
  activeCacheName: string;
  downloadedAt: number;
  resourceCount: number;
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

export async function loadAnswerDocument(documentId: string): Promise<AnswerDocument | null> {
  return (await getLocalAnswerRecord(documentId))?.current ?? null;
}

export interface SaveAnswerSnapshot {
  profileId: string;
  documentId: string;
  document: AnswerDocument;
  dirtyQuestionIds?: string[];
}

export function saveAnswerDocumentSnapshot(input: SaveAnswerSnapshot): Promise<LocalAnswerRecord> {
  const write = (async () => {
    const database = await openOfflineDb();
    const transaction = database.transaction('responses', 'readwrite');
    const existing = await transaction.store.get(input.documentId);
    const dirtyQuestionIds = new Set(existing?.dirtyQuestionIds ?? []);
    for (const questionId of input.dirtyQuestionIds ?? []) dirtyQuestionIds.add(questionId);

    const record: LocalAnswerRecord = {
      documentId: input.documentId,
      profileId: input.profileId,
      current: input.document,
      base: existing?.base ?? null,
      remoteVersion: existing?.remoteVersion ?? null,
      remoteCreatedAt: existing?.remoteCreatedAt ?? null,
      dirtyQuestionIds: [...dirtyQuestionIds].sort(),
      outboxState: 'pending',
      attempts: existing?.attempts ?? 0,
      nextAttemptAt: null,
      lastError: null,
      conflictWarning: existing?.conflictWarning ?? null,
      updatedAt: Date.now(),
    };

    await transaction.store.put(record);
    await transaction.done;
    return record;
  })();

  return trackWrite(write);
}

export async function listPendingAnswerRecords(profileId: string): Promise<LocalAnswerRecord[]> {
  return (await openOfflineDb()).getAllFromIndex('responses', 'by-profile-outbox', [profileId, 'pending']);
}

export async function hasPendingOutbox(profileId: string): Promise<boolean> {
  return (await openOfflineDb()).countFromIndex('responses', 'by-profile-outbox', [profileId, 'pending']).then(
    (count) => count > 0,
  );
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
        updatedAt: Date.now(),
      });
    }

    await transaction.done;
  })();

  return trackWrite(write);
}

export async function whenLocalWritesSettled(): Promise<void> {
  await Promise.allSettled([...pendingWrites]);
}

export async function deleteOfflineDatabase(): Promise<void> {
  if (databasePromise) {
    const database = await databasePromise;
    database.close();
    databasePromise = undefined;
  }
  await deleteDB(OFFLINE_DB_NAME);
}
