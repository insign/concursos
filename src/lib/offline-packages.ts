import { z } from 'zod';
import {
  deleteOfflineContestRecord,
  getOfflineContestRecord,
  listOfflineContestRecords,
  saveOfflineContestRecord,
  type OfflineContestRecord,
} from './offline-db';
import {
  CONTEST_CACHE_PREFIX,
  RUNTIME_PAGE_CACHE,
  SHARED_ASSET_CACHE,
  contestCacheName,
  normalizeNavigationPath,
} from './pwa-cache';

const localPathSchema = z
  .string()
  .startsWith('/')
  .refine((path) => !path.startsWith('//') && !path.startsWith('/api/'), 'Caminho local inválido');

export const offlinePackageManifestSchema = z
  .object({
    schemaVersion: z.literal(1),
    contestSlug: z.string().min(1),
    contestStorageId: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    manifestHash: z.string().regex(/^(?:development|[a-f0-9]{20})$/),
    routes: z.array(localPathSchema).min(1),
    assets: z.array(localPathSchema),
    sharedAssets: z.array(localPathSchema),
    estimatedBytes: z.number().int().nonnegative().nullable(),
  })
  .strict();

export type OfflinePackageManifest = z.infer<typeof offlinePackageManifestSchema>;

export interface DownloadProgress {
  completed: number;
  total: number;
  downloadedBytes: number;
}

const OFFLINE_PACKAGE_LOCK = 'concursos:offline-packages';
let fallbackPackageLock = Promise.resolve();

interface PackageEnvironment {
  cacheStorage?: CacheStorage;
  fetch?: typeof fetch;
  origin?: string;
  storage?: Pick<StorageManager, 'estimate' | 'persist'>;
}

function environment(overrides: PackageEnvironment = {}) {
  const browserStorage = typeof navigator !== 'undefined' ? navigator.storage : undefined;
  return {
    cacheStorage: overrides.cacheStorage ?? globalThis.caches,
    fetch: overrides.fetch ?? globalThis.fetch,
    origin: overrides.origin ?? (typeof location === 'undefined' ? 'http://localhost' : location.origin),
    storage: overrides.storage ?? browserStorage,
  };
}

function uniqueResources(manifest: OfflinePackageManifest): string[] {
  return [...new Set([...manifest.routes, ...manifest.assets, ...manifest.sharedAssets])];
}

function requestFor(path: string, origin: string): Request {
  const url = new URL(path, origin);
  if (url.origin !== origin || url.origin === 'https://kv.helio.me') {
    throw new Error('O pacote offline contém um recurso externo inválido.');
  }
  return new Request(url, { credentials: 'same-origin' });
}

async function withOfflinePackageLock<T>(operation: () => Promise<T>): Promise<T> {
  if (typeof navigator !== 'undefined' && navigator.locks) {
    return navigator.locks.request(OFFLINE_PACKAGE_LOCK, operation);
  }
  if (typeof window !== 'undefined') {
    throw new Error('Este navegador não oferece coordenação segura para downloads offline.');
  }

  const previous = fallbackPackageLock;
  let release: () => void = () => undefined;
  fallbackPackageLock = new Promise<void>((resolve) => {
    release = resolve;
  });
  await previous;
  try {
    return await operation();
  } finally {
    release();
  }
}

function readableError(error: unknown): Error {
  if (error instanceof DOMException && error.name === 'QuotaExceededError') {
    return new Error('Não há espaço suficiente para concluir o download. O pacote anterior foi preservado.');
  }
  return error instanceof Error ? error : new Error('Não foi possível concluir o download offline.');
}

async function assertStorageCapacity(
  manifest: OfflinePackageManifest,
  storage: Pick<StorageManager, 'estimate' | 'persist'> | undefined,
): Promise<void> {
  if (!storage) return;
  if (typeof storage.persist === 'function') await storage.persist().catch(() => false);
  if (manifest.estimatedBytes === null) return;

  if (typeof storage.estimate !== 'function') return;
  const estimate = await storage.estimate().catch((): StorageEstimate => ({}));
  if (estimate.quota === undefined || estimate.usage === undefined) return;
  if (estimate.quota - estimate.usage < manifest.estimatedBytes) {
    throw new Error('Não há espaço suficiente para concluir o download. O pacote anterior foi preservado.');
  }
}

async function copyCache(source: Cache, destination: Cache): Promise<void> {
  for (const request of await source.keys()) {
    const response = await source.match(request);
    if (!response) throw new Error(`Recurso ausente no cache temporário: ${request.url}`);
    await destination.put(request, response);
  }
}

async function cacheContains(cache: Cache, resources: Iterable<string>, origin: string): Promise<boolean> {
  for (const resource of resources) {
    if (!await cache.match(requestFor(resource, origin), { ignoreVary: true })) return false;
  }
  return true;
}

async function packageIsComplete(
  cacheStorage: CacheStorage,
  record: OfflineContestRecord,
  manifest: OfflinePackageManifest,
  origin: string,
): Promise<boolean> {
  if (!await cacheStorage.has(record.activeCacheName)) return false;
  const active = await cacheStorage.open(record.activeCacheName);
  if (!await cacheContains(active, [...manifest.routes, ...manifest.assets], origin)) return false;
  if (manifest.sharedAssets.length === 0) return true;
  if (!await cacheStorage.has(SHARED_ASSET_CACHE)) return false;
  return cacheContains(await cacheStorage.open(SHARED_ASSET_CACHE), manifest.sharedAssets, origin);
}

async function removeVisitedDuplicates(cacheStorage: CacheStorage, routes: string[], origin: string): Promise<void> {
  const runtime = await cacheStorage.open(RUNTIME_PAGE_CACHE);
  for (const route of routes) {
    const normalized = normalizeNavigationPath(new URL(route, origin).pathname);
    const candidates = normalized === '/'
      ? [normalized, '/index.html']
      : [normalized, normalized.slice(0, -1), `${normalized}index.html`];
    for (const candidate of candidates) {
      await runtime.delete(new Request(new URL(candidate, origin)), { ignoreVary: true });
    }
  }
}

export async function downloadContestPackage(
  input: unknown,
  onProgress: (progress: DownloadProgress) => void = () => undefined,
  overrides: PackageEnvironment = {},
): Promise<OfflineContestRecord> {
  const manifest = offlinePackageManifestSchema.parse(input);
  return withOfflinePackageLock(() => downloadContestPackageLocked(manifest, onProgress, overrides));
}

async function downloadContestPackageLocked(
  manifest: OfflinePackageManifest,
  onProgress: (progress: DownloadProgress) => void,
  overrides: PackageEnvironment,
): Promise<OfflineContestRecord> {
  const { cacheStorage, fetch: fetchResource, origin, storage } = environment(overrides);
  const resources = uniqueResources(manifest);
  const packageResources = new Set([...manifest.routes, ...manifest.assets]);
  const canonicalCacheName = contestCacheName(manifest.contestStorageId, manifest.manifestHash);
  const existing = await getOfflineContestRecord(manifest.contestStorageId);

  if (
    existing?.manifestHash === manifest.manifestHash &&
    await packageIsComplete(cacheStorage, existing, manifest, origin)
  ) {
    return existing;
  }

  await assertStorageCapacity(manifest, storage);
  const suffix = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}`;
  const activeCacheName = existing?.manifestHash === manifest.manifestHash
    ? `${canonicalCacheName}--replacement--${suffix}`
    : canonicalCacheName;
  const temporaryCacheName = `${canonicalCacheName}--temporary--${suffix}`;
  const temporary = await cacheStorage.open(temporaryCacheName);
  const shared = await cacheStorage.open(SHARED_ASSET_CACHE);
  let downloadedBytes = 0;
  let activated = false;
  let promotionStarted = false;

  try {
    for (const [index, resource] of resources.entries()) {
      const request = requestFor(resource, origin);
      const response = await fetchResource(request, { cache: 'reload', credentials: 'same-origin' });
      if (!response.ok || response.type === 'opaque') {
        throw new Error(`Falha ao baixar ${resource}: HTTP ${response.status}`);
      }

      const contentLength = Number(response.headers.get('content-length'));
      if (Number.isFinite(contentLength)) downloadedBytes += contentLength;
      await (packageResources.has(resource) ? temporary : shared).put(request, response);
      onProgress({ completed: index + 1, total: resources.length, downloadedBytes });
    }

    await cacheStorage.delete(activeCacheName);
    promotionStarted = true;
    const active = await cacheStorage.open(activeCacheName);
    await copyCache(temporary, active);
    if ((await active.keys()).length !== packageResources.size) {
      throw new Error('O cache promovido não contém todos os recursos do pacote.');
    }

    const record: OfflineContestRecord = {
      contestStorageId: manifest.contestStorageId,
      manifestHash: manifest.manifestHash,
      activeCacheName,
      downloadedAt: Date.now(),
      resourceCount: resources.length,
    };
    await saveOfflineContestRecord(record);
    activated = true;
    await cacheStorage.delete(temporaryCacheName);
    if (existing && existing.activeCacheName !== activeCacheName) {
      await cacheStorage.delete(existing.activeCacheName);
    }
    await removeVisitedDuplicates(cacheStorage, manifest.routes, origin);
    return record;
  } catch (error) {
    await cacheStorage.delete(temporaryCacheName);
    if (!activated && promotionStarted) {
      await cacheStorage.delete(activeCacheName);
    }
    throw readableError(error);
  }
}

export async function removeContestPackage(
  contestStorageId: string,
  overrides: PackageEnvironment = {},
): Promise<void> {
  return withOfflinePackageLock(async () => {
    const { cacheStorage } = environment(overrides);
    const existing = await getOfflineContestRecord(contestStorageId);
    if (!existing) return;
    await deleteOfflineContestRecord(contestStorageId);
    await cacheStorage.delete(existing.activeCacheName);
  });
}

export async function cleanupInactiveContestCaches(overrides: PackageEnvironment = {}): Promise<void> {
  return withOfflinePackageLock(async () => {
    const { cacheStorage } = environment(overrides);
    const records = await listOfflineContestRecords();
    const cacheNames = new Set(await cacheStorage.keys());
    const activeNames = new Set<string>();

    for (const record of records) {
      if (cacheNames.has(record.activeCacheName)) {
        activeNames.add(record.activeCacheName);
      } else {
        await deleteOfflineContestRecord(record.contestStorageId);
      }
    }

    for (const name of cacheNames) {
      if (name.startsWith(CONTEST_CACHE_PREFIX) && !activeNames.has(name)) await cacheStorage.delete(name);
    }
  });
}

export { getOfflineContestRecord, listOfflineContestRecords };
