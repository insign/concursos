import { deleteDB, openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { NavigationDocument } from './navigation';

export const NAVIGATION_DB_NAME = 'concursos-navigation';
const NAVIGATION_DB_VERSION = 1;

export interface LocalNavigationRecord {
  profileId: string;
  current: NavigationDocument;
  base: NavigationDocument | null;
  remoteVersion: number | null;
  remoteCreatedAt: string | null;
  outboxState: 'clean' | 'pending';
  attempts: number;
  lastError: string | null;
  conflictWarning: string | null;
  localRevision: number;
  updatedAt: number;
}

interface NavigationDbSchema extends DBSchema {
  navigation: {
    key: string;
    value: LocalNavigationRecord;
  };
}

let databasePromise: Promise<IDBPDatabase<NavigationDbSchema>> | undefined;
const pendingWrites = new Set<Promise<unknown>>();

function trackWrite<T>(write: Promise<T>): Promise<T> {
  pendingWrites.add(write);
  void write.finally(() => pendingWrites.delete(write)).catch(() => undefined);
  return write;
}

export function openNavigationDb(): Promise<IDBPDatabase<NavigationDbSchema>> {
  databasePromise ??= openDB<NavigationDbSchema>(NAVIGATION_DB_NAME, NAVIGATION_DB_VERSION, {
    upgrade(database) {
      if (!database.objectStoreNames.contains('navigation')) {
        database.createObjectStore('navigation', { keyPath: 'profileId' });
      }
    },
  });
  return databasePromise;
}

export async function getNavigationRecord(profileId: string): Promise<LocalNavigationRecord | undefined> {
  return (await openNavigationDb()).get('navigation', profileId);
}

export function saveNavigationDocument(
  profileId: string,
  document: NavigationDocument,
): Promise<LocalNavigationRecord> {
  const write = (async () => {
    const database = await openNavigationDb();
    const transaction = database.transaction('navigation', 'readwrite');
    const existing = await transaction.store.get(profileId);
    const record: LocalNavigationRecord = {
      profileId,
      current: document,
      base: existing?.base ?? null,
      remoteVersion: existing?.remoteVersion ?? null,
      remoteCreatedAt: existing?.remoteCreatedAt ?? null,
      outboxState: 'pending',
      attempts: existing?.attempts ?? 0,
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

export interface MarkNavigationSyncedInput {
  profileId: string;
  expectedLocalRevision: number;
  synchronizedDocument: NavigationDocument;
  remoteVersion: number;
  remoteCreatedAt: string | null;
  conflictWarning?: string | null;
}

export function markNavigationSynced(input: MarkNavigationSyncedInput): Promise<void> {
  const write = (async () => {
    const database = await openNavigationDb();
    const transaction = database.transaction('navigation', 'readwrite');
    const existing = await transaction.store.get(input.profileId);
    const changedDuringRequest = existing !== undefined && existing.localRevision !== input.expectedLocalRevision;
    if (!existing && input.expectedLocalRevision !== 0) {
      await transaction.done;
      return;
    }
    await transaction.store.put({
      profileId: input.profileId,
      current: changedDuringRequest ? existing.current : input.synchronizedDocument,
      base: input.synchronizedDocument,
      remoteVersion: input.remoteVersion,
      remoteCreatedAt: input.remoteCreatedAt,
      outboxState: changedDuringRequest ? 'pending' : 'clean',
      attempts: 0,
      lastError: null,
      conflictWarning: input.conflictWarning ?? null,
      localRevision: existing?.localRevision ?? 0,
      updatedAt: changedDuringRequest ? existing.updatedAt : Date.now(),
    });
    await transaction.done;
  })();
  return trackWrite(write);
}

export function markNavigationSyncError(profileId: string, message: string): Promise<void> {
  const write = (async () => {
    const database = await openNavigationDb();
    const transaction = database.transaction('navigation', 'readwrite');
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

export async function hasPendingNavigation(profileId: string): Promise<boolean> {
  return (await getNavigationRecord(profileId))?.outboxState === 'pending';
}

export function discardPendingNavigation(profileId: string): Promise<void> {
  const write = (async () => {
    const database = await openNavigationDb();
    const transaction = database.transaction('navigation', 'readwrite');
    const existing = await transaction.store.get(profileId);
    if (existing?.outboxState === 'pending') {
      if (!existing.base) {
        await transaction.store.delete(profileId);
      } else {
        await transaction.store.put({
          ...existing,
          current: existing.base,
          outboxState: 'clean',
          attempts: 0,
          lastError: null,
          conflictWarning: null,
          localRevision: existing.localRevision + 1,
          updatedAt: Date.now(),
        });
      }
    }
    await transaction.done;
  })();
  return trackWrite(write);
}

export async function whenNavigationWritesSettled(): Promise<void> {
  const failures: unknown[] = [];
  while (pendingWrites.size > 0) {
    const results = await Promise.allSettled([...pendingWrites]);
    for (const result of results) if (result.status === 'rejected') failures.push(result.reason);
  }
  if (failures.length > 0) throw new AggregateError(failures, 'Falha ao persistir a navegação local.');
}

export async function deleteNavigationDatabase(): Promise<void> {
  if (databasePromise) {
    const database = await databasePromise;
    database.close();
    databasePromise = undefined;
  }
  await deleteDB(NAVIGATION_DB_NAME);
}
