import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import 'fake-indexeddb/auto';
import type { QuestionSet } from '../../src/lib/content-schema';
import {
  deleteOfflineDatabase,
  getLocalAnswerRecord,
  getSharedDocumentRecord,
  saveAnswerDocumentSnapshot,
  saveSharedDocument,
} from '../../src/lib/offline-db';
import { savePreferences } from '../../src/lib/preferences';
import {
  createProfileBackup,
  importProfileBackup,
  parseProfileBackup,
} from '../../src/lib/profile-backup';
import { createEmptyAnswerDocument } from '../../src/lib/questionnaire';

const questionSet: QuestionSet = {
  schemaVersion: 1,
  questionSetRevision: 1,
  questions: [
    {
      id: 'q001',
      revision: 1,
      prompt: 'Questão de teste',
      options: [
        { id: 'a', text: 'A' },
        { id: 'b', text: 'B' },
      ],
      correctOptionId: 'b',
      explanation: 'B é a resposta correta.',
    },
  ],
};

function mockCatalog(
  subjectStorageIds = ['portugues', 'administrativo'],
  catalogQuestionSet = questionSet,
): void {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () =>
      new Response(
        JSON.stringify({
          schemaVersion: 1,
          subjects: subjectStorageIds.map((subjectStorageId) => ({
            contestStorageId: 'tse',
            subjectStorageId,
            questionSet: catalogQuestionSet,
          })),
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    ),
  );
}

beforeEach(async () => {
  await deleteOfflineDatabase();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('profile backup', () => {
  it('exports portable data and imports it into a different profile', async () => {
    const sourceDocument = createEmptyAnswerDocument(1);
    sourceDocument.answers.q001 = { optionId: 'b', questionRevision: 1 };
    sourceDocument.answers.q999 = { optionId: 'removida', questionRevision: 1 };
    const exportedDocument = createEmptyAnswerDocument(1);
    exportedDocument.answers.q001 = { optionId: 'b', questionRevision: 1 };
    await saveAnswerDocumentSnapshot({
      profileId: 'origem-7f3k',
      documentId: 'concursos--origem-7f3k--tse--portugues',
      document: sourceDocument,
      dirtyQuestionIds: ['q001'],
    });
    await saveAnswerDocumentSnapshot({
      profileId: 'origem-7f3k',
      documentId: 'concursos--origem-7f3k--tse--legado',
      document: createEmptyAnswerDocument(1),
      dirtyQuestionIds: [],
    });
    await savePreferences(
      'origem-7f3k',
      {
        schemaVersion: 1,
        questionLayout: 'ten',
        correctionMode: 'immediate',
        shuffleQuestions: true,
      },
      ['questionLayout', 'correctionMode', 'shuffleQuestions'],
    );

    const preservedDocument = createEmptyAnswerDocument(1);
    preservedDocument.answers.q001 = { optionId: 'a', questionRevision: 1 };
    await saveAnswerDocumentSnapshot({
      profileId: 'destino-9x2m',
      documentId: 'concursos--destino-9x2m--tse--administrativo',
      document: preservedDocument,
      dirtyQuestionIds: ['q001'],
    });

    mockCatalog();
    const backup = await createProfileBackup('origem-7f3k', new Date('2026-07-13T12:00:00.000Z'));
    expect(backup).toMatchObject({
      schemaVersion: 1,
      exportedAt: '2026-07-13T12:00:00.000Z',
      sourceAlias: 'origem-7f3k',
      answers: [
        {
          contestStorageId: 'tse',
          subjectStorageId: 'portugues',
          document: exportedDocument,
        },
      ],
      preferences: { questionLayout: 'ten', correctionMode: 'immediate', shuffleQuestions: true },
    });
    expect(JSON.stringify(backup)).not.toMatch(/base|remoteVersion|dirtyQuestionIds|outboxState/);

    await expect(importProfileBackup('destino-9x2m', backup)).resolves.toEqual({
      answerCount: 1,
      sourceAlias: 'origem-7f3k',
      targetAlias: 'destino-9x2m',
    });

    expect(await getLocalAnswerRecord('concursos--destino-9x2m--tse--portugues')).toMatchObject({
      profileId: 'destino-9x2m',
      current: exportedDocument,
      dirtyQuestionIds: ['q001'],
      outboxState: 'pending',
    });
    expect(await getLocalAnswerRecord('concursos--destino-9x2m--tse--administrativo')).toMatchObject({
      current: preservedDocument,
    });
    expect(await getSharedDocumentRecord('preferences', 'destino-9x2m')).toMatchObject({
      current: backup.preferences,
      outboxState: 'pending',
    });
    expect(await getSharedDocumentRecord('progress', 'destino-9x2m')).toMatchObject({
      current: {
        subjects: {
          'tse--portugues': { answered: 1, correct: 1 },
          'tse--administrativo': { answered: 1, correct: 0 },
        },
      },
      outboxState: 'pending',
    });
    expect(await getLocalAnswerRecord('concursos--origem-7f3k--tse--portugues')).toMatchObject({
      current: sourceDocument,
    });
  });

  it('rejects malformed files and subjects absent from the current catalog', async () => {
    expect(() => parseProfileBackup({ schemaVersion: 2 })).toThrow('Arquivo de backup inválido');

    mockCatalog(['portugues']);
    const incompatibleBackup = {
      schemaVersion: 1,
      exportedAt: '2026-07-13T12:00:00.000Z',
      sourceAlias: 'origem-7f3k',
      answers: [
        {
          contestStorageId: 'tse',
          subjectStorageId: 'inexistente',
          document: createEmptyAnswerDocument(1),
        },
      ],
      preferences: {
        schemaVersion: 1,
        questionLayout: 'single',
        correctionMode: 'on-submit',
        shuffleQuestions: false,
      },
    };

    await expect(importProfileBackup('destino-9x2m', incompatibleBackup)).rejects.toThrow(
      'não existe no catálogo atual',
    );
    expect(await getLocalAnswerRecord('concursos--destino-9x2m--tse--inexistente')).toBeUndefined();
  });

  it('drops answers made stale by a newer catalog revision', async () => {
    const updatedQuestionSet: QuestionSet = {
      ...questionSet,
      questionSetRevision: 2,
      questions: questionSet.questions.map((question) => ({
        ...question,
        revision: 2,
        options: [
          { id: 'a', text: 'A atualizada' },
          { id: 'b', text: 'B atualizada' },
        ],
      })),
    };
    mockCatalog(['portugues'], updatedQuestionSet);
    const oldBackup = {
      schemaVersion: 1,
      exportedAt: '2026-07-13T12:00:00.000Z',
      sourceAlias: 'origem-7f3k',
      answers: [
        {
          contestStorageId: 'tse',
          subjectStorageId: 'portugues',
          document: {
            schemaVersion: 1,
            questionSetRevision: 1,
            answers: { q001: { optionId: 'removida', questionRevision: 1 } },
            submission: null,
          },
        },
      ],
      preferences: {
        schemaVersion: 1,
        questionLayout: 'single',
        correctionMode: 'on-submit',
        shuffleQuestions: false,
      },
    };

    await expect(importProfileBackup('destino-9x2m', oldBackup)).resolves.toMatchObject({ answerCount: 1 });
    expect(await getLocalAnswerRecord('concursos--destino-9x2m--tse--portugues')).toMatchObject({
      current: {
        questionSetRevision: 2,
        answers: {},
        submission: null,
      },
    });
  });

  it('removes unsubmitted correct counts when on-submit is saved locally', async () => {
    await saveSharedDocument(
      'progress',
      'destino-9x2m',
      {
        schemaVersion: 1,
        subjects: {
          'tse--portugues': {
            answered: 1,
            total: 1,
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
      'destino-9x2m',
      {
        schemaVersion: 1,
        questionLayout: 'single',
        correctionMode: 'on-submit',
        shuffleQuestions: false,
      },
      ['correctionMode'],
    );

    expect(await getSharedDocumentRecord('progress', 'destino-9x2m')).toMatchObject({
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
    expect(
      (
        (await getSharedDocumentRecord('progress', 'destino-9x2m'))?.current as {
          subjects: Record<string, { correct?: number }>;
        }
      ).subjects['tse--portugues']?.correct,
    ).toBeUndefined();
  });
});
