import type { AnswerableQuestionSet } from './content-schema';
import { assertSupportedQuestionSetRevision } from './document-schema';

export type QuestionLayout = 'single' | 'ten' | 'all';
export type CorrectionMode = 'immediate' | 'on-submit';

export interface StoredAnswer {
  optionId: string;
  questionRevision: number;
}

export type AnswerMap = Record<string, StoredAnswer>;

export interface SubmissionSignature {
  questionSetRevision: number;
  answersHash: string;
}

export interface AnswerDocument {
  schemaVersion: 1;
  questionSetRevision: number;
  answers: AnswerMap;
  submission: SubmissionSignature | null;
}

export interface Score {
  answered: number;
  total: number;
  correct: number;
}

export function createEmptyAnswerDocument(questionSetRevision: number): AnswerDocument {
  return {
    schemaVersion: 1,
    questionSetRevision,
    answers: {},
    submission: null,
  };
}

export function hashAnswers(answers: AnswerMap): string {
  const canonical = Object.entries(answers)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([questionId, answer]) => `${questionId}:${answer.questionRevision}:${answer.optionId}`)
    .join('|');
  let hash = 2166136261;

  for (let index = 0; index < canonical.length; index += 1) {
    hash ^= canonical.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(16).padStart(8, '0');
}

export function scoreAnswers(questionSet: AnswerableQuestionSet, answers: AnswerMap): Score {
  let answered = 0;
  let correct = 0;

  for (const question of questionSet.questions) {
    const answer = answers[question.id];
    if (!answer || answer.questionRevision !== question.revision) continue;
    answered += 1;
    if (answer.optionId === question.correctOptionId) correct += 1;
  }

  return { answered, total: questionSet.questions.length, correct };
}

export function isSubmissionValid(document: AnswerDocument, questionSet: AnswerableQuestionSet): boolean {
  if (!document.submission || document.questionSetRevision !== questionSet.questionSetRevision) return false;
  if (document.submission.questionSetRevision !== questionSet.questionSetRevision) return false;
  if (scoreAnswers(questionSet, document.answers).answered !== questionSet.questions.length) return false;
  return document.submission.answersHash === hashAnswers(document.answers);
}

export function submitAnswers(document: AnswerDocument, questionSet: AnswerableQuestionSet): AnswerDocument {
  if (scoreAnswers(questionSet, document.answers).answered !== questionSet.questions.length) {
    throw new Error('Todas as questões devem ser respondidas antes da finalização');
  }

  return {
    ...document,
    questionSetRevision: questionSet.questionSetRevision,
    submission: {
      questionSetRevision: questionSet.questionSetRevision,
      answersHash: hashAnswers(document.answers),
    },
  };
}

export function reconcileAnswerDocument(
  document: AnswerDocument,
  questionSet: AnswerableQuestionSet,
): AnswerDocument {
  assertSupportedQuestionSetRevision(document, questionSet);
  const answers: AnswerMap = {};

  for (const question of questionSet.questions) {
    const answer = document.answers[question.id];
    const optionExists = question.options.some(({ id }) => id === answer?.optionId);

    if (answer && answer.questionRevision === question.revision && optionExists) {
      answers[question.id] = answer;
    }
  }

  const reconciled: AnswerDocument = {
    schemaVersion: 1,
    questionSetRevision: questionSet.questionSetRevision,
    answers,
    submission: document.submission,
  };

  if (!isSubmissionValid(reconciled, questionSet)) {
    reconciled.submission = null;
  }

  return reconciled;
}
