import { describe, expect, it } from 'vitest';
import type { QuestionSet } from '../../src/lib/content-schema';
import {
  createEmptyAnswerDocument,
  hashAnswers,
  isSubmissionValid,
  reconcileAnswerDocument,
  scoreAnswers,
  submitAnswers,
  type AnswerDocument,
} from '../../src/lib/questionnaire';

const questionSet: QuestionSet = {
  schemaVersion: 1,
  questionSetRevision: 3,
  questions: [
    {
      id: 'q1',
      revision: 2,
      origin: 'authorial',
      prompt: 'Primeira?',
      options: [
        { id: 'a', text: 'A' },
        { id: 'b', text: 'B' },
      ],
      correctOptionId: 'b',
      explanation: 'B.',
    },
    {
      id: 'q2',
      revision: 1,
      origin: 'previous_exam',
      prompt: 'Segunda?',
      options: [
        { id: 'a', text: 'A' },
        { id: 'b', text: 'B' },
      ],
      correctOptionId: 'a',
      explanation: 'A.',
    },
  ],
};

function answeredDocument(): AnswerDocument {
  return {
    schemaVersion: 1,
    questionSetRevision: 3,
    answers: {
      q1: { optionId: 'b', questionRevision: 2 },
      q2: { optionId: 'b', questionRevision: 1 },
    },
    submission: null,
  };
}

describe('questionnaire state', () => {
  it('hashes answers independently of object insertion order', () => {
    expect(hashAnswers(answeredDocument().answers)).toBe(
      hashAnswers({
        q2: { optionId: 'b', questionRevision: 1 },
        q1: { optionId: 'b', questionRevision: 2 },
      }),
    );
  });

  it('calculates score and requires a complete submission', () => {
    expect(scoreAnswers(questionSet, answeredDocument().answers)).toEqual({ answered: 2, total: 2, correct: 1 });
    expect(() => submitAnswers(createEmptyAnswerDocument(3), questionSet)).toThrow('Todas as questões');
  });

  it('stores and validates a submission signature', () => {
    const submitted = submitAnswers(answeredDocument(), questionSet);
    expect(isSubmissionValid(submitted, questionSet)).toBe(true);

    submitted.answers.q2 = { optionId: 'a', questionRevision: 1 };
    expect(isSubmissionValid(submitted, questionSet)).toBe(false);
  });

  it('removes stale, invalid and deleted answers during reconciliation', () => {
    const submitted = submitAnswers(answeredDocument(), questionSet);
    submitted.answers.q1 = { optionId: 'b', questionRevision: 1 };
    submitted.answers.q2 = { optionId: 'missing', questionRevision: 1 };
    submitted.answers.removed = { optionId: 'a', questionRevision: 1 };

    expect(reconcileAnswerDocument(submitted, questionSet)).toEqual({
      schemaVersion: 1,
      questionSetRevision: 3,
      answers: {},
      submission: null,
    });
  });

  it('refuses to reconcile a document from a newer editorial revision', () => {
    expect(() =>
      reconcileAnswerDocument(
        { ...answeredDocument(), questionSetRevision: questionSet.questionSetRevision + 1 },
        questionSet,
      ),
    ).toThrow('documento local usa a revisão editorial 4');
  });
});
