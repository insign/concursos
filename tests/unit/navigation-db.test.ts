import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import 'fake-indexeddb/auto';
import {
  deleteNavigationDatabase,
  discardPendingNavigation,
  getNavigationRecord,
  hasPendingNavigation,
  markNavigationSynced,
  saveNavigationDocument,
} from '../../src/lib/navigation-db';
import { createNavigationDocument, type NavigationContext } from '../../src/lib/navigation';

const profileId = 'navegacao-2026-teste';
const context: NavigationContext = {
  contestStorageId: 'tcema-2026-adm',
  groupId: 'portugues',
  subjectStorageId: 'interpretacao-textos',
  questionId: null,
  activeTab: 'reading',
  readingMode: true,
  questionOrigin: null,
  questionLayout: null,
  shuffleQuestions: null,
};

function makeDocument(route = '/concursos/tce-ma-2026/interpretacao-textos/leitura/') {
  return createNavigationDocument(route, context, null, new Date('2026-07-25T00:00:00.000Z'));
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

  it('marks the synchronized snapshot as clean', async () => {
    const saved = await saveNavigationDocument(profileId, makeDocument());
    await markNavigationSynced({
      profileId,
      expectedLocalRevision: saved.localRevision,
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
      synchronizedDocument: first.current,
      remoteVersion: 1,
      remoteCreatedAt: '2026-07-25T00:00:00.000Z',
    });

    const record = await getNavigationRecord(profileId);
    expect(record?.current.route).toBe('/simulados/');
    expect(record?.outboxState).toBe('pending');
    expect(record?.base?.route).toBe('/');
  });

  it('discards a new pending record without a remote base', async () => {
    await saveNavigationDocument(profileId, makeDocument());
    await discardPendingNavigation(profileId);
    expect(await getNavigationRecord(profileId)).toBeUndefined();
  });
});
