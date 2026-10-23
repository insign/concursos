import { buildMediaDocumentId, getActiveAlias } from './identity';
import { markLocalStatePending } from './local-durability';
import {
  createEmptyMediaDocument,
  isSameMediaPosition,
  selectMedia,
  shouldWriteSelection,
  upsertMediaPosition,
  type MediaDocument,
  type MediaPosition,
} from './media-state';
import { ensureMediaDocumentLoaded, mediaBeforeRequest } from './media-sync';
import { getLocalMediaRecord, saveMediaDocument } from './offline-db';

export interface MediaContext {
  profileId: string | null;
  documentId: string | null;
}

/**
 * A posição de reprodução pertence ao perfil: sem alias ativo o player funciona,
 * mas nada é persistido — o mesmo contrato já usado pelo botão de conclusão.
 */
export function resolveMediaContext(mediaKey: string): MediaContext {
  const profileId = getActiveAlias();
  return {
    profileId,
    documentId: profileId ? buildMediaDocumentId(profileId, mediaKey) : null,
  };
}

export async function loadMediaDocument(context: MediaContext): Promise<MediaDocument | null> {
  if (!context.documentId) return null;
  const record = await getLocalMediaRecord(context.documentId);
  return record?.current ?? null;
}

export async function saveMediaPosition(
  context: MediaContext,
  contestStorageId: string,
  subjectStorageId: string,
  mediaId: string,
  position: Omit<MediaPosition, 'updatedAt'>,
  trackActivity = true,
): Promise<void> {
  if (!context.profileId || !context.documentId) return;
  const record = await getLocalMediaRecord(context.documentId);
  const current = record?.current.positions[mediaId] ?? null;
  if (isSameMediaPosition(current, position)) return;
  const updatedAt = new Date().toISOString();
  await saveMediaDocument({
    profileId: context.profileId,
    documentId: context.documentId,
    updateCurrent: (existing) => {
      const base = existing ?? createEmptyMediaDocument(contestStorageId, subjectStorageId);
      return upsertMediaPosition(base, mediaId, {
        ...position,
        // Um snapshot iniciado antes da conclusão não pode desmarcá-la ao chegar depois.
        completed: position.completed || base.positions[mediaId]?.completed === true,
      }, updatedAt);
    },
  });
  if (trackActivity) markLocalStatePending();
}

export async function saveMediaSelection(
  context: MediaContext,
  contestStorageId: string,
  subjectStorageId: string,
  mediaId: string,
): Promise<void> {
  if (!context.profileId || !context.documentId) return;
  const record = await getLocalMediaRecord(context.documentId);
  if (!shouldWriteSelection(record?.current.selectedMediaId ?? null, mediaId)) return;
  await saveMediaDocument({
    profileId: context.profileId,
    documentId: context.documentId,
    updateCurrent: (current) => {
      const base = current ?? createEmptyMediaDocument(contestStorageId, subjectStorageId);
      return selectMedia(base, mediaId);
    },
  });
  markLocalStatePending();
}

/**
 * Busca o documento de mídia do assunto no KV. É uma leitura: não adquire lease
 * de escrita e não pode sobrescrever uma edição local ainda pendente, porque a
 * arbitragem por versão decide o que acontece.
 */
export async function loadRemoteMediaDocument(context: MediaContext): Promise<void> {
  if (!context.profileId || !context.documentId) return;
  await ensureMediaDocumentLoaded(context.profileId, context.documentId, {
    ensureLease: async () => {},
    beforeRequest: mediaBeforeRequest,
  });
}
