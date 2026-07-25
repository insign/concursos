import { getActiveAlias } from './identity';
import {
  acquireSyncLease,
  releaseSyncLease,
  renewSyncLease,
  SyncLeaseLostError,
  whenLocalWritesSettled,
} from './offline-db';
import {
  applyNavigationPreflight,
  readNavigationPreflight,
  synchronizeNavigation,
  type NavigationPreflight,
} from './navigation-sync';
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
const activeSimuladosSyncs = new Map<string, Promise<boolean>>();
const activeCompleteSyncs = new Map<string, Promise<boolean>>();

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

function announceNavigation(profileId: string, failures: number, remoteVersion: number | null): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent('concursos:navigation-synced', {
      detail: { profileId, failures, remoteVersion },
    }),
  );
}

function announceError(error: unknown): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent('concursos:sync-status', {
      detail: {
        state: 'error',
        message: error instanceof Error ? error.message : 'Falha ao sincronizar o perfil',
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

function remoteNavigationCount(preflight: NavigationPreflight): number {
  return Number(preflight.remote !== null);
}

async function runSimuladosSync(profileId: string): Promise<boolean> {
  try {
    const result = await withSimuladosLease((hooks) => synchronizePendingSimulados(profileId, hooks));
    announceSimulados(profileId, result.failures);
    return result.failures === 0;
  } catch (error) {
    if (!(error instanceof SyncLeaseLostError)) announceError(error);
    return false;
  }
}

async function runExtendedSync(profileId: string): Promise<boolean> {
  try {
    const result = await withSimuladosLease(async (hooks) => {
      const simulados = await synchronizePendingSimulados(profileId, hooks);
      announceSimulados(profileId, simulados.failures);
      const navigation = await synchronizeNavigation(profileId, hooks);
      return { simulados, navigation };
    });
    announceNavigation(profileId, result.navigation.failures, result.navigation.remoteVersion);
    return result.simulados.failures === 0 && result.navigation.failures === 0;
  } catch (error) {
    if (!(error instanceof SyncLeaseLostError)) announceError(error);
    return false;
  }
}

export function requestSimuladosProfileSync(
  profileId = getActiveAlias(),
): Promise<boolean> {
  if (!profileId || typeof navigator === 'undefined' || !navigator.onLine) {
    return requestProfileSync(profileId);
  }
  const active = activeSimuladosSyncs.get(profileId);
  if (active) return active;

  let operation!: Promise<boolean>;
  operation = enqueue(async () => {
    const base = await requestProfileSync(profileId);
    const simulados = await runSimuladosSync(profileId);
    return base && simulados;
  }).finally(() => {
    if (activeSimuladosSyncs.get(profileId) === operation) activeSimuladosSyncs.delete(profileId);
  });
  activeSimuladosSyncs.set(profileId, operation);
  return operation;
}

export async function requestNavigationProfileSync(
  profileId = getActiveAlias(),
): Promise<boolean> {
  if (!profileId || typeof navigator === 'undefined' || !navigator.onLine) return false;
  return enqueue(async () => {
    try {
      const result = await withSimuladosLease((hooks) => synchronizeNavigation(profileId, hooks));
      announceNavigation(profileId, result.failures, result.remoteVersion);
      return result.failures === 0;
    } catch (error) {
      if (!(error instanceof SyncLeaseLostError)) announceError(error);
      return false;
    }
  });
}

export async function prepareCompleteProfileAlias(
  profileId: string,
  options: ProfilePreparationOptions = {},
): Promise<ProfilePreparationResult> {
  return enqueue(async () => {
    const inspected = await withSimuladosLease(async (hooks) => ({
      simulados: await readSimuladosPreflight(profileId, hooks),
      navigation: await readNavigationPreflight(profileId, hooks),
    }));
    const inspectedCount =
      remoteSimuladoCount(inspected.simulados) + remoteNavigationCount(inspected.navigation);

    const base = await prepareProfileAlias(profileId, {
      onPreflightComplete: (result) => {
        options.onPreflightComplete?.({
          remoteDocumentCount: result.remoteDocumentCount + inspectedCount,
        });
      },
    });

    const currentAdditionalCount = await withSimuladosLease(async (hooks) => {
      const simulados = await readSimuladosPreflight(profileId, hooks);
      const navigation = await readNavigationPreflight(profileId, hooks);
      await applySimuladosPreflight(profileId, simulados, hooks);
      await applyNavigationPreflight(profileId, navigation, hooks);
      return remoteSimuladoCount(simulados) + remoteNavigationCount(navigation);
    });

    return {
      remoteDocumentCount: base.remoteDocumentCount + currentAdditionalCount,
    };
  });
}

export function requestCompleteProfileSync(
  profileId = getActiveAlias(),
): Promise<boolean> {
  if (!profileId || typeof navigator === 'undefined' || !navigator.onLine) {
    return requestProfileSync(profileId);
  }
  const active = activeCompleteSyncs.get(profileId);
  if (active) return active;

  let operation!: Promise<boolean>;
  operation = enqueue(async () => {
    const base = await requestProfileSync(profileId);
    const additional = await runExtendedSync(profileId);
    return base && additional;
  }).finally(() => {
    if (activeCompleteSyncs.get(profileId) === operation) activeCompleteSyncs.delete(profileId);
  });
  activeCompleteSyncs.set(profileId, operation);
  return operation;
}
