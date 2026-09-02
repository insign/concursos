import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, matchPrecache } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkOnly } from 'workbox-strategies';
import { listOfflineContestRecords, withDatabaseTimeout } from './lib/offline-db';
import { maybeUpdateOfflinePackages } from './lib/offline-auto-update';
import { normalizeNavigationPath, RUNTIME_PAGE_CACHE, SHARED_ASSET_CACHE } from './lib/pwa-cache';

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

async function matchRuntimePage(request: Request): Promise<Response | undefined> {
  try {
    const cache = await caches.open(RUNTIME_PAGE_CACHE);
    const url = new URL(request.url);
    const normalizedPath = normalizeNavigationPath(url.pathname);
    const candidates = [request, new URL(normalizedPath, url.origin), new URL(`${normalizedPath}index.html`, url.origin)];
    for (const candidate of candidates) {
      const response = await cache.match(candidate, { ignoreVary: true });
      if (response) return response;
    }
  } catch {
    // Cache runtime é best-effort; falhas não bloqueiam rede nem pacote offline.
  }
  return undefined;
}

async function matchOfflineAsset(request: Request): Promise<Response | undefined> {
  const pathname = new URL(request.url).pathname;
  const precached = await matchPrecache(pathname);
  if (precached) return precached;
  try {
    const shared = await caches.open(SHARED_ASSET_CACHE);
    const response = await shared.match(request, { ignoreVary: true });
    if (response) return response;
  } catch {
    // O pacote do concurso ainda pode conter o recurso.
  }
  return matchActiveContestCaches([request]);
}

async function cacheRuntimePage(request: Request, response: Response): Promise<void> {
  if (!response.ok || response.type === 'opaque') return;
  const cache = await caches.open(RUNTIME_PAGE_CACHE);
  await cache.put(request, response);
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
  async ({ request }) => (await matchActiveContestCaches([request])) ?? fetch(request),
);

registerRoute(
  ({ request, url }) =>
    url.origin === worker.location.origin &&
    request.method === 'GET' &&
    (url.pathname.startsWith('/subject-suggestions/') ||
      url.pathname.startsWith('/navigation-catalog/')),
  async ({ request }) => (await matchActiveContestCaches([request])) ?? fetch(request),
);

registerRoute(
  ({ url }) => url.origin === worker.location.origin && url.pathname.startsWith('/_astro/'),
  async ({ request }) => (await matchOfflineAsset(request)) ?? fetch(request),
);

registerRoute(
  ({ request, url }) => url.origin === worker.location.origin && request.destination === 'image',
  async ({ request }) => (await matchOfflineAsset(request)) ?? fetch(request),
);

registerRoute(
  ({ request, url }) =>
    url.origin === worker.location.origin &&
    request.method === 'GET' &&
    url.pathname.startsWith('/search/'),
  async ({ request }) => {
    // Respeita reload do offline update delta (cache: 'reload' deve ir à rede)
    if (request.cache === 'reload') return fetch(request);
    return (await matchActiveContestCaches([request])) ?? fetch(request);
  },
);

registerRoute(
  ({ request, url }) =>
    url.origin === worker.location.origin &&
    request.method === 'GET' &&
    url.pathname === '/search-global.json',
  async ({ request }) => fetch(request),
);

registerRoute(
  ({ request, url }) => url.origin === worker.location.origin && request.mode === 'navigate',
  async ({ request, event }) => {
    event.waitUntil(maybeUpdateOfflinePackages('navigation').catch(() => undefined));
    const downloaded = await Promise.race([
      matchDownloadedContest(request),
      new Promise<undefined>((resolve) => setTimeout(() => resolve(undefined), 2000)),
    ]).catch(() => undefined);
    if (downloaded) {
      void fetchWithTimeout(request).catch(() => undefined);
      return downloaded;
    }
    try {
      const response = await fetch(request);
      event.waitUntil(cacheRuntimePage(request, response.clone()).catch(() => undefined));
      return response;
    } catch (error) {
      const runtime = await matchRuntimePage(request);
      if (runtime) return runtime;
      const offline =
        (await matchPrecache('/offline/index.html')) ??
        (await matchPrecache('/offline/'));
      if (offline) return offline;
      throw error;
    }
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
