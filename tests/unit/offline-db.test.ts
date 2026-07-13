import { beforeEach, describe, expect, it } from 'vitest';
import 'fake-indexeddb/auto';
import {
  deleteOfflineDatabase,
  getLocalAnswerRecord,
  hasPendingOutbox,
  listPendingAnswerRecords,
  loadAnswerDocument,
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
});
