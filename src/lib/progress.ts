import { z } from 'zod';
import { syncQuestionSetSchema, type AnswerableQuestionSet } from './content-schema';
import { buildAnswerDocumentId } from './identity';
import { getLocalAnswerRecord, getSharedDocumentRecord, updateSharedDocuments } from './offline-db';
import { DEFAULT_PREFERENCES, preferencesSchema } from './preferences';
import {
  createEmptyAnswerDocument,
  isSubmissionValid,
  reconcileAnswerDocument,
  scoreAnswers,
  type AnswerDocument,
  type CorrectionMode,
} from './questionnaire';

export const progressSubjectSchema = z
  .object({
    answered: z.number().int().nonnegative(),
    total: z.number().int().nonnegative(),
    correct: z.number().int().nonnegative().optional(),
    submitted: z.boolean(),
    questionSetRevision: z.number().int().positive(),
    answerVersion: z.number().int().nonnegative(),
  })
  .strict();

export const progressSchema = z
  .object({
    schemaVersion: z.literal(1),
    subjects: z.record(z.string().regex(/^[a-z0-9-]+--[a-z0-9-]+$/), progressSubjectSchema),
  })
  .strict();

export type ProgressSubject = z.infer<typeof progressSubjectSchema>;
export type ProgressDocument = z.infer<typeof progressSchema>;

export const EMPTY_PROGRESS: ProgressDocument = { schemaVersion: 1, subjects: {} };
export const PREFERENCES_PROGRESS_DIRTY_FIELD = '__preferences__';

export function progressSubjectId(contestStorageId: string, subjectStorageId: string): string {
  return `${contestStorageId}--${subjectStorageId}`;
}

export function materializeSubjectProgress(
  questionSet: AnswerableQuestionSet,
  document: AnswerDocument,
  correctionMode: CorrectionMode,
  answerVersion: number,
): ProgressSubject {
  const reconciled = reconcileAnswerDocument(document, questionSet);
  const score = scoreAnswers(questionSet, reconciled.answers);
  const submitted = isSubmissionValid(reconciled, questionSet);
  return {
    answered: score.answered,
    total: score.total,
    ...(correctionMode === 'immediate' || submitted ? { correct: score.correct } : {}),
    submitted,
    questionSetRevision: questionSet.questionSetRevision,
    answerVersion,
  };
}

export function sanitizeProgressForCorrectionMode(
  progress: ProgressDocument,
  correctionMode: CorrectionMode | undefined,
): { document: ProgressDocument; changed: boolean } {
  if (correctionMode !== 'on-submit') return { document: progress, changed: false };
  let changed = false;
  const subjects = Object.fromEntries(
    Object.entries(progress.subjects).map(([subjectId, subject]) => {
      if (subject.submitted || subject.correct === undefined) return [subjectId, subject];
      changed = true;
      const { correct: _correct, ...withoutCorrect } = subject;
      return [subjectId, withoutCorrect];
    }),
  );
  return { document: changed ? { schemaVersion: 1, subjects } : progress, changed };
}

export async function loadProgress(profileId: string): Promise<ProgressDocument> {
  const record = await getSharedDocumentRecord('progress', profileId);
  const parsed = progressSchema.safeParse(record?.current);
  return parsed.success ? parsed.data : EMPTY_PROGRESS;
}

export async function updateSubjectProgress(
  profileId: string,
  subjectId: string,
  questionSet: AnswerableQuestionSet,
  document: AnswerDocument,
  answerVersion: number,
): Promise<void> {
  await updateSharedDocuments(profileId, [
    {
      storeName: 'progress',
      dirtyFields: [subjectId],
      updateCurrent: (current, documents) => {
        const parsed = progressSchema.safeParse(current);
        const preferences = preferencesSchema.safeParse(documents.preferences);
        return {
          schemaVersion: 1,
          subjects: {
            ...(parsed.success ? parsed.data.subjects : {}),
            [subjectId]: materializeSubjectProgress(
              questionSet,
              document,
              preferences.success
                ? preferences.data.correctionMode
                : DEFAULT_PREFERENCES.correctionMode,
              answerVersion,
            ),
          },
        };
      },
    },
  ]);
}

const repairCatalogSchema = z.object({
  schemaVersion: z.literal(1),
  subjects: z.array(
    z.object({
      contestStorageId: z.string(),
      subjectStorageId: z.string(),
      questionSet: syncQuestionSetSchema,
    }),
  ),
});

export async function recalculateProgress(profileId: string): Promise<number> {
  const response = await fetch('/sync-catalog.json', { cache: 'no-store' });
  if (!response.ok) throw new Error('Não foi possível carregar o catálogo para recalcular o progresso');
  const catalog = repairCatalogSchema.parse(await response.json());

  for (const subject of catalog.subjects) {
    const documentId = buildAnswerDocumentId(
      profileId,
      subject.contestStorageId,
      subject.subjectStorageId,
    );
    const record = await getLocalAnswerRecord(documentId);
    const document = record?.current ?? createEmptyAnswerDocument(subject.questionSet.questionSetRevision);
    await updateSubjectProgress(
      profileId,
      progressSubjectId(subject.contestStorageId, subject.subjectStorageId),
      subject.questionSet,
      document,
      record?.remoteVersion ?? 0,
    );
  }

  return catalog.subjects.length;
}
