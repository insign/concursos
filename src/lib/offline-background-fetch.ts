import {
  adoptStagedPackageUnderLock,
  offlinePackageManifestSchema,
  type OfflinePackageManifest,
} from './offline-packages';
import { SHARED_ASSET_CACHE } from './pwa-cache';
import {
  deleteDownloadJob,
  finishDownloadJob,
  getDownloadJob,
  listDownloadJobs,
  saveDownloadDiagnostic,
  saveDownloadJob,
  type DownloadDiagnosticRecord,
} from './offline-db';
import { publishDownloadEvent } from './offline-download-events';

export interface BackgroundFetchRegistrationLike {
  id: string;
  matchAll(): Promise<ReadonlyArray<{ request: Request; responseReady: Promise<Response> }>>;
  updateUI?(options: { title?: string }): Promise<void>;
}

export function backgroundFetchSupported(registration: unknown): boolean {
  return (
    typeof registration === 'object' &&
    registration !== null &&
    'backgroundFetch' in registration &&
    typeof (registration as { backgroundFetch?: { fetch?: unknown } }).backgroundFetch?.fetch === 'function'
  );
}

const BG_ID_PREFIX = 'offline-package-';

export interface ActivePackageFetch {
  id: string;
  contestStorageId: string;
}

function backgroundFetchManager(registration: unknown): { getActiveFetches: () => Promise<Array<{ id: string }>> } | null {
  if (typeof registration !== 'object' || registration === null) return null;
  const manager = (registration as { backgroundFetch?: { getActiveFetches?: unknown } }).backgroundFetch;
  if (!manager || typeof manager.getActiveFetches !== 'function') return null;
  return manager as { getActiveFetches: () => Promise<Array<{ id: string }>> };
}

/** Transferências em andamento conduzidas pelo navegador para este app. */
export async function getActivePackageFetches(
  registration: unknown,
): Promise<ActivePackageFetch[]> {
  const manager = backgroundFetchManager(registration);
  if (!manager) return [];
  try {
    const fetches = await manager.getActiveFetches();
    return fetches
      .filter((fetch) => fetch.id.startsWith(BG_ID_PREFIX))
      .map((fetch) => {
        // Formato: offline-package-<timestamp 13 dígitos>-<storageId>
        const rest = fetch.id.slice(BG_ID_PREFIX.length);
        return { id: fetch.id, contestStorageId: rest.slice(13 + 1) };
      });
  } catch {
    return [];
  }
}

export async function hasActivePackageDownload(
  registration: unknown,
  storageId: string,
): Promise<boolean> {
  return (await getActivePackageFetches(registration)).some(
    (fetch) => fetch.contestStorageId === storageId,
  );
}

export function buildPackageRequests(manifest: OfflinePackageManifest, origin: string): Request[] {
  const resources = [...new Set([...manifest.routes, ...manifest.assets, ...manifest.sharedAssets])];
  return resources.map((resource) => new Request(`${origin}${resource}`, { credentials: 'same-origin' }));
}

export async function startBackgroundPackageDownload(
  registration: ServiceWorkerRegistration & {
    backgroundFetch?: { fetch(id: string, requests: RequestInfo[], options?: { title?: string; downloadTotal?: number }): Promise<unknown> };
  },
  manifest: OfflinePackageManifest,
): Promise<void> {
  const id = `offline-package-${Date.now()}-${manifest.contestStorageId}`;
  const manager = registration.backgroundFetch;
  if (!manager?.fetch) throw new Error('Background Fetch indisponível neste navegador.');
  await saveDownloadJob({ id, manifest: structuredClone(manifest), createdAt: Date.now() });
  try {
    await manager.fetch(
      id,
      buildPackageRequests(manifest, self.location.origin),
      {
        title: `Conteúdo offline — ${manifest.contestSlug}`,
        downloadTotal: manifest.estimatedBytes ?? 0,
      },
    );
  } catch (error) {
    await deleteDownloadJob(id);
    const raw = error instanceof Error ? error.message : String(error);
    if (/too many active fetches/i.test(raw)) {
      throw new Error(
        'O navegador atingiu o limite de downloads simultâneos deste site. Aguarde alguns instantes e tente novamente.',
      );
    }
    throw error;
  }
}

function stagingCacheName(manifestHash: string, storageId: string): string {
  const suffix = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}`;
  return `contest--${storageId}--${manifestHash}--background--${suffix}`;
}

/**
 * Conclui um Background Fetch bem-sucedido: grava os records no staging
 * (recursos do pacote) e no cache compartilhado (assets globais), promove
 * com a mesma sequência atômica do fluxo em página e publica o evento.
 */
function contestStorageIdFromBgId(id: string): string {
  if (!id.startsWith(BG_ID_PREFIX)) return '';
  const rest = id.slice(BG_ID_PREFIX.length);
  // Formato: <13 dígitos de timestamp>-<storageId>
  return rest.length > 14 ? rest.slice(14) : '';
}

const BG_REASON_MESSAGES: Record<string, string> = {
  'bgf.job-read': 'Não foi possível retomar o download em segundo plano. Tente baixar novamente.',
  'bgf.job-missing': 'O download em segundo plano não pôde ser concluído. Toque em Baixar novamente.',
  'bgf.manifest-invalid': 'O download em segundo plano não pôde ser concluído. Toque em Baixar novamente.',
  'bgf.staging': 'Não foi possível armazenar o conteúdo baixado. Tente novamente.',
  'bgf.adoption': 'Não foi possível concluir o download em segundo plano. Tente baixar novamente.',
  'bgf.browser-failed': 'O navegador interrompeu o download offline.',
  'bgf.reconcile-orphan': 'Um download em segundo plano não foi concluído. Toque em Baixar novamente.',
};

async function recordStep(
  registration: BackgroundFetchRegistrationLike,
  diagnostic: Omit<DownloadDiagnosticRecord, 'id' | 'occurredAt'>,
  message?: string,
): Promise<void> {
  await saveDownloadDiagnostic({
    ...diagnostic,
    id: `${diagnostic.reasonCode}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    occurredAt: Date.now(),
  });
  publishDownloadEvent({
    type: diagnostic.outcome === 'failed' ? 'failed' : 'completed',
    contestStorageId: diagnostic.contestStorageId ?? contestStorageIdFromBgId(registration.id),
    phase: 'download',
    reason: diagnostic.reasonCode,
    ...(diagnostic.outcome === 'failed'
      ? { message: message ?? BG_REASON_MESSAGES[diagnostic.reasonCode] ?? 'Falha no download em segundo plano.' }
      : {}),
  } as never);
}

export async function finalizeSuccessfulBackgroundFetch(
  registration: BackgroundFetchRegistrationLike,
  overrides: { cacheStorage?: CacheStorage } = {},
): Promise<void> {
  const storageIdGuess = contestStorageIdFromBgId(registration.id);

  let job;
  try {
    job = await getDownloadJob(registration.id);
  } catch (error) {
    const errorName = error instanceof Error ? error.name : 'Error';
    await recordStep(
      registration,
      { contestStorageId: storageIdGuess || null, outcome: 'failed', reasonCode: 'bgf.job-read', jobId: registration.id, errorName, errorMessage: String(error) },
    );
    return;
  }

  if (!job) {
    await recordStep(
      registration,
      { contestStorageId: storageIdGuess || null, outcome: 'failed', reasonCode: 'bgf.job-missing', jobId: registration.id },
    );
    return;
  }

  const parsed = offlinePackageManifestSchema.safeParse(job.manifest);
  if (!parsed.success) {
    await recordStep(
      registration,
      { contestStorageId: storageIdGuess || null, outcome: 'failed', reasonCode: 'bgf.manifest-invalid', jobId: registration.id },
    );
    await deleteDownloadJob(registration.id);
    return;
  }

  const manifest = parsed.data;
  const storageId = manifest.contestStorageId;
  publishDownloadEvent({ type: 'started', contestStorageId: storageId, phase: 'download' });

  const cacheStorage = overrides.cacheStorage ?? globalThis.caches;
  const stagingName = stagingCacheName(manifest.manifestHash, storageId);
  const packageResources = new Set([...manifest.routes, ...manifest.assets]);
  let shared: Cache | undefined;
  let staging: Cache | undefined;

  try {
    shared = await cacheStorage.open(SHARED_ASSET_CACHE);
    staging = await cacheStorage.open(stagingName);
    for (const record of await registration.matchAll()) {
      const response = await record.responseReady;
      if (!response || !response.ok || response.type === 'opaque') {
        throw new Error(`Resposta inválida do navegador para ${record.request.url}`);
      }
      const pathname = new URL(record.request.url).pathname;
      if (packageResources.has(pathname)) {
        await staging.put(record.request, response);
      } else {
        await shared.put(record.request, response);
      }
    }

    await adoptStagedPackageUnderLock(manifest, stagingName, { cacheStorage });
    await recordStep(
      registration,
      { contestStorageId: storageId, outcome: 'completed', reasonCode: 'complete', jobId: registration.id, manifestHash: manifest.manifestHash },
      'Conteúdo offline atualizado.',
    );
    try {
      await registration.updateUI?.({ title: 'Conteúdo offline atualizado.' });
    } catch {
      // updateUI é opcional e pode falhar fora da janela do evento.
    }
  } catch (error) {
    const isStaging = !staging;
    const reasonCode = isStaging ? 'bgf.staging' : 'bgf.adoption';
    const errorName = error instanceof Error ? error.name : 'Error';
    await recordStep(
      registration,
      { contestStorageId: storageId, outcome: 'failed', reasonCode, jobId: registration.id, errorName, errorMessage: error instanceof Error ? error.message : String(error) },
    );
  } finally {
    try {
      await finishDownloadJob({
        id: `${storageId}-complete-${Date.now()}`,
        jobId: registration.id,
        contestStorageId: storageId,
        outcome: 'completed',
        reasonCode: 'complete',
        occurredAt: Date.now(),
      });
    } catch {
      try { await deleteDownloadJob(registration.id); } catch { /* job órfão será reconciliado */ }
    }
  }
}

export async function finalizeFailedBackgroundFetch(
  registration: BackgroundFetchRegistrationLike,
): Promise<void> {
  let job;
  try {
    job = await getDownloadJob(registration.id);
  } catch (error) {
    await recordStep(
      registration,
      { contestStorageId: contestStorageIdFromBgId(registration.id) || null, outcome: 'failed', reasonCode: 'bgf.job-read', jobId: registration.id, errorName: error instanceof Error ? error.name : 'Error' },
    );
    return;
  }
  if (!job) {
    await recordStep(
      registration,
      { contestStorageId: contestStorageIdFromBgId(registration.id) || null, outcome: 'failed', reasonCode: 'bgf.browser-failed', jobId: registration.id },
    );
    return;
  }
  const parsed = offlinePackageManifestSchema.safeParse(job.manifest);
  await deleteDownloadJob(registration.id);
  if (!parsed.success) return;
  await recordStep(
    registration,
    { contestStorageId: parsed.data.contestStorageId, outcome: 'failed', reasonCode: 'bgf.browser-failed', jobId: registration.id },
  );
}

const RECONCILE_GRACE_MS = 10 * 60_000;

/**
 * Reconcilia jobs órfãos: conclusões entregues a um Service Worker
 * substituído (sem os listeners atuais) nunca serão recuperadas — publica
 * falha honesta e remove o job para que o usuário possa repetir o download.
 */
export async function reconcileOrphanedPackageJobs(
  registration: unknown,
): Promise<void> {
  try {
    const [jobs, active] = await Promise.all([
      listDownloadJobs(),
      getActivePackageFetches(registration),
    ]);
    if (jobs.length === 0) return;
    const activeIds = new Set(active.map((fetch) => fetch.id));
    for (const job of jobs) {
      if (activeIds.has(job.id)) continue;
      if (Date.now() - job.createdAt < RECONCILE_GRACE_MS) continue;
      const storageId = contestStorageIdFromBgId(job.id);
      await saveDownloadDiagnostic({
        id: `bgf.reconcile-orphan-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        contestStorageId: storageId || null,
        outcome: 'failed',
        reasonCode: 'bgf.reconcile-orphan',
        jobId: job.id,
        occurredAt: Date.now(),
      });
      publishDownloadEvent({
        type: 'failed',
        contestStorageId: storageId,
        phase: 'download',
        reason: 'bgf.reconcile-orphan',
        message: BG_REASON_MESSAGES['bgf.reconcile-orphan'],
      });
      await deleteDownloadJob(job.id);
    }
  } catch {
    // Reconciliação é best-effort.
  }
}
