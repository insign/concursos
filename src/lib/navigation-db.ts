import { deleteDB, openDB, type DBSchema, type IDBPDatabase } from 'idb';
import {
  clearContestPoint,
  contestShardRecordId,
  isResumablePoint,
  mergeContestDocuments,
  normalizeContestDocument,
  normalizeNavigationDocument,
  upsertContestPoint,
  type NavigationContestDocument,
  type NavigationDocument,
} from './navigation';

export const NAVIGATION_DB_NAME = 'concursos-navigation';
const NAVIGATION_DB_VERSION = 2;

const RETRY_BASE_MS = 5_000;
const RETRY_MAX_MS = 60_000;

export interface LocalNavigationContestRecord {
  recordId: string;
  profileId: string;
  contestStorageId: string;
  current: NavigationContestDocument;
  base: NavigationContestDocument | null;
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
    value: {
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
    };
  };
  navigationContests: {
    key: string;
    value: LocalNavigationContestRecord;
    indexes: { 'by-profile': string };
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
      if (!database.objectStoreNames.contains('navigationContests')) {
        const store = database.createObjectStore('navigationContests', { keyPath: 'recordId' });
        store.createIndex('by-profile', 'profileId', { unique: false });
      }
    },
    blocking() {
      void databasePromise?.then((database) => database.close()).catch(() => undefined);
      databasePromise = undefined;
    },
    terminated() {
      databasePromise = undefined;
    },
  });
  return databasePromise;
}

function normalizeRecord(
  record: LocalNavigationContestRecord,
): LocalNavigationContestRecord {
  return { ...record, current: normalizeContestDocument(record.current) };
}

/**
 * Migração one-shot do registro único legado: converte o ponto atual em
 * entrada do shard do concurso e remove a linha antiga. Idempotente.
 */
async function migrateLegacyNavigationOnce(profileId: string): Promise<void> {
  const database = await openNavigationDb();
  if (!database.objectStoreNames.contains('navigation')) return;
  const transaction = database.transaction(['navigation', 'navigationContests'], 'readwrite');
  const legacy = await transaction.objectStore('navigation').get(profileId);
  if (!legacy) {
    await transaction.done;
    return;
  }
  try {
    const current = normalizeNavigationDocument(legacy.current);
    const contestStorageId = current.context.contestStorageId;
    if (contestStorageId && isResumablePoint(current)) {
      const recordId = contestShardRecordId(profileId, contestStorageId);
      const existing = await transaction.objectStore('navigationContests').get(recordId);
      if (!existing) {
        const shard = upsertContestPoint(null, { ...current, context: { ...current.context } });
        const fixed: NavigationContestDocument = {
          ...shard,
          contestStorageId,
        };
        await transaction.objectStore('navigationContests').put({
          recordId,
          profileId,
          contestStorageId,
          current: normalizeContestDocument(fixed),
          base: null,
          remoteVersion: null,
          remoteCreatedAt: null,
          outboxState: 'pending',
          attempts: 0,
          nextAttemptAt: null,
          lastError: null,
          conflictWarning: null,
          rejectedRemoteVersion: null,
          rejectedRemoteCreatedAt: null,
          localRevision: 1,
          updatedAt: Date.now(),
        });
      }
    }
  } catch {
    // Linha legada inválida: apenas a remove para não bloquear o novo modelo.
  }
  await transaction.objectStore('navigation').delete(profileId);
  await transaction.done;
}

export async function getNavigationContestRecord(
  profileId: string,
  contestStorageId: string,
): Promise<LocalNavigationContestRecord | undefined> {
  await migrateLegacyNavigationOnce(profileId);
  const record = await (await openNavigationDb()).get(
    'navigationContests',
    contestShardRecordId(profileId, contestStorageId),
  );
  return record ? normalizeRecord(record) : undefined;
}

export async function listNavigationContestRecords(
  profileId: string,
): Promise<LocalNavigationContestRecord[]> {
  await migrateLegacyNavigationOnce(profileId);
  const records = await (await openNavigationDb()).getAllFromIndex(
    'navigationContests',
    'by-profile',
    profileId,
  );
  return records.map(normalizeRecord);
}

export async function listPendingNavigationContestRecords(
  profileId: string,
): Promise<LocalNavigationContestRecord[]> {
  return (await listNavigationContestRecords(profileId)).filter(
    (record) => record.outboxState === 'pending',
  );
}

/** Encontra ponto ou cursor pela rota (restauração pendente; ignora cursor invalidado). */
export async function findNavigationByRoute(
  profileId: string,
  route: string,
): Promise<NavigationDocument | null> {
  for (const record of await listNavigationContestRecords(profileId)) {
    for (const point of Object.values(record.current.points)) {
      if (point.route === route) return point;
    }
    const cursor = record.current.cursor;
    const cursorSubject = cursor?.context.subjectStorageId ?? null;
    if (
      cursor?.route === route &&
      cursor.context.contestStorageId === record.current.contestStorageId &&
      !(cursorSubject && record.current.cleared[cursorSubject] && record.current.cleared[cursorSubject] >= cursor.updatedAt)
    ) {
      return cursor;
    }
  }
  return null;
}

/**
 * Substitui o shard sem mesclar (usado quando a recriação remota é deliberada):
 * descarta a linhagem antiga e marca pendente para publicar o documento filtrado.
 * Aborta se a revisão local ou a linhagem remota mudarem durante a preparação.
 */
export function adoptNavigationShard(
  profileId: string,
  contestStorageId: string,
  shard: NavigationContestDocument,
  expected: { localRevision: number; remoteVersion: number | null; remoteCreatedAt: string | null },
): Promise<LocalNavigationContestRecord | undefined> {
  const write = (async () => {
    await migrateLegacyNavigationOnce(profileId);
    const database = await openNavigationDb();
    const transaction = database.transaction('navigationContests', 'readwrite');
    const recordId = contestShardRecordId(profileId, contestStorageId);
    const existing = await transaction.store.get(recordId);
    const changedDuringPreparation =
      (existing?.localRevision ?? 0) !== expected.localRevision ||
      (existing?.remoteVersion ?? null) !== expected.remoteVersion ||
      (existing?.remoteCreatedAt ?? null) !== expected.remoteCreatedAt;
    if (changedDuringPreparation) {
      // Captura/limpeza concorrente: preserva o registro e deixa o reparo para a próxima rodada.
      await transaction.done;
      return undefined;
    }
    const current = normalizeContestDocument({ ...shard, contestStorageId });
    const record: LocalNavigationContestRecord = {
      recordId,
      profileId,
      contestStorageId,
      current,
      base: null,
      remoteVersion: null,
      remoteCreatedAt: null,
      outboxState: 'pending',
      attempts: 0,
      nextAttemptAt: null,
      lastError: null,
      conflictWarning: existing?.conflictWarning ?? null,
      rejectedRemoteVersion: null,
      rejectedRemoteCreatedAt: null,
      localRevision: (existing?.localRevision ?? 0) + 1,
      updatedAt: Date.now(),
    };
    await transaction.store.put(record);
    await transaction.done;
    return record;
  })();
  return trackWrite(write);
}

export function saveNavigationShard(
  profileId: string,
  contestStorageId: string,
  shard: NavigationContestDocument,
  canCommit?: () => boolean,
): Promise<LocalNavigationContestRecord | undefined> {
  const write = (async () => {
    await migrateLegacyNavigationOnce(profileId);
    const database = await openNavigationDb();
    const transaction = database.transaction('navigationContests', 'readwrite');
    const recordId = contestShardRecordId(profileId, contestStorageId);
    const existing = await transaction.store.get(recordId);
    const normalizedIncoming = normalizeContestDocument({
      ...shard,
      contestStorageId,
    });
    const merged = existing
      ? mergeContestDocuments(
        normalizeContestDocument({ ...existing.current, contestStorageId }),
        normalizedIncoming,
      )
      : normalizedIncoming;
    if (existing) {
      const existingNormalized = normalizeContestDocument({
        ...existing.current,
        contestStorageId,
      });
      const same =
        JSON.stringify(existingNormalized.points) === JSON.stringify(merged.points) &&
        JSON.stringify(existingNormalized.cleared) === JSON.stringify(merged.cleared) &&
        JSON.stringify(existingNormalized.cursor) === JSON.stringify(merged.cursor);
      if (same) {
        await transaction.done;
        return undefined;
      }
    }
    const record: LocalNavigationContestRecord = {
      recordId,
      profileId,
      contestStorageId,
      current: merged,
      base: existing?.base ? normalizeContestDocument({ ...existing.base, contestStorageId }) : null,
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

export function clearContestReadingPosition(
  profileId: string,
  contestStorageId: string,
  subjectStorageId: string,
  now = new Date(),
): Promise<LocalNavigationContestRecord | undefined> {
  const write = (async () => {
    await migrateLegacyNavigationOnce(profileId);
    const database = await openNavigationDb();
    const transaction = database.transaction('navigationContests', 'readwrite');
    const recordId = contestShardRecordId(profileId, contestStorageId);
    const existing = await transaction.store.get(recordId);
    const base = existing
      ? normalizeContestDocument({ ...existing.current, contestStorageId })
      : null;
    // No-op só quando já invalidado e o cursor do assunto não avançou além da lápide.
    const cursorAdvanced =
      base?.cursor?.context.subjectStorageId === subjectStorageId &&
      base.cursor.updatedAt > (base.cleared[subjectStorageId] ?? '');
    if (base && !base.points[subjectStorageId] && base.cleared[subjectStorageId] && !cursorAdvanced) {
      await transaction.done;
      return undefined;
    }
    const cleared = clearContestPoint(base, contestStorageId, subjectStorageId, now);
    const record: LocalNavigationContestRecord = {
      recordId,
      profileId,
      contestStorageId,
      current: cleared,
      base: existing?.base
        ? normalizeContestDocument({ ...existing.base, contestStorageId })
        : null,
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
    await transaction.store.put(record);
    await transaction.done;
    return record;
  })();
  return trackWrite(write);
}

export interface MarkNavigationShardSyncedInput {
  profileId: string;
  contestStorageId: string;
  expectedLocalRevision: number;
  expectedRemoteVersion: number | null;
  expectedRemoteCreatedAt: string | null;
  synchronizedDocument: NavigationContestDocument;
  remoteVersion: number;
  remoteCreatedAt: string | null;
  conflictWarning?: string | null;
}

export function markNavigationShardSynced(
  input: MarkNavigationShardSyncedInput,
): Promise<void> {
  const write = (async () => {
    const database = await openNavigationDb();
    const transaction = database.transaction('navigationContests', 'readwrite');
    const recordId = contestShardRecordId(input.profileId, input.contestStorageId);
    const existing = await transaction.store.get(recordId);
    const changedDuringRequest =
      existing !== undefined && existing.localRevision !== input.expectedLocalRevision;
    const remoteStateChanged =
      (existing?.remoteVersion ?? null) !== input.expectedRemoteVersion ||
      (existing?.remoteCreatedAt ?? null) !== input.expectedRemoteCreatedAt;

    if ((!existing && input.expectedLocalRevision !== 0) || remoteStateChanged) {
      await transaction.done;
      return;
    }

    const synchronizedDocument = normalizeContestDocument(input.synchronizedDocument);
    await transaction.store.put({
      recordId,
      profileId: input.profileId,
      contestStorageId: input.contestStorageId,
      current: changedDuringRequest
        ? mergeContestDocuments(
          normalizeContestDocument({ ...existing.current, contestStorageId: input.contestStorageId }),
          synchronizedDocument,
        )
        : synchronizedDocument,
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

export function markNavigationShardRemoteRejected(
  profileId: string,
  contestStorageId: string,
  remoteVersion: number,
  remoteCreatedAt: string | null,
): Promise<boolean> {
  const write = (async () => {
    const database = await openNavigationDb();
    const transaction = database.transaction('navigationContests', 'readwrite');
    const existing = await transaction.store.get(contestShardRecordId(profileId, contestStorageId));
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

export function markNavigationShardSyncError(
  profileId: string,
  contestStorageId: string,
  message: string,
  now = Date.now(),
): Promise<void> {
  const write = (async () => {
    const database = await openNavigationDb();
    const transaction = database.transaction('navigationContests', 'readwrite');
    const existing = await transaction.store.get(contestShardRecordId(profileId, contestStorageId));
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

export async function shouldDeferNavigationShardSync(
  profileId: string,
  contestStorageId: string,
  now = Date.now(),
): Promise<boolean> {
  const record = await getNavigationContestRecord(profileId, contestStorageId);
  return (record?.nextAttemptAt ?? 0) > now;
}

export async function hasPendingNavigation(profileId: string): Promise<boolean> {
  return (await listPendingNavigationContestRecords(profileId)).length > 0;
}

export function discardPendingNavigation(profileId: string): Promise<void> {
  const write = (async () => {
    await migrateLegacyNavigationOnce(profileId);
    const database = await openNavigationDb();
    const transaction = database.transaction('navigationContests', 'readwrite');
    const records = await transaction.store.index('by-profile').getAll(profileId);
    for (const existing of records) {
      if (existing.outboxState !== 'pending') continue;
      if (!existing.base) {
        await transaction.store.delete(existing.recordId);
      } else {
        await transaction.store.put({
          ...existing,
          current: normalizeContestDocument(existing.base),
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
