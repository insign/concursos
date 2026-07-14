import { describe, expect, it } from 'vitest';
import type { QuestionSet } from '../../src/lib/content-schema';
import { DEFAULT_PREFERENCES, mergePreferences } from '../../src/lib/preferences';
import { materializeSubjectProgress, mergeProgress, type ProgressDocument } from '../../src/lib/progress';
import { createEmptyAnswerDocument, submitAnswers } from '../../src/lib/questionnaire';

const questionSet: QuestionSet = {
  schemaVersion: 1,
  questionSetRevision: 2,
  questions: [
    {
      id: 'q1',
      revision: 1,
      prompt: 'Q1',
      options: [
        { id: 'a', text: 'A' },
        { id: 'b', text: 'B' },
      ],
      correctOptionId: 'b',
      explanation: 'B',
    },
  ],
};

describe('preferences and progress', () => {
  it('merges preferences by field and uses remote for a same-field conflict', () => {
    const base = DEFAULT_PREFERENCES;
    const local = { ...base, questionLayout: 'ten' as const, shuffleQuestions: true };
    const remote = { ...base, questionLayout: 'all' as const, correctionMode: 'immediate' as const };

    expect(mergePreferences(local, base, remote)).toEqual({
      schemaVersion: 1,
      questionLayout: 'all',
      correctionMode: 'immediate',
      shuffleQuestions: true,
    });
  });

  it('hides correct counts on-submit until a valid complete submission', () => {
    const document = createEmptyAnswerDocument(2);
    document.answers.q1 = { optionId: 'b', questionRevision: 1 };
    expect(materializeSubjectProgress(questionSet, document, 'on-submit', 3)).toEqual({
      answered: 1,
      total: 1,
      submitted: false,
      questionSetRevision: 2,
      answerVersion: 3,
    });

    const submitted = submitAnswers(document, questionSet);
    expect(materializeSubjectProgress(questionSet, submitted, 'on-submit', 4)).toMatchObject({
      correct: 1,
      submitted: true,
    });
    expect(materializeSubjectProgress(questionSet, document, 'immediate', 3)).toMatchObject({ correct: 1 });
  });

  it('refuses to materialize progress from a newer answer revision', () => {
    expect(() =>
      materializeSubjectProgress(
        { ...questionSet, questionSetRevision: 1 },
        createEmptyAnswerDocument(2),
        'immediate',
        1,
      ),
    ).toThrow('documento local usa a revisão editorial 2');
  });

  it('merges materialized progress by greatest answer version', () => {
    const local: ProgressDocument = {
      schemaVersion: 1,
      subjects: {
        'c--a': {
          answered: 2,
          total: 3,
          submitted: false,
          questionSetRevision: 1,
          answerVersion: 5,
        },
      },
    };
    const remote: ProgressDocument = {
      schemaVersion: 1,
      subjects: {
        'c--a': {
          answered: 1,
          total: 3,
          submitted: false,
          questionSetRevision: 1,
          answerVersion: 4,
        },
        'c--b': {
          answered: 3,
          total: 3,
          correct: 3,
          submitted: true,
          questionSetRevision: 1,
          answerVersion: 2,
        },
      },
    };

    expect(mergeProgress(local, remote)).toEqual({
      schemaVersion: 1,
      subjects: { 'c--a': local.subjects['c--a'], 'c--b': remote.subjects['c--b'] },
    });
  });

  it('keeps pending local progress when the remote answer version is equal', () => {
    const local: ProgressDocument = {
      schemaVersion: 1,
      subjects: {
        'c--a': {
          answered: 1,
          total: 1,
          submitted: false,
          questionSetRevision: 1,
          answerVersion: 3,
        },
      },
    };
    const remote: ProgressDocument = {
      schemaVersion: 1,
      subjects: {
        'c--a': {
          answered: 1,
          total: 1,
          correct: 1,
          submitted: false,
          questionSetRevision: 1,
          answerVersion: 3,
        },
      },
    };

    expect(mergeProgress(local, remote)).toEqual(local);
  });
});
