import {
  buildSimuladoDocumentId,
  buildSimuladosIndexDocumentId,
  validateSimuladoId,
} from './identity';
import { readKv, writeKv } from './kv-client';
import {
  getLocalSimuladoRecord,
  getSharedDocumentRecord,
  listPendingSimuladoRecords,
  listProfileSimuladoRecords,
  markSharedDocumentError,
  markSharedDocumentSynced,
  markSimuladoSynced,
  markSimuladoSyncError,
  quarantineRemoteDocument,
  storeRemoteSimuladoDocument,
  updateSharedDocuments,
  type LocalSharedDocumentRecord,
  type LocalSimuladoRecord,
} from './offline-db';
import {
  buildSimuladoSummary,
  EMPTY_SIMULADOS_INDEX,
  simuladoDocumentSchema,
  simuladosIndexSchema,
  upsertSimuladoSummary,
  type SimuladoDocument,
  type SimuladosIndex,
} from './simulados';

interface RemoteDocument<T> {
  document: T;
  version: number;
  createdAt: string | null;
}

export interface SimuladosSyncHooks {
  ensureLease: () => Promise<void>;
  beforeRequest: () => Promise<void>;
}

export interface SimuladosPreflight {
  index: RemoteDocument<SimuladosIndex> | null;
  details: Array<{
    simulationId: string;
    documentId: string;
    remote: RemoteDocument<SimuladoDocument> | null;
  }>;
}

export interface SimuladosSyncResult {
  failures: number;
  remoteDocumentCount: number;
}

type VersionedLocal = Pick<LocalSimuladoRecord | LocalSharedDocumentRecord, 'remoteVersion' | 'outboxState'>;
type Resolution = 'adopt-remote' | 'publish-local' | 'noop';

function resolveVersion(local: VersionedLocal | null, remoteVersion: number | null): Resolution {
  if (!local) return remoteVersion === null ? 'noop' : 'adopt-remote';
  const observed = local.remoteVersion ?? 0;
  const current = remoteVersion ?? 0;
  if (current > observed) return 'adopt-remote';
  if (current < observed) return 'publish-local';
  return local.outboxState === 'pending' ? 'publish-local' : 'noop';
}

function recreationWarning(
  record: Pick<LocalSimuladoRecord | LocalSharedDocumentRecord, 'remoteVersion' | 'remoteCreatedAt'>,
  remoteVersion: number | null,
  remoteCreatedAt: string | null,
): string | null {
  if (record.remoteVersion !== null && (remoteVersion === null || remoteVersion < record.remoteVersion)) {
    return 'A versão remota regrediu; o registro pode ter sido excluído e recriado.';
  }
  if (record.remoteCreatedAt && remoteCreatedAt && record.remoteCreatedAt !== remoteCreatedAt) {
    return 'A data de criação remota mudou; o registro pode ter sido excluído e recriado.';
  }
  return null;
}

async function readValidated<T>(
  profileId: string,
  documentId: string,
  parse: (value: unknown) => T,
  label: string,
  hooks: SimuladosSyncHooks,
): Promise<RemoteDocument<T> | null> {
  await hooks.ensureLease();
  await hooks.beforeRequest();
  await hooks.ensureLease();
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
      document: parse(envelope.json),
      version: envelope.version,
      createdAt: envelope.created_at,
    };
  } catch (error) {
    const reason = error instanceof Error ? error.message : `${label} remoto inválido`;
    await quarantineRemoteDocument({ profileId, documentId, reason, value: envelope.json });
    throw new Error(reason);
  }
}

async function readRemoteIndex(
  profileId: string,
  hooks: SimuladosSyncHooks,
): Promise<RemoteDocument<SimuladosIndex> | null> {
  const documentId = buildSimuladosIndexDocumentId(profileId);
  try {
    return await readValidated(
      profileId,
      documentId,
      (value) => simuladosIndexSchema.parse(value),
      'Índice de simulados',
      hooks,
    );
  } catch (error) {
    await markSharedDocumentError(
      'simuladosIndex',
      profileId,
      error instanceof Error ? error.message : 'Índice remoto inválido',
    );
    throw error;
  }
}

async function readRemoteDetail(
  profileId: string,
  simulationId: string,
  hooks: SimuladosSyncHooks,
): Promise<RemoteDocument<SimuladoDocument> | null> {
  const documentId = buildSimuladoDocumentId(profileId, simulationId);
  return readValidated(
    profileId,
    documentId,
    (value) => {
      const document = simuladoDocumentSchema.parse(value);
      if (document.simulationId !== simulationId) {
        throw new Error('O ID interno do simulado não corresponde ao documento remoto');
      }
      return document;
    },
    'Simulado',
    hooks,
  );
}

async function applyDetailRemote(
  profileId: string,
  simulationId: string,
  remote: RemoteDocument<SimuladoDocument> | null,
  hooks: SimuladosSyncHooks,
): Promise<void> {
  const documentId = buildSimuladoDocumentId(profileId, simulationId);
  const record = await getLocalSimuladoRecord(documentId);
  const action = resolveVersion(record ?? null, remote?.version ?? null);
  if (action === 'noop') {
    if (record && remote) {
      const warning = recreationWarning(record, remote.version, remote.createdAt);
      if (warning) {
        await markSimuladoSynced({
          documentId,
          expectedLocalRevision: record.localRevision,
          synchronizedDocument: record.current,
          remoteVersion: remote.version,
          remoteCreatedAt: remote.createdAt,
          conflictWarning: warning,
        });
      }
    }
    return;
  }

  if (action === 'adopt-remote' && remote) {
    if (!record) {
      await storeRemoteSimuladoDocument({
        profileId,
        documentId,
        document: remote.document,
        remoteVersion: remote.version,
        remoteCreatedAt: remote.createdAt,
      });
      return;
    }
    await markSimuladoSynced({
      documentId,
      expectedLocalRevision: record.localRevision,
      synchronizedDocument: remote.document,
      remoteVersion: remote.version,
      remoteCreatedAt: remote.createdAt,
      conflictWarning: recreationWarning(record, remote.version, remote.createdAt),
    });
    return;
  }

  if (!record) return;
  const local = simuladoDocumentSchema.parse(record.current);
  await hooks.beforeRequest();
  await hooks.ensureLease();
  const written = await writeKv(documentId, local, {
    beforeRetry: async () => {
      await hooks.ensureLease();
      return true;
    },
  });
  await hooks.ensureLease();
  const warnings = [
    recreationWarning(record, remote?.version ?? null, remote?.createdAt ?? null),
    written.version > (remote?.version ?? 0) + 1
      ? 'Outra escrita ocorreu durante a sincronização deste simulado.'
      : null,
  ].filter(Boolean);
  await markSimuladoSynced({
    documentId,
    expectedLocalRevision: record.localRevision,
    synchronizedDocument: local,
    remoteVersion: written.version,
    remoteCreatedAt: written.created_at,
    conflictWarning: warnings.length > 0 ? warnings.join(' ') : null,
  });
}

async function applyIndexRemote(
  profileId: string,
  remote: RemoteDocument<SimuladosIndex> | null,
  hooks: SimuladosSyncHooks,
): Promise<void> {
  const documentId = buildSimuladosIndexDocumentId(profileId);
  const record = await getSharedDocumentRecord('simuladosIndex', profileId);
  const action = resolveVersion(record ?? null, remote?.version ?? null);
  if (action === 'noop') {
    if (record && remote) {
      const warning = recreationWarning(record, remote.version, remote.createdAt);
      if (warning) {
        await markSharedDocumentSynced({
          storeName: 'simuladosIndex',
          profileId,
          expectedLocalRevision: record.localRevision,
          synchronizedDocument: record.current,
          remoteVersion: remote.version,
          remoteCreatedAt: remote.createdAt,
          conflictWarning: warning,
        });
      }
    }
    return;
  }

  if (action === 'adopt-remote' && remote) {
    await markSharedDocumentSynced({
      storeName: 'simuladosIndex',
      profileId,
      expectedLocalRevision: record?.localRevision ?? 0,
      synchronizedDocument: remote.document,
      remoteVersion: remote.version,
      remoteCreatedAt: remote.createdAt,
      conflictWarning: record
        ? recreationWarning(record, remote.version, remote.createdAt)
        : null,
    });
    return;
  }

  if (!record) return;
  const local = simuladosIndexSchema.parse(record.current);
  await hooks.beforeRequest();
  await hooks.ensureLease();
  const written = await writeKv(documentId, local, {
    beforeRetry: async () => {
      await hooks.ensureLease();
      return true;
    },
  });
  await hooks.ensureLease();
  await markSharedDocumentSynced({
    storeName: 'simuladosIndex',
    profileId,
    expectedLocalRevision: record.localRevision,
    synchronizedDocument: local,
    remoteVersion: written.version,
    remoteCreatedAt: written.created_at,
    conflictWarning: [
      recreationWarning(record, remote?.version ?? null, remote?.createdAt ?? null),
      written.version > (remote?.version ?? 0) + 1
        ? 'Outra escrita ocorreu durante a sincronização do índice de simulados.'
        : null,
    ].filter(Boolean).join(' ') || null,
  });
}

async function reconcileLocalIndex(profileId: string): Promise<void> {
  const records = await listProfileSimuladoRecords(profileId);
  const currentRecord = await getSharedDocumentRecord('simuladosIndex', profileId);
  const parsed = simuladosIndexSchema.safeParse(currentRecord?.current);
  let next = parsed.success ? parsed.data : EMPTY_SIMULADOS_INDEX;
  const localIds = new Set(records.map((record) => record.current.simulationId));
  next = {
    schemaVersion: 1,
    simulados: next.simulados.filter((summary) => localIds.has(summary.id)),
  };
  for (const record of records) {
    next = upsertSimuladoSummary(next, buildSimuladoSummary(simuladoDocumentSchema.parse(record.current)));
  }
  const previous = parsed.success ? parsed.data : EMPTY_SIMULADOS_INDEX;
  if (JSON.stringify(previous) === JSON.stringify(next)) return;
  await updateSharedDocuments(profileId, [
    {
      storeName: 'simuladosIndex',
      dirtyFields: next.simulados.map((summary) => summary.id),
      updateCurrent: () => next,
    },
  ]);
}

export async function readSimuladosPreflight(
  profileId: string,
  hooks: SimuladosSyncHooks,
): Promise<SimuladosPreflight> {
  const index = await readRemoteIndex(profileId, hooks);
  const localRecords = await listProfileSimuladoRecords(profileId);
  const ids = new Set<string>(index?.document.simulados.map((summary) => summary.id) ?? []);
  for (const record of localRecords) ids.add(record.current.simulationId);
  const details: SimuladosPreflight['details'] = [];
  for (const rawId of ids) {
    const simulationId = validateSimuladoId(rawId);
    const documentId = buildSimuladoDocumentId(profileId, simulationId);
    const remote = await readRemoteDetail(profileId, simulationId, hooks);
    details.push({ simulationId, documentId, remote });
  }
  return { index, details };
}

export async function applySimuladosPreflight(
  profileId: string,
  preflight: SimuladosPreflight,
  hooks: SimuladosSyncHooks,
): Promise<void> {
  for (const detail of preflight.details) {
    await applyDetailRemote(profileId, detail.simulationId, detail.remote, hooks);
  }
  await applyIndexRemote(profileId, preflight.index, hooks);
  await reconcileLocalIndex(profileId);
  const indexRecord = await getSharedDocumentRecord('simuladosIndex', profileId);
  if (indexRecord?.outboxState === 'pending') {
    await applyIndexRemote(profileId, preflight.index, hooks);
  }
  const pendingDetails = await listPendingSimuladoRecords(profileId);
  const finalIndex = await getSharedDocumentRecord('simuladosIndex', profileId);
  if (pendingDetails.length > 0 || finalIndex?.outboxState === 'pending') {
    throw new Error('Os simulados mudaram durante a vinculação; tente novamente');
  }
}

export async function synchronizePendingSimulados(
  profileId: string,
  hooks: SimuladosSyncHooks,
): Promise<SimuladosSyncResult> {
  let failures = 0;
  let remoteDocumentCount = 0;
  const remoteIndex = await readRemoteIndex(profileId, hooks);
  if (remoteIndex) remoteDocumentCount += 1;

  const pending = await listPendingSimuladoRecords(profileId);
  const attempted = new Set<string>();
  for (const record of pending) {
    attempted.add(record.current.simulationId);
    try {
      const remote = await readRemoteDetail(profileId, record.current.simulationId, hooks);
      if (remote) remoteDocumentCount += 1;
      await applyDetailRemote(profileId, record.current.simulationId, remote, hooks);
    } catch (error) {
      failures += 1;
      await markSimuladoSyncError(
        record.documentId,
        error instanceof Error ? error.message : 'Falha ao sincronizar simulado',
        null,
      );
    }
  }

  for (const summary of remoteIndex?.document.simulados ?? []) {
    if (attempted.has(summary.id)) continue;
    try {
      const remote = await readRemoteDetail(profileId, summary.id, hooks);
      if (remote) remoteDocumentCount += 1;
      await applyDetailRemote(profileId, summary.id, remote, hooks);
    } catch (error) {
      failures += 1;
      const documentId = buildSimuladoDocumentId(profileId, summary.id);
      await markSimuladoSyncError(
        documentId,
        error instanceof Error ? error.message : 'Falha ao recuperar simulado',
        null,
      );
    }
  }

  try {
    await reconcileLocalIndex(profileId);
    await applyIndexRemote(profileId, remoteIndex, hooks);
  } catch (error) {
    failures += 1;
    await markSharedDocumentError(
      'simuladosIndex',
      profileId,
      error instanceof Error ? error.message : 'Falha ao sincronizar índice de simulados',
    );
  }

  if ((await listPendingSimuladoRecords(profileId)).length > 0) failures += 1;
  if ((await getSharedDocumentRecord('simuladosIndex', profileId))?.outboxState === 'pending') failures += 1;
  return { failures, remoteDocumentCount };
}
