import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  acquireSyncLease,
  deleteOfflineDatabase,
  releaseSyncLease,
  saveOfflineContestRecord,
} from '../../src/lib/offline-db';
import { subscribeDownloadEvents } from '../../src/lib/offline-download-events';
import {
  cleanupInactiveContestCaches,
  downloadContestPackage,
  getOfflineContestRecord,
  hashOfflineResource,
  removeContestPackage,
  stripCloudflareBeacon,
  type OfflinePackageManifest,
} from '../../src/lib/offline-packages';
import { OFFLINE_MEDIA_CACHE, SHARED_ASSET_CACHE } from '../../src/lib/pwa-cache';
import type { OfflineMediaInventory } from '../../src/lib/offline-media';
import { createHash } from 'node:crypto';

// A renovacao do lease e observavel: o contador abaixo existe para provar
// que a fase de midias renova o lease por evento, e nao so pelo timer.
vi.mock('../../src/lib/offline-db', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../src/lib/offline-db')>();
  return { ...actual, renewSyncLease: vi.fn(actual.renewSyncLease) };
});

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

function manifest(
  hash: string,
  routes = ['/concursos/exemplo/'],
  resources: Record<string, string> = Object.fromEntries(
    [...routes, '/_astro/shared.js'].map((path) => [path, 'aaaaaaaaaaaaaaaaaaaa']),
  ),
  sharedHash = hash,
): OfflinePackageManifest {
  const sharedResources = Object.fromEntries(
    ['/_astro/shared.js'].map((path) => [path, resources[path] ?? 'bbbbbbbbbbbbbbbbbbbb']),
  );
  const contentResources = Object.fromEntries(
    Object.entries(resources).filter(([k]) => !sharedResources[k]),
  );
  return {
    schemaVersion: 3,
    contestSlug: 'exemplo',
    contestStorageId: 'exemplo',
    manifestHash: hash,
    sharedHash,
    routes,
    assets: [],
    sharedAssets: ['/_astro/shared.js'],
    estimatedBytes: 256,
    resources: contentResources,
    sharedResources,
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

async function bodyHash(path: string, body = `resource:${path}`): Promise<string> {
  return hashOfflineResource(path, new TextEncoder().encode(body));
}

async function hashedManifest(
  hash: string,
  routes = ['/concursos/exemplo/'],
  bodies?: Record<string, string>,
): Promise<OfflinePackageManifest> {
  const paths = [...new Set([...routes, '/_astro/shared.js'])];
  const resources: Record<string, string> = {};
  for (const path of paths) {
    resources[path] = await bodyHash(path, bodies?.[path]);
  }
  return manifest(hash, routes, resources);
}

beforeEach(async () => {
  await deleteOfflineDatabase();
});

describe('offline contest packages', () => {
  it('matches the inventory builder resource hash', async () => {
    const { resourceHash } = await import('../../scripts/lib/offline-inventory-builder.mjs');
    const body = Buffer.from('conteudo');
    expect(await hashOfflineResource('/asset.js', body)).toBe(resourceHash('/asset.js', body));
  });

  it('activates a complete package and removes it explicitly', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const progress = vi.fn();
    const fetchResource = vi.fn(successfulFetch);
    const record = await downloadContestPackage(await hashedManifest('11111111111111111111'), progress, {
      cacheStorage: cacheStorage as unknown as CacheStorage,
      fetch: fetchResource as typeof fetch,
      origin: 'https://concursos.test',
      storage: {
        persist: () => Promise.resolve(true),
        estimate: () => Promise.resolve({ quota: 10_000, usage: 0 }),
      },
    });

    expect(record.resourceCount).toBe(2);
    expect(progress).toHaveBeenLastCalledWith({ completed: 2, total: 2, downloadedBytes: 64, fetched: 2, copied: 0 });
    expect(fetchResource.mock.calls.every(([input]) => new Request(input).headers.get('X-PWA-Offline') === '1')).toBe(true);
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
    const original = await downloadContestPackage(await hashedManifest('11111111111111111111'), undefined, overrides);
    let requestCount = 0;
    const interruptedFetch = (input: RequestInfo | URL) => {
      requestCount += 1;
      if (requestCount === 1) return Promise.reject(new TypeError('Network interrupted'));
      return successfulFetch(input);
    };

    await expect(
      downloadContestPackage(
        await hashedManifest('22222222222222222222', ['/concursos/exemplo/', '/concursos/exemplo/questoes/']),
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
    const packageManifest = await hashedManifest('11111111111111111111');
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

    const download = downloadContestPackage(await hashedManifest('11111111111111111111'), undefined, overrides);
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
    const record = await downloadContestPackage(await hashedManifest('11111111111111111111'), undefined, overrides);
    await cacheStorage.delete(record.activeCacheName);
    await cacheStorage.open('contest--orphan--temporary--123');

    await cleanupInactiveContestCaches(overrides);

    expect(await getOfflineContestRecord('exemplo')).toBeUndefined();
    expect(cacheStorage.caches.has('contest--orphan--temporary--123')).toBe(false);
  });

  it('skips the package lock when there is nothing to clean', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const overrides = {
      cacheStorage: cacheStorage as unknown as CacheStorage,
      fetch: successfulFetch as typeof fetch,
      origin: 'https://concursos.test',
    };
    const record = await downloadContestPackage(await hashedManifest('11111111111111111111'), undefined, overrides);
    // Segura o lock global com outro dono: se o cleanup tentasse adquiri-lo,
    // ficaria bloqueado até o deadline em vez de retornar de imediato.
    expect(await acquireSyncLease('concursos:offline-packages', 'other-owner', 60_000)).toBe(true);
    try {
      await cleanupInactiveContestCaches(overrides);
    } finally {
      await releaseSyncLease('concursos:offline-packages', 'other-owner');
    }

    expect(await getOfflineContestRecord('exemplo')).toEqual(record);
    expect(cacheStorage.caches.has(record.activeCacheName)).toBe(true);
  });

  it('rejects insufficient quota before replacing the active package', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const original = await downloadContestPackage(await hashedManifest('11111111111111111111'), undefined, {
      cacheStorage: cacheStorage as unknown as CacheStorage,
      fetch: successfulFetch as typeof fetch,
      origin: 'https://concursos.test',
    });
    const fetchResource = vi.fn(successfulFetch);

    await expect(
      downloadContestPackage(await hashedManifest('22222222222222222222'), undefined, {
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

  it('rejects a downloaded body that does not match the manifest hash', async () => {
    const cacheStorage = new MemoryCacheStorage();
    await expect(
      downloadContestPackage(
        manifest('11111111111111111111', undefined, {
          '/concursos/exemplo/': 'deadbeefdeadbeefdead',
          '/_astro/shared.js': 'deadbeefdeadbeefdead',
        }),
        undefined,
        {
          cacheStorage: cacheStorage as unknown as CacheStorage,
          fetch: successfulFetch as typeof fetch,
          origin: 'https://concursos.test',
        },
      ),
    ).rejects.toThrow('Integridade inválida');
    expect(await getOfflineContestRecord('exemplo')).toBeUndefined();
  });

  it('rejects external resources in an untrusted manifest', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const invalid = { ...(await hashedManifest('11111111111111111111')), sharedAssets: ['//kv.helio.me/documento'] };

    await expect(
      downloadContestPackage(invalid, undefined, {
        cacheStorage: cacheStorage as unknown as CacheStorage,
        fetch: successfulFetch as typeof fetch,
        origin: 'https://concursos.test',
      }),
    ).rejects.toThrow();
    expect(cacheStorage.caches.size).toBe(0);
  });

  it('does not resurrect a package removed during a background update', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const overrides = {
      cacheStorage: cacheStorage as unknown as CacheStorage,
      fetch: successfulFetch as typeof fetch,
      origin: 'https://concursos.test',
    };
    // Registro removido: getOfflineContestRecord devolve null (fake-indexeddb vazio).
    const events: string[] = [];
    const unsubscribe = subscribeDownloadEvents((event) => events.push(event.type));

    const record = await downloadContestPackage(await hashedManifest('11111111111111111111'), undefined, overrides, 'update');

    await new Promise((resolve) => setTimeout(resolve, 25));
    unsubscribe();
    expect(record.resourceCount).toBe(0);
    expect(record.activeCacheName).toBe('');
    expect(cacheStorage.caches.size).toBe(0);
    expect(events).toEqual(['started', 'completed']);
  });

  it('updates by fetching only changed resources and copying unchanged ones locally', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const overrides = {
      cacheStorage: cacheStorage as unknown as CacheStorage,
      fetch: successfulFetch as typeof fetch,
      origin: 'https://concursos.test',
    };
    const v1 = await hashedManifest('11111111111111111111');
    const v1Record = await downloadContestPackage(v1, undefined, overrides);
    expect(v1Record.resourceHashes).toEqual(v1.resources);

    const v2 = await hashedManifest('22222222222222222222', undefined, {
      '/concursos/exemplo/': 'route:v2',
    });
    const fetchResource = vi.fn((input: RequestInfo | URL) => {
      if (new URL(new Request(input).url).pathname === '/concursos/exemplo/') {
        return Promise.resolve(new Response('route:v2', { status: 200, headers: { 'content-length': '8' } }));
      }
      return successfulFetch(input);
    });

    const record = await downloadContestPackage(v2, undefined, {
      ...overrides,
      fetch: fetchResource as typeof fetch,
    });

    expect(fetchResource).toHaveBeenCalledTimes(1);
    expect((fetchResource.mock.calls[0][0] as Request).url).toContain('/concursos/exemplo/');
    expect(record.resourceHashes).toEqual(v2.resources);
    expect(await getOfflineContestRecord('exemplo')).toEqual(record);
    expect(cacheStorage.caches.has(v1Record.activeCacheName)).toBe(false);

    const promotedRoute = await cacheStorage.caches.get(record.activeCacheName)?.match('https://concursos.test/concursos/exemplo/');
    expect(await promotedRoute?.text()).toBe('route:v2');
    const sharedEntry = await cacheStorage.caches.get(SHARED_ASSET_CACHE)?.match('https://concursos.test/_astro/shared.js');
    expect(await sharedEntry?.text()).toBe('resource:/_astro/shared.js');
  });

  it('refetches an unchanged resource that was evicted from the local caches', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const overrides = {
      cacheStorage: cacheStorage as unknown as CacheStorage,
      fetch: successfulFetch as typeof fetch,
      origin: 'https://concursos.test',
    };
    const unchanged = await hashedManifest('11111111111111111111');
    const v1Record = await downloadContestPackage(unchanged, undefined, overrides);
    await cacheStorage.caches.get(v1Record.activeCacheName)?.delete('https://concursos.test/concursos/exemplo/');

    const fetchResource = vi.fn(successfulFetch);
    const record = await downloadContestPackage(
      await hashedManifest('22222222222222222222'),
      undefined,
      { ...overrides, fetch: fetchResource as typeof fetch },
    );

    expect(fetchResource).toHaveBeenCalledTimes(1);
    expect((fetchResource.mock.calls[0][0] as Request).url).toContain('/concursos/exemplo/');
    expect(record.resourceHashes).toEqual({ '/concursos/exemplo/': unchanged.resources['/concursos/exemplo/'] });
    expect((record as unknown as { sharedHashes?: Record<string,string> }).sharedHashes).toEqual({
      '/_astro/shared.js': unchanged.sharedResources['/_astro/shared.js'],
    });
    expect((await cacheStorage.caches.get(record.activeCacheName)?.keys())?.length).toBe(1);
  });

  it('performs a full download when the previous record has an empty resource hash map', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const overrides = {
      cacheStorage: cacheStorage as unknown as CacheStorage,
      fetch: successfulFetch as typeof fetch,
      origin: 'https://concursos.test',
    };
    const emptyV1 = manifest('11111111111111111111', undefined, {
      '/_astro/shared.js': await bodyHash('/_astro/shared.js'),
    });
    await downloadContestPackage(emptyV1, undefined, overrides);

    const v2 = await hashedManifest('22222222222222222222');
    const fetchResource = vi.fn(successfulFetch);
    const record = await downloadContestPackage(v2, undefined, {
      ...overrides,
      fetch: fetchResource as typeof fetch,
    });

    expect(fetchResource).toHaveBeenCalledTimes(1);
    expect(record.resourceHashes).toEqual(v2.resources);
  });

  it('performs a full download when the previous record predates per-resource hashes', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const overrides = {
      cacheStorage: cacheStorage as unknown as CacheStorage,
      fetch: successfulFetch as typeof fetch,
      origin: 'https://concursos.test',
    };
    await saveOfflineContestRecord({
      contestStorageId: 'exemplo',
      manifestHash: '11111111111111111111',
      activeCacheName: 'contest--exemplo--11111111111111111111',
      downloadedAt: Date.now(),
      resourceCount: 2,
    });

    const v2 = await hashedManifest('22222222222222222222');
    const fetchResource = vi.fn(successfulFetch);
    const record = await downloadContestPackage(v2, undefined, {
      ...overrides,
      fetch: fetchResource as typeof fetch,
    });

    expect(fetchResource).toHaveBeenCalledTimes(2);
    expect(record.resourceHashes).toEqual(v2.resources);
  });

  it('fetches resources that have no hash in either manifest revision', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const overrides = {
      cacheStorage: cacheStorage as unknown as CacheStorage,
      fetch: successfulFetch as typeof fetch,
      origin: 'https://concursos.test',
    };
    const emptyHashes = { '/_astro/shared.js': await bodyHash('/_astro/shared.js') };
    await downloadContestPackage(manifest('11111111111111111111', undefined, emptyHashes), undefined, overrides);

    const fetchResource = vi.fn(successfulFetch);
    const record = await downloadContestPackage(manifest('22222222222222222222', undefined, emptyHashes), undefined, {
      ...overrides,
      fetch: fetchResource as typeof fetch,
    });

    // Com schema v3, sharedResources tem hash mesmo quando resources é vazio, então shared é copiado
    expect(fetchResource).toHaveBeenCalledTimes(1);
    expect(record.resourceHashes).toEqual({});
  });
});

describe('Cloudflare beacon stripping', () => {
  const BEACON = `<!-- Cloudflare Pages Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "f31644b332dd4f4e9b89a5431b9a0502"}'></script><!-- Cloudflare Pages Analytics -->`;

  it('removes the injected beacon keeping the body intact', () => {
    const html = `<html><body><p>oi</p>${BEACON}</body></html>`;
    expect(stripCloudflareBeacon(html)).toBe('<html><body><p>oi</p></body></html>');
  });

  it('is a no-op without the beacon', () => {
    const html = '<html><body><p>oi</p></body></html>';
    expect(stripCloudflareBeacon(html)).toBe(html);
  });

  it('hashes served bytes equal to pristine bytes', async () => {
    const resource = '/concursos/exemplo/';
    const pristine = new TextEncoder().encode('<html><body><p>oi</p></body></html>');
    const served = new TextEncoder().encode(`<html><body><p>oi</p>${BEACON}</body></html>`);
    await expect(hashOfflineResource(resource, pristine)).resolves.toBe(
      await hashOfflineResource(resource, served),
    );
  });
});

describe('beacon prescan', () => {
  it('hashes invalid-UTF8 binary without the needle bit-identically', async () => {
    const resource = '/_astro/font.woff2';
    const bytes = new Uint8Array([0xff, 0xfe, 0x00, 0x89, 0x50, 0x4e, 0x47]);
    const direct = await crypto.subtle.digest(
      'SHA-256',
      (() => {
        const path = new TextEncoder().encode(resource);
        const combined = new Uint8Array(path.length + bytes.length);
        combined.set(path, 0);
        combined.set(bytes, path.length);
        return combined;
      })(),
    ).then(
      (digest) => [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('').slice(0, 20),
    );
    await expect(hashOfflineResource(resource, bytes)).resolves.toBe(direct);
  });

  it('downloads the media with the package and records it in the contest record', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const body = 'a'.repeat(32);
    const sha256 = createHash('sha256').update(body).digest('hex');
    const url = `/media/${sha256}.mp3`;
    const media: OfflineMediaInventory = {
      schemaVersion: 1,
      contestStorageId: 'exemplo',
      inventoryHash: '0123456789abcdef0123',
      estimatedBytes: body.length,
      items: [{ url, sha256, bytes: body.length }],
    };
    const fetchResource = vi.fn(async (input: RequestInfo | URL) => {
      const request = new Request(input);
      if (new URL(request.url).pathname.startsWith('/media/')) {
        return new Response(body, { status: 200, headers: { 'Content-Length': String(body.length) } });
      }
      return successfulFetch(request);
    });

    const record = await downloadContestPackage(
      await hashedManifest('11111111111111111111'),
      undefined,
      {
        cacheStorage: cacheStorage as unknown as CacheStorage,
        fetch: fetchResource as typeof fetch,
        origin: 'https://concursos.test',
        storage: {
          persist: () => Promise.resolve(true),
          estimate: () => Promise.resolve({ quota: 10_000, usage: 0 }),
        },
      },
      'download',
      { media },
    );

    expect(record.media?.included).toBe(true);
    expect(record.media?.status).toBe('complete');
    expect(record.media?.urls).toEqual([url]);
    const mediaCache = cacheStorage.caches.get(OFFLINE_MEDIA_CACHE);
    expect(await mediaCache?.match(`https://concursos.test${url}`)).toBeDefined();
  });

  it('keeps the downloaded media when the package is updated', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const body = 'a'.repeat(32);
    const sha256 = createHash('sha256').update(body).digest('hex');
    const url = `/media/${sha256}.mp3`;
    const media: OfflineMediaInventory = {
      schemaVersion: 1,
      contestStorageId: 'exemplo',
      inventoryHash: '0123456789abcdef0123',
      estimatedBytes: body.length,
      items: [{ url, sha256, bytes: body.length }],
    };
    const fetchResource = vi.fn(async (input: RequestInfo | URL) => {
      const request = new Request(input);
      if (new URL(request.url).pathname.startsWith('/media/')) {
        return new Response(body, { status: 200, headers: { 'Content-Length': String(body.length) } });
      }
      return successfulFetch(request);
    });
    const overrides = {
      cacheStorage: cacheStorage as unknown as CacheStorage,
      fetch: fetchResource as typeof fetch,
      origin: 'https://concursos.test',
    };
    await downloadContestPackage(await hashedManifest('11111111111111111111'), undefined, overrides, 'download', { media });

    const updated = await downloadContestPackage(
      await hashedManifest('22222222222222222222', ['/concursos/exemplo/', '/concursos/exemplo/questoes/']),
      undefined,
      overrides,
      'update',
    );

    expect(updated.media?.urls).toEqual([url]);
    expect(updated.media?.status).toBe('complete');
  });

  it('removes only the media that no other downloaded contest references', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const body = 'a'.repeat(32);
    const sha256 = createHash('sha256').update(body).digest('hex');
    const url = `/media/${sha256}.mp3`;
    const media: OfflineMediaInventory = {
      schemaVersion: 1,
      contestStorageId: 'exemplo',
      inventoryHash: '0123456789abcdef0123',
      estimatedBytes: body.length,
      items: [{ url, sha256, bytes: body.length }],
    };
    const fetchResource = vi.fn(async (input: RequestInfo | URL) => {
      const request = new Request(input);
      if (new URL(request.url).pathname.startsWith('/media/')) {
        return new Response(body, { status: 200, headers: { 'Content-Length': String(body.length) } });
      }
      return successfulFetch(request);
    });
    await downloadContestPackage(
      await hashedManifest('11111111111111111111'),
      undefined,
      {
        cacheStorage: cacheStorage as unknown as CacheStorage,
        fetch: fetchResource as typeof fetch,
        origin: 'https://concursos.test',
      },
      'download',
      { media },
    );

    await removeContestPackage('exemplo', { cacheStorage: cacheStorage as unknown as CacheStorage });

    const mediaCache = cacheStorage.caches.get(OFFLINE_MEDIA_CACHE);
    expect(await mediaCache?.match(`https://concursos.test${url}`)).toBeUndefined();
  });

  it('does not download media nor resurrect a contest removed during an update', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const body = 'a'.repeat(32);
    const sha256 = createHash('sha256').update(body).digest('hex');
    const url = `/media/${sha256}.mp3`;
    const media: OfflineMediaInventory = {
      schemaVersion: 1,
      contestStorageId: 'exemplo',
      inventoryHash: '0123456789abcdef0123',
      estimatedBytes: body.length,
      items: [{ url, sha256, bytes: body.length }],
    };
    const fetchResource = vi.fn(async (input: RequestInfo | URL) => {
      const request = new Request(input);
      if (new URL(request.url).pathname.startsWith('/media/')) {
        throw new Error('a midia nao deveria ser baixada');
      }
      return successfulFetch(request);
    });

    // O concurso foi removido enquanto a atualizacao esperava o lock: o
    // registro nao existe mais e nada deve ser gravado.
    const record = await downloadContestPackage(
      await hashedManifest('11111111111111111111'),
      undefined,
      {
        cacheStorage: cacheStorage as unknown as CacheStorage,
        fetch: fetchResource as typeof fetch,
        origin: 'https://concursos.test',
      },
      'update',
      { media },
    );

    expect(record.activeCacheName).toBe('');
    expect(await getOfflineContestRecord('exemplo')).toBeUndefined();
    expect(fetchResource.mock.calls.some(([input]) => new URL(new Request(input).url).pathname.startsWith('/media/'))).toBe(false);
  });

  it('keeps the partial media state when a media file fails', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const body = 'a'.repeat(32);
    const sha256 = createHash('sha256').update(body).digest('hex');
    const url = `/media/${sha256}.mp3`;
    const media: OfflineMediaInventory = {
      schemaVersion: 1,
      contestStorageId: 'exemplo',
      inventoryHash: '0123456789abcdef0123',
      estimatedBytes: body.length,
      items: [{ url, sha256, bytes: body.length }],
    };
    const fetchResource = vi.fn(async (input: RequestInfo | URL) => {
      const request = new Request(input);
      if (new URL(request.url).pathname.startsWith('/media/')) {
        return new Response('c'.repeat(32), { status: 200, headers: { 'Content-Length': '32' } });
      }
      return successfulFetch(request);
    });

    await expect(
      downloadContestPackage(
        await hashedManifest('11111111111111111111'),
        undefined,
        {
          cacheStorage: cacheStorage as unknown as CacheStorage,
          fetch: fetchResource as typeof fetch,
          origin: 'https://concursos.test',
          storage: {
            persist: () => Promise.resolve(true),
            estimate: () => Promise.resolve({ quota: 10_000, usage: 0 }),
          },
        },
        'download',
        { media },
      ),
    ).rejects.toThrow(/mídias/);

    const record = await getOfflineContestRecord('exemplo');
    // O conteudo continua disponivel offline e a midia ficou marcada como
    // parcial, para a retomada e para a poda nao apagar o que existe.
    expect(record?.activeCacheName).not.toBe('');
    expect(record?.media?.included).toBe(true);
    expect(record?.media?.status).toBe('partial');
    expect(record?.media?.urls).toEqual([]);
  });

  it('prunes the media that left the inventory', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const firstBody = 'a'.repeat(32);
    const secondBody = 'b'.repeat(32);
    const firstSha = createHash('sha256').update(firstBody).digest('hex');
    const secondSha = createHash('sha256').update(secondBody).digest('hex');
    const firstUrl = `/media/${firstSha}.mp3`;
    const secondUrl = `/media/${secondSha}.mp3`;
    const inventory = (url: string, sha: string, body: string): OfflineMediaInventory => ({
      schemaVersion: 1,
      contestStorageId: 'exemplo',
      inventoryHash: '0123456789abcdef0123',
      estimatedBytes: body.length,
      items: [{ url, sha256: sha, bytes: body.length }],
    });
    const fetchResource = vi.fn(async (input: RequestInfo | URL) => {
      const request = new Request(input);
      const pathname = new URL(request.url).pathname;
      if (pathname === firstUrl) {
        return new Response(firstBody, { status: 200, headers: { 'Content-Length': String(firstBody.length) } });
      }
      if (pathname === secondUrl) {
        return new Response(secondBody, { status: 200, headers: { 'Content-Length': String(secondBody.length) } });
      }
      return successfulFetch(request);
    });
    const overrides = {
      cacheStorage: cacheStorage as unknown as CacheStorage,
      fetch: fetchResource as typeof fetch,
      origin: 'https://concursos.test',
    };

    await downloadContestPackage(
      await hashedManifest('11111111111111111111'),
      undefined,
      overrides,
      'download',
      { media: inventory(firstUrl, firstSha, firstBody) },
    );
    await downloadContestPackage(
      await hashedManifest('22222222222222222222'),
      undefined,
      overrides,
      'download',
      { media: inventory(secondUrl, secondSha, secondBody) },
    );

    const mediaCache = cacheStorage.caches.get(OFFLINE_MEDIA_CACHE);
    expect(await mediaCache?.match(`https://concursos.test${firstUrl}`)).toBeUndefined();
    expect(await mediaCache?.match(`https://concursos.test${secondUrl}`)).toBeDefined();
  });

  it('prunes the media orphaned by the cleanup of a ghost record', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const body = 'a'.repeat(32);
    const sha256 = createHash('sha256').update(body).digest('hex');
    const url = `/media/${sha256}.mp3`;
    const media: OfflineMediaInventory = {
      schemaVersion: 1,
      contestStorageId: 'exemplo',
      inventoryHash: '0123456789abcdef0123',
      estimatedBytes: body.length,
      items: [{ url, sha256, bytes: body.length }],
    };
    const fetchResource = vi.fn(async (input: RequestInfo | URL) => {
      const request = new Request(input);
      if (new URL(request.url).pathname.startsWith('/media/')) {
        return new Response(body, { status: 200, headers: { 'Content-Length': String(body.length) } });
      }
      return successfulFetch(request);
    });
    const overrides = {
      cacheStorage: cacheStorage as unknown as CacheStorage,
      fetch: fetchResource as typeof fetch,
      origin: 'https://concursos.test',
    };
    const record = await downloadContestPackage(
      await hashedManifest('11111111111111111111'),
      undefined,
      overrides,
      'download',
      { media },
    );

    // O cache do concurso sumiu: o registro vira fantasma e a midia fica
    // orfa no aparelho.
    await cacheStorage.delete(record.activeCacheName);
    await cleanupInactiveContestCaches(overrides);

    expect(await getOfflineContestRecord('exemplo')).toBeUndefined();
    const mediaCache = cacheStorage.caches.get(OFFLINE_MEDIA_CACHE);
    expect(await mediaCache?.match(`https://concursos.test${url}`)).toBeUndefined();
  });

  it('drops the media state when the contest no longer has media', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const body = 'a'.repeat(32);
    const sha256 = createHash('sha256').update(body).digest('hex');
    const url = `/media/${sha256}.mp3`;
    const media: OfflineMediaInventory = {
      schemaVersion: 1,
      contestStorageId: 'exemplo',
      inventoryHash: '0123456789abcdef0123',
      estimatedBytes: body.length,
      items: [{ url, sha256, bytes: body.length }],
    };
    const fetchResource = vi.fn(async (input: RequestInfo | URL) => {
      const request = new Request(input);
      if (new URL(request.url).pathname.startsWith('/media/')) {
        return new Response(body, { status: 200, headers: { 'Content-Length': String(body.length) } });
      }
      return successfulFetch(request);
    });
    const overrides = {
      cacheStorage: cacheStorage as unknown as CacheStorage,
      fetch: fetchResource as typeof fetch,
      origin: 'https://concursos.test',
    };
    await downloadContestPackage(await hashedManifest('11111111111111111111'), undefined, overrides, 'download', { media });

    const emptied = await downloadContestPackage(
      await hashedManifest('22222222222222222222'),
      undefined,
      overrides,
      'update',
      {
        media: {
          schemaVersion: 1,
          contestStorageId: 'exemplo',
          inventoryHash: 'abcdef0123456789abcd',
          estimatedBytes: 0,
          items: [],
        },
      },
    );

    expect(emptied.media?.included).toBe(false);
    expect(emptied.media?.urls).toEqual([]);
    const mediaCache = cacheStorage.caches.get(OFFLINE_MEDIA_CACHE);
    expect(await mediaCache?.match(`https://concursos.test${url}`)).toBeUndefined();
  });

  it('renews the lease while the media is downloading', async () => {
    const { renewSyncLease } = await import('../../src/lib/offline-db');
    const renewSpy = vi.mocked(renewSyncLease);
    renewSpy.mockClear();
    // Só o relógio e os timers sao virtuais: o IndexedDB precisa do
    // setImmediate real para concluir as transacoes.
    vi.useFakeTimers({ toFake: ['Date', 'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval'] });
    try {
      const cacheStorage = new MemoryCacheStorage();
      const body = 'a'.repeat(32);
      const sha256 = createHash('sha256').update(body).digest('hex');
      const url = `/media/${sha256}.mp3`;
      const media: OfflineMediaInventory = {
        schemaVersion: 1,
        contestStorageId: 'exemplo',
        inventoryHash: '0123456789abcdef0123',
        estimatedBytes: body.length,
        items: [{ url, sha256, bytes: body.length }],
      };
      const fetchResource = vi.fn(async (input: RequestInfo | URL) => {
        const request = new Request(input);
        if (new URL(request.url).pathname.startsWith('/media/')) {
          // O tempo avancia durante a midia: com o timer virtual, o
          // heartbeat nao roda e a unica renovacao possivel e a da
          // leitura do corpo. A janela de renovacao e um terco do lease
          // da fase de midias (60 s), entao o avanco precisa passa-la.
          vi.setSystemTime(Date.now() + 25_000);
          return new Response(body, { status: 200, headers: { 'Content-Length': String(body.length) } });
        }
        return successfulFetch(request);
      });

      await downloadContestPackage(
        await hashedManifest('11111111111111111111'),
        undefined,
        {
          cacheStorage: cacheStorage as unknown as CacheStorage,
          fetch: fetchResource as typeof fetch,
          origin: 'https://concursos.test',
        },
        'download',
        { media },
      );

      expect(renewSpy.mock.calls.length).toBeGreaterThan(0);
    } finally {
      vi.useRealTimers();
    }
  });

  it('keeps the media already downloaded when a new media file fails', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const firstBody = 'a'.repeat(32);
    const firstSha = createHash('sha256').update(firstBody).digest('hex');
    const firstUrl = `/media/${firstSha}.mp3`;
    const inventory = (url: string, sha: string, body: string, hash: string): OfflineMediaInventory => ({
      schemaVersion: 1,
      contestStorageId: 'exemplo',
      inventoryHash: hash,
      estimatedBytes: body.length,
      items: [{ url, sha256: sha, bytes: body.length }],
    });
    const fetchResource = vi.fn(async (input: RequestInfo | URL) => {
      const request = new Request(input);
      const pathname = new URL(request.url).pathname;
      if (pathname === firstUrl) {
        return new Response(firstBody, { status: 200, headers: { 'Content-Length': String(firstBody.length) } });
      }
      if (pathname.startsWith('/media/')) {
        // O segundo arquivo volta com conteudo invalido: a integridade falha.
        return new Response('z'.repeat(32), { status: 200, headers: { 'Content-Length': '32' } });
      }
      return successfulFetch(request);
    });
    const overrides = {
      cacheStorage: cacheStorage as unknown as CacheStorage,
      fetch: fetchResource as typeof fetch,
      origin: 'https://concursos.test',
    };
    await downloadContestPackage(
      await hashedManifest('11111111111111111111'),
      undefined,
      overrides,
      'download',
      { media: inventory(firstUrl, firstSha, firstBody, '0123456789abcdef0123') },
    );

    // O mesmo inventario, agora com um arquivo a mais: o arquivo novo
    // falha e o antigo precisa continuar referenciado.
    const secondBody = 'b'.repeat(32);
    const secondSha = createHash('sha256').update(secondBody).digest('hex');
    const secondUrl = `/media/${secondSha}.mp3`;
    const grown: OfflineMediaInventory = {
      schemaVersion: 1,
      contestStorageId: 'exemplo',
      inventoryHash: 'abcdef0123456789abcd',
      estimatedBytes: firstBody.length + secondBody.length,
      items: [
        { url: firstUrl, sha256: firstSha, bytes: firstBody.length },
        { url: secondUrl, sha256: secondSha, bytes: secondBody.length },
      ],
    };
    await expect(
      downloadContestPackage(
        await hashedManifest('22222222222222222222'),
        undefined,
        overrides,
        'update',
        { media: grown },
      ),
    ).rejects.toThrow(/mídias/);

    // A midia que o usuario ja tinha continua referenciada.
    const record = await getOfflineContestRecord('exemplo');
    expect(record?.media?.status).toBe('partial');
    expect(record?.media?.urls).toContain(firstUrl);
    const mediaCache = cacheStorage.caches.get(OFFLINE_MEDIA_CACHE);
    expect(await mediaCache?.match(`https://concursos.test${firstUrl}`)).toBeDefined();
  });

  it('reports a media quota failure as a media failure', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const body = 'a'.repeat(32);
    const sha256 = createHash('sha256').update(body).digest('hex');
    const url = `/media/${sha256}.mp3`;
    const media: OfflineMediaInventory = {
      schemaVersion: 1,
      contestStorageId: 'exemplo',
      inventoryHash: '0123456789abcdef0123',
      estimatedBytes: body.length,
      items: [{ url, sha256, bytes: body.length }],
    };
    const fetchResource = vi.fn(async (input: RequestInfo | URL) => {
      const request = new Request(input);
      if (new URL(request.url).pathname.startsWith('/media/')) {
        return new Response(body, { status: 200, headers: { 'Content-Length': String(body.length) } });
      }
      return successfulFetch(request);
    });
    const overrides = {
      cacheStorage: cacheStorage as unknown as CacheStorage,
      fetch: fetchResource as typeof fetch,
      origin: 'https://concursos.test',
    };
    const manifest = await hashedManifest('11111111111111111111');
    await downloadContestPackage(manifest, undefined, {
      ...overrides,
      storage: { persist: () => Promise.resolve(true), estimate: () => Promise.resolve({ quota: 10_000, usage: 0 }) },
    }, 'download');

    // O pacote ja esta completo: so a fase de midia roda, e ela nao cabe
    // no espaco restante.
    await expect(
      downloadContestPackage(manifest, undefined, {
        ...overrides,
        storage: { persist: () => Promise.resolve(true), estimate: () => Promise.resolve({ quota: 10, usage: 0 }) },
      }, 'update', { media }),
    ).rejects.toThrow(/mídias não puderam|espaço/);
  });

  it('stops the media phase when the coordination is lost', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const body = 'a'.repeat(32);
    const sha256 = createHash('sha256').update(body).digest('hex');
    const url = `/media/${sha256}.mp3`;
    const media: OfflineMediaInventory = {
      schemaVersion: 1,
      contestStorageId: 'exemplo',
      inventoryHash: '0123456789abcdef0123',
      estimatedBytes: body.length,
      items: [{ url, sha256, bytes: body.length }],
    };
    vi.useFakeTimers({ toFake: ['Date', 'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval'] });
    try {
      const fetchResource = vi.fn(async (input: RequestInfo | URL) => {
        const request = new Request(input);
        if (new URL(request.url).pathname.startsWith('/media/')) {
          // O lease expira durante a transferencia.
          vi.setSystemTime(Date.now() + 120_000);
          return new Response(body, { status: 200, headers: { 'Content-Length': String(body.length) } });
        }
        return successfulFetch(request);
      });

      await expect(
        downloadContestPackage(
          await hashedManifest('11111111111111111111'),
          undefined,
          {
            cacheStorage: cacheStorage as unknown as CacheStorage,
            fetch: fetchResource as typeof fetch,
            origin: 'https://concursos.test',
          },
          'download',
          { media },
        ),
      ).rejects.toThrow(/coordenação|coordena/);

      const record = await getOfflineContestRecord('exemplo');
      // O conteudo continua disponivel, mas a midia nao e gravada sem
      // coordenacao: escrever aqui ressuscitaria um estado obsoleto.
      expect(record?.activeCacheName).not.toBe('');
      expect(record?.media?.status).toBeUndefined();
    } finally {
      vi.useRealTimers();
    }
  });

  it('does not write the media state when the record changed during the media phase', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const body = 'a'.repeat(32);
    const sha256 = createHash('sha256').update(body).digest('hex');
    const url = `/media/${sha256}.mp3`;
    const media: OfflineMediaInventory = {
      schemaVersion: 1,
      contestStorageId: 'exemplo',
      inventoryHash: '0123456789abcdef0123',
      estimatedBytes: body.length,
      items: [{ url, sha256, bytes: body.length }],
    };
    const fetchResource = vi.fn(async (input: RequestInfo | URL) => {
      const request = new Request(input);
      if (new URL(request.url).pathname.startsWith('/media/')) {
        // Enquanto a midia baixa, outra operacao troca o registro.
        const current = await getOfflineContestRecord('exemplo');
        await saveOfflineContestRecord({ ...current!, activeCacheName: 'outro-cache' });
        return new Response(body, { status: 200, headers: { 'Content-Length': String(body.length) } });
      }
      return successfulFetch(request);
    });

    await expect(
      downloadContestPackage(
        await hashedManifest('11111111111111111111'),
        undefined,
        {
          cacheStorage: cacheStorage as unknown as CacheStorage,
          fetch: fetchResource as typeof fetch,
          origin: 'https://concursos.test',
        },
        'download',
        { media },
      ),
    ).rejects.toThrow(/mudou durante/);

    const record = await getOfflineContestRecord('exemplo');
    // O registro novo nao foi sobrescrito com o estado de midia.
    expect(record?.activeCacheName).toBe('outro-cache');
    expect(record?.media?.status).toBeUndefined();
  });

  it('keeps the offline manifest contract free of media fields', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const withMedia = { ...(await hashedManifest('11111111111111111111')), media: [] };
    await expect(
      downloadContestPackage(withMedia, undefined, {
        cacheStorage: cacheStorage as unknown as CacheStorage,
        fetch: successfulFetch as typeof fetch,
        origin: 'https://concursos.test',
      }),
    ).rejects.toThrow();
  });
});
