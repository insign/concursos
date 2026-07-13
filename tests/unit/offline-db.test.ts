import { beforeEach, describe, expect, it } from 'vitest';
import 'fake-indexeddb/auto';
import {
  deleteOfflineDatabase,
  acquireSyncLease,
  getLocalAnswerRecord,
  hasPendingOutbox,
  listPendingAnswerRecords,
  loadAnswerDocument,
  markAnswerSynced,
  releaseSyncLease,
  saveAnswerDocumentSnapshot,
  whenLocalWritesSettled,
} from '../../src/lib/offline-db';
import { createEmptyAnswerDocument } from '../../src/lib/questionnaire';

beforeEach(async () => {
  await deleteOfflineDatabase();
});

describe('offline database', () => {
  it('durably stores answer snapshots before reporting completion', async () => {
    const document = createEmptyAnswerDocument(1);
    document.answers.q001 = { optionId: 'b', questionRevision: 1 };

    await saveAnswerDocumentSnapshot({
      profileId: 'perfil-a1',
      documentId: 'concursos--perfil-a1--tse--portugues',
      document,
      dirtyQuestionIds: ['q001'],
    });
    await whenLocalWritesSettled();

    expect(await loadAnswerDocument('concursos--perfil-a1--tse--portugues')).toEqual(document);
    expect(await getLocalAnswerRecord('concursos--perfil-a1--tse--portugues')).toMatchObject({
      profileId: 'perfil-a1',
      dirtyQuestionIds: ['q001'],
      outboxState: 'pending',
    });
  });

  it('coalesces dirty question IDs into the latest document snapshot', async () => {
    const documentId = 'concursos--perfil-a1--tse--portugues';
    const first = createEmptyAnswerDocument(1);
    first.answers.q001 = { optionId: 'a', questionRevision: 1 };
    await saveAnswerDocumentSnapshot({
      profileId: 'perfil-a1',
      documentId,
      document: first,
      dirtyQuestionIds: ['q001'],
    });

    const second = structuredClone(first);
    second.answers.q002 = { optionId: 'b', questionRevision: 1 };
    await saveAnswerDocumentSnapshot({
      profileId: 'perfil-a1',
      documentId,
      document: second,
      dirtyQuestionIds: ['q002'],
    });

    expect(await getLocalAnswerRecord(documentId)).toMatchObject({
      current: second,
      dirtyQuestionIds: ['q001', 'q002'],
    });
  });

  it('partitions the outbox by profile', async () => {
    for (const profileId of ['perfil-a1', 'perfil-b2']) {
      await saveAnswerDocumentSnapshot({
        profileId,
        documentId: `concursos--${profileId}--tse--portugues`,
        document: createEmptyAnswerDocument(1),
      });
    }

    expect(await hasPendingOutbox('perfil-a1')).toBe(true);
    expect(await listPendingAnswerRecords('perfil-a1')).toHaveLength(1);
    expect(await listPendingAnswerRecords('perfil-b2')).toHaveLength(1);
  });

  it('grants one synchronization lease until it expires or is released', async () => {
    expect(await acquireSyncLease('sync', 'owner-a', 1_000, 1_000)).toBe(true);
    expect(await acquireSyncLease('sync', 'owner-b', 1_000, 1_500)).toBe(false);
    expect(await acquireSyncLease('sync', 'owner-b', 1_000, 2_001)).toBe(true);
    await releaseSyncLease('sync', 'owner-b');
    expect(await acquireSyncLease('sync', 'owner-c', 1_000, 2_100)).toBe(true);
  });

  it('preserves a newer local edit completed during a remote PUT', async () => {
    const documentId = 'concursos--perfil-a1--tse--portugues';
    const first = createEmptyAnswerDocument(1);
    first.answers.q001 = { optionId: 'a', questionRevision: 1 };
    const original = await saveAnswerDocumentSnapshot({
      profileId: 'perfil-a1',
      documentId,
      document: first,
      dirtyQuestionIds: ['q001'],
    });

    const newer = structuredClone(first);
    newer.answers.q001 = { optionId: 'b', questionRevision: 1 };
    await saveAnswerDocumentSnapshot({
      profileId: 'perfil-a1',
      documentId,
      document: newer,
      dirtyQuestionIds: ['q001'],
    });

    await markAnswerSynced({
      documentId,
      expectedLocalRevision: original.localRevision,
      synchronizedDocument: first,
      remoteVersion: 2,
      remoteCreatedAt: '2026-07-13T12:00:00.000Z',
      conflictWarning: null,
    });

    expect(await getLocalAnswerRecord(documentId)).toMatchObject({
      current: newer,
      base: first,
      outboxState: 'pending',
      dirtyQuestionIds: ['q001'],
    });
  });
});
