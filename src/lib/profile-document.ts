import { z } from 'zod';
import { validateUserAlias } from './identity';

export const PROFILE_SCHEMA_VERSION = 1;

/**
 * Perfil consolidado: um único documento remoto por alias. A existência de
 * qualquer seção passa a ser conhecida em uma única leitura, eliminando a
 * sondagem O(catálogo) da ativação.
 */
export const profileDocumentSchema = z
  .object({
    schemaVersion: z.literal(PROFILE_SCHEMA_VERSION),
    answers: z.record(z.string(), z.unknown()),
    preferences: z.unknown().optional(),
    estudados: z.unknown().optional(),
    leitura: z.unknown().optional(),
    progresso: z.unknown().optional(),
    navegacao: z.unknown().optional(),
    simuladosIndice: z.unknown().optional(),
    simuladosDetalhes: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();

export type ProfileDocument = z.infer<typeof profileDocumentSchema>;
export type ProfileSectionName = Exclude<keyof ProfileDocument, 'schemaVersion'>;

export function profileDocumentId(alias: string): string {
  return `concursos--${validateUserAlias(alias)}--perfil`;
}

export function profileAnswerKey(contestStorageId: string, subjectStorageId: string): string {
  return `${contestStorageId}--${subjectStorageId}`;
}

export function emptyProfileDocument(): ProfileDocument {
  return { schemaVersion: PROFILE_SCHEMA_VERSION, answers: {} };
}

export function parseProfileDocument(json: unknown): ProfileDocument | null {
  const result = profileDocumentSchema.safeParse(json);
  return result.success ? result.data : null;
}
