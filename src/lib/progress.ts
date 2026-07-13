import { z } from 'zod';
import { questionSetSchema, type QuestionSet } from './content-schema';
import { buildAnswerDocumentId } from './identity';
import { getLocalAnswerRecord, getSharedDocumentRecord, saveSharedDocument } from './offline-db';
import { loadPreferences } from './preferences';
import {
  createEmptyAnswerDocument,
  isSubmissionValid,
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
  questionSet: QuestionSet,
  document: AnswerDocument,
  correctionMode: CorrectionMode,
  answerVersion: number,
): ProgressSubject {
  const score = scoreAnswers(questionSet, document.answers);
  const submitted = isSubmissionValid(document, questionSet);
  return {
    answered: score.answered,
    total: score.total,
    ...(correctionMode === 'immediate' || submitted ? { correct: score.correct } : {}),
    submitted,
    questionSetRevision: questionSet.questionSetRevision,
    answerVersion,
  };
}

export function mergeProgress(local: ProgressDocument, remote: ProgressDocument | null): ProgressDocument {
  if (!remote) return local;
  const subjects = { ...local.subjects };

  for (const [id, remoteSubject] of Object.entries(remote.subjects)) {
    const localSubject = subjects[id];
    if (!localSubject || remoteSubject.answerVersion > localSubject.answerVersion) {
      subjects[id] = remoteSubject;
    }
  }
  return { schemaVersion: 1, subjects };
}

export async function loadProgress(profileId: string): Promise<ProgressDocument> {
  const record = await getSharedDocumentRecord('progress', profileId);
  const parsed = progressSchema.safeParse(record?.current);
  return parsed.success ? parsed.data : EMPTY_PROGRESS;
}

export async function updateSubjectProgress(
  profileId: string,
  subjectId: string,
  subject: ProgressSubject,
): Promise<void> {
  const current = await loadProgress(profileId);
  await saveSharedDocument(
    'progress',
    profileId,
    { schemaVersion: 1, subjects: { ...current.subjects, [subjectId]: subject } },
    [subjectId],
  );
}

export async function invalidateProgressForCorrectionMode(
  profileId: string,
  correctionMode: CorrectionMode,
): Promise<void> {
  const current = await loadProgress(profileId);
  const subjects = Object.fromEntries(
    Object.entries(current.subjects).map(([subjectId, subject]) => {
      if (correctionMode === 'immediate' || subject.submitted || subject.correct === undefined) {
        return [subjectId, subject];
      }
      const { correct: _correct, ...withoutCorrect } = subject;
      return [subjectId, withoutCorrect];
    }),
  );
  await saveSharedDocument(
    'progress',
    profileId,
    { schemaVersion: 1, subjects },
    [PREFERENCES_PROGRESS_DIRTY_FIELD],
  );
}

const repairCatalogSchema = z.object({
  schemaVersion: z.literal(1),
  subjects: z.array(
    z.object({
      contestStorageId: z.string(),
      subjectStorageId: z.string(),
      questionSet: questionSetSchema,
    }),
  ),
});

export async function recalculateProgress(profileId: string): Promise<number> {
  const response = await fetch('/sync-catalog.json', { cache: 'no-store' });
  if (!response.ok) throw new Error('Não foi possível carregar o catálogo para recalcular o progresso');
  const catalog = repairCatalogSchema.parse(await response.json());
  const preferences = await loadPreferences(profileId);

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
      materializeSubjectProgress(
        subject.questionSet,
        document,
        preferences.correctionMode,
        record?.remoteVersion ?? 0,
      ),
    );
  }

  return catalog.subjects.length;
}
