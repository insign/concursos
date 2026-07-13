import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { deleteOfflineDatabase } from '../../src/lib/offline-db';
import {
  cleanupInactiveContestCaches,
  downloadContestPackage,
  getOfflineContestRecord,
  removeContestPackage,
  type OfflinePackageManifest,
} from '../../src/lib/offline-packages';
import { SHARED_ASSET_CACHE } from '../../src/lib/pwa-cache';

class MemoryCache {
  readonly entries = new Map<string, Response>();

  constructor(private readonly beforePut: () => void = () => undefined) {}

  async put(request: RequestInfo | URL, response: Response): Promise<void> {
    this.beforePut();
    this.entries.set(new Request(request).url, response.clone());
  }

  async match(request: RequestInfo | URL): Promise<Response | undefined> {
    return this.entries.get(new Request(request).url)?.clone();
  }

  async keys(): Promise<readonly Request[]> {
    return [...this.entries.keys()].map((url) => new Request(url));
  }

  async delete(request: RequestInfo | URL): Promise<boolean> {
    return this.entries.delete(new Request(request).url);
  }
}

class MemoryCacheStorage {
  readonly caches = new Map<string, MemoryCache>();
  failWritesTo: (name: string) => boolean = () => false;

  async open(name: string): Promise<Cache> {
    const cache = this.caches.get(name) ?? new MemoryCache(() => {
      if (this.failWritesTo(name)) throw new DOMException('Quota exceeded', 'QuotaExceededError');
    });
    this.caches.set(name, cache);
    return cache as unknown as Cache;
  }

  async has(name: string): Promise<boolean> {
    return this.caches.has(name);
  }

  async delete(name: string): Promise<boolean> {
    return this.caches.delete(name);
  }

  async keys(): Promise<string[]> {
    return [...this.caches.keys()];
  }
}

function manifest(hash: string, routes = ['/concursos/exemplo/']): OfflinePackageManifest {
  return {
    schemaVersion: 1,
    contestSlug: 'exemplo',
    contestStorageId: 'exemplo',
    manifestHash: hash,
    routes,
    assets: [],
    sharedAssets: ['/_astro/shared.js'],
    estimatedBytes: 256,
  };
}

function successfulFetch(input: RequestInfo | URL): Promise<Response> {
  const request = new Request(input);
  return Promise.resolve(
    new Response(`resource:${new URL(request.url).pathname}`, {
      status: 200,
      headers: { 'content-length': '32', vary: 'Origin' },
    }),
  );
}

beforeEach(async () => {
  await deleteOfflineDatabase();
});

describe('offline contest packages', () => {
  it('activates a complete package and removes it explicitly', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const progress = vi.fn();
    const record = await downloadContestPackage(manifest('11111111111111111111'), progress, {
      cacheStorage: cacheStorage as unknown as CacheStorage,
      fetch: successfulFetch as typeof fetch,
      origin: 'https://concursos.test',
      storage: {
        persist: () => Promise.resolve(true),
        estimate: () => Promise.resolve({ quota: 10_000, usage: 0 }),
      },
    });

    expect(record.resourceCount).toBe(2);
    expect(progress).toHaveBeenLastCalledWith({ completed: 2, total: 2, downloadedBytes: 64 });
    expect(await getOfflineContestRecord('exemplo')).toEqual(record);
    expect(cacheStorage.caches.has(record.activeCacheName)).toBe(true);
    const sharedResponse = await cacheStorage.caches.get(SHARED_ASSET_CACHE)?.match('https://concursos.test/_astro/shared.js');
    expect(sharedResponse?.headers.get('vary')).toBe('Origin');

    await removeContestPackage('exemplo', { cacheStorage: cacheStorage as unknown as CacheStorage });
    expect(await getOfflineContestRecord('exemplo')).toBeUndefined();
    expect(cacheStorage.caches.has(record.activeCacheName)).toBe(false);
  });

  it('preserves the active package when a replacement is interrupted', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const overrides = {
      cacheStorage: cacheStorage as unknown as CacheStorage,
      fetch: successfulFetch as typeof fetch,
      origin: 'https://concursos.test',
      storage: {
        persist: () => Promise.resolve(true),
        estimate: () => Promise.resolve({ quota: 10_000, usage: 0 }),
      },
    };
    const original = await downloadContestPackage(manifest('11111111111111111111'), undefined, overrides);
    let requestCount = 0;
    const interruptedFetch = (input: RequestInfo | URL) => {
      requestCount += 1;
      if (requestCount === 2) return Promise.reject(new TypeError('Network interrupted'));
      return successfulFetch(input);
    };

    await expect(
      downloadContestPackage(
        manifest('22222222222222222222', ['/concursos/exemplo/', '/concursos/exemplo/questoes/']),
        undefined,
        { ...overrides, fetch: interruptedFetch as typeof fetch },
      ),
    ).rejects.toThrow('Network interrupted');

    expect(await getOfflineContestRecord('exemplo')).toEqual(original);
    expect(cacheStorage.caches.has(original.activeCacheName)).toBe(true);
    expect([...cacheStorage.caches.keys()].some((name) => name.includes('22222222222222222222'))).toBe(false);
  });

  it('preserves a same-revision cache when its repair cannot be promoted', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const overrides = {
      cacheStorage: cacheStorage as unknown as CacheStorage,
      fetch: successfulFetch as typeof fetch,
      origin: 'https://concursos.test',
    };
    const packageManifest = manifest('11111111111111111111');
    const original = await downloadContestPackage(packageManifest, undefined, overrides);
    await cacheStorage.caches.get(original.activeCacheName)?.delete('https://concursos.test/concursos/exemplo/');
    cacheStorage.failWritesTo = (name) => name.includes('--replacement--');

    await expect(downloadContestPackage(packageManifest, undefined, overrides)).rejects.toThrow('espaço suficiente');

    expect(await getOfflineContestRecord('exemplo')).toEqual(original);
    expect(cacheStorage.caches.has(original.activeCacheName)).toBe(true);
  });

  it('serializes removal behind an in-progress download', async () => {
    const cacheStorage = new MemoryCacheStorage();
    let releaseFetch: () => void = () => undefined;
    let markFetchStarted: () => void = () => undefined;
    const fetchGate = new Promise<void>((resolve) => {
      releaseFetch = resolve;
    });
    const fetchStarted = new Promise<void>((resolve) => {
      markFetchStarted = resolve;
    });
    let requestCount = 0;
    const delayedFetch = async (input: RequestInfo | URL) => {
      requestCount += 1;
      if (requestCount === 1) {
        markFetchStarted();
        await fetchGate;
      }
      return successfulFetch(input);
    };
    const overrides = {
      cacheStorage: cacheStorage as unknown as CacheStorage,
      fetch: delayedFetch as typeof fetch,
      origin: 'https://concursos.test',
    };

    const download = downloadContestPackage(manifest('11111111111111111111'), undefined, overrides);
    await fetchStarted;
    const removal = removeContestPackage('exemplo', overrides);
    releaseFetch();
    const record = await download;
    await removal;

    expect(await getOfflineContestRecord('exemplo')).toBeUndefined();
    expect(cacheStorage.caches.has(record.activeCacheName)).toBe(false);
  });

  it('cleans orphan caches and records whose active cache is missing', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const overrides = {
      cacheStorage: cacheStorage as unknown as CacheStorage,
      fetch: successfulFetch as typeof fetch,
      origin: 'https://concursos.test',
    };
    const record = await downloadContestPackage(manifest('11111111111111111111'), undefined, overrides);
    await cacheStorage.delete(record.activeCacheName);
    await cacheStorage.open('contest--orphan--temporary--123');

    await cleanupInactiveContestCaches(overrides);

    expect(await getOfflineContestRecord('exemplo')).toBeUndefined();
    expect(cacheStorage.caches.has('contest--orphan--temporary--123')).toBe(false);
  });

  it('rejects insufficient quota before replacing the active package', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const original = await downloadContestPackage(manifest('11111111111111111111'), undefined, {
      cacheStorage: cacheStorage as unknown as CacheStorage,
      fetch: successfulFetch as typeof fetch,
      origin: 'https://concursos.test',
    });
    const fetchResource = vi.fn(successfulFetch);

    await expect(
      downloadContestPackage(manifest('22222222222222222222'), undefined, {
        cacheStorage: cacheStorage as unknown as CacheStorage,
        fetch: fetchResource as typeof fetch,
        origin: 'https://concursos.test',
        storage: {
          persist: () => Promise.resolve(false),
          estimate: () => Promise.resolve({ quota: 100, usage: 100 }),
        },
      }),
    ).rejects.toThrow('espaço suficiente');

    expect(fetchResource).not.toHaveBeenCalled();
    expect(await getOfflineContestRecord('exemplo')).toEqual(original);
    expect(cacheStorage.caches.has(original.activeCacheName)).toBe(true);
  });

  it('rejects external resources in an untrusted manifest', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const invalid = { ...manifest('11111111111111111111'), sharedAssets: ['//kv.helio.me/documento'] };

    await expect(
      downloadContestPackage(invalid, undefined, {
        cacheStorage: cacheStorage as unknown as CacheStorage,
        fetch: successfulFetch as typeof fetch,
        origin: 'https://concursos.test',
      }),
    ).rejects.toThrow();
    expect(cacheStorage.caches.size).toBe(0);
  });
});
