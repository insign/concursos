import {
  adoptStagedPackageUnderLock,
  offlinePackageManifestSchema,
  type OfflinePackageManifest,
} from './offline-packages';
import { SHARED_ASSET_CACHE } from './pwa-cache';
import { deleteDownloadJob, getDownloadJob, saveDownloadJob } from './offline-db';
import { publishDownloadEvent } from './offline-download-events';

export interface BackgroundFetchRegistrationLike {
  id: string;
  matchAll(): Promise<ReadonlyArray<{ request: Request; responseReady: Promise<Response> }>>;
  updateUI?(options: { title?: string }): Promise<void>;
}

export function backgroundFetchSupported(registration: unknown): boolean {
  return (
    typeof registration === 'object' &&
    registration !== null &&
    'backgroundFetch' in registration &&
    typeof (registration as { backgroundFetch?: { fetch?: unknown } }).backgroundFetch?.fetch === 'function'
  );
}

const BG_ID_PREFIX = 'offline-package-';

export interface ActivePackageFetch {
  id: string;
  contestStorageId: string;
}

function backgroundFetchManager(registration: unknown): { getActiveFetches?: () => Promise<Array<{ id: string }>> } | null {
  if (typeof registration !== 'object' || registration === null) return null;
  const manager = (registration as { backgroundFetch?: { getActiveFetches?: unknown } }).backgroundFetch;
  if (!manager || typeof manager.getActiveFetches !== 'function') return null;
  return manager as { getActiveFetches: () => Promise<Array<{ id: string }>> };
}

/** Transferências em andamento conduzidas pelo navegador para este app. */
export async function getActivePackageFetches(
  registration: unknown,
): Promise<ActivePackageFetch[]> {
  const manager = backgroundFetchManager(registration);
  if (!manager) return [];
  try {
    const fetches = await manager.getActiveFetches();
    return fetches
      .filter((fetch) => fetch.id.startsWith(BG_ID_PREFIX))
      .map((fetch) => {
        // Formato: offline-package-<timestamp 13 dígitos>-<storageId>
        const rest = fetch.id.slice(BG_ID_PREFIX.length);
        return { id: fetch.id, contestStorageId: rest.slice(13 + 1) };
      });
  } catch {
    return [];
  }
}

export async function hasActivePackageDownload(
  registration: unknown,
  storageId: string,
): Promise<boolean> {
  return (await getActivePackageFetches(registration)).some(
    (fetch) => fetch.contestStorageId === storageId,
  );
}

export function buildPackageRequests(manifest: OfflinePackageManifest, origin: string): Request[] {
  const resources = [...new Set([...manifest.routes, ...manifest.assets, ...manifest.sharedAssets])];
  return resources.map((resource) => new Request(`${origin}${resource}`, { credentials: 'same-origin' }));
}

export async function startBackgroundPackageDownload(
  registration: ServiceWorkerRegistration & {
    backgroundFetch?: { fetch(id: string, requests: RequestInfo[], options?: { title?: string; downloadTotal?: number }): Promise<unknown> };
  },
  manifest: OfflinePackageManifest,
): Promise<void> {
  const id = `offline-package-${Date.now()}-${manifest.contestStorageId}`;
  const manager = registration.backgroundFetch;
  if (!manager?.fetch) throw new Error('Background Fetch indisponível neste navegador.');
  await saveDownloadJob({ id, manifest: structuredClone(manifest), createdAt: Date.now() });
  try {
    await manager.fetch(
      id,
      buildPackageRequests(manifest, self.location.origin),
      {
        title: `Conteúdo offline — ${manifest.contestSlug}`,
        downloadTotal: manifest.estimatedBytes ?? 0,
      },
    );
  } catch (error) {
    await deleteDownloadJob(id);
    const raw = error instanceof Error ? error.message : String(error);
    if (/too many active fetches/i.test(raw)) {
      throw new Error(
        'O navegador atingiu o limite de downloads simultâneos deste site. Aguarde alguns instantes e tente novamente.',
      );
    }
    throw error;
  }
}

function stagingCacheName(manifestHash: string, storageId: string): string {
  const suffix = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}`;
  return `contest--${storageId}--${manifestHash}--background--${suffix}`;
}

/**
 * Conclui um Background Fetch bem-sucedido: grava os records no staging
 * (recursos do pacote) e no cache compartilhado (assets globais), promove
 * com a mesma sequência atômica do fluxo em página e publica o evento.
 */
export async function finalizeSuccessfulBackgroundFetch(
  registration: BackgroundFetchRegistrationLike,
  overrides: { cacheStorage?: CacheStorage } = {},
): Promise<void> {
  const job = await getDownloadJob(registration.id);
  if (!job) return;

  const parsed = offlinePackageManifestSchema.safeParse(job.manifest);
  if (!parsed.success) {
    await deleteDownloadJob(registration.id);
    return;
  }
  const manifest = parsed.data;
  const storageId = manifest.contestStorageId;
  publishDownloadEvent({ type: 'started', contestStorageId: storageId, phase: 'download' });

  const cacheStorage = overrides.cacheStorage ?? globalThis.caches;
  const stagingName = stagingCacheName(manifest.manifestHash, storageId);
  const packageResources = new Set([...manifest.routes, ...manifest.assets]);
  const shared = await cacheStorage.open(SHARED_ASSET_CACHE);
  const staging = await cacheStorage.open(stagingName);

  try {
    for (const record of await registration.matchAll()) {
      const response = await record.responseReady;
      if (!response || !response.ok || response.type === 'opaque') {
        throw new Error(`Resposta inválida do navegador para ${record.request.url}`);
      }
      const pathname = new URL(record.request.url).pathname;
      if (packageResources.has(pathname)) {
        await staging.put(record.request, response);
      } else {
        await shared.put(record.request, response);
      }
    }

    await adoptStagedPackageUnderLock(manifest, stagingName, { cacheStorage });
    publishDownloadEvent({ type: 'completed', contestStorageId: storageId, phase: 'download' });
    await event_updateUI(registration);
  } catch (error) {
    publishDownloadEvent({
      type: 'failed',
      contestStorageId: storageId,
      phase: 'download',
      message: error instanceof Error ? error.message : String(error),
    });
    throw error;
  } finally {
    await deleteDownloadJob(registration.id);
  }
}

async function event_updateUI(registration: BackgroundFetchRegistrationLike): Promise<void> {
  try {
    await registration.updateUI?.({ title: 'Conteúdo offline atualizado.' });
  } catch {
    // updateUI é opcional e pode falhar fora da janela do evento.
  }
}

export async function finalizeFailedBackgroundFetch(
  registration: BackgroundFetchRegistrationLike,
): Promise<void> {
  const job = await getDownloadJob(registration.id);
  if (!job) return;
  const parsed = offlinePackageManifestSchema.safeParse(job.manifest);
  await deleteDownloadJob(registration.id);
  if (!parsed.success) return;
  publishDownloadEvent({
    type: 'failed',
    contestStorageId: parsed.data.contestStorageId,
    phase: 'download',
    message: 'O navegador interrompeu o download em segundo plano.',
  });
}
