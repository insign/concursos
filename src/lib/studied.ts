import { z } from 'zod';
import { getSharedDocumentRecord, updateSharedDocuments } from './offline-db';

const studiedSubjectIdRegex = /^[a-z0-9-]+--[a-z0-9-]+$/;

export const studiedSchema = z
  .object({
    schemaVersion: z.literal(1),
    // IDs de assunto estudados no formato <contestStorageId>--<subjectStorageId>.
    studiedSubjectIds: z.array(z.string().regex(studiedSubjectIdRegex)),
    // Informativo apenas; NUNCA participa de merge ou arbitragem (que são por versão do KV).
    updatedAt: z.string().datetime({ offset: true }),
  })
  .strict();

export type StudiedDocument = z.infer<typeof studiedSchema>;

export const EMPTY_STUDIED: StudiedDocument = {
  schemaVersion: 1,
  studiedSubjectIds: [],
  updatedAt: '1970-01-01T00:00:00.000Z',
};

export function studiedSubjectId(contestStorageId: string, subjectStorageId: string): string {
  return `${contestStorageId}--${subjectStorageId}`;
}

export function isStudied(document: StudiedDocument, subjectId: string): boolean {
  return document.studiedSubjectIds.includes(subjectId);
}

/**
 * Aplica a marcação de um único assunto a um documento de estudados, preservando os
 * demais IDs (lista ordenada e sem duplicatas). Função pura para permitir cobertura
 * unitária; o merge concorrente entre abas ocorre porque `setSubjectStudied` sempre
 * parte do registro IndexedDB mais recente.
 */
export function toggleStudiedIds(
  current: StudiedDocument,
  subjectId: string,
  studied: boolean,
  updatedAt: string,
): StudiedDocument {
  const ids = new Set(current.studiedSubjectIds);
  if (studied) ids.add(subjectId);
  else ids.delete(subjectId);
  return { schemaVersion: 1, studiedSubjectIds: [...ids].sort(), updatedAt };
}

export async function loadStudied(profileId: string): Promise<StudiedDocument> {
  const record = await getSharedDocumentRecord('estudados', profileId);
  const parsed = studiedSchema.safeParse(record?.current);
  return parsed.success ? parsed.data : EMPTY_STUDIED;
}

export async function setSubjectStudied(
  profileId: string,
  subjectId: string,
  studied: boolean,
): Promise<void> {
  const updatedAt = new Date().toISOString();
  await updateSharedDocuments(profileId, [
    {
      storeName: 'estudados',
      dirtyFields: [subjectId],
      updateCurrent: (current) => {
        const parsed = studiedSchema.safeParse(current);
        return toggleStudiedIds(
          parsed.success ? parsed.data : EMPTY_STUDIED,
          subjectId,
          studied,
          updatedAt,
        );
      },
    },
  ]);
}
