import { z } from 'zod';
import { syncQuestionSetSchema } from './content-schema';
import { answerDocumentSchema } from './document-schema';
import { buildAnswerDocumentId, ID_SEGMENT_PATTERN, validateUserAlias } from './identity';
import {
  listProfileAnswerRecords,
  ProfileImportConflictError,
  saveProfileImport,
  whenLocalWritesSettled,
  type LocalAnswerRecord,
} from './offline-db';
import { loadPreferences, preferencesSchema } from './preferences';
import {
  materializeSubjectProgress,
  PREFERENCES_PROGRESS_DIRTY_FIELD,
  progressSubjectId,
  type ProgressDocument,
} from './progress';
import { createEmptyAnswerDocument, reconcileAnswerDocument, type AnswerDocument } from './questionnaire';

const contestStorageIdSchema = z.string().max(20).regex(ID_SEGMENT_PATTERN);
const subjectStorageIdSchema = z.string().max(32).regex(ID_SEGMENT_PATTERN);

const backupAnswerSchema = z
  .object({
    contestStorageId: contestStorageIdSchema,
    subjectStorageId: subjectStorageIdSchema,
    document: answerDocumentSchema,
  })
  .strict();

export const profileBackupSchema = z
  .object({
    schemaVersion: z.literal(1),
    exportedAt: z.string().datetime({ offset: true }),
    sourceAlias: z.string().max(32).regex(ID_SEGMENT_PATTERN),
    answers: z.array(backupAnswerSchema),
    preferences: preferencesSchema,
  })
  .strict()
  .superRefine((backup, context) => {
    const seen = new Set<string>();
    backup.answers.forEach((answer, index) => {
      const subjectId = `${answer.contestStorageId}--${answer.subjectStorageId}`;
      if (seen.has(subjectId)) {
        context.addIssue({
          code: 'custom',
          message: 'O backup contém o mesmo assunto mais de uma vez',
          path: ['answers', index],
        });
      }
      seen.add(subjectId);
    });
  });

const backupCatalogSchema = z
  .object({
    schemaVersion: z.literal(1),
    subjects: z.array(
      z
        .object({
          contestStorageId: contestStorageIdSchema,
          subjectStorageId: subjectStorageIdSchema,
          questionSet: syncQuestionSetSchema,
        })
        .strict(),
    ),
  })
  .strict();

export type ProfileBackup = z.infer<typeof profileBackupSchema>;

export interface ProfileImportResult {
  answerCount: number;
  sourceAlias: string;
  targetAlias: string;
}

function subjectKey(contestStorageId: string, subjectStorageId: string): string {
  return `${contestStorageId}--${subjectStorageId}`;
}

function subjectFromRecord(record: LocalAnswerRecord, profileId: string): ProfileBackup['answers'][number] {
  const parts = record.documentId.split('--');
  if (parts.length !== 4 || parts[0] !== 'concursos' || parts[1] !== profileId) {
    throw new Error(`Documento local inválido para o perfil ${profileId}`);
  }

  const contestStorageId = contestStorageIdSchema.parse(parts[2]);
  const subjectStorageId = subjectStorageIdSchema.parse(parts[3]);
  if (buildAnswerDocumentId(profileId, contestStorageId, subjectStorageId) !== record.documentId) {
    throw new Error(`Documento local inválido para o perfil ${profileId}`);
  }

  return {
    contestStorageId,
    subjectStorageId,
    document: answerDocumentSchema.parse(record.current),
  };
}

async function loadBackupCatalog() {
  const response = await fetch('/sync-catalog.json', { cache: 'no-store' });
  if (!response.ok) throw new Error('Não foi possível carregar o catálogo para validar o backup');
  return backupCatalogSchema.parse(await response.json()).subjects;
}

export function parseProfileBackup(value: unknown): ProfileBackup {
  const parsed = profileBackupSchema.safeParse(value);
  if (!parsed.success) throw new Error('Arquivo de backup inválido ou incompatível.');
  return parsed.data;
}

export async function createProfileBackup(profileId: string, now = new Date()): Promise<ProfileBackup> {
  validateUserAlias(profileId);
  await whenLocalWritesSettled();
  const [records, preferences, catalog] = await Promise.all([
    listProfileAnswerRecords(profileId),
    loadPreferences(profileId),
    loadBackupCatalog(),
  ]);
  const catalogBySubject = new Map(
    catalog.map((subject) => [subjectKey(subject.contestStorageId, subject.subjectStorageId), subject]),
  );
  const answers = records
    .map((record) => subjectFromRecord(record, profileId))
    .flatMap((answer) => {
      const subject = catalogBySubject.get(
        subjectKey(answer.contestStorageId, answer.subjectStorageId),
      );
      return subject
        ? [{ ...answer, document: reconcileAnswerDocument(answer.document, subject.questionSet) }]
        : [];
    })
    .sort((left, right) =>
      subjectKey(left.contestStorageId, left.subjectStorageId).localeCompare(
        subjectKey(right.contestStorageId, right.subjectStorageId),
      ),
    );

  return profileBackupSchema.parse({
    schemaVersion: 1,
    exportedAt: now.toISOString(),
    sourceAlias: profileId,
    answers,
    preferences,
  });
}

export async function importProfileBackup(profileId: string, value: unknown): Promise<ProfileImportResult> {
  const targetAlias = validateUserAlias(profileId);
  const backup = parseProfileBackup(value);
  const catalog = await loadBackupCatalog();
  const catalogBySubject = new Map(
    catalog.map((subject) => [subjectKey(subject.contestStorageId, subject.subjectStorageId), subject]),
  );
  const answers = backup.answers.map((answer) => {
    const subject = catalogBySubject.get(subjectKey(answer.contestStorageId, answer.subjectStorageId));
    if (!subject) {
      throw new Error(
        `O assunto ${answer.contestStorageId}/${answer.subjectStorageId} não existe no catálogo atual.`,
      );
    }
    const documentId = buildAnswerDocumentId(
      targetAlias,
      answer.contestStorageId,
      answer.subjectStorageId,
    );
    const document = reconcileAnswerDocument(
      answer.document,
      subject.questionSet,
    );
    return {
      documentId,
      document,
      dirtyQuestionIds: subject.questionSet.questions.map((question) => question.id),
    };
  });
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const existingRecords = await listProfileAnswerRecords(targetAlias);
    const existingByDocumentId = new Map(existingRecords.map((record) => [record.documentId, record]));
    const finalDocuments = new Map<string, AnswerDocument>(
      existingRecords.map((record) => [record.documentId, record.current]),
    );
    answers.forEach((answer) => finalDocuments.set(answer.documentId, answer.document));

    const progressSubjects: ProgressDocument['subjects'] = {};
    for (const subject of catalog) {
      const documentId = buildAnswerDocumentId(
        targetAlias,
        subject.contestStorageId,
        subject.subjectStorageId,
      );
      const existing = existingByDocumentId.get(documentId);
      const document = reconcileAnswerDocument(
        finalDocuments.get(documentId) ?? createEmptyAnswerDocument(subject.questionSet.questionSetRevision),
        subject.questionSet,
      );
      progressSubjects[progressSubjectId(subject.contestStorageId, subject.subjectStorageId)] =
        materializeSubjectProgress(
          subject.questionSet,
          document,
          backup.preferences.correctionMode,
          existing?.remoteVersion ?? 0,
        );
    }

    try {
      await saveProfileImport({
        profileId: targetAlias,
        answers,
        expectedAnswers: existingRecords.map(({ documentId, localRevision, remoteVersion, updatedAt }) => ({
          documentId,
          localRevision,
          remoteVersion,
          updatedAt,
        })),
        preferences: backup.preferences,
        progress: { schemaVersion: 1, subjects: progressSubjects },
        progressDirtyFields: [PREFERENCES_PROGRESS_DIRTY_FIELD, ...Object.keys(progressSubjects)],
      });
      return { answerCount: answers.length, sourceAlias: backup.sourceAlias, targetAlias };
    } catch (error) {
      if (!(error instanceof ProfileImportConflictError) || attempt === 2) throw error;
    }
  }

  throw new Error('As respostas locais continuaram mudando. Tente importar novamente.');
}
