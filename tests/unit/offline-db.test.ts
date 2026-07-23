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
  renewSyncLease,
  saveAnswerDocumentSnapshot,
  saveProgressIfPreferencesUnchanged,
  saveProfileImport,
  saveSharedDocument,
  storeRemoteAnswerDocument,
  SyncLeaseLostError,
  whenLocalWritesSettled,
} from '../../src/lib/offline-db';
import { savePreferences } from '../../src/lib/preferences';
import { updateSubjectProgress } from '../../src/lib/progress';
import {
  createEmptyAnswerDocument,
  isSubmissionValid,
  reconcileAnswerDocument,
  submitAnswers,
} from '../../src/lib/questionnaire';
import type { QuestionSet } from '../../src/lib/content-schema';

const questionSet: QuestionSet = {
  schemaVersion: 1,
  questionSetRevision: 1,
  questions: [
    {
      id: 'q001',
      revision: 1,
      prompt: 'Q1',
      options: [
        { id: 'a', text: 'A' },
        { id: 'b', text: 'B' },
      ],
      correctOptionId: 'a',
      explanation: 'A',
    },
    {
      id: 'q002',
      revision: 1,
      prompt: 'Q2',
      options: [
        { id: 'a', text: 'A' },
        { id: 'b', text: 'B' },
      ],
      correctOptionId: 'b',
      explanation: 'B',
    },
  ],
};

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
    await expect(renewSyncLease('sync', 'owner-a', 1_000, 2_100)).rejects.toBeInstanceOf(
      SyncLeaseLostError,
    );
    await expect(renewSyncLease('sync', 'owner-c', 1_000, 3_101)).rejects.toBeInstanceOf(
      SyncLeaseLostError,
    );
    expect(await acquireSyncLease('sync', 'owner-d', 1_000, 3_101)).toBe(true);
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

  it('atomically applies remote preferences and their progress invalidation', async () => {
    const immediatePreferences = {
      schemaVersion: 1 as const,
      questionLayout: 'single' as const,
      correctionMode: 'immediate' as const,
      shuffleQuestions: false,
    };
    await saveSharedDocument(
      'preferences',
      'perfil-a1',
      immediatePreferences,
      ['correctionMode'],
    );
    const originalPreferences = await getSharedDocumentRecord('preferences', 'perfil-a1');
    await markSharedDocumentSynced({
      storeName: 'preferences',
      profileId: 'perfil-a1',
      expectedLocalRevision: originalPreferences!.localRevision,
      synchronizedDocument: immediatePreferences,
      remoteVersion: 1,
      remoteCreatedAt: '2026-07-13T12:00:00.000Z',
    });

    const immediateProgress = {
      schemaVersion: 1,
      subjects: {
        'tse--portugues': {
          answered: 1,
          correct: 1,
          total: 2,
          submitted: false,
          questionSetRevision: 1,
          answerVersion: 1,
        },
      },
    };
    await saveSharedDocument('progress', 'perfil-a1', immediateProgress, []);
    const originalProgress = await getSharedDocumentRecord('progress', 'perfil-a1');
    await markSharedDocumentSynced({
      storeName: 'progress',
      profileId: 'perfil-a1',
      expectedLocalRevision: originalProgress!.localRevision,
      synchronizedDocument: immediateProgress,
      remoteVersion: 1,
      remoteCreatedAt: '2026-07-13T12:00:00.000Z',
    });

    const onSubmitPreferences = {
      ...immediatePreferences,
      correctionMode: 'on-submit' as const,
    };
    const cleanPreferences = await getSharedDocumentRecord('preferences', 'perfil-a1');
    const sanitizedProgress = {
      schemaVersion: 1,
      subjects: {
        'tse--portugues': {
          answered: 1,
          total: 2,
          submitted: false,
          questionSetRevision: 1,
          answerVersion: 1,
        },
      },
    };
    await markSharedDocumentSynced({
      storeName: 'preferences',
      profileId: 'perfil-a1',
      expectedLocalRevision: cleanPreferences!.localRevision,
      synchronizedDocument: onSubmitPreferences,
      remoteVersion: 2,
      remoteCreatedAt: '2026-07-13T12:00:00.000Z',
      progressUpdate: {
        dirtyFields: ['__preferences__'],
        updateCurrent: () => sanitizedProgress,
      },
    });

    expect(await getSharedDocumentRecord('preferences', 'perfil-a1')).toMatchObject({
      current: onSubmitPreferences,
      remoteVersion: 2,
      outboxState: 'clean',
    });
    expect(await getSharedDocumentRecord('progress', 'perfil-a1')).toMatchObject({
      current: sanitizedProgress,
      dirtyFields: ['__preferences__'],
      outboxState: 'pending',
    });
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
      base: remote,
      remoteVersion: 4,
      outboxState: 'pending',
      dirtyQuestionIds: ['q001'],
    });
  });

  it('merges dirty questions from stale snapshots written by different tabs', async () => {
    const documentId = 'concursos--perfil-a1--tse--portugues';
    const firstTab = createEmptyAnswerDocument(1);
    const secondTab = createEmptyAnswerDocument(1);
    firstTab.answers.q001 = { optionId: 'b', questionRevision: 1 };
    secondTab.answers.q002 = { optionId: 'a', questionRevision: 1 };

    await saveAnswerDocumentSnapshot({
      profileId: 'perfil-a1',
      documentId,
      document: firstTab,
      dirtyQuestionIds: ['q001'],
    });
    await saveAnswerDocumentSnapshot({
      profileId: 'perfil-a1',
      documentId,
      document: secondTab,
      dirtyQuestionIds: ['q002'],
    });

    expect(await getLocalAnswerRecord(documentId)).toMatchObject({
      current: {
        answers: {
          q001: { optionId: 'b', questionRevision: 1 },
          q002: { optionId: 'a', questionRevision: 1 },
        },
      },
      dirtyQuestionIds: ['q001', 'q002'],
    });
  });

  it('finalizes the latest durable answers instead of a stale tab snapshot', async () => {
    const documentId = 'concursos--perfil-a1--tse--portugues';
    const staleTab = createEmptyAnswerDocument(1);
    staleTab.answers = {
      q001: { optionId: 'a', questionRevision: 1 },
      q002: { optionId: 'a', questionRevision: 1 },
    };
    await saveAnswerDocumentSnapshot({
      profileId: 'perfil-a1',
      documentId,
      document: staleTab,
      dirtyQuestionIds: ['q001', 'q002'],
    });

    const newerTab = structuredClone(staleTab);
    newerTab.answers.q002 = { optionId: 'b', questionRevision: 1 };
    await saveAnswerDocumentSnapshot({
      profileId: 'perfil-a1',
      documentId,
      document: newerTab,
      dirtyQuestionIds: ['q002'],
    });

    const finalized = await saveAnswerDocumentSnapshot({
      profileId: 'perfil-a1',
      documentId,
      document: staleTab,
      transformLatestDocument: (latest) =>
        submitAnswers(reconcileAnswerDocument(latest, questionSet), questionSet),
    });

    expect(finalized.current.answers.q002?.optionId).toBe('b');
    expect(isSubmissionValid(finalized.current, questionSet)).toBe(true);
  });

  it('does not let a stale client downgrade a newer local answer document', async () => {
    const documentId = 'concursos--perfil-a1--tse--portugues';
    const newer = { ...createEmptyAnswerDocument(1), questionSetRevision: 2 };
    await saveAnswerDocumentSnapshot({
      profileId: 'perfil-a1',
      documentId,
      document: newer,
    });

    await expect(
      saveAnswerDocumentSnapshot({
        profileId: 'perfil-a1',
        documentId,
        document: createEmptyAnswerDocument(1),
        dirtyQuestionIds: ['q001'],
      }),
    ).rejects.toThrow('documento local usa a revisão editorial 2');
    expect(await getLocalAnswerRecord(documentId)).toMatchObject({ current: newer });
  });

  it('merges concurrent preference fields and progress subjects locally', async () => {
    const originalPreferences = {
      schemaVersion: 1 as const,
      questionLayout: 'single' as const,
      correctionMode: 'on-submit' as const,
      shuffleQuestions: false,
    };
    await savePreferences(
      'perfil-a1',
      { ...originalPreferences, questionLayout: 'ten' },
      ['questionLayout'],
    );
    await savePreferences(
      'perfil-a1',
      { ...originalPreferences, shuffleQuestions: true },
      ['shuffleQuestions'],
    );

    const progressDocument = createEmptyAnswerDocument(1);
    progressDocument.answers.q001 = { optionId: 'a', questionRevision: 1 };
    const progressSubject = {
      answered: 1,
      total: 2,
      submitted: false,
      questionSetRevision: 1,
      answerVersion: 1,
    };
    await Promise.all([
      updateSubjectProgress('perfil-a1', 'tse--portugues', questionSet, progressDocument, 1),
      updateSubjectProgress('perfil-a1', 'tse--administrativo', questionSet, progressDocument, 1),
    ]);

    expect(await getSharedDocumentRecord('preferences', 'perfil-a1')).toMatchObject({
      current: { questionLayout: 'ten', shuffleQuestions: true },
      dirtyFields: ['questionLayout', 'shuffleQuestions'],
    });
    expect(await getSharedDocumentRecord('progress', 'perfil-a1')).toMatchObject({
      current: {
        subjects: {
          'tse--portugues': progressSubject,
          'tse--administrativo': progressSubject,
        },
      },
      dirtyFields: ['tse--administrativo', 'tse--portugues'],
    });
  });

  it('atomically sanitizes progress when correction mode changes', async () => {
    await saveSharedDocument(
      'progress',
      'perfil-a1',
      {
        schemaVersion: 1,
        subjects: {
          'tse--portugues': {
            answered: 1,
            total: 2,
            correct: 1,
            submitted: false,
            questionSetRevision: 1,
            answerVersion: 1,
          },
        },
      },
      ['tse--portugues'],
    );

    await savePreferences(
      'perfil-a1',
      {
        schemaVersion: 1,
        questionLayout: 'single',
        correctionMode: 'on-submit',
        shuffleQuestions: false,
      },
      ['correctionMode'],
    );

    expect(await getSharedDocumentRecord('preferences', 'perfil-a1')).toMatchObject({
      current: { correctionMode: 'on-submit' },
      outboxState: 'pending',
    });
    expect(await getSharedDocumentRecord('progress', 'perfil-a1')).toMatchObject({
      current: {
        subjects: {
          'tse--portugues': {
            answered: 1,
            submitted: false,
          },
        },
      },
      dirtyFields: expect.arrayContaining(['__preferences__']),
      outboxState: 'pending',
    });
    const progress = (await getSharedDocumentRecord('progress', 'perfil-a1'))?.current as {
      subjects: Record<string, { correct?: number }>;
    };
    expect(progress.subjects['tse--portugues']?.correct).toBeUndefined();

    const staleImmediateDocument = createEmptyAnswerDocument(1);
    staleImmediateDocument.answers.q001 = { optionId: 'a', questionRevision: 1 };
    await updateSubjectProgress(
      'perfil-a1',
      'tse--portugues',
      questionSet,
      staleImmediateDocument,
      2,
    );
    const refreshed = (await getSharedDocumentRecord('progress', 'perfil-a1'))?.current as {
      subjects: Record<string, { correct?: number }>;
    };
    expect(refreshed.subjects['tse--portugues']?.correct).toBeUndefined();
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

  it('rejects an import that would downgrade a newer local answer document', async () => {
    const documentId = 'concursos--perfil-a1--tse--portugues';
    const newer = { ...createEmptyAnswerDocument(1), questionSetRevision: 2 };
    const existing = await saveAnswerDocumentSnapshot({
      profileId: 'perfil-a1',
      documentId,
      document: newer,
    });

    await expect(
      saveProfileImport({
        profileId: 'perfil-a1',
        answers: [
          {
            documentId,
            document: createEmptyAnswerDocument(1),
            dirtyQuestionIds: ['q001'],
          },
        ],
        expectedAnswers: [
          {
            documentId,
            localRevision: existing.localRevision,
            remoteVersion: existing.remoteVersion,
            updatedAt: existing.updatedAt,
          },
        ],
        preferences: { schemaVersion: 1 },
        progress: { schemaVersion: 1, subjects: {} },
        progressDirtyFields: [],
      }),
    ).rejects.toThrow('documento local usa a revisão editorial 2');
    expect(await getLocalAnswerRecord(documentId)).toMatchObject({ current: newer });
    expect(await getSharedDocumentRecord('preferences', 'perfil-a1')).toBeUndefined();
    expect(await getSharedDocumentRecord('progress', 'perfil-a1')).toBeUndefined();
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
