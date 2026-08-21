import { listOfflineContestRecords } from './offline-db';
import { downloadContestPackage, offlinePackageManifestSchema } from './offline-packages';

const NAVIGATION_CHECK_INTERVAL_MS = 30 * 60 * 1000;
const PERIODIC_CHECK_INTERVAL_MS = 60 * 60 * 1000;

let lastNavigationCheck = Number.NEGATIVE_INFINITY;
let lastPeriodicCheck = Number.NEGATIVE_INFINITY;
let running = false;

export interface AutoUpdateOverrides {
  fetch?: typeof globalThis.fetch;
  now?: () => number;
}

/**
 * Verifica — com throttle — se algum pacote baixado tem atualização e, se houver,
 * executa o download delta dentro do contexto atual (Service Worker na navegação).
 * Nunca lança: falhas são registradas e a retomada ocorre no próximo gatilho,
 * apoiada no ledger de hash por recurso.
 */
export async function maybeUpdateOfflinePackages(
  trigger: 'navigation' | 'periodic',
  overrides: AutoUpdateOverrides = {},
): Promise<void> {
  if (running) return;
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return;

  const now = overrides.now ?? Date.now;
  const timestamp = now();
  const interval = trigger === 'navigation' ? NAVIGATION_CHECK_INTERVAL_MS : PERIODIC_CHECK_INTERVAL_MS;
  const lastCheck = trigger === 'navigation' ? lastNavigationCheck : lastPeriodicCheck;
  if (timestamp - lastCheck < interval) return;
  if (trigger === 'navigation') lastNavigationCheck = timestamp;
  else lastPeriodicCheck = timestamp;

  running = true;
  try {
    const records = await listOfflineContestRecords();
    const fetchResource = overrides.fetch ?? globalThis.fetch;

    for (const record of records) {
      try {
        const response = await fetchResource(`/offline-inventories/${record.contestStorageId}.json`, {
          cache: 'no-store',
        });
        if (!response.ok) continue;
        const manifest = offlinePackageManifestSchema.parse(await response.json());
        if (manifest.manifestHash === record.manifestHash) continue;
        await downloadContestPackage(manifest, undefined, {}, 'update');
      } catch (error) {
        console.warn('[concursos] Atualização automática do pacote falhou.', record.contestStorageId, error);
      }
    }
  } catch (error) {
    console.warn('[concursos] Verificação automática de atualizações falhou.', error);
  } finally {
    running = false;
  }
}
