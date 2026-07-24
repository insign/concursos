import { getActiveAlias } from './identity';
import {
  acquireSyncLease,
  releaseSyncLease,
  renewSyncLease,
  SyncLeaseLostError,
  whenLocalWritesSettled,
} from './offline-db';
import {
  applySimuladosPreflight,
  readSimuladosPreflight,
  synchronizePendingSimulados,
  type SimuladosPreflight,
  type SimuladosSyncHooks,
} from './simulados-sync';
import {
  prepareProfileAlias,
  requestProfileSync,
  type ProfilePreparationOptions,
  type ProfilePreparationResult,
} from './sync';

const leaseName = 'answer-sync';
const leaseTtlMs = 30_000;
const leaseRetryCount = 10;
const leaseRetryDelayMs = 500;
const ownerId =
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? `simulados-${crypto.randomUUID()}`
    : `simulados-${Date.now()}-${Math.random()}`;
let serial: Promise<unknown> = Promise.resolve();
let lastRequestAt = 0;

function enqueue<T>(operation: () => Promise<T>): Promise<T> {
  const queued = serial.then(operation, operation);
  serial = queued.catch(() => undefined);
  return queued;
}

function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function beforeRequest(): Promise<void> {
  const delay = Math.max(0, lastRequestAt + 500 - Date.now());
  if (delay > 0) await sleep(delay);
  lastRequestAt = Date.now();
}

function announceSimulados(profileId: string, failures: number): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent('concursos:simulados-synced', {
      detail: { profileId, failures },
    }),
  );
}

function announceError(error: unknown): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent('concursos:sync-status', {
      detail: {
        state: 'error',
        message: error instanceof Error ? error.message : 'Falha ao sincronizar simulados',
      },
    }),
  );
}

async function acquireSimuladosLease(): Promise<void> {
  for (let attempt = 0; attempt < leaseRetryCount; attempt += 1) {
    if (await acquireSyncLease(leaseName, ownerId, leaseTtlMs)) return;
    if (attempt < leaseRetryCount - 1) await sleep(leaseRetryDelayMs);
  }
  throw new Error('Outra sincronização continua usando o perfil; tente novamente');
}

async function withSimuladosLease<T>(
  operation: (hooks: SimuladosSyncHooks) => Promise<T>,
): Promise<T> {
  await acquireSimuladosLease();

  let leaseError: unknown;
  let heartbeatPromise = Promise.resolve();
  const renew = async () => {
    if (leaseError) throw leaseError;
    try {
      await renewSyncLease(leaseName, ownerId, leaseTtlMs);
    } catch (error) {
      leaseError = error;
      throw error;
    }
  };
  const ensureLease = async () => {
    await heartbeatPromise;
    if (leaseError) throw leaseError;
    await renew();
  };
  const heartbeat = setInterval(() => {
    heartbeatPromise = heartbeatPromise.then(renew).catch(() => undefined);
  }, 10_000);

  try {
    await whenLocalWritesSettled();
    return await operation({ ensureLease, beforeRequest });
  } finally {
    clearInterval(heartbeat);
    await heartbeatPromise;
    await releaseSyncLease(leaseName, ownerId);
  }
}

function remoteSimuladoCount(preflight: SimuladosPreflight): number {
  return Number(preflight.index !== null) + preflight.details.filter((detail) => detail.remote !== null).length;
}

async function runSimuladosSync(profileId: string): Promise<boolean> {
  try {
    const result = await withSimuladosLease((hooks) =>
      synchronizePendingSimulados(profileId, hooks),
    );
    announceSimulados(profileId, result.failures);
    return result.failures === 0;
  } catch (error) {
    if (!(error instanceof SyncLeaseLostError)) announceError(error);
    return false;
  }
}

export async function prepareCompleteProfileAlias(
  profileId: string,
  options: ProfilePreparationOptions = {},
): Promise<ProfilePreparationResult> {
  return enqueue(async () => {
    // Inspeciona e valida todos os documentos de simulados antes de permitir que o
    // preflight base publique qualquer estado local para o alias de destino.
    const inspected = await withSimuladosLease((hooks) =>
      readSimuladosPreflight(profileId, hooks),
    );
    const inspectedCount = remoteSimuladoCount(inspected);

    const base = await prepareProfileAlias(profileId, {
      onPreflightComplete: (result) => {
        options.onPreflightComplete?.({
          remoteDocumentCount: result.remoteDocumentCount + inspectedCount,
        });
      },
    });

    // Releia sob lease depois da confirmação: o remoto pode ter avançado enquanto
    // o usuário decidia, e a arbitragem deve usar a versão atual, não o snapshot da UI.
    const currentSimuladoCount = await withSimuladosLease(async (hooks) => {
      const preflight = await readSimuladosPreflight(profileId, hooks);
      await applySimuladosPreflight(profileId, preflight, hooks);
      return remoteSimuladoCount(preflight);
    });

    return {
      remoteDocumentCount: base.remoteDocumentCount + currentSimuladoCount,
    };
  });
}

export async function requestCompleteProfileSync(
  profileId = getActiveAlias(),
): Promise<boolean> {
  if (!profileId || typeof navigator === 'undefined' || !navigator.onLine) {
    return requestProfileSync(profileId);
  }
  return enqueue(async () => {
    const base = await requestProfileSync(profileId);
    const simulados = await runSimuladosSync(profileId);
    return base && simulados;
  });
}
