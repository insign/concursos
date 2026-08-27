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

beforeEach(() => {
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
    const [, , , phase] = download.mock.calls[0]!;
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
