import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import 'fake-indexeddb/auto';
import {
  clearContestReadingPosition,
  deleteNavigationDatabase,
  discardPendingNavigation,
  findNavigationByRoute,
  getNavigationContestRecord,
  hasPendingNavigation,
  listNavigationContestRecords,
  listPendingNavigationContestRecords,
  markNavigationShardRemoteRejected,
  markNavigationShardSynced,
  markNavigationShardSyncError,
  NAVIGATION_DB_NAME,
  openNavigationDb,
  saveNavigationShard,
  shouldDeferNavigationShardSync,
} from '../../src/lib/navigation-db';
import {
  createContestDocument,
  createNavigationDocument,
  upsertContestPoint,
  type NavigationContext,
} from '../../src/lib/navigation';

const profileId = 'navegacao-2026-teste';
const contestStorageId = 'tcema-2026-adm';
const context: NavigationContext = {
  contestStorageId,
  groupId: 'portugues',
  subjectStorageId: 'interpretacao-textos',
  questionId: null,
  activeTab: 'content',
  readingMode: true,
  questionOrigin: null,
  questionLayout: null,
  shuffleQuestions: null,
};

function makeReadingDocument(
  subjectStorageId = 'interpretacao-textos',
  progress = 0.5,
  contest = contestStorageId,
) {
  return createNavigationDocument(
    `/concursos/tce-ma-2026/${subjectStorageId}/`,
    { ...context, readingMode: false, contestStorageId: contest, subjectStorageId },
    {
      contentVersion: null,
      sectionId: null,
      blockId: null,
      blockIndex: 4,
      relativeOffset: 0,
      textQuote: '',
      progress,
    },
    new Date('2026-07-25T00:00:00.000Z'),
  );
}

function makeShard(subjectStorageId = 'interpretacao-textos', progress = 0.5, contest = contestStorageId) {
  return upsertContestPoint(null, makeReadingDocument(subjectStorageId, progress, contest));
}

beforeEach(async () => {
  await deleteNavigationDatabase();
});

afterEach(async () => {
  await deleteNavigationDatabase();
});

describe('navigation contest outbox', () => {
  it('persists a new contest shard before synchronization', async () => {
    const record = await saveNavigationShard(profileId, contestStorageId, makeShard());
    expect(record?.localRevision).toBe(1);
    expect(record?.outboxState).toBe('pending');
    expect(await hasPendingNavigation(profileId)).toBe(true);
  });

  it('merges points from concurrent saves instead of overwriting them', async () => {
    await saveNavigationShard(profileId, contestStorageId, makeShard('assunto-a', 0.4));
    await saveNavigationShard(profileId, contestStorageId, makeShard('assunto-b', 0.7));
    const record = await getNavigationContestRecord(profileId, contestStorageId);
    expect(Object.keys(record?.current.points ?? {}).sort()).toEqual(['assunto-a', 'assunto-b']);
  });

  it('is a no-op when the shard did not advance', async () => {
    await saveNavigationShard(profileId, contestStorageId, makeShard());
    const second = await saveNavigationShard(profileId, contestStorageId, makeShard());
    expect(second).toBeUndefined();
    expect((await getNavigationContestRecord(profileId, contestStorageId))?.localRevision).toBe(1);
  });

  it('marks the synchronized snapshot as clean', async () => {
    const saved = await saveNavigationShard(profileId, contestStorageId, makeShard());
    await markNavigationShardSynced({
      profileId,
      contestStorageId,
      expectedLocalRevision: saved!.localRevision,
      expectedRemoteVersion: null,
      expectedRemoteCreatedAt: null,
      synchronizedDocument: saved!.current,
      remoteVersion: 4,
      remoteCreatedAt: '2026-07-25T00:00:00.000Z',
    });

    const record = await getNavigationContestRecord(profileId, contestStorageId);
    expect(record?.outboxState).toBe('clean');
    expect(record?.remoteVersion).toBe(4);
    expect(await hasPendingNavigation(profileId)).toBe(false);
  });

  it('clears a single subject as a tombstone and keeps siblings', async () => {
    const withTwo = upsertContestPoint(makeShard('assunto-a', 0.4), makeReadingDocument('assunto-b', 0.7));
    const saved = await saveNavigationShard(profileId, contestStorageId, withTwo);
    await markNavigationShardSynced({
      profileId,
      contestStorageId,
      expectedLocalRevision: saved!.localRevision,
      expectedRemoteVersion: null,
      expectedRemoteCreatedAt: null,
      synchronizedDocument: saved!.current,
      remoteVersion: 4,
      remoteCreatedAt: '2026-07-25T00:00:00.000Z',
    });

    const cleared = await clearContestReadingPosition(profileId, contestStorageId, 'assunto-a');
    expect(cleared).toMatchObject({
      remoteVersion: 4,
      outboxState: 'pending',
      localRevision: 2,
    });
    expect(Object.keys(cleared!.current.points)).toEqual(['assunto-b']);
    expect(cleared!.current.cleared['assunto-a']).toBeTruthy();
    expect(await clearContestReadingPosition(profileId, contestStorageId, 'assunto-a')).toBeUndefined();
  });

  it('finds points and cursor by route for pending restores', async () => {
    await saveNavigationShard(profileId, contestStorageId, makeShard('assunto-a', 0.4));
    const found = await findNavigationByRoute(
      profileId,
      '/concursos/tce-ma-2026/assunto-a/',
    );
    expect(found?.context.subjectStorageId).toBe('assunto-a');
    expect(await findNavigationByRoute(profileId, '/inexistente/')).toBeNull();
  });

  it('deduplicates rejected remote versions and applies retry backoff per contest', async () => {
    await saveNavigationShard(profileId, contestStorageId, makeShard());

    expect(
      await markNavigationShardRemoteRejected(profileId, contestStorageId, 7, '2026-07-25T00:00:00.000Z'),
    ).toBe(true);
    expect(
      await markNavigationShardRemoteRejected(profileId, contestStorageId, 7, '2026-07-25T00:00:00.000Z'),
    ).toBe(false);

    await markNavigationShardSyncError(profileId, contestStorageId, 'Documento inválido', 1_000);
    const record = await getNavigationContestRecord(profileId, contestStorageId);
    expect(record?.attempts).toBe(1);
    expect(record?.nextAttemptAt).toBe(6_000);
    expect(await shouldDeferNavigationShardSync(profileId, contestStorageId, 5_999)).toBe(true);
    expect(await shouldDeferNavigationShardSync(profileId, contestStorageId, 6_000)).toBe(false);
  });

  it('tracks pending and discard across contests independently', async () => {
    await saveNavigationShard(profileId, contestStorageId, makeShard());
    await saveNavigationShard(
      profileId,
      'outro-concurso',
      makeShard('interpretacao-textos', 0.5, 'outro-concurso'),
    );
    expect((await listPendingNavigationContestRecords(profileId)).length).toBe(2);
    expect((await listNavigationContestRecords(profileId)).length).toBe(2);
    await discardPendingNavigation(profileId);
    expect(await listNavigationContestRecords(profileId)).toEqual([]);
    expect(await hasPendingNavigation(profileId)).toBe(false);
  });

  it('migrates a legacy single record into its contest shard once', async () => {
    const { openDB } = await import('idb');
    const legacy = await openDB(NAVIGATION_DB_NAME, 1, {
      upgrade(database) {
        database.createObjectStore('navigation', { keyPath: 'profileId' });
      },
    });
    await legacy.put('navigation', {
      profileId,
      current: makeReadingDocument(),
      base: null,
      remoteVersion: null,
      remoteCreatedAt: null,
      outboxState: 'clean',
      attempts: 0,
      nextAttemptAt: null,
      lastError: null,
      conflictWarning: null,
      rejectedRemoteVersion: null,
      rejectedRemoteCreatedAt: null,
      localRevision: 1,
      updatedAt: Date.now(),
    });
    legacy.close();

    const record = await getNavigationContestRecord(profileId, contestStorageId);
    expect(Object.keys(record?.current.points ?? {})).toEqual(['interpretacao-textos']);
    expect(record?.outboxState).toBe('pending');
    expect(record?.remoteVersion).toBeNull();
    const database = await openNavigationDb();
    expect(await database.get('navigation', profileId)).toBeUndefined();
    expect(createContestDocument('x').schemaVersion).toBe(2);
  });
});
