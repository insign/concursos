import { readKv, writeKv } from './kv-client';
import {
  getLocalMediaRecord,
  listPendingMediaRecords,
  markMediaPending,
  markMediaSynced,
  markMediaSyncError,
  quarantineRemoteDocument,
  storeRemoteMediaDocument,
  type LocalMediaRecord,
} from './offline-db';
import { mediaDocumentSchema, type MediaDocument } from './media-state';

interface RemoteDocument<T> {
  document: T;
  version: number;
  createdAt: string | null;
}

export interface MediaSyncHooks {
  ensureLease: () => Promise<void>;
  beforeRequest: () => Promise<void>;
}

export interface MediaSyncResult {
  failures: number;
  remoteDocumentCount: number;
}

type VersionedLocal = Pick<LocalMediaRecord, 'remoteVersion' | 'outboxState'>;
export type MediaVersionResolution = 'adopt-remote' | 'publish-local' | 'noop';

let lastRequestAt = 0;

/**
 * Espaça as requisições ao KV, como as demais rotinas de sincronização, para
 * não competir com o tráfego das respostas de questões.
 */
export async function mediaBeforeRequest(): Promise<void> {
  const delay = Math.max(0, lastRequestAt + 500 - Date.now());
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  lastRequestAt = Date.now();
}

/**
 * Arbitragem por documento inteiro, igual à dos demais documentos do perfil:
 * o KV é last-write-wins por versão e não oferece comparação condicional.
 */
export function resolveMediaVersionAction(
  local: VersionedLocal | null,
  remoteVersion: number | null,
): MediaVersionResolution {
  if (!local) return remoteVersion === null ? 'noop' : 'adopt-remote';
  if (local.outboxState === 'pending' && local.remoteVersion === null) return 'publish-local';
  const observed = local.remoteVersion ?? 0;
  const current = remoteVersion ?? 0;
  if (current > observed) return 'adopt-remote';
  if (current < observed) return 'publish-local';
  return local.outboxState === 'pending' ? 'publish-local' : 'noop';
}

async function readRemoteMediaDocument(
  profileId: string,
  documentId: string,
  hooks: MediaSyncHooks,
): Promise<RemoteDocument<MediaDocument> | null> {
  await hooks.ensureLease();
  await hooks.beforeRequest();
  const envelope = await readKv(documentId, {
    beforeRetry: async () => {
      await hooks.ensureLease();
      return true;
    },
  });
  await hooks.ensureLease();
  if (!envelope) return null;
  try {
    return {
      document: mediaDocumentSchema.parse(envelope.json),
      version: envelope.version,
      createdAt: envelope.created_at,
    };
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'Documento de mídia remoto inválido';
    await quarantineRemoteDocument({ profileId, documentId, reason, value: envelope.json });
    throw new Error(reason);
  }
}

/**
 * Arbitra o documento de mídia entre o registro local e o remoto. O remoto é
 * lido antes de qualquer publicação, para nunca sobrescrever uma versão mais
 * nova às cegas.
 */
export async function synchronizeMediaDocument(
  profileId: string,
  documentId: string,
  hooks: MediaSyncHooks,
): Promise<void> {
  const record = await getLocalMediaRecord(documentId);
  const remote = await readRemoteMediaDocument(profileId, documentId, hooks);
  const action = resolveMediaVersionAction(record ?? null, remote?.version ?? null);

  if (action === 'noop') return;

  if (action === 'adopt-remote' && remote) {
    if (!record) {
      await storeRemoteMediaDocument({
        profileId,
        documentId,
        document: remote.document,
        remoteVersion: remote.version,
        remoteCreatedAt: remote.createdAt,
      });
      return;
    }
    await markMediaSynced({
      documentId,
      expectedLocalRevision: record.localRevision,
      synchronizedDocument: remote.document,
      remoteVersion: remote.version,
      remoteCreatedAt: remote.createdAt,
      conflictWarning: null,
    });
    return;
  }

  if (!record) return;
  const local = mediaDocumentSchema.parse(record.current);
  await hooks.beforeRequest();
  await hooks.ensureLease();
  const written = await writeKv(documentId, local, {
    beforeRetry: async () => {
      await hooks.ensureLease();
      return true;
    },
  });
  await hooks.ensureLease();
  await markMediaSynced({
    documentId,
    expectedLocalRevision: record.localRevision,
    synchronizedDocument: local,
    remoteVersion: written.version,
    remoteCreatedAt: written.created_at,
    conflictWarning: null,
  });
}

export async function synchronizePendingMedia(
  profileId: string,
  hooks: MediaSyncHooks,
): Promise<MediaSyncResult> {
  const pending = await listPendingMediaRecords(profileId);
  let failures = 0;
  let remoteDocumentCount = 0;
  for (const record of pending) {
    try {
      await synchronizeMediaDocument(profileId, record.documentId, hooks);
      remoteDocumentCount += 1;
    } catch (error) {
      failures += 1;
      await markMediaSyncError(
        record.documentId,
        error instanceof Error ? error.message : 'Falha ao sincronizar mídia',
        null,
      );
    }
  }
  return { failures, remoteDocumentCount };
}

/**
 * Leitura sob demanda do documento de mídia de um assunto. O documento só é
 * buscado quando o assunto é aberto, de modo que a ativação de alias em um
 * aparelho novo não leia nada de mídia.
 */
export async function ensureMediaDocumentLoaded(
  profileId: string,
  documentId: string,
  hooks: MediaSyncHooks,
): Promise<void> {
  const record = await getLocalMediaRecord(documentId);
  const remote = await readRemoteMediaDocument(profileId, documentId, hooks);
  if (!remote) return;
  const action = resolveMediaVersionAction(record ?? null, remote.version);
  if (action === 'adopt-remote') {
    if (!record) {
      await storeRemoteMediaDocument({
        profileId,
        documentId,
        document: remote.document,
        remoteVersion: remote.version,
        remoteCreatedAt: remote.createdAt,
      });
      return;
    }
    await markMediaSynced({
      documentId,
      expectedLocalRevision: record.localRevision,
      synchronizedDocument: remote.document,
      remoteVersion: remote.version,
      remoteCreatedAt: remote.createdAt,
      conflictWarning: null,
    });
    return;
  }
  if (action === 'publish-local' && record && record.outboxState === 'clean') {
    // O documento remoto sumiu ou regrediu: a posição local precisa voltar a
    // ser publicada para sincronizar com os outros aparelhos.
    await markMediaPending(documentId);
  }
}
