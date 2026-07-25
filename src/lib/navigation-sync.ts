import { buildNavigationDocumentId } from './identity';
import { readKv, writeKv } from './kv-client';
import {
  getNavigationRecord,
  markNavigationRemoteRejected,
  markNavigationSynced,
  markNavigationSyncError,
  shouldDeferNavigationSync,
  whenNavigationWritesSettled,
  type LocalNavigationRecord,
} from './navigation-db';
import {
  navigationDocumentSchema,
  resolveNavigationVersionAction,
  type NavigationDocument,
} from './navigation';
import { quarantineRemoteDocument } from './offline-db';

export interface NavigationSyncHooks {
  ensureLease: () => Promise<void>;
  beforeRequest: () => Promise<void>;
}

export interface RemoteNavigationDocument {
  document: NavigationDocument;
  version: number;
  createdAt: string | null;
}

export interface NavigationPreflight {
  remote: RemoteNavigationDocument | null;
}

export interface NavigationSyncResult {
  failures: number;
  remoteVersion: number | null;
  adoptedRemote: boolean;
}

const rejectedRemoteByProfile = new Map<string, string>();

function remoteRejectionKey(version: number, createdAt: string | null): string {
  return `${createdAt ?? 'sem-data'}:${version}`;
}

function recreationWarning(
  record: LocalNavigationRecord,
  remoteVersion: number | null,
  remoteCreatedAt: string | null,
): string | null {
  if (record.remoteVersion !== null && (remoteVersion === null || remoteVersion < record.remoteVersion)) {
    return 'A versão remota de navegação regrediu; o documento foi tratado como uma nova criação.';
  }
  if (record.remoteCreatedAt && remoteCreatedAt && record.remoteCreatedAt !== remoteCreatedAt) {
    return 'A data de criação remota da navegação mudou; o documento foi tratado como uma nova criação.';
  }
  return null;
}

async function parseRemoteNavigation(
  profileId: string,
  documentId: string,
  envelope: Awaited<ReturnType<typeof readKv>>,
): Promise<RemoteNavigationDocument | null> {
  if (!envelope) return null;
  const parsed = navigationDocumentSchema.safeParse(envelope.json);
  if (!parsed.success) {
    const reason = 'Documento remoto de navegação inválido';
    const rejectionKey = remoteRejectionKey(envelope.version, envelope.created_at);
    const repeatedInSession = rejectedRemoteByProfile.get(profileId) === rejectionKey;
    const firstLocalRejection = await markNavigationRemoteRejected(
      profileId,
      envelope.version,
      envelope.created_at,
    );
    if (!repeatedInSession && firstLocalRejection) {
      await quarantineRemoteDocument({
        profileId,
        documentId,
        reason: `${reason} (versão ${envelope.version}, criação ${envelope.created_at ?? 'desconhecida'})`,
        value: envelope.json,
      });
    }
    rejectedRemoteByProfile.set(profileId, rejectionKey);
    throw new Error(reason);
  }

  rejectedRemoteByProfile.delete(profileId);
  return {
    document: parsed.data,
    version: envelope.version,
    createdAt: envelope.created_at,
  };
}

// A retomada inicial só lê o documento remoto e, quando necessário, o adota no
// IndexedDB. Não publica a outbox e não ocupa o lease compartilhado dos documentos
// editoriais, evitando atrasar progresso, importação e simulados no primeiro paint.
export async function bootstrapNavigation(profileId: string): Promise<NavigationSyncResult> {
  await whenNavigationWritesSettled();
  const documentId = buildNavigationDocumentId(profileId);
  const record = await getNavigationRecord(profileId);
  if (await shouldDeferNavigationSync(profileId)) {
    return { failures: 1, remoteVersion: record?.remoteVersion ?? null, adoptedRemote: false };
  }

  try {
    const remote = await parseRemoteNavigation(
      profileId,
      documentId,
      await readKv(documentId, { timeoutMs: 3_000, retries: 0 }),
    );
    const action = resolveNavigationVersionAction(
      record ?? null,
      remote?.version ?? null,
      remote?.createdAt ?? null,
    );

    // O bootstrap nunca publica. Uma pendência local permanece para a sincronização
    // coordenada; um remoto ausente também não ressuscita um registro local limpo.
    if (!remote || action !== 'adopt-remote') {
      return { failures: 0, remoteVersion: record?.remoteVersion ?? null, adoptedRemote: false };
    }

    await markNavigationSynced({
      profileId,
      expectedLocalRevision: record?.localRevision ?? 0,
      expectedRemoteVersion: record?.remoteVersion ?? null,
      expectedRemoteCreatedAt: record?.remoteCreatedAt ?? null,
      synchronizedDocument: remote.document,
      remoteVersion: remote.version,
      remoteCreatedAt: remote.createdAt,
      conflictWarning: record ? recreationWarning(record, remote.version, remote.createdAt) : null,
    });
    return { failures: 0, remoteVersion: remote.version, adoptedRemote: true };
  } catch (error) {
    await markNavigationSyncError(
      profileId,
      error instanceof Error ? error.message : 'Falha ao carregar a navegação remota',
    );
    throw error;
  }
}

export async function readNavigationPreflight(
  profileId: string,
  hooks: NavigationSyncHooks,
): Promise<NavigationPreflight> {
  await hooks.ensureLease();
  await hooks.beforeRequest();
  await hooks.ensureLease();
  const documentId = buildNavigationDocumentId(profileId);
  const envelope = await readKv(documentId, {
    beforeRetry: async () => {
      await hooks.ensureLease();
      return true;
    },
  });
  await hooks.ensureLease();
  return { remote: await parseRemoteNavigation(profileId, documentId, envelope) };
}

export async function applyNavigationPreflight(
  profileId: string,
  preflight: NavigationPreflight,
  hooks: NavigationSyncHooks,
): Promise<NavigationSyncResult> {
  await whenNavigationWritesSettled();
  const record = await getNavigationRecord(profileId);
  const action = resolveNavigationVersionAction(
    record ?? null,
    preflight.remote?.version ?? null,
    preflight.remote?.createdAt ?? null,
  );

  if (action === 'noop') {
    return {
      failures: 0,
      remoteVersion: preflight.remote?.version ?? record?.remoteVersion ?? null,
      adoptedRemote: false,
    };
  }

  if (action === 'adopt-remote' && preflight.remote) {
    await markNavigationSynced({
      profileId,
      expectedLocalRevision: record?.localRevision ?? 0,
      expectedRemoteVersion: record?.remoteVersion ?? null,
      expectedRemoteCreatedAt: record?.remoteCreatedAt ?? null,
      synchronizedDocument: preflight.remote.document,
      remoteVersion: preflight.remote.version,
      remoteCreatedAt: preflight.remote.createdAt,
      conflictWarning: record
        ? recreationWarning(record, preflight.remote.version, preflight.remote.createdAt)
        : null,
    });
    return { failures: 0, remoteVersion: preflight.remote.version, adoptedRemote: true };
  }

  if (!record) return { failures: 0, remoteVersion: preflight.remote?.version ?? null, adoptedRemote: false };

  const local = navigationDocumentSchema.parse(record.current);
  await hooks.beforeRequest();
  await hooks.ensureLease();
  const written = await writeKv(buildNavigationDocumentId(profileId), local, {
    beforeRetry: async () => {
      await hooks.ensureLease();
      const latest = await getNavigationRecord(profileId);
      return (
        latest?.localRevision === record.localRevision &&
        latest.remoteVersion === record.remoteVersion &&
        latest.remoteCreatedAt === record.remoteCreatedAt
      );
    },
  });
  await hooks.ensureLease();
  const expectedVersion = preflight.remote?.version ?? 0;
  const warnings = [
    recreationWarning(record, preflight.remote?.version ?? null, preflight.remote?.createdAt ?? null),
    written.version > expectedVersion + 1
      ? 'Outra escrita de navegação ocorreu entre a leitura e a gravação; prevaleceu a última versão do KV.'
      : null,
  ].filter((warning): warning is string => Boolean(warning));

  await markNavigationSynced({
    profileId,
    expectedLocalRevision: record.localRevision,
    expectedRemoteVersion: record.remoteVersion,
    expectedRemoteCreatedAt: record.remoteCreatedAt,
    synchronizedDocument: local,
    remoteVersion: written.version,
    remoteCreatedAt: written.created_at,
    conflictWarning: warnings.length > 0 ? warnings.join(' ') : null,
  });
  return { failures: 0, remoteVersion: written.version, adoptedRemote: false };
}

export async function synchronizeNavigation(
  profileId: string,
  hooks: NavigationSyncHooks,
): Promise<NavigationSyncResult> {
  const record = await getNavigationRecord(profileId);
  if (await shouldDeferNavigationSync(profileId)) {
    return { failures: 1, remoteVersion: record?.remoteVersion ?? null, adoptedRemote: false };
  }

  try {
    const preflight = await readNavigationPreflight(profileId, hooks);
    return await applyNavigationPreflight(profileId, preflight, hooks);
  } catch (error) {
    await markNavigationSyncError(
      profileId,
      error instanceof Error ? error.message : 'Falha ao sincronizar navegação',
    );
    throw error;
  }
}
