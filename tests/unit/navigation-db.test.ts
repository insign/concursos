import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import 'fake-indexeddb/auto';
import {
  clearNavigationReadingPosition,
  deleteNavigationDatabase,
  discardPendingNavigation,
  getNavigationRecord,
  hasPendingNavigation,
  markNavigationRemoteRejected,
  markNavigationSynced,
  markNavigationSyncError,
  saveNavigationDocument,
  shouldDeferNavigationSync,
} from '../../src/lib/navigation-db';
import { createNavigationDocument, type NavigationContext } from '../../src/lib/navigation';

const profileId = 'navegacao-2026-teste';
const context: NavigationContext = {
  contestStorageId: 'tcema-2026-adm',
  groupId: 'portugues',
  subjectStorageId: 'interpretacao-textos',
  questionId: null,
  activeTab: 'content',
  readingMode: true,
  questionOrigin: null,
  questionLayout: null,
  shuffleQuestions: null,
};

function makeDocument(route = '/concursos/tce-ma-2026/interpretacao-textos/') {
  return createNavigationDocument(route, context, null, new Date('2026-07-25T00:00:00.000Z'));
}

function makeReadingDocument() {
  return createNavigationDocument(
    '/concursos/tce-ma-2026/interpretacao-textos/',
    context,
    {
      contentVersion: null,
      sectionId: null,
      blockId: null,
      blockIndex: 4,
      relativeOffset: 0,
      textQuote: '',
      progress: 0.5,
    },
    new Date('2026-07-25T00:00:00.000Z'),
  );
}

beforeEach(async () => {
  await deleteNavigationDatabase();
});

afterEach(async () => {
  await deleteNavigationDatabase();
});

describe('navigation local outbox', () => {
  it('persists a new navigation document before synchronization', async () => {
    const record = await saveNavigationDocument(profileId, makeDocument());
    expect(record.localRevision).toBe(1);
    expect(record.outboxState).toBe('pending');
    expect(await hasPendingNavigation(profileId)).toBe(true);
  });

  it('normalizes a legacy local reading record when loading it', async () => {
    await saveNavigationDocument(
      profileId,
      createNavigationDocument(
        '/concursos/tce-ma-2026/interpretacao-textos/leitura/',
        { ...context, activeTab: 'reading' },
        null,
      ),
    );

    const record = await getNavigationRecord(profileId);
    expect(record?.current.route).toBe('/concursos/tce-ma-2026/interpretacao-textos/');
    expect(record?.current.context).toMatchObject({ activeTab: 'content', readingMode: true });
  });

  it('marks the synchronized snapshot as clean', async () => {
    const saved = await saveNavigationDocument(profileId, makeDocument());
    await markNavigationSynced({
      profileId,
      expectedLocalRevision: saved.localRevision,
      expectedRemoteVersion: null,
      expectedRemoteCreatedAt: null,
      synchronizedDocument: saved.current,
      remoteVersion: 4,
      remoteCreatedAt: '2026-07-25T00:00:00.000Z',
    });

    const record = await getNavigationRecord(profileId);
    expect(record?.outboxState).toBe('clean');
    expect(record?.remoteVersion).toBe(4);
    expect(await hasPendingNavigation(profileId)).toBe(false);
  });

  it('does not erase a navigation change made while a request is in flight', async () => {
    const first = await saveNavigationDocument(profileId, makeDocument('/'));
    const secondDocument = makeDocument('/simulados/');
    await saveNavigationDocument(profileId, secondDocument);

    await markNavigationSynced({
      profileId,
      expectedLocalRevision: first.localRevision,
      expectedRemoteVersion: null,
      expectedRemoteCreatedAt: null,
      synchronizedDocument: first.current,
      remoteVersion: 1,
      remoteCreatedAt: '2026-07-25T00:00:00.000Z',
    });

    const record = await getNavigationRecord(profileId);
    expect(record?.current.route).toBe('/simulados/');
    expect(record?.outboxState).toBe('pending');
    expect(record?.base?.route).toBe('/');
  });

  it('clears a matching reading position as a new pending revision', async () => {
    const saved = await saveNavigationDocument(profileId, makeReadingDocument());
    await markNavigationSynced({
      profileId,
      expectedLocalRevision: saved.localRevision,
      expectedRemoteVersion: null,
      expectedRemoteCreatedAt: null,
      synchronizedDocument: saved.current,
      remoteVersion: 4,
      remoteCreatedAt: '2026-07-25T00:00:00.000Z',
    });

    const cleared = await clearNavigationReadingPosition(
      profileId,
      'tcema-2026-adm',
      'interpretacao-textos',
    );
    expect(cleared).toMatchObject({
      remoteVersion: 4,
      outboxState: 'pending',
      attempts: 0,
      nextAttemptAt: null,
      localRevision: 2,
      current: { route: saved.current.route, context: saved.current.context, readingPosition: null },
      base: { readingPosition: saved.current.readingPosition },
    });
    expect(
      await clearNavigationReadingPosition(
        profileId,
        'tcema-2026-adm',
        'interpretacao-textos',
      ),
    ).toBeUndefined();
    expect(
      await clearNavigationReadingPosition(profileId, 'outro-concurso', 'interpretacao-textos'),
    ).toBeUndefined();
    expect((await getNavigationRecord(profileId))?.localRevision).toBe(2);
  });

  it('does not let an obsolete request regress a newer remote snapshot', async () => {
    const saved = await saveNavigationDocument(profileId, makeDocument('/'));

    await markNavigationSynced({
      profileId,
      expectedLocalRevision: saved.localRevision,
      expectedRemoteVersion: null,
      expectedRemoteCreatedAt: null,
      synchronizedDocument: makeDocument('/simulados/'),
      remoteVersion: 2,
      remoteCreatedAt: '2026-07-25T00:00:00.000Z',
    });
    await markNavigationSynced({
      profileId,
      expectedLocalRevision: saved.localRevision,
      expectedRemoteVersion: null,
      expectedRemoteCreatedAt: null,
      synchronizedDocument: makeDocument('/'),
      remoteVersion: 1,
      remoteCreatedAt: '2026-07-25T00:00:00.000Z',
    });

    const record = await getNavigationRecord(profileId);
    expect(record?.remoteVersion).toBe(2);
    expect(record?.current.route).toBe('/simulados/');
  });

  it('deduplicates rejected remote versions and applies retry backoff', async () => {
    await saveNavigationDocument(profileId, makeDocument());

    expect(
      await markNavigationRemoteRejected(profileId, 7, '2026-07-25T00:00:00.000Z'),
    ).toBe(true);
    expect(
      await markNavigationRemoteRejected(profileId, 7, '2026-07-25T00:00:00.000Z'),
    ).toBe(false);

    await markNavigationSyncError(profileId, 'Documento inválido', 1_000);
    const record = await getNavigationRecord(profileId);
    expect(record?.attempts).toBe(1);
    expect(record?.nextAttemptAt).toBe(6_000);
    expect(await shouldDeferNavigationSync(profileId, 5_999)).toBe(true);
    expect(await shouldDeferNavigationSync(profileId, 6_000)).toBe(false);
  });

  it('discards a new pending record without a remote base', async () => {
    await saveNavigationDocument(profileId, makeDocument());
    await discardPendingNavigation(profileId);
    expect(await getNavigationRecord(profileId)).toBeUndefined();
  });
});
