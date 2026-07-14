import { z } from 'zod';
import type { QuestionSet } from './content-schema';
import type { AnswerDocument } from './questionnaire';

const stableId = z.string().regex(/^[A-Za-z0-9_-]{1,64}$/);

export const storedAnswerSchema = z
  .object({
    optionId: stableId,
    questionRevision: z.number().int().positive(),
  })
  .strict();

export const submissionSignatureSchema = z
  .object({
    questionSetRevision: z.number().int().positive(),
    answersHash: z.string().regex(/^[a-f0-9]{8}$/),
  })
  .strict();

export const answerDocumentSchema = z
  .object({
    schemaVersion: z.literal(1),
    questionSetRevision: z.number().int().positive(),
    answers: z.record(stableId, storedAnswerSchema),
    submission: submissionSignatureSchema.nullable(),
  })
  .strict();

export class NewerQuestionSetRevisionError extends Error {
  constructor(documentRevision: number, localRevision: number, source = 'remoto') {
    super(
      `O documento ${source} usa a revisão editorial ${documentRevision}, mas este cliente conhece apenas a revisão ${localRevision}`,
    );
    this.name = 'NewerQuestionSetRevisionError';
  }
}

export function assertSupportedQuestionSetRevision(
  document: AnswerDocument,
  questionSet: QuestionSet,
  source = 'local',
): void {
  if (document.questionSetRevision > questionSet.questionSetRevision) {
    throw new NewerQuestionSetRevisionError(
      document.questionSetRevision,
      questionSet.questionSetRevision,
      source,
    );
  }
}

export function parseRemoteAnswerDocument(value: unknown, questionSet: QuestionSet): AnswerDocument {
  const document = answerDocumentSchema.parse(value);
  assertSupportedQuestionSetRevision(document, questionSet, 'remoto');
  const questions = new Map(questionSet.questions.map((question) => [question.id, question]));

  for (const [questionId, answer] of Object.entries(document.answers)) {
    const question = questions.get(questionId);
    if (question && !question.options.some(({ id }) => id === answer.optionId)) {
      throw new Error(`Opção remota inexistente em ${questionId}`);
    }
  }

  return document;
}
