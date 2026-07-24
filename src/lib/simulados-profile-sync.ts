import { getActiveAlias } from './identity';
import {
  acquireSyncLease,
  releaseSyncLease,
  renewSyncLease,
  SyncLeaseLostError,
  whenLocalWritesSettled,
} from './offline-db';
import { synchronizePendingSimulados } from './simulados-sync';
import { requestProfileSync } from './sync';

const leaseName = 'answer-sync';
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

async function beforeRequest(): Promise<void> {
  const delay = Math.max(0, lastRequestAt + 500 - Date.now());
  if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay));
  lastRequestAt = Date.now();
}

async function runSimuladosSync(profileId: string): Promise<boolean> {
  const acquired = await acquireSyncLease(leaseName, ownerId, 30_000);
  if (!acquired) return false;
  let leaseError: unknown;
  let heartbeatPromise = Promise.resolve();
  const renew = async () => {
    if (leaseError) throw leaseError;
    try {
      await renewSyncLease(leaseName, ownerId, 30_000);
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
    const result = await synchronizePendingSimulados(profileId, { ensureLease, beforeRequest });
    window.dispatchEvent(
      new CustomEvent('concursos:simulados-synced', {
        detail: { profileId, failures: result.failures },
      }),
    );
    return result.failures === 0;
  } catch (error) {
    if (!(error instanceof SyncLeaseLostError)) {
      window.dispatchEvent(
        new CustomEvent('concursos:sync-status', {
          detail: {
            state: 'error',
            message: error instanceof Error ? error.message : 'Falha ao sincronizar simulados',
          },
        }),
      );
    }
    return false;
  } finally {
    clearInterval(heartbeat);
    await heartbeatPromise;
    await releaseSyncLease(leaseName, ownerId);
  }
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
