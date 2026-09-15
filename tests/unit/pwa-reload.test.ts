import { describe, expect, it, vi, afterEach } from 'vitest';
import {
  browserPwaReloadEnvironment,
  reloadBypassingCache,
  type PwaReloadEnvironment,
} from '../../src/lib/pwa-reload';

function environment(overrides: Partial<PwaReloadEnvironment> = {}): PwaReloadEnvironment {
  return {
    isOnline: () => true,
    fetchCurrent: async () => ({ ok: true }),
    deleteRuntimePageEntry: async () => undefined,
    settleWrites: async () => undefined,
    reloadPage: () => undefined,
    ...overrides,
  };
}

describe('PWA cache-bypassing reload', () => {
  it('warms the current page, settles, evicts its runtime entry and reloads', async () => {
    const env = environment();
    const order: string[] = [];
    vi.spyOn(env, 'fetchCurrent').mockImplementation(async (url) => {
      expect(url).toBe('/concursos/exemplo/');
      order.push('fetch');
      return { ok: true };
    });
    vi.spyOn(env, 'deleteRuntimePageEntry').mockImplementation(async (url) => {
      expect(url).toBe('/concursos/exemplo/');
      order.push('evict');
    });
    vi.spyOn(env, 'settleWrites').mockImplementation(async () => {
      order.push('settle');
    });
    vi.spyOn(env, 'reloadPage').mockImplementation(() => {
      order.push('reload');
    });

    await reloadBypassingCache(env, '/concursos/exemplo/');
    expect(order).toEqual(['fetch', 'settle', 'evict', 'reload']);
  });

  it('skips warm and eviction offline but still settles and reloads', async () => {
    const env = environment({ isOnline: () => false });
    const fetchSpy = vi.spyOn(env, 'fetchCurrent');
    const evictSpy = vi.spyOn(env, 'deleteRuntimePageEntry');
    const settleSpy = vi.spyOn(env, 'settleWrites');
    const reloadSpy = vi.spyOn(env, 'reloadPage');

    await reloadBypassingCache(env, '/');
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(evictSpy).not.toHaveBeenCalled();
    expect(settleSpy).toHaveBeenCalledOnce();
    expect(reloadSpy).toHaveBeenCalledOnce();
  });

  it('keeps the runtime entry when warming fails and still reloads', async () => {
    const env = environment();
    vi.spyOn(env, 'fetchCurrent').mockRejectedValue(new Error('rede caiu'));
    const evictSpy = vi.spyOn(env, 'deleteRuntimePageEntry');
    const reloadSpy = vi.spyOn(env, 'reloadPage');

    await reloadBypassingCache(env, '/');
    expect(evictSpy).not.toHaveBeenCalled();
    expect(reloadSpy).toHaveBeenCalledOnce();
  });

  it('keeps the runtime entry on error statuses and still reloads', async () => {
    const env = environment();
    vi.spyOn(env, 'fetchCurrent').mockResolvedValue({ ok: false });
    const evictSpy = vi.spyOn(env, 'deleteRuntimePageEntry');
    const reloadSpy = vi.spyOn(env, 'reloadPage');

    await reloadBypassingCache(env, '/');
    expect(evictSpy).not.toHaveBeenCalled();
    expect(reloadSpy).toHaveBeenCalledOnce();
  });

  it('reloads when eviction fails but blocks reload when settle fails', async () => {
    const env = environment();
    vi.spyOn(env, 'deleteRuntimePageEntry').mockRejectedValue(new Error('cache indisponível'));
    const reloadSpy = vi.spyOn(env, 'reloadPage');

    await reloadBypassingCache(env, '/');
    expect(reloadSpy).toHaveBeenCalledOnce();

    vi.spyOn(env, 'settleWrites').mockRejectedValue(new Error('gravação falhou'));
    await expect(reloadBypassingCache(env, '/')).rejects.toThrow('gravação falhou');
    expect(reloadSpy).toHaveBeenCalledOnce();
  });
});

describe('browser reload environment', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('fetches with cache reload and evicts the three URL variants', async () => {
    const fetched: Array<{ url: string; init: RequestInit }> = [];
    const deleted: string[] = [];
    vi.stubGlobal('fetch', vi.fn(async (url: string, init: RequestInit) => {
      fetched.push({ url, init });
      return { ok: true };
    }));
    vi.stubGlobal('caches', {
      open: vi.fn(async () => ({
        delete: vi.fn(async (candidate: string) => {
          deleted.push(candidate);
          return true;
        }),
      })),
    });

    const env = browserPwaReloadEnvironment();
    await env.fetchCurrent('https://concursos.helio.me/c/g/a/');
    expect(fetched).toEqual([{
      url: 'https://concursos.helio.me/c/g/a/',
      init: expect.objectContaining({ cache: 'reload', credentials: 'same-origin' }),
    }]);

    await env.deleteRuntimePageEntry('https://concursos.helio.me/c/g/a/');
    expect(deleted).toEqual([
      'https://concursos.helio.me/c/g/a/',
      'https://concursos.helio.me/c/g/a/index.html',
    ]);
  });

  it('dedupes variants for the root URL', async () => {
    const deleted: string[] = [];
    vi.stubGlobal('caches', {
      open: vi.fn(async () => ({
        delete: vi.fn(async (candidate: string) => {
          deleted.push(candidate);
          return true;
        }),
      })),
    });

    await browserPwaReloadEnvironment().deleteRuntimePageEntry('https://concursos.helio.me/');
    expect(deleted).toEqual([
      'https://concursos.helio.me/',
      'https://concursos.helio.me/index.html',
    ]);
  });

  it('aborts a hung warm fetch after the timeout', async () => {
    vi.stubGlobal('fetch', vi.fn((_url: string, init: { signal?: AbortSignal }) => new Promise((_resolve, reject) => {
      init.signal?.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')));
    })));

    await expect(browserPwaReloadEnvironment().fetchCurrent('https://concursos.helio.me/')).rejects.toThrow();
  }, 10_000);
});
