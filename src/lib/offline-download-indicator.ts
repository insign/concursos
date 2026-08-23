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

export type OfflineDownloadState = OfflineDownloadSnapshot;
type OfflineDownloadStatus = OfflineDownloadSnapshot['state'];

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
  getActiveFetches?(): Promise<ActiveFetchLike[]>;
}

const BG_ID_PREFIX = 'offline-package-';

export function startOfflineDownloadIndicator(
  dispatch: (snapshot: OfflineDownloadSnapshot) => void = () => undefined,
): void {
  let state: OfflineDownloadState = { state: 'idle', percent: null, message: null };
  let idleTimer: ReturnType<typeof setTimeout> | null = null;

  const apply = (event: OfflineDownloadSourceEvent) => {
    const next = reduceOfflineDownload(state, event);
    if (next.state === state.state && next.percent === state.percent) return;
    state = next;
    if (state.state === 'success') {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => apply({ type: 'idle-timeout' }), OFFLINE_DOWNLOAD_IDLE_TIMEOUT_MS);
      window.dispatchEvent(new CustomEvent('concursos:offline-packages-changed'));
    }
    dispatch({ ...state });
  };

  // Fonte 1: eventos publicados no canal (página ou Service Worker).
  subscribeDownloadEvents((event) => {
    if (event.type === 'started') apply({ type: 'started' });
    else if (event.type === 'progress') {
      apply({
        type: 'progress',
        percent: event.total > 0 ? (event.completed / event.total) * 100 : 0,
      });
    } else if (event.type === 'completed') apply({ type: 'completed' });
    else if (event.type === 'failed') apply({ type: 'failed', message: event.message });
  });

  // Fonte 2: progresso nativo do Background Fetch — cobre quem abre o app
  // com a transferência já em andamento (o canal pode ter perdido eventos).
  const watchNativeFetches = async () => {
    if (!('serviceWorker' in navigator)) return;
    try {
      const registration = await navigator.serviceWorker.ready;
      const manager = (
        registration as ServiceWorkerRegistration & {
          backgroundFetch?: BackgroundFetchManagerLike;
        }
      ).backgroundFetch;
      if (!manager?.getActiveFetches) return;
      for (const fetch of await manager.getActiveFetches()) {
        if (!fetch.id.startsWith(BG_ID_PREFIX)) continue;
        const reportProgress = () => {
          if (fetch.result === 'success') {
            apply({ type: 'background-result', ok: true });
            return;
          }
          if (fetch.result === 'failure') {
            apply({ type: 'background-result', ok: false });
            return;
          }
          if (state.status !== 'active') apply({ type: 'started' });
          const total = fetch.downloadTotal ?? 0;
          if (total > 0) {
            apply({
              type: 'background-progress',
              percent: ((fetch.downloaded ?? 0) / total) * 100,
            });
          }
        };
        reportProgress();
        fetch.addEventListener('progress', reportProgress);
      }
    } catch {
      // Indicador é best-effort; falhas aqui nunca afetam o download.
    }
  };

  void watchNativeFetches();
  window.addEventListener('online', () => void watchNativeFetches());
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') void watchNativeFetches();
  });
}
