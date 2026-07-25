import { buildNavigationDocumentId } from './identity';
import { KvClientError, readKv, writeKv } from './kv-client';
import {
  getNavigationRecord,
  markNavigationSynced,
  markNavigationSyncError,
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

function recreationWarning(
  record: LocalNavigationRecord,
  remoteVersion: number | null,
  remoteCreatedAt: string | null,
): string | null {
  if (record.remoteVersion !== null && (remoteVersion === null || remoteVersion < record.remoteVersion)) {
    return 'A versão remota de navegação regrediu; o documento pode ter sido recriado.';
  }
  if (record.remoteCreatedAt && remoteCreatedAt && record.remoteCreatedAt !== remoteCreatedAt) {
    return 'A data de criação remota da navegação mudou; o documento pode ter sido recriado.';
  }
  return null;
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
  if (!envelope) return { remote: null };

  const parsed = navigationDocumentSchema.safeParse(envelope.json);
  if (!parsed.success) {
    const reason = 'Documento remoto de navegação inválido';
    await quarantineRemoteDocument({ profileId, documentId, reason, value: envelope.json });
    await markNavigationSyncError(profileId, reason);
    throw new Error(reason);
  }

  return {
    remote: {
      document: parsed.data,
      version: envelope.version,
      createdAt: envelope.created_at,
    },
  };
}

export async function applyNavigationPreflight(
  profileId: string,
  preflight: NavigationPreflight,
  hooks: NavigationSyncHooks,
): Promise<NavigationSyncResult> {
  await whenNavigationWritesSettled();
  const record = await getNavigationRecord(profileId);
  const action = resolveNavigationVersionAction(record ?? null, preflight.remote?.version ?? null);

  if (action === 'noop') {
    if (record && preflight.remote) {
      const warning = recreationWarning(record, preflight.remote.version, preflight.remote.createdAt);
      if (warning) {
        await markNavigationSynced({
          profileId,
          expectedLocalRevision: record.localRevision,
          synchronizedDocument: record.current,
          remoteVersion: preflight.remote.version,
          remoteCreatedAt: preflight.remote.createdAt,
          conflictWarning: warning,
        });
      }
    }
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
      return latest?.localRevision === record.localRevision;
    },
  });
  await hooks.ensureLease();
  const expectedVersion = preflight.remote?.version ?? 0;
  const warnings = [
    recreationWarning(record, preflight.remote?.version ?? null, preflight.remote?.createdAt ?? null),
    written.version > expectedVersion + 1
      ? 'Outra escrita de navegação ocorreu entre a leitura e a gravação; prevaleceu a última versão do KV.'
      : null,
  ].filter(Boolean);

  await markNavigationSynced({
    profileId,
    expectedLocalRevision: record.localRevision,
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
  try {
    const preflight = await readNavigationPreflight(profileId, hooks);
    return await applyNavigationPreflight(profileId, preflight, hooks);
  } catch (error) {
    if (!(error instanceof KvClientError)) {
      await markNavigationSyncError(
        profileId,
        error instanceof Error ? error.message : 'Falha ao sincronizar navegação',
      );
    }
    throw error;
  }
}
