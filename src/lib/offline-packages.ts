import { z } from 'zod';
import {
  deleteOfflineContestRecord,
  getOfflineContestRecord,
  listOfflineContestRecords,
  saveOfflineContestRecord,
  type OfflineContestRecord,
} from './offline-db';
import { publishDownloadEvent, type DownloadPhase } from './offline-download-events';
import {
  ADAPTIVE_CONCURRENCY_DEFAULT,
  ADAPTIVE_CONCURRENCY_MAX,
  ADAPTIVE_CONCURRENCY_MIN,
  readAdaptiveHints,
  resolveAdaptiveConcurrency,
  runConcurrentPool,
} from './offline-download-pool';
import {
  downloadOfflineMedia,
  mediaUrlsInCache,
  OfflineMediaError,
  pruneUnreferencedMedia,
  type OfflineMediaInventory,
} from './offline-media';
import {
  CONTEST_CACHE_PREFIX,
  OFFLINE_MEDIA_CACHE,
  RUNTIME_PAGE_CACHE,
  SHARED_ASSET_CACHE,
  contestCacheName,
  normalizeNavigationPath,
} from './pwa-cache';

export {
  ADAPTIVE_CONCURRENCY_DEFAULT,
  ADAPTIVE_CONCURRENCY_MAX,
  ADAPTIVE_CONCURRENCY_MIN,
  readAdaptiveHints,
  resolveAdaptiveConcurrency,
  runConcurrentPool,
};

const localPathSchema = z
  .string()
  .startsWith('/')
  .refine((path) => !path.startsWith('//') && !path.startsWith('/api/'), 'Caminho local inválido');

export const offlinePackageManifestSchema = z
  .object({
    schemaVersion: z.union([z.literal(2), z.literal(3)]),
    contestSlug: z.string().min(1),
    contestStorageId: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    manifestHash: z.string().regex(/^(?:development|[a-f0-9]{20})$/),
    sharedHash: z.string().regex(/^(?:development|[a-f0-9]{20})$/).optional(),
    routes: z.array(localPathSchema).min(1),
    assets: z.array(localPathSchema),
    sharedAssets: z.array(localPathSchema),
    estimatedBytes: z.number().int().nonnegative().nullable(),
    resources: z.record(z.string().min(1), z.string().regex(/^[a-f0-9]{20}$/)),
    sharedResources: z.record(z.string().min(1), z.string().regex(/^[a-f0-9]{20}$/)).optional(),
  })
  .strict()
  .transform((data) => ({
    ...data,
    schemaVersion: 3 as const,
    sharedHash: data.sharedHash ?? data.manifestHash,
    sharedResources: data.sharedResources ?? {},
  }));

export type OfflinePackageManifest = z.infer<typeof offlinePackageManifestSchema>;

export interface DownloadProgress {
  completed: number;
  total: number;
  downloadedBytes: number;
  fetched?: number;
  copied?: number;
}

const OFFLINE_PACKAGE_LOCK = 'concursos:offline-packages';

interface PackageEnvironment {
  cacheStorage?: CacheStorage;
  fetch?: typeof fetch;
  origin?: string;
  storage?: Pick<StorageManager, 'estimate' | 'persist'>;
}

function environment(overrides: PackageEnvironment = {}) {
  const browserStorage = typeof navigator !== 'undefined' ? navigator.storage : undefined;
  return {
    cacheStorage: overrides.cacheStorage ?? globalThis.caches,
    fetch: overrides.fetch ?? globalThis.fetch,
    origin: overrides.origin ?? (typeof location === 'undefined' ? 'http://localhost' : location.origin),
    storage: overrides.storage ?? browserStorage,
  };
}

function uniqueResources(manifest: OfflinePackageManifest): string[] {
  return [...new Set([...manifest.routes, ...manifest.assets, ...manifest.sharedAssets])];
}

export function requestForOfflinePackage(path: string, origin: string): Request {
  const url = new URL(path, origin);
  if (url.origin !== origin || url.origin === 'https://kv.helio.me') {
    throw new Error('O pacote offline contém um recurso externo inválido.');
  }
  return new Request(url, {
    credentials: 'same-origin',
    headers: { 'X-PWA-Offline': '1' },
  });
}

export async function hashOfflineResource(resource: string, contents: BufferSource): Promise<string> {
  const pathBytes = new TextEncoder().encode(resource);
  const raw =
    contents instanceof ArrayBuffer
      ? new Uint8Array(contents)
      : new Uint8Array(contents.buffer, contents.byteOffset, contents.byteLength);
  // Prescan por bytes: evita decode no caminho comum (binários grandes).
  const needle = new TextEncoder().encode('cloudflareinsights');
  let hasNeedle = false;
  for (let index = 0; index + needle.length <= raw.length; index += 1) {
    let found = true;
    for (let offset = 0; offset < needle.length; offset += 1) {
      if (raw[index + offset] !== needle[offset]) {
        found = false;
        break;
      }
    }
    if (found) {
      hasNeedle = true;
      break;
    }
  }
  // Espelho de scripts/lib/offline-inventory-builder.mjs:stripCloudflareBeacon
  // — o beacon injetado no serve não existe no dist; sem strip, o hash do
  // manifesto nunca bateria com o baixado. Manter iguais.
  const text = hasNeedle ? new TextDecoder().decode(raw) : '';
  const body = hasNeedle ? new TextEncoder().encode(stripCloudflareBeacon(text)) : raw;
  const combined = new Uint8Array(pathBytes.length + body.byteLength);
  combined.set(pathBytes, 0);
  combined.set(body, pathBytes.length);
  const digest = await crypto.subtle.digest('SHA-256', combined);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('').slice(0, 20);
}

const CF_BEACON_SCRIPT_PATTERN =
  /<script\b[^>]*\bstatic\.cloudflareinsights\.com\/beacon\.min\.js[^>]*>\s*<\/script\s*>/gi;
const CF_BEACON_COMMENT_PATTERN = /<!--\s*Cloudflare[^>]*?-->/gi;

export function stripCloudflareBeacon(html: string): string {
  return html.replace(CF_BEACON_SCRIPT_PATTERN, '').replace(CF_BEACON_COMMENT_PATTERN, '');
}

const OFFLINE_PACKAGE_LEASE_TTL = 15_000;
const OFFLINE_PACKAGE_LEASE_WAIT_MS = 60_000;
export const ADOPTION_LEASE_WAIT_MS = 300_000;
/**
 * Lease maior durante a fase de midias: um arquivo unico pode demorar
 * minutos e o heartbeat do navegador e estrangulado em aba oculta.
 */
const MEDIA_LEASE_TTL_MS = 60_000;
/**
 * Espera curta do lock para o rebaixamento do estado da midia: e uma
 * dica de reparo, e nao pode disputar espaco com um download em curso.
 */
const MEDIA_REPAIR_LOCK_WAIT_MS = 2_000;

/**
 * Serialização única via lease IndexedDB (funciona em página E Service
 * Worker): dono POR OPERAÇÃO (o mesmo dono não pode re-adquirir), heartbeat
 * de renovação a cada TTL/3 e falha do trabalho se o lease for perdido.
 */
async function withOfflinePackageLock<T>(
  operation: (renew: () => Promise<void>) => Promise<T>,
  options: { waitMs?: number; leaseTtlMs?: number } = {},
): Promise<T> {
  const { acquireSyncLease, renewSyncLease, releaseSyncLease } = await import('./offline-db');
  const ownerId =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
  const leaseTtlMs = options.leaseTtlMs ?? OFFLINE_PACKAGE_LEASE_TTL;
  const deadline = Date.now() + (options.waitMs ?? OFFLINE_PACKAGE_LEASE_WAIT_MS);
  while (!(await acquireSyncLease(OFFLINE_PACKAGE_LOCK, ownerId, leaseTtlMs))) {
    if (Date.now() >= deadline) {
      throw new Error('Outro download está em andamento; aguarde alguns instantes.');
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  let lost = false;
  let renewalInFlight: Promise<void> | null = null;
  let lastRenewalAt = Date.now();

  const renewLease = (): Promise<void> => {
    const pending = renewSyncLease(OFFLINE_PACKAGE_LOCK, ownerId, leaseTtlMs)
      .then(() => undefined)
      .then(() => {
        lastRenewalAt = Date.now();
      })
      .catch((error: unknown) => {
        lost = true;
        throw error;
      });
    renewalInFlight = pending;
    return pending;
  };

  const heartbeat = setInterval(() => {
    void renewLease().catch(() => undefined);
  }, leaseTtlMs / 3);

  /**
   * Renovacao sob demanda. O heartbeat depende de `setInterval`, que o
   * navegador reduz em abas ocultas: um download longo de midia pode
   * perder o lease mesmo com o timer rodando devagar. A operacao renova
   * o lease por evento (progresso e leitura do corpo), nao por tempo.
   * A perda do lease e propagada: quem chamou decide o que fazer.
   */
  const renew = async (): Promise<void> => {
    // A perda ja registrada pelo heartbeat precisa chegar a quem renovou:
    // sem isso, a fase de midia continua gravando sem coordenar.
    if (lost) throw new Error('Coordenação de download perdida durante a operação; tente novamente.');
    if (Date.now() - lastRenewalAt < leaseTtlMs / 3) return;
    const pending = renewalInFlight as Promise<void> | null;
    if (pending) await pending.catch(() => undefined);
    if (lost) throw new Error('Coordenação de download perdida durante a operação; tente novamente.');
    if (Date.now() - lastRenewalAt < leaseTtlMs / 3) return;
    await renewLease();
  };

  try {
    const result = await operation(renew);
    // Barreira: resolve qualquer renovação em voo ANTES do veredito final,
    // para que perda de lease não passe despercebida numa operação bem-sucedida.
    // Cast local: TS não acompanha atribuições dentro do callback do
    // setInterval, estreitando renewalInFlight para never aqui.
    const pendingRenewal = renewalInFlight as Promise<void> | null;
    if (pendingRenewal) await pendingRenewal.catch(() => undefined);
    if (lost) {
      throw new Error('Coordenação de download perdida durante a operação; tente novamente.');
    }
    return result;
  } catch (error) {
    const pendingOnErr = renewalInFlight as Promise<void> | null;
    if (pendingOnErr) await pendingOnErr.catch(() => undefined);
    // A fase de midia ja trata a perda de lease: o estado parcial foi
    // gravado e o erro que chega aqui e o da midia.
    if (
      lost &&
      !(error instanceof OfflineMediaError) &&
      !(error instanceof Error && error.message.startsWith('Coordenação de download perdida'))
    ) {
      throw new Error('Coordenação de download perdida durante a operação; tente novamente.', { cause: error });
    }
    throw error;
  } finally {
    clearInterval(heartbeat);
    await releaseSyncLease(OFFLINE_PACKAGE_LOCK, ownerId).catch(() => undefined);
  }
}

function readableError(error: unknown): Error {
  const name = error instanceof DOMException ? error.name : (error as { name?: string })?.name;
  if (name === 'QuotaExceededError') {
    return new Error('Não há espaço suficiente para concluir o download. O pacote anterior foi preservado.');
  }
  return error instanceof Error ? error : new Error('Não foi possível concluir o download offline.');
}

export async function assertStorageCapacity(
  manifest: Pick<OfflinePackageManifest, 'estimatedBytes'>,
  storage: Pick<StorageManager, 'estimate' | 'persist'> | undefined,
  extraBytes = 0,
): Promise<void> {
  if (!storage) return;
  if (typeof storage.persist === 'function') await storage.persist().catch(() => false);
  const required = (manifest.estimatedBytes ?? 0) + Math.max(0, extraBytes);
  if (required <= 0) return;

  if (typeof storage.estimate !== 'function') return;
  const estimate = await storage.estimate().catch((): StorageEstimate => ({}));
  if (estimate.quota === undefined || estimate.usage === undefined) return;
  if (estimate.quota - estimate.usage < required) {
    throw new Error('Não há espaço suficiente para concluir o download. O pacote anterior foi preservado.');
  }
}

async function copyCache(source: Cache, destination: Cache): Promise<void> {
  for (const request of await source.keys()) {
    const response = await source.match(request);
    if (!response) throw new Error(`Recurso ausente no cache temporário: ${request.url}`);
    await destination.put(request, response);
  }
}

async function copyResourceLocally(
  source: Cache | undefined,
  request: Request,
  destination: Cache,
): Promise<boolean> {
  if (!source) return false;
  const response = await source.match(request, { ignoreVary: true }).catch(() => undefined);
  if (!response) return false;
  await destination.put(request, response);
  return true;
}

async function cacheContains(cache: Cache, resources: Iterable<string>, origin: string): Promise<boolean> {
  for (const resource of resources) {
    if (!await cache.match(requestForOfflinePackage(resource, origin), { ignoreVary: true })) return false;
  }
  return true;
}

export async function packageIsComplete(
  cacheStorage: CacheStorage,
  record: OfflineContestRecord,
  manifest: OfflinePackageManifest,
  origin: string,
): Promise<boolean> {
  if (!await cacheStorage.has(record.activeCacheName)) return false;
  const active = await cacheStorage.open(record.activeCacheName);
  if (!await cacheContains(active, [...manifest.routes, ...manifest.assets], origin)) return false;
  if (manifest.sharedAssets.length === 0) return true;
  if (!await cacheStorage.has(SHARED_ASSET_CACHE)) return false;
  return cacheContains(await cacheStorage.open(SHARED_ASSET_CACHE), manifest.sharedAssets, origin);
}

async function removeVisitedDuplicates(cacheStorage: CacheStorage, routes: string[], origin: string): Promise<void> {
  const runtime = await cacheStorage.open(RUNTIME_PAGE_CACHE);
  for (const route of routes) {
    const normalized = normalizeNavigationPath(new URL(route, origin).pathname);
    const candidates = normalized === '/'
      ? [normalized, '/index.html']
      : [normalized, normalized.slice(0, -1), `${normalized}index.html`];
    for (const candidate of candidates) {
      await runtime.delete(new Request(new URL(candidate, origin)), { ignoreVary: true });
    }
  }
}

export interface ContestDownloadOptions {
  /**
   * Midias a incluir no download. Quando presente, o pacote do concurso e
   * as midias sao baixados na mesma operacao, sob o mesmo lock: primeiro o
   * conteudo, que e atomico, depois as midias, que sao idempotentes.
   */
  media?: OfflineMediaInventory;
}

export async function downloadContestPackage(
  input: unknown,
  onProgress: (progress: DownloadProgress) => void = () => undefined,
  overrides: PackageEnvironment = {},
  phase: DownloadPhase = 'download',
  options: ContestDownloadOptions = {},
): Promise<OfflineContestRecord> {
  const manifest = offlinePackageManifestSchema.parse(input);
  const storageId = manifest.contestStorageId;
  publishDownloadEvent({ type: 'started', contestStorageId: storageId, phase });
  try {
    const record = await withOfflinePackageLock(async (renew) => {
      const packageRecord = await downloadContestPackageLocked(manifest, (progress) => {
        onProgress(progress);
        publishDownloadEvent({
          type: 'progress',
          contestStorageId: storageId,
          phase,
          completed: progress.completed,
          total: progress.total,
          downloadedBytes: progress.downloadedBytes,
        });
      }, overrides, phase);
      if (!options.media) return packageRecord;
      // Sentinela de atualizacao: o registro vazio significa que o concurso
      // foi removido enquanto a operacao esperava o lock. Nao ha midia a
      // baixar e, principalmente, nada deve ser gravado: gravar aqui
      // ressuscitaria o pacote que o usuario acabou de apagar.
      if (packageRecord.activeCacheName === '') return packageRecord;
      return downloadContestMediaLocked(packageRecord, options.media, overrides, renew);
    }, options.media ? { leaseTtlMs: MEDIA_LEASE_TTL_MS } : {});
    publishDownloadEvent({ type: 'completed', contestStorageId: storageId, phase });
    return record;
  } catch (error) {
    // A fase de midia publica o proprio evento de falha: publicar aqui
    // tambem faria a interface pintar a causa errada.
    if (!(error instanceof OfflineMediaError)) {
      publishDownloadEvent({
        type: 'failed',
        contestStorageId: storageId,
        phase,
        message: error instanceof Error ? error.message : String(error),
      });
    }
    throw error;
  }
}

/**
 * Fase de midias do download offline. Roda depois da ativacao do pacote:
 * o conteudo e atomico e a midia e idempotente. Uma falha aqui preserva o
 * pacote ja ativado e deixa os arquivos verificados para retomada.
 *
 * Todo erro da fase e classificado como `OfflineMediaError`: a interface
 * precisa distinguir "o conteudo falhou" de "o audio falhou", porque o
 * pacote continua valendo nos dois casos.
 */
async function downloadContestMediaLocked(
  record: OfflineContestRecord,
  inventory: OfflineMediaInventory,
  overrides: PackageEnvironment,
  renew: () => Promise<void> = () => Promise.resolve(),
): Promise<OfflineContestRecord> {
  const { cacheStorage, storage } = environment(overrides);
  const storageId = record.contestStorageId;
  const controller = new AbortController();
  let leaseLost = false;
  /** O estado da midia ja foi gravado: uma falha depois nao o rebaixa. */
  let stateWritten = false;

  /**
   * Renovacao da coordenacao. A perda do lease interrompe o trabalho em
   * andamento: ninguem mais deve gravar estado por conta propria.
   */
  const renewMedia = async (): Promise<void> => {
    try {
      await renew();
    } catch (error) {
      leaseLost = true;
      controller.abort();
      throw error;
    }
  };

  try {
    if (!cacheStorage) throw new Error('Armazenamento de midia indisponivel neste navegador.');

    if (inventory.items.length === 0) {
      // O concurso ficou sem midia: o estado deixa de valer a midia e a
      // poda leva embora os arquivos que sobraram.
      const emptied: OfflineContestRecord = {
        ...record,
        media: {
          included: false,
          inventoryHash: inventory.inventoryHash,
          urls: [],
          bytes: 0,
          status: 'complete',
          updatedAt: Date.now(),
        },
      };
      if (!(await mediaStateStillCurrent(record))) return record;
      await saveOfflineContestRecord(emptied);
      stateWritten = true;
      try {
        await pruneUnreferencedMedia(await referencedMediaUrls(), overrides);
      } catch {
        // A poda e best-effort: o proximo ciclo de limpeza faz o ajuste.
      }
      return emptied;
    }

    const missingBytes = await missingMediaBytes(inventory, overrides);
    if (missingBytes > 0) {
      try {
        await assertStorageCapacity({ estimatedBytes: 0 }, storage, missingBytes);
      } catch {
        // A mensagem de cota do pacote fala do pacote anterior, que nao
        // e mais o caso aqui: o conteudo novo ja esta ativo.
        throw new OfflineMediaError(
          'Não há espaço suficiente no aparelho para as mídias. O conteúdo do curso está disponível offline.',
        );
      }
    }

    // A coordenacao e renovada antes da primeira transferencia: um
    // arquivo unico pode demorar mais que o intervalo do heartbeat.
    await renewMedia();

    publishDownloadEvent({ type: 'started', contestStorageId: storageId, phase: 'media' });
    const outcome = await downloadOfflineMedia(
      inventory,
      (progress) => {
        publishDownloadEvent({
          type: 'progress',
          contestStorageId: storageId,
          phase: 'media',
          completed: progress.completed,
          total: progress.total,
          downloadedBytes: progress.downloadedBytes,
        });
      },
      overrides,
      { renew: renewMedia, signal: controller.signal },
    );

    if (leaseLost) {
      throw new OfflineMediaError(
        'A coordenação do download foi perdida durante as mídias. O conteúdo está disponível offline; tente de novo.',
      );
    }

    // O registro pode ter mudado enquanto a fase rodava (o concurso foi
    // removido ou o pacote foi atualizado): gravar aqui ressuscitaria um
    // estado obsoleto.
    if (!(await mediaStateStillCurrent(record))) {
      throw new OfflineMediaError(
        'O download deste concurso mudou durante as mídias. O conteúdo está disponível offline; tente de novo.',
      );
    }

    // A midia que ja estava no aparelho e continua no inventario entra no
    // estado: uma falha parcial nao pode fazer o usuario perder o audio.
    // O que saiu do inventario nao entra, e a poda o remove. E o que o
    // navegador despejou do cache tambem nao entra: o registro nao pode
    // dizer que o audio esta completo quando os arquivos sumiram.
    const inventoryUrls = new Set(inventory.items.map((item) => item.url));
    const previousCandidates = (record.media?.urls ?? []).filter((url) => inventoryUrls.has(url));
    const previousUrls = await mediaUrlsInCache(previousCandidates, overrides);
    const urls = [...new Set([...previousUrls, ...outcome.urls])];
    const complete = inventory.items.every((item) => urls.includes(item.url));

    const updated: OfflineContestRecord = {
      ...record,
      media: {
        included: true,
        inventoryHash: inventory.inventoryHash,
        urls,
        bytes: mediaBytesOf(inventory, urls),
        status: complete ? 'complete' : 'partial',
        updatedAt: Date.now(),
      },
    };
    await saveOfflineContestRecord(updated);
    stateWritten = true;
    // A troca do inventario deixa arquivos antigos sem referencia: a poda
    // roda aqui, ainda sob o lock, para nao deixar midia obsoleta no aparelho.
    // A limpeza e best-effort: um erro dela nao pode rebaixar um estado
    // que ja foi gravado.
    try {
      await pruneUnreferencedMedia(await referencedMediaUrls(), overrides);
    } catch {
      // O proximo ciclo de limpeza faz o ajuste.
    }

    if (outcome.failed.length > 0) {
      throw new OfflineMediaError(
        `${outcome.failed.length} de ${inventory.items.length} mídias não puderam ser baixadas` +
          `${outcome.firstError ? `: ${outcome.firstError}` : ''}. ` +
          'O conteúdo está disponível offline; tente de novo para completar as mídias.',
      );
    }
    publishDownloadEvent({ type: 'completed', contestStorageId: storageId, phase: 'media' });
    return updated;
  } catch (error) {
    // Sem coordenacao, nada e gravado: outra operacao pode ter removido
    // o concurso ou ativado um pacote novo, e escrever aqui voltaria a
    // ressuscitar um estado obsoleto.
    if (!leaseLost && !stateWritten) {
      // O que ja foi verificado continua guardado e referenciado, senao a
      // proxima poda o apaga. A gravacao e best-effort: uma falha aqui
      // nao pode substituir o erro original.
      await savePartialMediaState(record, inventory, overrides).catch(() => undefined);
      try {
        await pruneUnreferencedMedia(await referencedMediaUrls(), overrides);
      } catch {
        // A poda e best-effort: o proximo ciclo de limpeza faz o ajuste.
      }
    }
    publishDownloadEvent({
      type: 'failed',
      contestStorageId: storageId,
      phase: 'media',
      message: error instanceof Error ? error.message : String(error),
    });
    throw error instanceof OfflineMediaError
      ? error
      : new OfflineMediaError(error instanceof Error ? error.message : String(error), { cause: error });
  }
}

/**
 * O registro do concurso ainda e o mesmo que a fase de midia capturou?
 * Enquanto nao for, nada pode ser gravado: o concurso pode ter sido
 * removido ou o pacote pode ter sido trocado por outra operacao.
 */
async function mediaStateStillCurrent(record: OfflineContestRecord): Promise<boolean> {
  const current = await getOfflineContestRecord(record.contestStorageId);
  return Boolean(current) && current!.activeCacheName === record.activeCacheName;
}

/** Bytes correspondente as URLs de midia guardadas. */
function mediaBytesOf(inventory: OfflineMediaInventory, urls: readonly string[]): number {
  const wanted = new Set(urls);
  return inventory.items.reduce((total, item) => (wanted.has(item.url) ? total + item.bytes : total), 0);
}

/**
 * Grava o estado parcial da midia: o que ja foi verificado continua
 * referenciado pelo concurso, para a retomada e para a poda.
 *
 * A midia do inventario anterior tambem entra, quando ainda esta no
 * aparelho: uma falha no meio de uma atualizacao nao pode fazer o usuario
 * perder o audio que ja tinha.
 */
async function savePartialMediaState(
  record: OfflineContestRecord,
  inventory: OfflineMediaInventory,
  overrides: PackageEnvironment,
): Promise<void> {
  // O registro pode ter mudado desde a fase: sem a mesma origem, gravar
  // aqui recriaria um concurso removido.
  if (!(await mediaStateStillCurrent(record))) return;
  const inventoryUrls = new Set(inventory.items.map((item) => item.url));
  // A midia do inventario anterior so vale se ainda estiver no inventario:
  // o que saiu dele e obsoleto e deve sair do aparelho.
  const previousCandidates = (record.media?.urls ?? []).filter((url) => inventoryUrls.has(url));
  const previous = await mediaUrlsInCache(previousCandidates, overrides).catch(() => [] as string[]);
  const current = await mediaUrlsInCache(
    inventory.items.map((item) => item.url),
    overrides,
  ).catch(() => [] as string[]);
  const urls = [...new Set([...previous, ...current])];
  const bytes = mediaBytesOf(inventory, urls);
  await saveOfflineContestRecord({
    ...record,
    media: {
      included: true,
      inventoryHash: inventory.inventoryHash,
      urls,
      bytes,
      status: 'partial',
      updatedAt: Date.now(),
    },
  });
}

async function missingMediaBytes(
  inventory: OfflineMediaInventory,
  overrides: PackageEnvironment,
): Promise<number> {
  const { cacheStorage, origin } = environment(overrides);
  if (!cacheStorage) return inventory.estimatedBytes;
  const cache = await cacheStorage.open(OFFLINE_MEDIA_CACHE);
  let total = 0;
  for (const item of inventory.items) {
    const request = new Request(new URL(item.url, origin), { credentials: 'same-origin' });
    if (!(await cache.match(request, { ignoreVary: true }))) total += item.bytes;
  }
  return total;
}

async function downloadContestPackageLocked(
  manifest: OfflinePackageManifest,
  onProgress: (progress: DownloadProgress) => void,
  overrides: PackageEnvironment,
  phase: DownloadPhase,
): Promise<OfflineContestRecord> {
  const { cacheStorage, fetch: fetchResource, origin, storage } = environment(overrides);

  // Atualizações em segundo plano não podem ressuscitar um pacote que o
  // usuário removeu enquanto a verificação rodava. O wrapper publica o
  // evento terminal; aqui apenas curto-circuita sem tocar nos caches.
  if (phase === 'update' && !(await getOfflineContestRecord(manifest.contestStorageId))) {
    return {
      contestStorageId: manifest.contestStorageId,
      manifestHash: manifest.manifestHash,
      activeCacheName: '',
      downloadedAt: Date.now(),
      resourceCount: 0,
    };
  }

  const resources = uniqueResources(manifest);
  const packageResources = new Set([...manifest.routes, ...manifest.assets]);
  const canonicalCacheName = contestCacheName(manifest.contestStorageId, manifest.manifestHash);
  const existing = await getOfflineContestRecord(manifest.contestStorageId);
  const nextHashes = manifest.resources;
  const previousHashes = existing?.resourceHashes;
  let previousActive: Cache | undefined;
  if (existing && previousHashes && (await cacheStorage.has(existing.activeCacheName))) {
    previousActive = await cacheStorage.open(existing.activeCacheName);
  }

  if (
    existing?.manifestHash === manifest.manifestHash &&
    await packageIsComplete(cacheStorage, existing, manifest, origin)
  ) {
    return existing;
  }

  await assertStorageCapacity(manifest, storage);
  const suffix = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}`;
  const temporaryCacheName = `${canonicalCacheName}--temporary--${suffix}`;
  const temporary = await cacheStorage.open(temporaryCacheName);
  const shared = await cacheStorage.open(SHARED_ASSET_CACHE);
  let downloadedBytes = 0;
  let completed = 0;
  let fetched = 0;
  let copied = 0;

  const adaptiveHints = readAdaptiveHints();
  const adaptiveConcurrency = resolveAdaptiveConcurrency(adaptiveHints);
  const boundedConcurrency = Math.max(ADAPTIVE_CONCURRENCY_MIN, Math.min(ADAPTIVE_CONCURRENCY_MAX, Math.floor(adaptiveConcurrency)));

  try {
    await runConcurrentPool(resources, boundedConcurrency, async (resource, signal) => {
      if (signal?.aborted) return;
      const request = requestForOfflinePackage(resource, origin);
      const isPackageResource = packageResources.has(resource);
      const destination = isPackageResource ? temporary : shared;
      const expectedHash = isPackageResource
        ? manifest.resources[resource]
        : ((manifest as unknown as { sharedResources?: Record<string,string> }).sharedResources?.[resource] ?? manifest.resources[resource]);
      const previousHash = isPackageResource
        ? previousHashes?.[resource]
        : ((existing as unknown as { sharedHashes?: Record<string,string> })?.sharedHashes?.[resource] ?? previousHashes?.[resource]);
      let stored = false;
      if (expectedHash !== undefined && previousHash !== undefined && expectedHash === previousHash) {
        stored = await copyResourceLocally(isPackageResource ? previousActive : shared, request, destination);
      }
        if (!stored) {
          if (signal?.aborted) return;
          const response = await fetchResource(request, {
            cache: 'reload',
            credentials: 'same-origin',
            ...(signal ? { signal } : {}),
          });
          if (!response.ok || response.type === 'opaque') {
            throw new Error(`Falha ao baixar ${resource}: HTTP ${response.status}`);
          }
          if (signal?.aborted) return;
          const contentLength = Number(response.headers.get('content-length'));
          if (Number.isFinite(contentLength)) downloadedBytes += contentLength;
          if (signal?.aborted) return;
          if (expectedHash) {
            const buffer = await response.clone().arrayBuffer();
            const actualHash = await hashOfflineResource(resource, buffer);
            if (actualHash !== expectedHash) {
              throw new Error(`Integridade inválida para ${resource}`);
            }
          }
          await destination.put(request, response);
          fetched += 1;
        } else {
          copied += 1;
        }
        if (signal?.aborted) return;
        completed += 1;
        onProgress({ completed, total: resources.length, downloadedBytes, fetched, copied });
    });

    return await activateStagedPackage(manifest, temporaryCacheName, overrides);
  } catch (error) {
    await cacheStorage.delete(temporaryCacheName);
    throw readableError(error);
  }
}

/**
 * Promove um staging completo ao cache ativo do concurso: cópia local,
 * verificação de contagem, registro IndexedDB (ponto de ativação) e limpeza
 * do temporário e do cache anterior. Em falha, remove o staging e qualquer
 * cache novo aberto, preservando o pacote anterior.
 */
export async function activateStagedPackage(
  manifest: OfflinePackageManifest,
  temporaryCacheName: string,
  overrides: PackageEnvironment = {},
): Promise<OfflineContestRecord> {
  const { cacheStorage, origin } = environment(overrides);
  const existing = await getOfflineContestRecord(manifest.contestStorageId);
  const canonicalCacheName = contestCacheName(manifest.contestStorageId, manifest.manifestHash);
  const suffix = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}`;
  const activeCacheName = existing?.manifestHash === manifest.manifestHash
    ? `${canonicalCacheName}--replacement--${suffix}`
    : canonicalCacheName;
  const packageResources = new Set([...manifest.routes, ...manifest.assets]);
  let promotionStarted = false;
  let activatedRecord: OfflineContestRecord;

  try {
    await cacheStorage.delete(activeCacheName);
    promotionStarted = true;
    const active = await cacheStorage.open(activeCacheName);
    const temporary = await cacheStorage.open(temporaryCacheName);
    await copyCache(temporary, active);
    if ((await active.keys()).length !== packageResources.size) {
      throw new Error('O cache promovido não contém todos os recursos do pacote.');
    }

    const record: OfflineContestRecord = {
      contestStorageId: manifest.contestStorageId,
      manifestHash: manifest.manifestHash,
      sharedHash: (manifest as unknown as { sharedHash?: string }).sharedHash ?? manifest.manifestHash,
      activeCacheName,
      downloadedAt: Date.now(),
      resourceCount: resourcesCountOf(manifest),
      resourceHashes: { ...manifest.resources },
      sharedHashes: { ...((manifest as unknown as { sharedResources?: Record<string,string> }).sharedResources ?? {}) },
      // Atualizar o pacote nao pode apagar as midias ja baixadas.
      ...(existing?.media ? { media: existing.media } : {}),
    };
    await saveOfflineContestRecord(record);
    activatedRecord = record;
  } catch (error) {
    await cacheStorage.delete(temporaryCacheName);
    if (promotionStarted) {
      await cacheStorage.delete(activeCacheName);
    }
    throw error;
  }

  // Ativação concluída (registro salvo é o ponto de virada): a limpeza
  // posterior é best-effort e nunca desfaz um pacote já ativado.
  try {
    await cacheStorage.delete(temporaryCacheName);
  } catch {
    // Temporário órfão será removido por cleanupInactiveContestCaches.
  }
  try {
    if (existing && existing.activeCacheName !== activeCacheName) {
      await cacheStorage.delete(existing.activeCacheName);
    }
  } catch {
    // Cache anterior remanescente é inofensivo e também é coberto pela limpeza.
  }
  try {
    await removeVisitedDuplicates(cacheStorage, manifest.routes, origin);
  } catch {
    // Duplicatas de páginas visitadas são reavaliadas nas próximas navegações.
  }
  return activatedRecord;
}

function resourcesCountOf(manifest: OfflinePackageManifest): number {
  return [...new Set([...manifest.routes, ...manifest.assets, ...manifest.sharedAssets])].length;
}

/**
 * Adoção de staging por contextos externos (ex.: adoção de Background Fetch
 * no Service Worker): executa a mesma promoção atômica sob o lock único que
 * serializa downloads, remoções e limpezas.
 */
export async function adoptStagedPackageUnderLock(
  manifest: OfflinePackageManifest,
  temporaryCacheName: string,
  overrides: PackageEnvironment = {},
  options: { waitMs?: number } = {},
): Promise<OfflineContestRecord> {
  return withOfflinePackageLock(() => activateStagedPackage(manifest, temporaryCacheName, overrides), options);
}

export { OFFLINE_PACKAGE_LEASE_WAIT_MS };

export async function removeContestPackage(
  contestStorageId: string,
  overrides: PackageEnvironment = {},
): Promise<void> {
  // A espera e maior que a padrao: um download de midia em andamento pode
  // durar minutos, e remover o pacote logo depois precisa succeed.
  return withOfflinePackageLock(async () => {
    const { cacheStorage } = environment(overrides);
    const existing = await getOfflineContestRecord(contestStorageId);
    if (!existing) return;
    await deleteOfflineContestRecord(contestStorageId);
    await cacheStorage.delete(existing.activeCacheName);
    await pruneUnreferencedMedia(await referencedMediaUrls(), overrides);
  }, { waitMs: ADOPTION_LEASE_WAIT_MS });
}

/** URLs de midia referenciadas por algum concurso baixado neste aparelho. */
async function referencedMediaUrls(): Promise<Set<string>> {
  const records = await listOfflineContestRecords();
  const urls = new Set<string>();
  for (const record of records) {
    for (const url of record.media?.urls ?? []) urls.add(url);
  }
  return urls;
}

export async function cleanupInactiveContestCaches(overrides: PackageEnvironment = {}): Promise<void> {
  // Fast path sem lock: o caso comum (nada órfão) não deve serializar
  // remoções/downloads do usuário atrás do lock global. Um cleanup
  // interrompido por navegação deixaria um lease estático de 15s travando
  // a próxima operação; a varredura destrutiva abaixo é refeita sob lock.
  const preview = await listInactiveContestCaches(overrides);
  if (preview.ghostContestIds.length === 0 && preview.orphanCacheNames.length === 0) return;
  return withOfflinePackageLock(async () => {
    const { cacheStorage } = environment(overrides);
    const records = await listOfflineContestRecords();
    const cacheNames = new Set(await cacheStorage.keys());
    const { ghostContestIds, orphanCacheNames } = classifyInactiveContestCaches(records, cacheNames);

    for (const contestStorageId of ghostContestIds) {
      await deleteOfflineContestRecord(contestStorageId);
    }

    for (const name of orphanCacheNames) {
      await cacheStorage.delete(name);
    }

    // Um registro fantasma era a unica referencia de alguma midia: sem a
    // poda, o arquivo ficaria no aparelho sem nenhum concurso apontando.
    await pruneUnreferencedMedia(await referencedMediaUrls(), overrides);
  });
}

interface InactiveContestCaches {
  ghostContestIds: string[];
  orphanCacheNames: string[];
}

function classifyInactiveContestCaches(
  records: readonly OfflineContestRecord[],
  cacheNames: ReadonlySet<string>,
): InactiveContestCaches {
  const activeNames = new Set<string>();
  const ghostContestIds: string[] = [];

  for (const record of records) {
    if (cacheNames.has(record.activeCacheName)) {
      activeNames.add(record.activeCacheName);
    } else {
      ghostContestIds.push(record.contestStorageId);
    }
  }

  const orphanCacheNames = [...cacheNames].filter(
    (name) => name.startsWith(CONTEST_CACHE_PREFIX) && !activeNames.has(name),
  );
  return { ghostContestIds, orphanCacheNames };
}

async function listInactiveContestCaches(overrides: PackageEnvironment = {}): Promise<InactiveContestCaches> {
  const { cacheStorage } = environment(overrides);
  const records = await listOfflineContestRecords();
  const cacheNames = new Set(await cacheStorage.keys());
  return classifyInactiveContestCaches(records, cacheNames);
}

/**
 * Rebaixa o estado da midia para parcial quando os arquivos sairam do
 * cache do aparelho (o navegador pode despejar o cache apos alguns
 * dias). A gravacao acontece sob o lock global e so quando o registro
 * continua o mesmo: a interface nunca escreve o registro de downloads
 * por fora da serializacao.
 */
export async function markOfflineMediaIncomplete(
  contestStorageId: string,
  overrides: PackageEnvironment = {},
): Promise<void> {
  await withOfflinePackageLock(async () => {
    const record = await getOfflineContestRecord(contestStorageId);
    if (!record?.media?.included || record.media.status !== 'complete') return;
    if (record.media.urls.length === 0) return;
    const stored = await mediaUrlsInCache(record.media.urls, overrides);
    if (stored.length === record.media.urls.length) return;
    await saveOfflineContestRecord({
      ...record,
      media: { ...record.media, status: 'partial', updatedAt: Date.now() },
    });
  }, { waitMs: MEDIA_REPAIR_LOCK_WAIT_MS });
}

export { getOfflineContestRecord, listOfflineContestRecords };
