import { deleteDB, openDB, type DBSchema, type IDBPDatabase } from 'idb';
import { normalizeNavigationDocument, type NavigationDocument } from './navigation';

export const NAVIGATION_DB_NAME = 'concursos-navigation';
const NAVIGATION_DB_VERSION = 1;
const RETRY_BASE_MS = 5_000;
const RETRY_MAX_MS = 60_000;

export interface LocalNavigationRecord {
  profileId: string;
  current: NavigationDocument;
  base: NavigationDocument | null;
  remoteVersion: number | null;
  remoteCreatedAt: string | null;
  outboxState: 'clean' | 'pending';
  attempts: number;
  nextAttemptAt: number | null;
  lastError: string | null;
  conflictWarning: string | null;
  rejectedRemoteVersion: number | null;
  rejectedRemoteCreatedAt: string | null;
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
  const record = await (await openNavigationDb()).get('navigation', profileId);
  if (!record) return undefined;
  return {
    ...record,
    current: normalizeNavigationDocument(record.current),
    base: record.base ? normalizeNavigationDocument(record.base) : null,
  };
}

export function saveNavigationDocument(
  profileId: string,
  document: NavigationDocument,
): Promise<LocalNavigationRecord>;
export function saveNavigationDocument(
  profileId: string,
  document: NavigationDocument,
  canCommit: () => boolean,
): Promise<LocalNavigationRecord | undefined>;
export function saveNavigationDocument(
  profileId: string,
  document: NavigationDocument,
  canCommit?: () => boolean,
): Promise<LocalNavigationRecord | undefined> {
  const write = (async () => {
    const database = await openNavigationDb();
    const transaction = database.transaction('navigation', 'readwrite');
    const existing = await transaction.store.get(profileId);
    const record: LocalNavigationRecord = {
      profileId,
      current: document,
      base: existing?.base ? normalizeNavigationDocument(existing.base) : null,
      remoteVersion: existing?.remoteVersion ?? null,
      remoteCreatedAt: existing?.remoteCreatedAt ?? null,
      outboxState: 'pending',
      attempts: 0,
      nextAttemptAt: null,
      lastError: null,
      conflictWarning: existing?.conflictWarning ?? null,
      rejectedRemoteVersion: existing?.rejectedRemoteVersion ?? null,
      rejectedRemoteCreatedAt: existing?.rejectedRemoteCreatedAt ?? null,
      localRevision: (existing?.localRevision ?? 0) + 1,
      updatedAt: Date.now(),
    };
    if (canCommit && !canCommit()) {
      await transaction.done;
      return undefined;
    }
    await transaction.store.put(record);
    await transaction.done;
    return record;
  })();
  return trackWrite(write);
}

export interface MarkNavigationSyncedInput {
  profileId: string;
  expectedLocalRevision: number;
  expectedRemoteVersion: number | null;
  expectedRemoteCreatedAt: string | null;
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
    const remoteStateChanged =
      (existing?.remoteVersion ?? null) !== input.expectedRemoteVersion ||
      (existing?.remoteCreatedAt ?? null) !== input.expectedRemoteCreatedAt;

    if ((!existing && input.expectedLocalRevision !== 0) || remoteStateChanged) {
      await transaction.done;
      return;
    }

    const synchronizedDocument = normalizeNavigationDocument(input.synchronizedDocument);
    await transaction.store.put({
      profileId: input.profileId,
      current: changedDuringRequest ? normalizeNavigationDocument(existing.current) : synchronizedDocument,
      base: synchronizedDocument,
      remoteVersion: input.remoteVersion,
      remoteCreatedAt: input.remoteCreatedAt,
      outboxState: changedDuringRequest ? 'pending' : 'clean',
      attempts: 0,
      nextAttemptAt: null,
      lastError: null,
      conflictWarning: input.conflictWarning ?? null,
      rejectedRemoteVersion: null,
      rejectedRemoteCreatedAt: null,
      localRevision: existing?.localRevision ?? 0,
      updatedAt: changedDuringRequest ? existing.updatedAt : Date.now(),
    });
    await transaction.done;
  })();
  return trackWrite(write);
}

export function markNavigationRemoteRejected(
  profileId: string,
  remoteVersion: number,
  remoteCreatedAt: string | null,
): Promise<boolean> {
  const write = (async () => {
    const database = await openNavigationDb();
    const transaction = database.transaction('navigation', 'readwrite');
    const existing = await transaction.store.get(profileId);
    if (!existing) {
      await transaction.done;
      return true;
    }

    const repeated =
      existing.rejectedRemoteVersion === remoteVersion &&
      (existing.rejectedRemoteCreatedAt ?? null) === remoteCreatedAt;

    if (!repeated) {
      await transaction.store.put({
        ...existing,
        rejectedRemoteVersion: remoteVersion,
        rejectedRemoteCreatedAt: remoteCreatedAt,
      });
    }
    await transaction.done;
    return !repeated;
  })();
  return trackWrite(write);
}

export function markNavigationSyncError(
  profileId: string,
  message: string,
  now = Date.now(),
): Promise<void> {
  const write = (async () => {
    const database = await openNavigationDb();
    const transaction = database.transaction('navigation', 'readwrite');
    const existing = await transaction.store.get(profileId);
    if (existing) {
      const attempts = (existing.attempts ?? 0) + 1;
      const delay = Math.min(RETRY_MAX_MS, RETRY_BASE_MS * 2 ** Math.max(0, attempts - 1));
      await transaction.store.put({
        ...existing,
        attempts,
        nextAttemptAt: now + delay,
        lastError: message,
      });
    }
    await transaction.done;
  })();
  return trackWrite(write);
}

export async function shouldDeferNavigationSync(
  profileId: string,
  now = Date.now(),
): Promise<boolean> {
  const record = await getNavigationRecord(profileId);
  return (record?.nextAttemptAt ?? 0) > now;
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
          current: normalizeNavigationDocument(existing.base),
          outboxState: 'clean',
          attempts: 0,
          nextAttemptAt: null,
          lastError: null,
          conflictWarning: null,
          rejectedRemoteVersion: null,
          rejectedRemoteCreatedAt: null,
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
