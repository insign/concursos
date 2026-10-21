import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { downloadOfflineMedia, type OfflineMediaInventory } from '../../src/lib/offline-media';
import { OFFLINE_MEDIA_CACHE } from '../../src/lib/pwa-cache';

class MemoryCache {
  readonly entries = new Map<string, Response>();

  async put(request: RequestInfo | URL, response: Response): Promise<void> {
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

  async open(name: string): Promise<Cache> {
    const cache = this.caches.get(name) ?? new MemoryCache();
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

function mediaItem(index: number, body: string) {
  const sha256 = createHash('sha256').update(body).digest('hex');
  return { url: `/media/${sha256}.mp3`, sha256, bytes: body.length };
}

function inventoryOf(items: ReturnType<typeof mediaItem>[]): OfflineMediaInventory {
  return {
    schemaVersion: 1,
    contestStorageId: 'exemplo',
    inventoryHash: '0123456789abcdef0123',
    estimatedBytes: items.reduce((total, item) => total + item.bytes, 0),
    items,
  };
}

describe('offline media download', () => {
  it('downloads several files in parallel and verifies the digest', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const bodies = ['a'.repeat(64), 'b'.repeat(64), 'c'.repeat(64), 'd'.repeat(64)];
    const items = bodies.map((body) => mediaItem(0, body));
    let inFlight = 0;
    let maxInFlight = 0;
    const fetchResource = async (input: RequestInfo | URL): Promise<Response> => {
      inFlight += 1;
      maxInFlight = Math.max(maxInFlight, inFlight);
      await new Promise((resolve) => setTimeout(resolve, 5));
      inFlight -= 1;
      const url = new URL(new Request(input).url);
      const body = bodies[items.findIndex((item) => item.url === url.pathname)] ?? '';
      return new Response(body, { status: 200, headers: { 'Content-Length': String(body.length) } });
    };

    const progress: number[] = [];
    const outcome = await downloadOfflineMedia(
      inventoryOf(items),
      (state) => progress.push(state.completed),
      { cacheStorage: cacheStorage as unknown as CacheStorage, fetch: fetchResource as unknown as typeof fetch, origin: 'https://concursos.helio.me' },
    );

    expect(outcome.missing).toEqual([]);
    expect(outcome.urls).toHaveLength(4);
    expect(maxInFlight).toBeGreaterThan(1);
    expect(progress.at(-1)).toBe(4);
    const cache = await cacheStorage.open(OFFLINE_MEDIA_CACHE);
    for (const item of items) {
      expect(await cache.match(new Request(`https://concursos.helio.me${item.url}`))).toBeDefined();
    }
  });

  it('refuses a file whose digest does not match the catalog', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const item = mediaItem(0, 'a'.repeat(32));
    const fetchResource = async (): Promise<Response> =>
      new Response('b'.repeat(32), { status: 200, headers: { 'Content-Length': '32' } });

    await expect(
      downloadOfflineMedia(inventoryOf([item]), undefined, {
        cacheStorage: cacheStorage as unknown as CacheStorage,
        fetch: fetchResource as unknown as typeof fetch,
        origin: 'https://concursos.helio.me',
      }),
    ).rejects.toThrow('Integridade');

    const cache = await cacheStorage.open(OFFLINE_MEDIA_CACHE);
    expect(await cache.match(new Request(`https://concursos.helio.me${item.url}`))).toBeUndefined();
  });

  it('refuses a partial response', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const item = mediaItem(0, 'a'.repeat(32));
    const fetchResource = async (): Promise<Response> =>
      new Response('a'.repeat(16), { status: 206, headers: { 'Content-Length': '16' } });

    await expect(
      downloadOfflineMedia(inventoryOf([item]), undefined, {
        cacheStorage: cacheStorage as unknown as CacheStorage,
        fetch: fetchResource as unknown as typeof fetch,
        origin: 'https://concursos.helio.me',
      }),
    ).rejects.toThrow('HTTP 206');
  });

  it('reuses what is already stored instead of downloading again', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const body = 'a'.repeat(32);
    const item = mediaItem(0, body);
    const cache = await cacheStorage.open(OFFLINE_MEDIA_CACHE);
    await cache.put(
      new Request(`https://concursos.helio.me${item.url}`),
      new Response(body, { status: 200, headers: { 'Content-Length': String(body.length) } }),
    );
    const fetchResource = async (): Promise<Response> => {
      throw new Error('não deveria baixar de novo');
    };

    const outcome = await downloadOfflineMedia(inventoryOf([item]), undefined, {
      cacheStorage: cacheStorage as unknown as CacheStorage,
      fetch: fetchResource as unknown as typeof fetch,
      origin: 'https://concursos.helio.me',
    });
    expect(outcome.urls).toEqual([item.url]);
    expect(outcome.missing).toEqual([]);
    expect(outcome.downloadedBytes).toBe(0);
  });
});
