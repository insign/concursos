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

    const outcome = await downloadOfflineMedia(inventoryOf([item]), undefined, {
      cacheStorage: cacheStorage as unknown as CacheStorage,
      fetch: fetchResource as unknown as typeof fetch,
      origin: 'https://concursos.helio.me',
    });

    // A falha de um arquivo nao interrompe a operacao: o que falhou fica
    // registrado e o resto da midia continua sendo baixada.
    expect(outcome.failed).toEqual([item.url]);
    expect(outcome.firstError).toContain('Integridade');
    expect(outcome.urls).toEqual([]);

    const cache = await cacheStorage.open(OFFLINE_MEDIA_CACHE);
    expect(await cache.match(new Request(`https://concursos.helio.me${item.url}`))).toBeUndefined();
  });

  it('refuses a partial response', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const item = mediaItem(0, 'a'.repeat(32));
    const fetchResource = async (): Promise<Response> =>
      new Response('a'.repeat(16), { status: 206, headers: { 'Content-Length': '16' } });

    const outcome = await downloadOfflineMedia(inventoryOf([item]), undefined, {
      cacheStorage: cacheStorage as unknown as CacheStorage,
      fetch: fetchResource as unknown as typeof fetch,
      origin: 'https://concursos.helio.me',
    });
    expect(outcome.failed).toEqual([item.url]);
    expect(outcome.firstError).toContain('HTTP 206');
  });

  it('keeps the verified files and downloads the rest when one file fails', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const good = 'a'.repeat(32);
    const bad = 'b'.repeat(32);
    const goodItem = mediaItem(0, good);
    const badItem = mediaItem(1, bad);
    const fetchResource = async (input: RequestInfo | URL): Promise<Response> => {
      const pathname = new URL(new Request(input).url).pathname;
      if (pathname === badItem.url) return new Response('c'.repeat(32), { status: 200 });
      return new Response(good, { status: 200, headers: { 'Content-Length': String(good.length) } });
    };

    const outcome = await downloadOfflineMedia(inventoryOf([goodItem, badItem]), undefined, {
      cacheStorage: cacheStorage as unknown as CacheStorage,
      fetch: fetchResource as unknown as typeof fetch,
      origin: 'https://concursos.helio.me',
    });

    expect(outcome.urls).toEqual([goodItem.url]);
    expect(outcome.failed).toEqual([badItem.url]);
    expect(outcome.missing).toEqual([badItem.url]);
    const cache = await cacheStorage.open(OFFLINE_MEDIA_CACHE);
    expect(await cache.match(new Request(`https://concursos.helio.me${goodItem.url}`))).toBeDefined();
  });

  it('stops the pool when the coordination is aborted', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const bodies = ['a'.repeat(32), 'b'.repeat(32), 'c'.repeat(32), 'd'.repeat(32)];
    const items = bodies.map((body) => mediaItem(0, body));
    const controller = new AbortController();
    let started = 0;
    const fetchResource = async (input: RequestInfo | URL): Promise<Response> => {
      started += 1;
      controller.abort();
      const body = bodies[0]!;
      return new Response(body, { status: 200, headers: { 'Content-Length': String(body.length) } });
    };

    const outcome = await downloadOfflineMedia(
      inventoryOf(items),
      undefined,
      {
        cacheStorage: cacheStorage as unknown as CacheStorage,
        fetch: fetchResource as unknown as typeof fetch,
        origin: 'https://concursos.helio.me',
      },
      { signal: controller.signal },
    );

    // O abortamento impede que novas transferencias comecem.
    expect(started).toBeLessThan(items.length);
    expect(outcome.urls.length).toBeLessThan(items.length);
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

  it('reports progress by bytes while a file is still transferring', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const body = 'a'.repeat(200);
    const item = mediaItem(0, body);
    const chunks = [body.slice(0, 80), body.slice(80, 160), body.slice(160)];
    const fetchResource = async (): Promise<Response> => {
      const stream = new ReadableStream<Uint8Array>({
        async start(controller) {
          for (const chunk of chunks) {
            controller.enqueue(new TextEncoder().encode(chunk));
            // Intervalo maior que a janela de estrangulamento do progresso:
            // cada parte precisa aparecer na barra, e nao so o fim do arquivo.
            await new Promise((resolve) => setTimeout(resolve, 300));
          }
          controller.close();
        },
      });
      return new Response(stream, { status: 200, headers: { 'Content-Length': String(body.length) } });
    };

    const progress: { downloadedBytes: number; totalBytes: number }[] = [];
    const outcome = await downloadOfflineMedia(inventoryOf([item]), (state) => progress.push(state), {
      cacheStorage: cacheStorage as unknown as CacheStorage,
      fetch: fetchResource as unknown as typeof fetch,
      origin: 'https://concursos.helio.me',
    });

    expect(outcome.urls).toEqual([item.url]);
    // A barra acompanha os bytes recebidos, e nao apenas o fim do arquivo.
    expect(progress.every((state) => state.totalBytes === body.length)).toBe(true);
    expect(progress.some((state) => state.downloadedBytes > 0 && state.downloadedBytes < body.length)).toBe(true);
    expect(progress.at(-1)?.downloadedBytes).toBe(body.length);
  });

  it('aborts a stalled transfer instead of waiting forever', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const body = 'a'.repeat(64);
    const item = mediaItem(0, body);
    const fetchResource = async (): Promise<Response> => {
      const stream = new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(new TextEncoder().encode(body.slice(0, 10)));
          // O corpo nunca termina: simula conexao pendurada.
        },
      });
      return new Response(stream, { status: 200, headers: { 'Content-Length': String(body.length) } });
    };

    const outcome = await downloadOfflineMedia(
      inventoryOf([item]),
      undefined,
      {
        cacheStorage: cacheStorage as unknown as CacheStorage,
        fetch: fetchResource as unknown as typeof fetch,
        origin: 'https://concursos.helio.me',
      },
      { idleTimeoutMs: 30 },
    );

    expect(outcome.failed).toEqual([item.url]);
    expect(outcome.firstError).toContain('parou de responder');
    expect(outcome.urls).toEqual([]);
  });

  it('aborts a request that never delivers the response headers', async () => {
    const cacheStorage = new MemoryCacheStorage();
    const body = 'a'.repeat(64);
    const item = mediaItem(0, body);
    // A conexao troca de rede antes dos cabecalhos: o `fetch` fica
    // pendente para sempre e so o sinal o interrompe.
    const fetchResource = (_input: RequestInfo | URL, init?: RequestInit): Promise<Response> =>
      new Promise((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => {
          reject(new DOMException('aborted', 'AbortError'));
        });
      });

    const outcome = await downloadOfflineMedia(
      inventoryOf([item]),
      undefined,
      {
        cacheStorage: cacheStorage as unknown as CacheStorage,
        fetch: fetchResource as unknown as typeof fetch,
        origin: 'https://concursos.helio.me',
      },
      { idleTimeoutMs: 30 },
    );

    expect(outcome.failed).toEqual([item.url]);
    expect(outcome.firstError).toContain('parou de responder');
    expect(outcome.urls).toEqual([]);
  });
});
