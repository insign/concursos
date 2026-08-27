import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, matchPrecache } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkOnly } from 'workbox-strategies';
import { listOfflineContestRecords, withDatabaseTimeout } from './lib/offline-db';
import { maybeUpdateOfflinePackages } from './lib/offline-auto-update';
import { normalizeNavigationPath } from './lib/pwa-cache';
import { RUNTIME_PAGE_CACHE } from './lib/pwa-cache';

type WorkerScope = typeof globalThis & {
  __WB_MANIFEST: Array<{ revision: string | null; url: string } | string>;
  registration: ServiceWorkerRegistration & {
    backgroundFetch?: {
      getActiveFetches(): Promise<Array<{ id: string }>>;
    };
  };
  clients: {
    matchAll(options: { type: 'window' }): Promise<ReadonlyArray<{ postMessage(message: unknown): void }>>;
  };
  skipWaiting(): Promise<void>;
};

const worker = self as unknown as WorkerScope;

precacheAndRoute((self as unknown as WorkerScope).__WB_MANIFEST);
clientsClaim();

async function matchActiveContestCaches(candidates: readonly (Request | URL)[]): Promise<Response | undefined> {
  try {
    const records = await withDatabaseTimeout(listOfflineContestRecords(), 1500).catch(() => undefined);
    if (!records || records.length === 0) return undefined;
    for (const { activeCacheName } of records) {
      const has = await Promise.race([caches.has(activeCacheName), new Promise<boolean>((_, reject) => setTimeout(() => reject(new Error('has timeout')), 1500))]).catch(() => false);
      if (!has) continue;
      const cache = await Promise.race([caches.open(activeCacheName), new Promise<never>((_, reject) => setTimeout(() => reject(new Error('open timeout')), 1500))]).catch(() => undefined) as Cache | undefined;
      if (!cache) continue;
      for (const c of candidates) {
        const r = await Promise.race([cache.match(c, { ignoreVary: true }), new Promise<undefined>((_, reject) => setTimeout(() => reject(new Error('match timeout')), 1500))]).catch(() => undefined);
        if (r) return r as Response;
      }
    }
    return undefined;
  } catch {
    return undefined;
  }
}

async function matchDownloadedContest(request: Request): Promise<Response | undefined> {
  const url = new URL(request.url);
  const normalizedPath = normalizeNavigationPath(url.pathname);
  const candidates = [new URL(normalizedPath, url.origin), new URL(`${normalizedPath}index.html`, url.origin)];
  return matchActiveContestCaches(candidates);
}

async function fetchWithTimeout(request: Request): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);
  try {
    return await fetch(request.url, {
      signal: controller.signal,
      credentials: request.credentials,
      cache: 'no-store',
      redirect: 'follow',
    });
  } finally {
    clearTimeout(timeout);
  }
}

registerRoute(({ url }) => url.origin === 'https://kv.helio.me', new NetworkOnly());

registerRoute(
  ({ request, url }) =>
    url.origin === worker.location.origin &&
    request.method === 'GET' &&
    (url.pathname === '/navigation-catalog.json' ||
      url.pathname === '/simulados/catalog.json' ||
      url.pathname.startsWith('/simulados/pool/') ||
      url.pathname.startsWith('/resolucoes/')),
  ({ request }) => fetch(request),
);

registerRoute(
  ({ url }) => url.origin === worker.location.origin && url.pathname.startsWith('/_astro/'),
  ({ request }) => fetch(request),
);

registerRoute(
  ({ request, url }) => url.origin === worker.location.origin && request.destination === 'image',
  ({ request }) => fetch(request),
);

(self as unknown as { addEventListener: (type: string, handler: (event: unknown) => void) => void }).addEventListener(
  'fetch',
  (event: unknown) => {
    const fetchEvent = event as unknown as {
      request: Request;
      respondWith(r: Promise<Response>): void;
      waitUntil?: (promise: Promise<unknown>) => void;
    };
    const request = fetchEvent.request;
    if (request.mode !== 'navigate') return;
    fetchEvent.waitUntil?.(maybeUpdateOfflinePackages('navigation').catch(() => undefined));
    fetchEvent.respondWith(
      (async () => {
        const downloaded = await Promise.race([
          matchDownloadedContest(request),
          new Promise<undefined>((resolve) => setTimeout(() => resolve(undefined), 2000)),
        ]).catch(() => undefined);
        if (downloaded) {
          // Cache-first para quem já baixou: serve offline imediato, revalida em background
          // maybeUpdate já foi agendado no waitUntil acima; fetchWithTimeout é best-effort sem atrasar resposta
          fetchWithTimeout(request).catch(() => undefined);
          return downloaded;
        }
        return fetch(request.url);
      })(),
    );
  },
);

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

worker.addEventListener('periodicsync', (event) => {
  const periodicEvent = event as Event & { tag?: string; waitUntil(promise: Promise<unknown>): void };
  if (periodicEvent.tag !== 'concursos-offline-updates') return;
  periodicEvent.waitUntil(maybeUpdateOfflinePackages('periodic').catch(() => undefined));
});
