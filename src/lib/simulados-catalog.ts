import { z } from 'zod';
import { questionOptionSchema, questionOriginSchema } from './content-schema';

const storageSegment = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const stableId = z.string().regex(/^[A-Za-z0-9_-]{1,64}$/);

export const simuladoAvailabilitySchema = z
  .object({
    all: z.number().int().nonnegative(),
    authorial: z.number().int().nonnegative(),
    previous_exam: z.number().int().nonnegative(),
  })
  .strict();

export const simuladoCatalogSubjectSchema = z
  .object({
    storageId: storageSegment.max(32),
    slug: storageSegment,
    title: z.string().trim().min(1),
    order: z.number().int().nonnegative(),
    counts: simuladoAvailabilitySchema,
  })
  .strict();

export const simuladoCatalogContestSchema = z
  .object({
    storageId: storageSegment.max(20),
    slug: storageSegment,
    title: z.string().trim().min(1),
    order: z.number().int().nonnegative(),
    subjects: z.array(simuladoCatalogSubjectSchema),
  })
  .strict();

export const simuladosCatalogSchema = z
  .object({
    schemaVersion: z.literal(1),
    contests: z.array(simuladoCatalogContestSchema),
  })
  .strict();

export const simuladoPoolQuestionSchema = z
  .object({
    questionId: stableId,
    questionRevision: z.number().int().positive(),
    origin: questionOriginSchema,
    prompt: z.string().trim().min(1),
    options: z.array(questionOptionSchema).min(2),
    correctOptionId: stableId,
    explanation: z.string().trim().min(1),
  })
  .strict();

export const simuladoPoolSubjectSchema = z
  .object({
    subjectStorageId: storageSegment.max(32),
    subjectSlug: storageSegment,
    title: z.string().trim().min(1),
    questions: z.array(simuladoPoolQuestionSchema),
  })
  .strict();

export const simuladoPoolSchema = z
  .object({
    schemaVersion: z.literal(1),
    contestStorageId: storageSegment.max(20),
    contestSlug: storageSegment,
    contestTitle: z.string().trim().min(1),
    subjects: z.array(simuladoPoolSubjectSchema),
  })
  .strict();

export type SimuladosCatalog = z.infer<typeof simuladosCatalogSchema>;
export type SimuladoCatalogContest = z.infer<typeof simuladoCatalogContestSchema>;
export type SimuladoCatalogSubject = z.infer<typeof simuladoCatalogSubjectSchema>;
export type SimuladoPoolPayload = z.infer<typeof simuladoPoolSchema>;
