import { z } from 'zod';

const nonEmptyText = z.string().trim().min(1);
const stableId = z.string().regex(/^[A-Za-z0-9_-]{1,64}$/);
const storageSegment = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const contestSchema = z
  .object({
    schemaVersion: z.literal(1),
    title: nonEmptyText,
    description: nonEmptyText,
    order: z.number().int().nonnegative(),
    storageId: storageSegment.max(20),
  })
  .strict();

export const groupSchema = z
  .object({
    schemaVersion: z.literal(1),
    title: nonEmptyText,
    order: z.number().int().nonnegative(),
    description: nonEmptyText.optional(),
  })
  .strict();

export const subjectSchema = z
  .object({
    schemaVersion: z.literal(1),
    title: nonEmptyText,
    description: nonEmptyText,
    order: z.number().int().nonnegative(),
    storageId: storageSegment.max(32),
  })
  .strict();

export const cheatSheetSchema = z.object({}).strict();

export const questionOptionSchema = z
  .object({
    id: stableId,
    text: nonEmptyText,
  })
  .strict();

export const questionOriginSchema = z.enum(['authorial', 'previous_exam']);

const questionCoreSchema = z
  .object({
    id: stableId,
    revision: z.number().int().positive(),
    prompt: nonEmptyText,
    options: z.array(questionOptionSchema).min(2),
    correctOptionId: stableId,
    explanation: nonEmptyText,
  })
  .strict();

export const syncQuestionSchema = questionCoreSchema
  .superRefine((question, context) => {
    const optionIds = new Set<string>();

    for (const [index, option] of question.options.entries()) {
      if (optionIds.has(option.id)) {
        context.addIssue({
          code: 'custom',
          message: `ID de opção duplicado: ${option.id}`,
          path: ['options', index, 'id'],
        });
      }
      optionIds.add(option.id);
    }

    if (!optionIds.has(question.correctOptionId)) {
      context.addIssue({
        code: 'custom',
        message: 'correctOptionId deve referenciar uma opção existente',
        path: ['correctOptionId'],
      });
    }
  });

export const questionSchema = questionCoreSchema
  .extend({ origin: questionOriginSchema })
  .strict()
  .superRefine((question, context) => {
    const optionIds = new Set<string>();

    for (const [index, option] of question.options.entries()) {
      if (optionIds.has(option.id)) {
        context.addIssue({
          code: 'custom',
          message: `ID de opção duplicado: ${option.id}`,
          path: ['options', index, 'id'],
        });
      }
      optionIds.add(option.id);
    }

    if (!optionIds.has(question.correctOptionId)) {
      context.addIssue({
        code: 'custom',
        message: 'correctOptionId deve referenciar uma opção existente',
        path: ['correctOptionId'],
      });
    }
  });

export const syncQuestionSetSchema = z
  .object({
    schemaVersion: z.literal(1),
    questionSetRevision: z.number().int().positive(),
    questions: z.array(syncQuestionSchema).min(1),
  })
  .strict()
  .superRefine((questionSet, context) => {
    const questionIds = new Set<string>();

    for (const [index, question] of questionSet.questions.entries()) {
      if (questionIds.has(question.id)) {
        context.addIssue({
          code: 'custom',
          message: `ID de questão duplicado: ${question.id}`,
          path: ['questions', index, 'id'],
        });
      }
      questionIds.add(question.id);
    }
  });

export const questionSetSchema = z
  .object({
    schemaVersion: z.literal(1),
    questionSetRevision: z.number().int().positive(),
    questions: z.array(questionSchema).min(1),
  })
  .strict()
  .superRefine((questionSet, context) => {
    const questionIds = new Set<string>();

    for (const [index, question] of questionSet.questions.entries()) {
      if (questionIds.has(question.id)) {
        context.addIssue({
          code: 'custom',
          message: `ID de questão duplicado: ${question.id}`,
          path: ['questions', index, 'id'],
        });
      }
      questionIds.add(question.id);
    }
  });

export type ContestData = z.infer<typeof contestSchema>;
export type GroupData = z.infer<typeof groupSchema>;
export type SubjectData = z.infer<typeof subjectSchema>;
export type QuestionOption = z.infer<typeof questionOptionSchema>;
export type QuestionOrigin = z.infer<typeof questionOriginSchema>;
export type SyncQuestion = z.infer<typeof syncQuestionSchema>;
export type Question = z.infer<typeof questionSchema>;
export type SyncQuestionSet = z.infer<typeof syncQuestionSetSchema>;
export type QuestionSet = z.infer<typeof questionSetSchema>;
export type AnswerableQuestionSet = {
  schemaVersion: 1;
  questionSetRevision: number;
  questions: Array<Pick<Question, 'id' | 'revision' | 'options' | 'correctOptionId'>>;
};
