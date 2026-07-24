import { describe, expect, it } from 'vitest';
import type { QuestionSet } from '../../src/lib/content-schema';
import { materializeSubjectProgress } from '../../src/lib/progress';
import { createEmptyAnswerDocument, submitAnswers } from '../../src/lib/questionnaire';

const questionSet: QuestionSet = {
  schemaVersion: 1,
  questionSetRevision: 2,
  questions: [
    {
      id: 'q1',
      revision: 1,
      origin: 'authorial',
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

});
