import { subscribeDownloadEvents } from './offline-download-events';

export interface OfflineDownloadSnapshot {
  state: 'idle' | 'active' | 'success' | 'failed';
  percent: number | null;
  message: string | null;
}

export type OfflineDownloadSourceEvent =
  | { type: 'started' }
  | { type: 'progress'; percent: number }
  | { type: 'completed' }
  | { type: 'failed'; message?: string }
  | { type: 'background-progress'; percent: number }
  | { type: 'background-result'; ok: boolean }
  | { type: 'idle-timeout' };

export type OfflineDownloadState = OfflineDownloadSnapshot & { sequence?: number };

export const OFFLINE_DOWNLOAD_IDLE_TIMEOUT_MS = 4_000;

export function reduceOfflineDownload(
  state: OfflineDownloadState,
  event: OfflineDownloadSourceEvent,
): OfflineDownloadState {
  switch (event.type) {
    case 'started':
      return { state: 'active', percent: null, message: null };
    case 'progress':
    case 'background-progress':
      if (state.state === 'failed') return state;
      return { state: 'active', percent: event.percent, message: null };
    case 'completed':
      if (state.state === 'failed') return state;
      return { state: 'success', percent: null, message: 'Conteúdo offline atualizado.' };
    case 'failed':
      return { state: 'failed', percent: null, message: event.message ?? 'Falha no download offline.' };
    case 'background-result':
      if (!event.ok) {
        return { state: 'failed', percent: null, message: 'O navegador interrompeu o download offline.' };
      }
      if (state.state === 'idle') {
        return { state: 'success', percent: null, message: 'Conteúdo offline atualizado.' };
      }
      return state;
    case 'idle-timeout':
      return state.state === 'success' ? { state: 'idle', percent: null, message: null } : state;
  }
}

interface ActiveFetchLike {
  id: string;
  downloaded?: number;
  downloadTotal?: number;
  result?: string;
  addEventListener(type: 'progress', listener: () => void): void;
}

interface BackgroundFetchManagerLike {
  getIds?(): Promise<string[]>;
  get?(id: string): Promise<{ id?: string; downloaded?: number; downloadTotal?: number; result?: string; addEventListener(type: 'progress', listener: () => void): void } | undefined>;
}

const BG_ID_PREFIX = 'offline-package-';

function contestIdFromFetchId(id: string): string | null {
  if (!id.startsWith(BG_ID_PREFIX)) return null;
  // Formato: offline-package-<13 dígitos de timestamp>-<storageId>
  const rest = id.slice(BG_ID_PREFIX.length);
  return rest.length > 14 ? rest.slice(14) : null;
}

export function startOfflineDownloadIndicator(
  dispatch: (snapshot: OfflineDownloadSnapshot) => void = () => undefined,
): void {
  // Estado POR concurso: uma falha não mascara o progresso dos outros.
  const perContest = new Map<string, OfflineDownloadState>();
  let idleTimer: ReturnType<typeof setTimeout> | null = null;

  let failureSequence = 0;
  const aggregate = (): OfflineDownloadSnapshot => {
    const entries = [...perContest.values()];
    const active = entries.find((entry) => entry.state === 'active');
    if (active) return { ...active, message: null };
    // Entre falhas concorrentes, a mais recente é a acionável.
    const failed = entries
      .filter((entry) => entry.state === 'failed')
      .sort((left, right) => (right.sequence ?? 0) - (left.sequence ?? 0))[0];
    if (failed) return { ...failed, percent: null };
    const success = entries.find((entry) => entry.state === 'success');
    if (success) return { ...success, percent: null };
    return { state: 'idle', percent: null, message: null };
  };

  const emit = () => dispatch(aggregate());

  const applyFor = (contestStorageId: string, event: OfflineDownloadSourceEvent) => {
      const current = perContest.get(contestStorageId) ?? {
      state: 'idle' as const,
      percent: null,
      message: null,
      sequence: 0,
    };
    const next = reduceOfflineDownload(current, event);
    const isFailure =
      event.type === 'failed' || (event.type === 'background-result' && event.ok === false);
    if (isFailure) failureSequence += 1;
    if (next.state === 'idle') perContest.delete(contestStorageId);
    else perContest.set(contestStorageId, { ...next, sequence: isFailure ? failureSequence : current.sequence ?? 0 });

    if (next.state === 'success') {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        for (const [id, entry] of perContest) {
          if (entry.state === 'success') perContest.delete(id);
        }
        emit();
      }, OFFLINE_DOWNLOAD_IDLE_TIMEOUT_MS);
      window.dispatchEvent(new CustomEvent('concursos:offline-packages-changed'));
    }
    emit();
  };

  // Fonte 1: eventos publicados no canal (página ou Service Worker).
  subscribeDownloadEvents((event) => {
    if (event.type === 'started') applyFor(event.contestStorageId, { type: 'started' });
    else if (event.type === 'progress') {
      applyFor(event.contestStorageId, {
        type: 'progress',
        percent: event.total > 0 ? (event.completed / event.total) * 100 : 0,
      });
    } else if (event.type === 'completed') applyFor(event.contestStorageId, { type: 'completed' });
    else if (event.type === 'failed') {
      applyFor(event.contestStorageId, { type: 'failed', message: event.message });
    }
  });

  // Fonte 2: progresso nativo do Background Fetch — cobre quem abre o app
  // com a transferência já em andamento (o canal pode ter perdido eventos).
  let rescanTimer: ReturnType<typeof setTimeout> | null = null;
  const watchNativeFetches = async () => {
    if (!('serviceWorker' in navigator)) return;
    try {
      const registration = await navigator.serviceWorker.ready;
      const manager = (
        registration as ServiceWorkerRegistration & {
          backgroundFetch?: BackgroundFetchManagerLike;
        }
      ).backgroundFetch;
      if (!manager?.getIds || !manager.get) return;
      const getFn = manager.get;
      const getIdsFn = manager.getIds;
      let foundActive = false;
      const ids = await getIdsFn();
      for (const id of ids) {
        const contestId = contestIdFromFetchId(id);
        if (!contestId) continue;
        const fetch = await getFn(id);
        if (!fetch) continue;
        foundActive = true;
        const reportProgress = () => {
          if (fetch.result === 'success') {
            applyFor(contestId, { type: 'background-result', ok: true });
            return;
          }
          if (fetch.result === 'failure') {
            applyFor(contestId, { type: 'background-result', ok: false });
            return;
          }
          applyFor(contestId, { type: 'started' });
          const total = fetch.downloadTotal ?? 0;
          if (total > 0) {
            applyFor(contestId, {
              type: 'background-progress',
              percent: ((fetch.downloaded ?? 0) / total) * 100,
            });
          }
        };
        reportProgress();
        fetch.addEventListener('progress', reportProgress);
      }
      // Enquanto houver transferência ativa, acompanha periodicamente.
      if (foundActive && !rescanTimer) {
        rescanTimer = setTimeout(() => {
          rescanTimer = null;
          void watchNativeFetches();
        }, 15_000);
      }
    } catch {
      // Indicador é best-effort; falhas aqui nunca afetam o download.
    }
  };

  void watchNativeFetches();
  window.addEventListener('online', () => void watchNativeFetches());
  window.addEventListener('concursos:download-scan', () => void watchNativeFetches());
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') void watchNativeFetches();
  });
}
