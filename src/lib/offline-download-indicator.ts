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

export function startOfflineDownloadIndicator(
  dispatch: (snapshot: OfflineDownloadSnapshot) => void = () => undefined,
): void {
  const perContest = new Map<string, OfflineDownloadState>();
  let idleTimer: ReturnType<typeof setTimeout> | null = null;

  let failureSequence = 0;
  const aggregate = (): OfflineDownloadSnapshot => {
    const entries = [...perContest.values()];
    const active = entries.find((entry) => entry.state === 'active');
    if (active) return { ...active, message: null };
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
}
