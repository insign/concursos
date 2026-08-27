import { beforeEach, describe, expect, it, vi } from 'vitest';

const getJob = vi.fn();
const deleteJob = vi.fn();
const finishJob = vi.fn(async (..._args: unknown[]) => undefined);
const saveRecord = vi.fn();

vi.mock('../../src/lib/offline-db', () => ({
  getDownloadJob: (...args: unknown[]) => getJob(...args),
  deleteDownloadJob: (...args: unknown[]) => deleteJob(...args),
  finishDownloadJob: (...args: unknown[]) => finishJob(...args),
  listDownloadJobs: async () => [],
  saveDownloadDiagnostic: vi.fn(async () => undefined),
  acquireSyncLease: vi.fn(async () => true),
  renewSyncLease: vi.fn(async () => true),
  releaseSyncLease: vi.fn(async () => undefined),
  saveOfflineContestRecord: (...args: unknown[]) => saveRecord(...args),
  getOfflineContestRecord: vi.fn(async () => undefined),
  deleteOfflineContestRecord: vi.fn(async () => undefined),
}));

import {
  buildPackageRequests,
  finalizeFailedBackgroundFetch,
  finalizeSuccessfulBackgroundFetch,
  type BackgroundFetchRegistrationLike,
} from '../../src/lib/offline-background-fetch';
import { subscribeDownloadEvents } from '../../src/lib/offline-download-events';
import { SHARED_ASSET_CACHE } from '../../src/lib/pwa-cache';

class MemCache {
  store = new Map<string, Response>();
  async put(request: Request, response: Response): Promise<void> {
    this.store.set(request.url, response.clone());
  }
  async match(request: Request | string): Promise<Response | undefined> {
    const hit = this.store.get(typeof request === 'string' ? request : request.url);
    return hit?.clone();
  }
  async keys(): Promise<Request[]> {
    return [...this.store.keys()].map((url) => new Request(url));
  }
  async delete(request: Request | string): Promise<boolean> {
    const key = typeof request === 'string' ? request : request.url;
    return this.store.delete(key);
  }
  async has(request: Request | string): Promise<boolean> {
    return this.store.has(typeof request === 'string' ? request : request.url);
  }
}

class MemCacheStorage {
  caches = new Map<string, MemCache>();
  async open(name: string): Promise<MemCache> {
    let cache = this.caches.get(name);
    if (!cache) {
      cache = new MemCache();
      this.caches.set(name, cache);
    }
    return cache;
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

function manifest(hash = '11111111111111111111') {
  return {
    schemaVersion: 3 as const,
    contestSlug: 'exemplo',
    contestStorageId: 'exemplo',
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

function registrationWith(records: Array<{ url: string; body: string }>, id = 'job-1'): BackgroundFetchRegistrationLike {
  return {
    id,
    matchAll: async () =>
      records.map((record) => ({
        request: new Request(`https://concursos.test${record.url}`),
        responseReady: Promise.resolve(new Response(record.body, { status: 200 })),
      })),
  };
}

beforeEach(() => {
  getJob.mockReset();
  deleteJob.mockReset();
  finishJob.mockReset();
  finishJob.mockResolvedValue(undefined);
  saveRecord.mockReset();
});

describe('background fetch adoption', () => {
  it('builds one same-origin request per unique resource', () => {
    const requests = buildPackageRequests(manifest(), 'https://concursos.test');
    expect(requests.map((request) => new URL(request.url).pathname)).toEqual([
      '/concursos/exemplo/',
      '/_astro/shared.js',
    ]);
    expect(requests.every((request) => request.credentials === 'same-origin')).toBe(true);
  });

  it('routes package resources to staging, shared assets to the shared cache and promotes', async () => {
    const cacheStorage = new MemCacheStorage();
    const events: string[] = [];
    const unsubscribe = subscribeDownloadEvents((event) => events.push(event.type));
    getJob.mockResolvedValue({ id: 'job-1', manifest: manifest(), createdAt: 1 });
    deleteJob.mockResolvedValue(undefined);
    saveRecord.mockResolvedValue(undefined);

    const registration = registrationWith([
      { url: '/concursos/exemplo/', body: '<html>página</html>' },
      { url: '/_astro/shared.js', body: 'console.log(1)' },
    ]);

    await finalizeSuccessfulBackgroundFetch(registration, { cacheStorage: cacheStorage as unknown as CacheStorage });
    await new Promise((resolve) => setTimeout(resolve, 25));
    unsubscribe();

    // O staging é consumido pela promoção; o resultado é o cache ativo canônico.
    const activeName = 'contest--exemplo--11111111111111111111';
    expect(cacheStorage.caches.get(activeName)?.store.size).toBe(1);
    expect([...(cacheStorage.caches.get(activeName)?.store.keys() ?? [])][0]).toContain('/concursos/exemplo/');
    expect(cacheStorage.caches.get(SHARED_ASSET_CACHE)?.store.size).toBe(1);
    expect(saveRecord).toHaveBeenCalledTimes(1);
    expect(finishJob).toHaveBeenCalledTimes(1);
    expect(finishJob.mock.calls[0]?.[0]).toMatchObject({ jobId: 'job-1', outcome: 'completed', reasonCode: 'complete' });
    expect(events).toEqual(['started', 'completed']);
  });

  it('deletes the job without side effects when it is unknown or invalid', async () => {
    const cacheStorage = new MemCacheStorage();
    getJob.mockResolvedValue(undefined);

    await finalizeSuccessfulBackgroundFetch(registrationWith([], 'job-0'), { cacheStorage: cacheStorage as unknown as CacheStorage });
    expect(cacheStorage.caches.size).toBe(0);

    getJob.mockResolvedValue({ id: 'job-2', manifest: { broken: true }, createdAt: 1 });
    await finalizeSuccessfulBackgroundFetch(registrationWith([], 'job-2'), { cacheStorage: cacheStorage as unknown as CacheStorage });
    expect(deleteJob).toHaveBeenCalledWith('job-2');
    expect(saveRecord).not.toHaveBeenCalled();
  });

  it('publishes failure and deletes the job when the browser reports failure', async () => {
    const events: Array<{ type: string; message?: string }> = [];
    const unsubscribe = subscribeDownloadEvents((event) => events.push(event));
    getJob.mockResolvedValue({ id: 'job-1', manifest: manifest(), createdAt: 1 });
    deleteJob.mockResolvedValue(undefined);

    await finalizeFailedBackgroundFetch(registrationWith([]));
    await new Promise((resolve) => setTimeout(resolve, 25));
    unsubscribe();

    expect(finishJob).toHaveBeenCalledWith(
      expect.objectContaining({ jobId: 'job-1', outcome: 'failed' }),
    );
    expect(events.at(-1)).toMatchObject({ type: 'failed', phase: 'download' });
  });
});
