import { normalizeNavigationPath, RUNTIME_PAGE_CACHE } from './pwa-cache';

export interface PwaReloadEnvironment {
  isOnline(): boolean;
  fetchCurrent(url: string): Promise<{ ok: boolean }>;
  deleteRuntimePageEntry(url: string): Promise<unknown>;
  settleWrites(): Promise<void>;
  reloadPage(): void;
}

const WARM_FETCH_TIMEOUT_MS = 4000;

export async function reloadBypassingCache(
  environment: PwaReloadEnvironment,
  url: string,
): Promise<void> {
  let warmed = false;
  if (environment.isOnline()) {
    try {
      const response = await environment.fetchCurrent(url);
      warmed = response.ok;
    } catch {
      // Warm best-effort; sem conteúdo fresco não há evicção.
    }
  }
  try {
    // Barreira fail-closed ANTES da evicção: falha aqui mantém a entrada do
    // runtime intacta e vira erro retryable no controller (sem reload).
    await environment.settleWrites();
  } catch (error) {
    throw error instanceof Error ? error : new Error('Não foi possível concluir o salvamento local.');
  }
  if (warmed) {
    try {
      await environment.deleteRuntimePageEntry(url);
    } catch {
      // Evicção best-effort; nunca bloqueia o reload.
    }
  }
  environment.reloadPage();
}

export function browserPwaReloadEnvironment(): PwaReloadEnvironment {
  return {
    isOnline: () => typeof navigator === 'undefined' || navigator.onLine !== false,
    fetchCurrent: async (url) => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), WARM_FETCH_TIMEOUT_MS);
      try {
        return await fetch(url, {
          cache: 'reload',
          credentials: 'same-origin',
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeout);
      }
    },
    deleteRuntimePageEntry: async (url) => {
      const cache = await caches.open(RUNTIME_PAGE_CACHE);
      const parsed = new URL(url);
      const normalized = normalizeNavigationPath(parsed.pathname);
      const candidates = new Set([
        url,
        `${parsed.origin}${normalized}`,
        `${parsed.origin}${normalized}index.html`,
      ]);
      for (const candidate of candidates) {
        await cache.delete(candidate, { ignoreVary: true });
      }
    },
    settleWrites: () => Promise.resolve(),
    reloadPage: () => window.location.reload(),
  };
}
