import { clientsClaim } from 'workbox-core';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { cleanupOutdatedCaches, matchPrecache, precacheAndRoute } from 'workbox-precaching';
import { registerRoute, setCatchHandler } from 'workbox-routing';
import { CacheFirst, NetworkFirst, NetworkOnly } from 'workbox-strategies';
import { listOfflineContestRecords } from './lib/offline-db';
import {
  RUNTIME_MEDIA_CACHE,
  RUNTIME_PAGE_CACHE,
  SHARED_ASSET_CACHE,
  normalizeNavigationPath,
} from './lib/pwa-cache';

type WorkerScope = typeof globalThis & {
  __WB_MANIFEST: Array<{ revision: string | null; url: string } | string>;
  clients: {
    matchAll(options: { type: 'window' }): Promise<ReadonlyArray<{ postMessage(message: unknown): void }>>;
  };
  skipWaiting(): Promise<void>;
};

const worker = self as unknown as WorkerScope;

cleanupOutdatedCaches();
precacheAndRoute((self as unknown as WorkerScope).__WB_MANIFEST);
clientsClaim();

const navigationStrategy = new NetworkFirst({
  cacheName: RUNTIME_PAGE_CACHE,
  networkTimeoutSeconds: 4,
  plugins: [new CacheableResponsePlugin({ statuses: [200] })],
});

const sharedAssetStrategy = new CacheFirst({
  cacheName: SHARED_ASSET_CACHE,
  plugins: [new CacheableResponsePlugin({ statuses: [200] })],
});

const mediaStrategy = new CacheFirst({
  cacheName: RUNTIME_MEDIA_CACHE,
  plugins: [
    new CacheableResponsePlugin({ statuses: [200] }),
    new ExpirationPlugin({ maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 30, purgeOnQuotaError: true }),
  ],
});

async function matchActiveContestCaches(candidates: readonly (Request | URL)[]): Promise<Response | undefined> {
  try {
    const matchRecords = async (records: Array<{ activeCacheName: string }>) => {
      for (const { activeCacheName } of records) {
        if (!await caches.has(activeCacheName)) continue;
        const cache = await caches.open(activeCacheName);
        for (const candidate of candidates) {
          const response = await cache.match(candidate, { ignoreVary: true });
          if (response) return response;
        }
      }
      return undefined;
    };

    const records = await listOfflineContestRecords();
    const matched = await matchRecords(records);
    if (matched || records.length === 0) return matched;

    const refreshed = await listOfflineContestRecords();
    const initialNames = records.map(({ activeCacheName }) => activeCacheName).join('\n');
    const refreshedNames = refreshed.map(({ activeCacheName }) => activeCacheName).join('\n');
    if (initialNames !== refreshedNames) return matchRecords(refreshed);
  } catch {
    // Download metadata is an optional offline enhancement; normal runtime strategies must still work.
    return undefined;
  }
  return undefined;
}

async function matchDownloadedContest(request: Request): Promise<Response | undefined> {
  const url = new URL(request.url);
  const normalizedPath = normalizeNavigationPath(url.pathname);
  const candidates = [new URL(normalizedPath, url.origin), new URL(`${normalizedPath}index.html`, url.origin)];
  return matchActiveContestCaches(candidates);
}

async function fetchWithTimeout(request: Request): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4_000);
  try {
    return await fetch(request, { signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

registerRoute(({ url }) => url.origin === 'https://kv.helio.me', new NetworkOnly());

registerRoute(
  ({ request }) => request.mode === 'navigate',
  async (options) => {
    const downloaded = await matchDownloadedContest(options.request);
    if (downloaded) {
      try {
        return await fetchWithTimeout(options.request);
      } catch {
        return downloaded;
      }
    }

    try {
      return await navigationStrategy.handle(options);
    } catch {
      return (await matchPrecache('/offline/index.html')) ?? Response.error();
    }
  },
);

registerRoute(
  ({ url }) => url.origin === worker.location.origin && url.pathname.startsWith('/_astro/'),
  async (options) => {
    const downloaded = await matchActiveContestCaches([options.request]);
    if (downloaded) return downloaded;
    const cache = await caches.open(SHARED_ASSET_CACHE);
    return (await cache.match(options.request, { ignoreVary: true })) ?? sharedAssetStrategy.handle(options);
  },
);

registerRoute(
  ({ request, url }) => url.origin === worker.location.origin && request.destination === 'image',
  async (options) => (await matchActiveContestCaches([options.request])) ?? mediaStrategy.handle(options),
);

setCatchHandler(async ({ event }) => {
  const request = 'request' in event ? (event as Event & { request: Request }).request : undefined;
  if (request?.mode === 'navigate') {
    return (await matchPrecache('/offline/index.html')) ?? Response.error();
  }
  return Response.error();
});

worker.addEventListener('message', (event) => {
  const message = event as MessageEvent<{ type?: string }>;
  if (message.data?.type === 'SKIP_WAITING') void worker.skipWaiting();
});

worker.addEventListener('sync', (event) => {
  const syncEvent = event as Event & { tag?: string; waitUntil(promise: Promise<unknown>): void };
  if (syncEvent.tag !== 'concursos-sync') return;
  syncEvent.waitUntil(
    worker.clients.matchAll({ type: 'window' }).then((windowClients) => {
      for (const client of windowClients) client.postMessage({ type: 'SYNC_REQUESTED' });
    }),
  );
});
