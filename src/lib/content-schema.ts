import { z } from 'zod';
import { isValidCalendarDate } from './exam-date';
import { MEDIA_FILE_NAME_PATTERN } from './media-paths';

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
    examDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato inválido. Utilize AAAA-MM-DD.')
      .refine(isValidCalendarDate, 'Data inexistente no calendário civil.')
      .nullable(),
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

export const megaReviewSchema = z
  .object({
    schemaVersion: z.literal(1),
    slug: storageSegment.max(64),
    title: nonEmptyText.optional(),
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

export const vinculoSchema = z
  .object({
    schemaVersion: z.literal(1),
    canonical: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)+$/),
    order: z.number().int().nonnegative(),
  })
  .strict();

export const megaReviewVinculoSchema = z
  .object({
    schemaVersion: z.literal(1),
    canonical: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/),
  })
  .strict();

export const cheatSheetSchema = z.object({}).strict();

export const mediaCatalogItemSchema = z
  .object({
    file: z.string().regex(MEDIA_FILE_NAME_PATTERN),
    sha256: z.string().regex(/^[a-f0-9]{64}$/),
    bytes: z.number().int().positive(),
  })
  .strict();

export const mediaCatalogSchema = z
  .object({
    schemaVersion: z.literal(1),
    items: z.array(mediaCatalogItemSchema).min(1).max(16),
  })
  .strict()
  .superRefine((catalog, context) => {
    const seenFiles = new Set<string>();
    const seenDigests = new Set<string>();
    catalog.items.forEach((item, index) => {
      if (seenFiles.has(item.file)) {
        context.addIssue({
          code: 'custom',
          message: `Arquivo de mídia duplicado: "${item.file}"`,
          path: ['items', index, 'file'],
        });
      }
      seenFiles.add(item.file);
      if (seenDigests.has(item.sha256)) {
        context.addIssue({
          code: 'custom',
          message: `Conteúdo de mídia duplicado: "${item.sha256}" já aparece em outro arquivo`,
          path: ['items', index, 'sha256'],
        });
      }
      seenDigests.add(item.sha256);
    });
  });

export const referenceSchema = z.object({}).strict();

export const resolutionSchema = z
  .object({
    schemaVersion: z.literal(1),
    questionRevision: z.number().int().positive(),
    title: nonEmptyText.optional(),
  })
  .strict();

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
export type MegaReviewData = z.infer<typeof megaReviewSchema>;
export type MegaReviewVinculoData = z.infer<typeof megaReviewVinculoSchema>;
export type SubjectData = z.infer<typeof subjectSchema>;
export type ReferenceData = z.infer<typeof referenceSchema>;
export type MediaCatalogItemData = z.infer<typeof mediaCatalogItemSchema>;
export type MediaCatalogData = z.infer<typeof mediaCatalogSchema>;
export type ResolutionData = z.infer<typeof resolutionSchema>;
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
