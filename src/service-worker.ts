import { clientsClaim } from 'workbox-core';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { cleanupOutdatedCaches, matchPrecache, precacheAndRoute } from 'workbox-precaching';
import { registerRoute, setCatchHandler } from 'workbox-routing';
import { CacheFirst, NetworkFirst, NetworkOnly } from 'workbox-strategies';
import { listOfflineContestRecords } from './lib/offline-db';
import { maybeUpdateOfflinePackages } from './lib/offline-auto-update';
import {
  finalizeFailedBackgroundFetch,
  finalizeSuccessfulBackgroundFetch,
  reconcileOrphanedPackageJobs,
  type BackgroundFetchRegistrationLike,
} from './lib/offline-background-fetch';
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

async function downloadedResourceFirstFallback(request: Request): Promise<Response> {
  const downloaded = await matchActiveContestCaches([request]);
  if (!downloaded) return fetch(request);
  try {
    return await fetchWithTimeout(request);
  } catch {
    return downloaded;
  }
}

registerRoute(({ url }) => url.origin === 'https://kv.helio.me', new NetworkOnly());

registerRoute(
  ({ request }) => request.mode === 'navigate',
  async (options) => {
    // Atualização automática de pacotes durante a navegação: dispara em
    // paralelo (throttled) sem atrasar a resposta; o waitUntil mantém o
    // worker vivo enquanto o delta roda.
    const extendable = options.event as { waitUntil?: (promise: Promise<unknown>) => void };
    extendable?.waitUntil?.(maybeUpdateOfflinePackages('navigation').catch(() => undefined));

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
  ({ request, url }) =>
    url.origin === worker.location.origin &&
    request.method === 'GET' &&
    (url.pathname === '/navigation-catalog.json' ||
      url.pathname === '/simulados/catalog.json' ||
      url.pathname.startsWith('/simulados/pool/') ||
      url.pathname.startsWith('/resolucoes/')),
  ({ request }) => downloadedResourceFirstFallback(request),
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

// Periodic Background Sync (app instalado, Chromium): mesmo motor throttled
// da navegação, com intervalo independente.
worker.addEventListener('periodicsync', (event) => {
  const periodicEvent = event as Event & { tag?: string; waitUntil(promise: Promise<unknown>): void };
  if (periodicEvent.tag !== 'concursos-offline-updates') return;
  periodicEvent.waitUntil(maybeUpdateOfflinePackages('periodic').catch(() => undefined));
});

// Downloads em background conduzidos pelo navegador (Background Fetch, Chromium):
// o navegador mantém a transferência viva mesmo sem abas abertas; aqui apenas
// adotamos os records no staging e promovemos com a sequência atômica padrão.
interface TypedBackgroundFetchEvent {
  registration: BackgroundFetchRegistrationLike;
  waitUntil(promise: Promise<unknown>): void;
}

function backgroundFetchEvent(event: Event): TypedBackgroundFetchEvent | null {
  const candidate = event as Partial<TypedBackgroundFetchEvent>;
  if (!candidate.registration || typeof candidate.waitUntil !== 'function') return null;
  return { registration: candidate.registration, waitUntil: candidate.waitUntil.bind(candidate) };
}

worker.addEventListener('backgroundfetchsuccess', (event) => {
  const typed = backgroundFetchEvent(event);
  if (!typed) return;
  typed.waitUntil(
    finalizeSuccessfulBackgroundFetch(typed.registration).catch((error) => {
      console.warn('[concursos] Falha ao adotar download em background.', error);
    }),
  );
});

// Reconcilia jobs órfãos quando o Service Worker assume o controle: conclusões
// entregues a um worker substituído nunca serão recuperadas de outra forma.
worker.addEventListener('activate', (event) => {
  const activateEvent = event as Event & { waitUntil(promise: Promise<unknown>): void };
  if (typeof activateEvent.waitUntil !== 'function') return;
  activateEvent.waitUntil(reconcileOrphanedPackageJobs(self.registration).catch(() => undefined));
});

worker.addEventListener('backgroundfetchfail', (event) => {
  const typed = backgroundFetchEvent(event);
  if (!typed) return;
  typed.waitUntil(finalizeFailedBackgroundFetch(typed.registration));
});
