import { beforeEach, describe, expect, it, vi } from 'vitest';

const listRecords = vi.fn();
const download = vi.fn();

vi.mock('../../src/lib/offline-db', () => ({
  listOfflineContestRecords: (...args: unknown[]) => listRecords(...args),
}));

vi.mock(import('../../src/lib/offline-packages'), async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../src/lib/offline-packages')>();
  return { ...actual, downloadContestPackage: (...args: unknown[]) => download(...args) };
});

function manifest(hash: string, storageId = 'exemplo') {
  return {
    schemaVersion: 3,
    contestSlug: 'exemplo',
    contestStorageId: storageId,
    manifestHash: hash,
    sharedHash: hash,
    routes: ['/concursos/exemplo/'],
    assets: [],
    sharedAssets: ['/_astro/shared.js'],
    estimatedBytes: 256,
    resources: {
      '/concursos/exemplo/': 'aaaaaaaaaaaaaaaaaaaa',
    },
    sharedResources: {
      '/_astro/shared.js': 'bbbbbbbbbbbbbbbbbbbb',
    },
  };
}

async function loadModule() {
  return import('../../src/lib/offline-auto-update');
}

class MemoryMediaCache {
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

class MemoryMediaCacheStorage {
  readonly caches = new Map<string, MemoryMediaCache>();

  async open(name: string): Promise<Cache> {
    const cache = this.caches.get(name) ?? new MemoryMediaCache();
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

const originalCaches = globalThis.caches;

function useMediaCache(urls: string[]): MemoryMediaCacheStorage {
  const storage = new MemoryMediaCacheStorage();
  Object.defineProperty(globalThis, 'caches', { value: storage, configurable: true, writable: true });
  const cache = new MemoryMediaCache();
  for (const url of urls) {
    void cache.put(new Request(`http://localhost${url}`), new Response('a'));
  }
  storage.caches.set('offline-media-v1', cache);
  return storage;
}

beforeEach(() => {
  Object.defineProperty(globalThis, 'caches', { value: originalCaches, configurable: true, writable: true });
  vi.resetModules();
  listRecords.mockReset();
  download.mockReset();
  listRecords.mockResolvedValue([]);
});

describe('offline auto update', () => {
  it('skips records whose manifest hash is unchanged', async () => {
    const record = { contestStorageId: 'exemplo', manifestHash: '11111111111111111111', activeCacheName: 'c', downloadedAt: 1, resourceCount: 2 };
    listRecords.mockResolvedValue([record]);
    const fetchResource = vi.fn(async () => new Response(JSON.stringify(manifest('11111111111111111111')), { status: 200 }));

    const { maybeUpdateOfflinePackages } = await loadModule();
    await maybeUpdateOfflinePackages('navigation', { fetch: fetchResource as typeof fetch, now: () => 1_000 });

    expect(fetchResource).toHaveBeenCalledTimes(1);
    expect(download).not.toHaveBeenCalled();
  });

  it('downloads the delta with update phase when the hash changes', async () => {
    const record = { contestStorageId: 'exemplo', manifestHash: '11111111111111111111', activeCacheName: 'c', downloadedAt: 1, resourceCount: 2 };
    listRecords.mockResolvedValue([record]);
    const fetchResource = vi.fn(async () => new Response(JSON.stringify(manifest('22222222222222222222')), { status: 200 }));
    download.mockResolvedValue({ contestStorageId: 'exemplo' });

    const { maybeUpdateOfflinePackages } = await loadModule();
    await maybeUpdateOfflinePackages('navigation', { fetch: fetchResource as typeof fetch, now: () => 1_000 });

    expect(download).toHaveBeenCalledTimes(1);
    const [, , env, phase] = download.mock.calls[0]!;
    expect(env).toEqual({ fetch: fetchResource });
    expect(phase).toBe('update');
  });

  it('throttles navigation checks and keeps periodic checks independent', async () => {
    const record = { contestStorageId: 'exemplo', manifestHash: '11111111111111111111', activeCacheName: 'c', downloadedAt: 1, resourceCount: 2 };
    listRecords.mockResolvedValue([record]);
    let clock = 1_000;
    const now = () => clock;
    const fetchResource = vi.fn(async () => new Response(JSON.stringify(manifest('11111111111111111111')), { status: 200 }));
    const { maybeUpdateOfflinePackages } = await loadModule();
    const overrides = { fetch: fetchResource as typeof fetch, now };

    await maybeUpdateOfflinePackages('navigation', overrides);
    await maybeUpdateOfflinePackages('navigation', overrides);
    expect(fetchResource).toHaveBeenCalledTimes(1);

    clock += 31 * 60 * 1000;
    await maybeUpdateOfflinePackages('navigation', overrides);
    expect(fetchResource).toHaveBeenCalledTimes(2);

    await maybeUpdateOfflinePackages('periodic', overrides);
    expect(fetchResource).toHaveBeenCalledTimes(3);
  });

  it('swallows inventory failures and keeps processing other records', async () => {
    const records = [
      { contestStorageId: 'quebrado', manifestHash: '11111111111111111111', activeCacheName: 'c', downloadedAt: 1, resourceCount: 2 },
      { contestStorageId: 'exemplo', manifestHash: '11111111111111111111', activeCacheName: 'c', downloadedAt: 1, resourceCount: 2 },
    ];
    listRecords.mockResolvedValue(records);
    const fetchResource = vi.fn(async (input: RequestInfo | URL) => {
      if (String(input).includes('quebrado')) throw new TypeError('network down');
      return new Response(JSON.stringify(manifest('22222222222222222222')), { status: 200 });
    });
    download.mockResolvedValue({ contestStorageId: 'exemplo' });

    const { maybeUpdateOfflinePackages } = await loadModule();
    await expect(maybeUpdateOfflinePackages('navigation', { fetch: fetchResource as typeof fetch, now: () => 1_000 })).resolves.toBeUndefined();
    expect(download).toHaveBeenCalledTimes(1);
    expect(download.mock.calls[0]?.[0]).toMatchObject({ contestStorageId: 'exemplo' });
  });

  it('does not consume throttle when listing records fails', async () => {
    listRecords.mockRejectedValueOnce(new Error('idb down'));
    const fetchResource = vi.fn();
    const { maybeUpdateOfflinePackages } = await loadModule();
    const overrides = { fetch: fetchResource as typeof fetch, now: () => 1_000 };

    await expect(maybeUpdateOfflinePackages('navigation', overrides)).resolves.toBeUndefined();
    expect(fetchResource).not.toHaveBeenCalled();

    listRecords.mockResolvedValue([]);
    await maybeUpdateOfflinePackages('navigation', overrides);
    expect(listRecords).toHaveBeenCalledTimes(2);
  });

  it('skips a manifest whose contestStorageId does not match the record', async () => {
    const record = { contestStorageId: 'exemplo', manifestHash: '11111111111111111111', activeCacheName: 'c', downloadedAt: 1, resourceCount: 2 };
    listRecords.mockResolvedValue([record]);
    const fetchResource = vi.fn(async () => new Response(JSON.stringify(manifest('22222222222222222222', 'outro')), { status: 200 }));
    const { maybeUpdateOfflinePackages } = await loadModule();
    await maybeUpdateOfflinePackages('navigation', { fetch: fetchResource as typeof fetch, now: () => 1_000 });
    expect(download).not.toHaveBeenCalled();
  });

  it('times out a hanging manifest fetch and continues', async () => {
    const records = [
      { contestStorageId: 'lento', manifestHash: '11111111111111111111', activeCacheName: 'c', downloadedAt: 1, resourceCount: 2 },
      { contestStorageId: 'exemplo', manifestHash: '11111111111111111111', activeCacheName: 'c', downloadedAt: 1, resourceCount: 2 },
    ];
    listRecords.mockResolvedValue(records);
    const fetchResource = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      if (String(input).includes('lento')) {
        return await new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () => {
            reject(Object.assign(new Error('aborted'), { name: 'AbortError' }));
          });
        });
      }
      return new Response(JSON.stringify(manifest('22222222222222222222')), { status: 200 });
    });
    download.mockResolvedValue({ contestStorageId: 'exemplo' });

    const { maybeUpdateOfflinePackages } = await loadModule();
    await expect(
      maybeUpdateOfflinePackages('navigation', {
        fetch: fetchResource as typeof fetch,
        now: () => 1_000,
        timeoutMs: 20,
      }),
    ).resolves.toBeUndefined();
    expect(download).toHaveBeenCalledTimes(1);
    expect(download.mock.calls[0]?.[0]).toMatchObject({ contestStorageId: 'exemplo' });
  });

  it('times out a hanging media inventory fetch and continues', async () => {
    const record = {
      contestStorageId: 'exemplo',
      manifestHash: '11111111111111111111',
      activeCacheName: 'c',
      downloadedAt: 1,
      resourceCount: 2,
      media: { included: true, inventoryHash: '0123456789abcdef0123', urls: [], bytes: 0, status: 'complete', updatedAt: 1 },
    };
    listRecords.mockResolvedValue([record]);
    const fetchResource = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      if (String(input).includes('/offline-media/')) {
        // A midia travada nao pode segurar a verificacao: o pedido
        // precisa receber o mesmo sinal de timeout do manifesto.
        expect(init?.signal).toBeDefined();
        return await new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () => {
            reject(Object.assign(new Error('aborted'), { name: 'AbortError' }));
          });
        });
      }
      return new Response(JSON.stringify(manifest('11111111111111111111')), { status: 200 });
    });

    const { maybeUpdateOfflinePackages } = await loadModule();
    await expect(
      maybeUpdateOfflinePackages('navigation', {
        fetch: fetchResource as typeof fetch,
        now: () => 1_000,
        timeoutMs: 20,
      }),
    ).resolves.toBeUndefined();
    expect(download).not.toHaveBeenCalled();
  });

  it('treats an empty media inventory with a new hash as a change', async () => {
    const record = {
      contestStorageId: 'exemplo',
      manifestHash: '11111111111111111111',
      activeCacheName: 'c',
      downloadedAt: 1,
      resourceCount: 2,
      media: { included: true, inventoryHash: '0123456789abcdef0123', urls: ['/media/x.mp3'], bytes: 3, status: 'complete', updatedAt: 1 },
    };
    listRecords.mockResolvedValue([record]);
    const fetchResource = vi.fn(async (input: RequestInfo | URL) => {
      if (String(input).includes('/offline-media/')) {
        return new Response(
          JSON.stringify({
            schemaVersion: 1,
            contestStorageId: 'exemplo',
            inventoryHash: 'abcdef0123456789abcd',
            estimatedBytes: 0,
            items: [],
          }),
          { status: 200 },
        );
      }
      return new Response(JSON.stringify(manifest('11111111111111111111')), { status: 200 });
    });
    download.mockResolvedValue({ contestStorageId: 'exemplo' });

    const { maybeUpdateOfflinePackages } = await loadModule();
    await maybeUpdateOfflinePackages('navigation', { fetch: fetchResource as typeof fetch, now: () => 1_000 });

    expect(download).toHaveBeenCalledTimes(1);
    const [, , , phase, options] = download.mock.calls[0]!;
    expect(phase).toBe('update');
    expect(options).toMatchObject({ media: { items: [] } });
  });

  it('retries the media of a partial download even with the same inventory hash', async () => {
    const record = {
      contestStorageId: 'exemplo',
      manifestHash: '11111111111111111111',
      activeCacheName: 'c',
      downloadedAt: 1,
      resourceCount: 2,
      media: { included: true, inventoryHash: '0123456789abcdef0123', urls: [], bytes: 0, status: 'partial', updatedAt: 1 },
    };
    listRecords.mockResolvedValue([record]);
    const fetchResource = vi.fn(async (input: RequestInfo | URL) => {
      if (String(input).includes('/offline-media/')) {
        return new Response(
          JSON.stringify({
            schemaVersion: 1,
            contestStorageId: 'exemplo',
            inventoryHash: '0123456789abcdef0123',
            estimatedBytes: 0,
            items: [],
          }),
          { status: 200 },
        );
      }
      return new Response(JSON.stringify(manifest('11111111111111111111')), { status: 200 });
    });
    download.mockResolvedValue({ contestStorageId: 'exemplo' });

    const { maybeUpdateOfflinePackages } = await loadModule();
    await maybeUpdateOfflinePackages('navigation', { fetch: fetchResource as typeof fetch, now: () => 1_000 });

    // O manifesto nao mudou, mas a midia esta parcial: ela precisa ser
    // retomada.
    expect(download).toHaveBeenCalledTimes(1);
    expect(download.mock.calls[0]?.[4]).toMatchObject({ media: { inventoryHash: '0123456789abcdef0123' } });
  });

  it('repairs the media that the browser evicted from the cache', async () => {
    const record = {
      contestStorageId: 'exemplo',
      manifestHash: '11111111111111111111',
      activeCacheName: 'c',
      downloadedAt: 1,
      resourceCount: 2,
      media: { included: true, inventoryHash: '0123456789abcdef0123', urls: [`/media/${'a'.repeat(64)}.mp3`], bytes: 3, status: 'complete', updatedAt: 1 },
    };
    listRecords.mockResolvedValue([record]);
    const fetchResource = vi.fn(async (input: RequestInfo | URL) => {
      if (String(input).includes('/offline-media/')) {
        return new Response(
          JSON.stringify({
            schemaVersion: 1,
            contestStorageId: 'exemplo',
            inventoryHash: '0123456789abcdef0123',
            estimatedBytes: 3,
            items: [{ url: `/media/${'a'.repeat(64)}.mp3`, sha256: 'a'.repeat(64), bytes: 3 }],
          }),
          { status: 200 },
        );
      }
      return new Response(JSON.stringify(manifest('11111111111111111111')), { status: 200 });
    });
    download.mockResolvedValue({ contestStorageId: 'exemplo' });

    const { maybeUpdateOfflinePackages } = await loadModule();
    await maybeUpdateOfflinePackages('navigation', { fetch: fetchResource as typeof fetch, now: () => 1_000 });

    // O hash do inventario nao mudou, mas o arquivo sumiu do cache: a
    // midia precisa ser baixada de novo.
    expect(download).toHaveBeenCalledTimes(1);
    expect(download.mock.calls[0]?.[4]).toMatchObject({ media: { items: expect.any(Array) } });
  });

  it('keeps the media when every file is still cached', async () => {
    const url = `/media/${'a'.repeat(64)}.mp3`;
    useMediaCache([url]);
    const record = {
      contestStorageId: 'exemplo',
      manifestHash: '11111111111111111111',
      activeCacheName: 'c',
      downloadedAt: 1,
      resourceCount: 2,
      media: { included: true, inventoryHash: '0123456789abcdef0123', urls: [url], bytes: 1, status: 'complete', updatedAt: 1 },
    };
    listRecords.mockResolvedValue([record]);
    const fetchResource = vi.fn(async (input: RequestInfo | URL) => {
      if (String(input).includes('/offline-media/')) {
        return new Response(
          JSON.stringify({
            schemaVersion: 1,
            contestStorageId: 'exemplo',
            inventoryHash: '0123456789abcdef0123',
            estimatedBytes: 1,
            items: [{ url, sha256: 'a'.repeat(64), bytes: 1 }],
          }),
          { status: 200 },
        );
      }
      return new Response(JSON.stringify(manifest('11111111111111111111')), { status: 200 });
    });
    download.mockResolvedValue({ contestStorageId: 'exemplo' });

    const { maybeUpdateOfflinePackages } = await loadModule();
    await maybeUpdateOfflinePackages('navigation', { fetch: fetchResource as typeof fetch, now: () => 1_000 });

    expect(download).not.toHaveBeenCalled();
  });

  it('ignores a media inventory of another contest', async () => {
    const record = {
      contestStorageId: 'exemplo',
      manifestHash: '11111111111111111111',
      activeCacheName: 'c',
      downloadedAt: 1,
      resourceCount: 2,
      media: { included: true, inventoryHash: '0123456789abcdef0123', urls: [], bytes: 0, status: 'complete', updatedAt: 1 },
    };
    listRecords.mockResolvedValue([record]);
    const fetchResource = vi.fn(async (input: RequestInfo | URL) => {
      if (String(input).includes('/offline-media/')) {
        return new Response(
          JSON.stringify({
            schemaVersion: 1,
            contestStorageId: 'outro',
            inventoryHash: '99999999999999999999',
            estimatedBytes: 0,
            items: [],
          }),
          { status: 200 },
        );
      }
      return new Response(JSON.stringify(manifest('11111111111111111111')), { status: 200 });
    });
    download.mockResolvedValue({ contestStorageId: 'exemplo' });

    const { maybeUpdateOfflinePackages } = await loadModule();
    await maybeUpdateOfflinePackages('navigation', { fetch: fetchResource as typeof fetch, now: () => 1_000 });

    expect(download).not.toHaveBeenCalled();
  });

  it('does nothing when the device is offline', async () => {
    const originalOnLine = navigator.onLine;
    Object.defineProperty(navigator, 'onLine', { configurable: true, value: false });
    try {
      const { maybeUpdateOfflinePackages } = await loadModule();
      await maybeUpdateOfflinePackages('navigation', { now: () => 1_000 });
      expect(listRecords).not.toHaveBeenCalled();
    } finally {
      Object.defineProperty(navigator, 'onLine', { configurable: true, value: originalOnLine });
    }
  });
});
