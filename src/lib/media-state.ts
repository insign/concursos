import { z } from 'zod';

/**
 * Limiar de conclusão por consumo da mídia. O assunto só é marcado como estudado
 * quando o usuário percorreu a maior parte da linha do tempo.
 */
export const MEDIA_COMPLETION_RATIO = 0.9;
export const MEDIA_SHORT_COMPLETION_RATIO = 0.95;
export const MEDIA_SHORT_DURATION_SECONDS = 120;
export const MEDIA_MAX_POSITIONS = 16;

const mediaIdPattern = /^[a-f0-9]{64}$/;

export const mediaPositionSchema = z
  .object({
    positionSeconds: z.number().nonnegative(),
    durationSeconds: z.number().nonnegative(),
    completed: z.boolean(),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .strict();

export const mediaDocumentSchema = z
  .object({
    schemaVersion: z.literal(1),
    contestStorageId: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    subjectStorageId: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    selectedMediaId: z.string().regex(mediaIdPattern).nullable(),
    positions: z.record(z.string().regex(mediaIdPattern), mediaPositionSchema),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .strict()
  .superRefine((document, context) => {
    const count = Object.keys(document.positions).length;
    if (count > MEDIA_MAX_POSITIONS) {
      context.addIssue({
        code: 'custom',
        message: `O documento de mídia aceita no máximo ${MEDIA_MAX_POSITIONS} posições`,
        path: ['positions'],
      });
    }
  });

export type MediaPosition = z.infer<typeof mediaPositionSchema>;
export type MediaDocument = z.infer<typeof mediaDocumentSchema>;

export const EMPTY_MEDIA_DOCUMENT: MediaDocument = {
  schemaVersion: 1,
  contestStorageId: '',
  subjectStorageId: '',
  selectedMediaId: null,
  positions: {},
  updatedAt: '1970-01-01T00:00:00.000Z',
};

export function createEmptyMediaDocument(
  contestStorageId: string,
  subjectStorageId: string,
): MediaDocument {
  return {
    ...EMPTY_MEDIA_DOCUMENT,
    contestStorageId,
    subjectStorageId,
  };
}

export function mediaPositionFor(
  document: MediaDocument,
  mediaId: string,
): MediaPosition | null {
  return document.positions[mediaId] ?? null;
}

/**
 * Atualiza a posição de uma mídia preservando as demais. Ao atingir o limite de
 * posições, a mais antiga é descartada para que o documento continue crescendo
 * dentro do contrato de sincronização.
 */
export function upsertMediaPosition(
  document: MediaDocument,
  mediaId: string,
  position: Omit<MediaPosition, 'updatedAt'>,
  updatedAt: string,
): MediaDocument {
  const positions: Record<string, MediaPosition> = {
    ...document.positions,
    [mediaId]: { ...position, updatedAt },
  };

  const ids = Object.keys(positions);
  if (ids.length > MEDIA_MAX_POSITIONS) {
    const oldest = ids
      .map((id) => ({ id, updatedAt: positions[id]!.updatedAt }))
      .sort((left, right) => left.updatedAt.localeCompare(right.updatedAt))[0];
    if (oldest) {
      delete positions[oldest.id];
    }
  }

  return {
    ...document,
    positions,
    updatedAt,
  };
}

export function selectMedia(document: MediaDocument, mediaId: string | null): MediaDocument {
  return {
    ...document,
    selectedMediaId: mediaId,
  };
}

/**
 * Verdadeiro quando a mídia foi percorrida o suficiente para contar como concluída.
 * Mídias curtas exigem um limiar maior, para não concluir por um salto breve.
 */
export function completionRatioReached(positionSeconds: number, durationSeconds: number): boolean {
  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) return false;
  if (!Number.isFinite(positionSeconds) || positionSeconds <= 0) return false;
  const threshold =
    durationSeconds < MEDIA_SHORT_DURATION_SECONDS
      ? MEDIA_SHORT_COMPLETION_RATIO
      : MEDIA_COMPLETION_RATIO;
  return positionSeconds / durationSeconds >= threshold;
}

/**
 * O assunto é marcado automaticamente quando a mídia disponível foi concluída:
 * a única mídia do assunto ou, com várias, todas elas.
 */
export function shouldMarkSubjectStudied(input: {
  itemCount: number;
  completedCount: number;
  alreadyStudied: boolean;
}): boolean {
  if (input.alreadyStudied) return false;
  if (input.itemCount <= 0) return false;
  return input.completedCount >= input.itemCount;
}
