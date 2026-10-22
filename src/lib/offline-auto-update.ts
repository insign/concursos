import { listOfflineContestRecords } from './offline-db';
import { downloadContestPackage, offlinePackageManifestSchema } from './offline-packages';
import {
  mediaUrlsInCache,
  offlineMediaInventorySchema,
  type OfflineMediaInventory,
} from './offline-media';

const NAVIGATION_CHECK_INTERVAL_MS = 30 * 60 * 1000;
const PERIODIC_CHECK_INTERVAL_MS = 60 * 60 * 1000;

let lastNavigationCheck = Number.NEGATIVE_INFINITY;
let lastPeriodicCheck = Number.NEGATIVE_INFINITY;
let running = false;

export interface AutoUpdateOverrides {
  fetch?: typeof globalThis.fetch;
  now?: () => number;
  timeoutMs?: number;
}

const MANIFEST_FETCH_TIMEOUT_MS = 8_000;

function timeoutSignal(timeoutMs: number): AbortSignal {
  if (typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function') {
    return AbortSignal.timeout(timeoutMs);
  }
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeoutMs);
  return controller.signal;
}

/**
 * Inventário de mídia do concurso, lido sob demanda. Ausente ou inválido
 * não impede a atualização do pacote: a mídia é opcional.
 */
async function loadMediaInventory(
  contestStorageId: string,
  fetchResource: typeof fetch,
  timeoutMs: number,
): Promise<OfflineMediaInventory | undefined> {
  try {
    const response = await fetchResource(`/offline-media/${contestStorageId}.json`, {
      cache: 'no-store',
      // Sem timeout, uma conexao travada manteria `running` e atrasaria
      // toda verificacao futura.
      signal: timeoutSignal(timeoutMs),
    });
    if (!response.ok) return undefined;
    const parsed = offlineMediaInventorySchema.safeParse(await response.json());
    if (!parsed.success) return undefined;
    // O inventario tem que ser deste concurso: um arquivo obsoleto ou
    // roteado errado misturaria midias de outro conjunto.
    return parsed.data.contestStorageId === contestStorageId ? parsed.data : undefined;
  } catch {
    return undefined;
  }
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

  running = true;
  try {
    const records = await listOfflineContestRecords();
    const fetchResource = overrides.fetch ?? globalThis.fetch;
    const timeoutMs = overrides.timeoutMs ?? MANIFEST_FETCH_TIMEOUT_MS;

    for (const record of records) {
      try {
        const response = await fetchResource(`/offline-inventories/${record.contestStorageId}.json`, {
          cache: 'no-store',
          signal: timeoutSignal(timeoutMs),
        });
        if (!response.ok) continue;
        const manifest = offlinePackageManifestSchema.parse(await response.json());
        if (manifest.contestStorageId !== record.contestStorageId) continue;
        // A mídia só é atualizada para quem a.include: quem nunca marcou a
        // opção não recebe transferência automática de áudio.
        const media = record.media?.included
          ? await loadMediaInventory(record.contestStorageId, fetchResource, timeoutMs)
          : undefined;
        // O navegador pode despejar o cache da midia depois de alguns
        // dias: o registro ainda diz que esta completo, mas o audio
        // sumiu do aparelho. A verificacao acontece aqui, na navegacao,
        // e nao apenas na pagina do concurso.
        const mediaEvicted =
          record.media?.included === true && record.media.urls.length > 0
            ? (await mediaUrlsInCache(record.media.urls).catch(() => record.media!.urls)).length <
              record.media.urls.length
            : false;
        // Inventario vazio tambem e mudanca: e o caso em que as midias
        // foram removidas do concurso e os arquivos antigos precisam sair
        // do aparelho.
        // Midia parcial tambem: uma falha no download deixa arquivos
        // faltando e o auto-update precisa retomarlos, mesmo com o hash
        // do inventario ja atualizado.
        const mediaChanged =
          media !== undefined &&
          (media.inventoryHash !== record.media?.inventoryHash ||
            record.media?.status === 'partial' ||
            mediaEvicted);
        if (manifest.manifestHash === record.manifestHash && !mediaChanged) continue;
        await downloadContestPackage(manifest, undefined, { fetch: fetchResource }, 'update', mediaChanged ? { media } : {});
      } catch (error) {
        console.warn('[concursos] Atualização automática do pacote falhou.', record.contestStorageId, error);
      }
    }

    if (trigger === 'navigation') lastNavigationCheck = timestamp;
    else lastPeriodicCheck = timestamp;
  } catch (error) {
    console.warn('[concursos] Verificação automática de atualizações falhou.', error);
  } finally {
    running = false;
  }
}
