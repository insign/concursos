import { beforeEach, describe, expect, it } from 'vitest';
import 'fake-indexeddb/auto';
import {
  deleteOfflineDatabase,
  acquireSyncLease,
  getLocalAnswerRecord,
  getSharedDocumentRecord,
  hasPendingOutbox,
  listPendingAnswerRecords,
  loadAnswerDocument,
  markAnswerSynced,
  markSharedDocumentSynced,
  ProfileImportConflictError,
  releaseSyncLease,
  saveAnswerDocumentSnapshot,
  saveProgressIfPreferencesUnchanged,
  saveProfileImport,
  saveSharedDocument,
  storeRemoteAnswerDocument,
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

  it('does not save rematerialized progress after preferences change', async () => {
    await saveSharedDocument(
      'preferences',
      'perfil-a1',
      {
        schemaVersion: 1,
        questionLayout: 'single',
        correctionMode: 'immediate',
        shuffleQuestions: false,
      },
      ['correctionMode'],
    );
    const original = await getSharedDocumentRecord('preferences', 'perfil-a1');
    await markSharedDocumentSynced({
      storeName: 'preferences',
      profileId: 'perfil-a1',
      expectedLocalRevision: original!.localRevision,
      synchronizedDocument: original!.current,
      remoteVersion: 1,
      remoteCreatedAt: '2026-07-13T12:00:00.000Z',
    });
    await saveSharedDocument(
      'preferences',
      'perfil-a1',
      {
        schemaVersion: 1,
        questionLayout: 'single',
        correctionMode: 'on-submit',
        shuffleQuestions: false,
      },
      ['correctionMode'],
    );

    await expect(
      saveProgressIfPreferencesUnchanged(
        'perfil-a1',
        original!.localRevision,
        { schemaVersion: 1, subjects: {} },
        [],
      ),
    ).resolves.toBe(false);
    expect(await getSharedDocumentRecord('progress', 'perfil-a1')).toBeUndefined();
  });

  it('preserves newer progress during an atomic sanitized-remote transition', async () => {
    const staleProgress = { schemaVersion: 1, subjects: {} };
    await saveSharedDocument('progress', 'perfil-a1', staleProgress, []);
    const original = await getSharedDocumentRecord('progress', 'perfil-a1');
    await markSharedDocumentSynced({
      storeName: 'progress',
      profileId: 'perfil-a1',
      expectedLocalRevision: original!.localRevision,
      synchronizedDocument: staleProgress,
      remoteVersion: 1,
      remoteCreatedAt: '2026-07-13T12:00:00.000Z',
    });
    const newerProgress = {
      schemaVersion: 1,
      subjects: {
        'tse--portugues': {
          answered: 1,
          total: 1,
          submitted: false,
          questionSetRevision: 1,
          answerVersion: 2,
        },
      },
    };
    await saveSharedDocument('progress', 'perfil-a1', newerProgress, ['tse--portugues']);

    await markSharedDocumentSynced({
      storeName: 'progress',
      profileId: 'perfil-a1',
      expectedLocalRevision: original!.localRevision,
      synchronizedDocument: staleProgress,
      remoteVersion: 2,
      remoteCreatedAt: '2026-07-13T12:00:00.000Z',
      pendingDocument: staleProgress,
      pendingDirtyFields: [],
    });

    expect(await getSharedDocumentRecord('progress', 'perfil-a1')).toMatchObject({
      current: newerProgress,
      outboxState: 'pending',
      dirtyFields: ['tse--portugues'],
    });
  });

  it('does not overwrite a pending record when a remote read finishes later', async () => {
    const documentId = 'concursos--perfil-a1--tse--portugues';
    const local = createEmptyAnswerDocument(1);
    local.answers.q001 = { optionId: 'b', questionRevision: 1 };
    await saveAnswerDocumentSnapshot({
      profileId: 'perfil-a1',
      documentId,
      document: local,
      dirtyQuestionIds: ['q001'],
    });
    const remote = createEmptyAnswerDocument(1);
    remote.answers.q001 = { optionId: 'a', questionRevision: 1 };

    await expect(
      storeRemoteAnswerDocument({
        profileId: 'perfil-a1',
        documentId,
        document: remote,
        remoteVersion: 4,
        remoteCreatedAt: '2026-07-13T12:00:00.000Z',
      }),
    ).resolves.toBe(false);
    expect(await getLocalAnswerRecord(documentId)).toMatchObject({
      current: local,
      outboxState: 'pending',
      dirtyQuestionIds: ['q001'],
    });
  });

  it('rejects an import based on a stale profile snapshot without partial writes', async () => {
    await saveAnswerDocumentSnapshot({
      profileId: 'perfil-a1',
      documentId: 'concursos--perfil-a1--tse--portugues',
      document: createEmptyAnswerDocument(1),
    });

    await expect(
      saveProfileImport({
        profileId: 'perfil-a1',
        answers: [],
        expectedAnswers: [],
        preferences: { schemaVersion: 1 },
        progress: { schemaVersion: 1, subjects: {} },
        progressDirtyFields: [],
      }),
    ).rejects.toBeInstanceOf(ProfileImportConflictError);
    expect(await getSharedDocumentRecord('preferences', 'perfil-a1')).toBeUndefined();
    expect(await getSharedDocumentRecord('progress', 'perfil-a1')).toBeUndefined();
  });

  it('rejects an import snapshot changed by synchronization without a local edit', async () => {
    const documentId = 'concursos--perfil-a1--tse--portugues';
    const original = await saveAnswerDocumentSnapshot({
      profileId: 'perfil-a1',
      documentId,
      document: createEmptyAnswerDocument(1),
    });
    await markAnswerSynced({
      documentId,
      expectedLocalRevision: original.localRevision,
      synchronizedDocument: original.current,
      remoteVersion: 3,
      remoteCreatedAt: '2026-07-13T12:00:00.000Z',
      conflictWarning: null,
    });

    await expect(
      saveProfileImport({
        profileId: 'perfil-a1',
        answers: [],
        expectedAnswers: [
          {
            documentId,
            localRevision: original.localRevision,
            remoteVersion: original.remoteVersion,
            updatedAt: original.updatedAt,
          },
        ],
        preferences: { schemaVersion: 1 },
        progress: { schemaVersion: 1, subjects: {} },
        progressDirtyFields: [],
      }),
    ).rejects.toBeInstanceOf(ProfileImportConflictError);
    expect(await getSharedDocumentRecord('preferences', 'perfil-a1')).toBeUndefined();
  });

  it('aborts every imported write when a document key belongs to another profile', async () => {
    const collisionId = 'concursos--perfil-a1--tse--administrativo';
    await saveAnswerDocumentSnapshot({
      profileId: 'perfil-b2',
      documentId: collisionId,
      document: createEmptyAnswerDocument(1),
    });

    await expect(
      saveProfileImport({
        profileId: 'perfil-a1',
        answers: [
          {
            documentId: 'concursos--perfil-a1--tse--portugues',
            document: createEmptyAnswerDocument(1),
            dirtyQuestionIds: ['q001'],
          },
          {
            documentId: collisionId,
            document: createEmptyAnswerDocument(1),
            dirtyQuestionIds: ['q001'],
          },
        ],
        expectedAnswers: [],
        preferences: { schemaVersion: 1 },
        progress: { schemaVersion: 1, subjects: {} },
        progressDirtyFields: [],
      }),
    ).rejects.toThrow('pertence a outro perfil');
    expect(await getLocalAnswerRecord('concursos--perfil-a1--tse--portugues')).toBeUndefined();
    expect(await getSharedDocumentRecord('preferences', 'perfil-a1')).toBeUndefined();
  });
});
