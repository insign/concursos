import { createHash } from 'node:crypto';
import { afterEach, describe, expect, it } from 'vitest';
import {
  buildOfflineMediaInventory,
  matchOfflineMedia,
  mediaInventoryHash,
  offlineMediaInventorySchema,
  parseByteRange,
  pruneUnreferencedMedia,
} from '../../src/lib/offline-media';
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

const originalCaches = globalThis.caches;

afterEach(() => {
  Object.defineProperty(globalThis, 'caches', { value: originalCaches, configurable: true, writable: true });
});

function useCaches(): MemoryCacheStorage {
  const storage = new MemoryCacheStorage();
  Object.defineProperty(globalThis, 'caches', { value: storage, configurable: true, writable: true });
  return storage;
}

function digestOf(body: string): string {
  return createHash('sha256').update(body).digest('hex');
}

const sampleMedia = { url: `/media/${'a'.repeat(64)}.mp3`, id: 'a'.repeat(64), bytes: 12 };

describe('offline media inventory', () => {
  it('accepts a well formed inventory', () => {
    const parsed = offlineMediaInventorySchema.parse({
      schemaVersion: 1,
      contestStorageId: 'tce-ma-2026-analista-administracao',
      inventoryHash: '0123456789abcdef0123',
      estimatedBytes: 12,
      items: [{ url: sampleMedia.url, sha256: sampleMedia.id, bytes: 12 }],
    });
    expect(parsed.items).toHaveLength(1);
  });

  it('rejects extra fields, foreign urls and mismatched digests', () => {
    const base = {
      schemaVersion: 1,
      contestStorageId: 'exemplo',
      inventoryHash: '0123456789abcdef0123',
      estimatedBytes: 12,
      items: [{ url: sampleMedia.url, sha256: sampleMedia.id, bytes: 12 }],
    };
    expect(offlineMediaInventorySchema.safeParse({ ...base, extra: true }).success).toBe(false);
    expect(
      offlineMediaInventorySchema.safeParse({
        ...base,
        items: [{ url: 'https://outra.example/media/a.mp3', sha256: sampleMedia.id, bytes: 12 }],
      }).success,
    ).toBe(false);
    expect(
      offlineMediaInventorySchema.safeParse({
        ...base,
        items: [{ url: sampleMedia.url, sha256: 'b'.repeat(64), bytes: 12 }],
      }).success,
    ).toBe(false);
  });

  it('hashes the inventory independently of the input order', async () => {
    const other = { url: `/media/${'b'.repeat(64)}.mp3`, id: 'b'.repeat(64), bytes: 20 };
    const first = await mediaInventoryHash([
      { url: sampleMedia.url, sha256: sampleMedia.id, bytes: 12 },
      { url: other.url, sha256: other.id, bytes: 20 },
    ]);
    const second = await mediaInventoryHash([
      { url: other.url, sha256: other.id, bytes: 20 },
      { url: sampleMedia.url, sha256: sampleMedia.id, bytes: 12 },
    ]);
    expect(first).toBe(second);
    expect(first).toMatch(/^[a-f0-9]{20}$/);
  });

  it('changes the inventory hash when the extension of the same bytes changes', async () => {
    const asMp3 = await mediaInventoryHash([{ url: sampleMedia.url, sha256: sampleMedia.id, bytes: 12 }]);
    const asM4a = await mediaInventoryHash([
      { url: `/media/${sampleMedia.id}.m4a`, sha256: sampleMedia.id, bytes: 12 },
    ]);
    expect(asMp3).not.toBe(asM4a);
  });

  it('dedupes canonical media shared by several subjects', async () => {
    const inventory = await buildOfflineMediaInventory('exemplo', [sampleMedia, sampleMedia]);
    expect(inventory.items).toHaveLength(1);
    expect(inventory.estimatedBytes).toBe(12);
    expect(inventory.contestStorageId).toBe('exemplo');
  });
});

describe('media byte ranges', () => {
  it('parses closed, open and suffix ranges', () => {
    expect(parseByteRange('bytes=0-99', 1000)).toEqual({ offset: 0, length: 100 });
    expect(parseByteRange('bytes=900-', 1000)).toEqual({ offset: 900, length: 100 });
    expect(parseByteRange('bytes=-50', 1000)).toEqual({ offset: 950, length: 50 });
  });

  it('rejects unsatisfiable and unsupported ranges', () => {
    expect(parseByteRange('bytes=1000-', 1000)).toBe('unsatisfiable');
    expect(parseByteRange('bytes=0-1,3-4', 1000)).toBeNull();
    expect(parseByteRange(null, 1000)).toBeNull();
  });
});

describe('media byte range parity with the edge function', () => {
  it('parses the same ranges as the function that serves the media online', async () => {
    const { parseRange } = await import('../../functions/media/[[path]].ts');
    const headers = [
      'bytes=0-99',
      'bytes=900-',
      'bytes=-50',
      'bytes=1000-',
      'bytes=0-1,3-4',
      'bytes=abc',
      'bytes=-0',
      null,
    ];
    for (const header of headers) {
      expect(parseByteRange(header, 1000)).toEqual(parseRange(header, 1000));
    }
  });
});

describe('offline media service worker response', () => {
  it('answers 200 without range and 206 with range', async () => {
    useCaches();
    const body = 'abcdefghij';
    const cache = await caches.open(OFFLINE_MEDIA_CACHE);
    await cache.put(
      new Request(`https://concursos.helio.me${sampleMedia.url}`),
      new Response(body, {
        status: 200,
        headers: { 'Content-Type': 'audio/mpeg', 'Content-Length': String(body.length) },
      }),
    );

    const full = await matchOfflineMedia(new Request(`https://concursos.helio.me${sampleMedia.url}`));
    expect(full?.status).toBe(200);
    expect(await full?.text()).toBe(body);

    const partial = await matchOfflineMedia(
      new Request(`https://concursos.helio.me${sampleMedia.url}`, { headers: { Range: 'bytes=2-4' } }),
    );
    expect(partial?.status).toBe(206);
    expect(partial?.headers.get('Content-Range')).toBe(`bytes 2-4/${body.length}`);
    expect(partial?.headers.get('Content-Length')).toBe('3');
    expect(await partial?.text()).toBe('cde');
  });

  it('answers 206 even when the stored response has no content length', async () => {
    useCaches();
    const body = 'abcdefghij';
    const cache = await caches.open(OFFLINE_MEDIA_CACHE);
    await cache.put(
      new Request(`https://concursos.helio.me${sampleMedia.url}`),
      new Response(body, { status: 200, headers: { 'Content-Type': 'audio/mpeg' } }),
    );
    const partial = await matchOfflineMedia(
      new Request(`https://concursos.helio.me${sampleMedia.url}`, { headers: { Range: 'bytes=0-1' } }),
    );
    expect(partial?.status).toBe(206);
    expect(partial?.headers.get('Content-Range')).toBe(`bytes 0-1/${body.length}`);
    expect(await partial?.text()).toBe('ab');
  });

  it('answers the whole file for an invalid or multiple range', async () => {
    useCaches();
    const body = 'abcdefghij';
    const cache = await caches.open(OFFLINE_MEDIA_CACHE);
    await cache.put(
      new Request(`https://concursos.helio.me${sampleMedia.url}`),
      new Response(body, { status: 200, headers: { 'Content-Length': String(body.length) } }),
    );
    const invalid = await matchOfflineMedia(
      new Request(`https://concursos.helio.me${sampleMedia.url}`, { headers: { Range: 'bytes=0-1,3-4' } }),
    );
    expect(invalid?.status).toBe(200);
    expect(await invalid?.text()).toBe(body);
  });

  it('answers HEAD with the headers only', async () => {
    useCaches();
    const body = 'abcdefghij';
    const cache = await caches.open(OFFLINE_MEDIA_CACHE);
    await cache.put(
      new Request(`https://concursos.helio.me${sampleMedia.url}`),
      new Response(body, { status: 200, headers: { 'Content-Length': String(body.length) } }),
    );
    const head = await matchOfflineMedia(
      new Request(`https://concursos.helio.me${sampleMedia.url}`, { method: 'HEAD' }),
    );
    expect(head?.status).toBe(200);
    expect(head?.headers.get('Content-Length')).toBe(String(body.length));
    expect(await head?.text()).toBe('');

    const headRange = await matchOfflineMedia(
      new Request(`https://concursos.helio.me${sampleMedia.url}`, { method: 'HEAD', headers: { Range: 'bytes=0-1' } }),
    );
    expect(headRange?.status).toBe(206);
    expect(headRange?.headers.get('Content-Range')).toBe(`bytes 0-1/${body.length}`);
    expect(await headRange?.text()).toBe('');
  });

  it('answers 416 for an unsatisfiable range and undefined without a copy', async () => {
    useCaches();
    const cache = await caches.open(OFFLINE_MEDIA_CACHE);
    await cache.put(
      new Request(`https://concursos.helio.me${sampleMedia.url}`),
      new Response('abcdefghij', { status: 200, headers: { 'Content-Length': '10' } }),
    );
    const invalid = await matchOfflineMedia(
      new Request(`https://concursos.helio.me${sampleMedia.url}`, { headers: { Range: 'bytes=99-' } }),
    );
    expect(invalid?.status).toBe(416);
    expect(invalid?.headers.get('Content-Range')).toBe('bytes */10');

    const missing = await matchOfflineMedia(
      new Request('https://concursos.helio.me/media/ff.mp3'),
    );
    expect(missing).toBeUndefined();
  });
});

describe('offline media pruning', () => {
  it('keeps media referenced by another contest', async () => {
    useCaches();
    const cache = await caches.open(OFFLINE_MEDIA_CACHE);
    await cache.put(new Request(`https://concursos.helio.me${sampleMedia.url}`), new Response('a'));
    const other = { url: `/media/${'c'.repeat(64)}.mp3`, id: 'c'.repeat(64), bytes: 3 };
    await cache.put(new Request(`https://concursos.helio.me${other.url}`), new Response('b'));

    const removed = await pruneUnreferencedMedia(new Set([other.url]));
    expect(removed).toBe(1);
    expect(await cache.match(new Request(`https://concursos.helio.me${sampleMedia.url}`))).toBeUndefined();
    expect(await cache.match(new Request(`https://concursos.helio.me${other.url}`))).toBeDefined();
  });
});
