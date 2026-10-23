export const DOWNLOAD_EVENTS_CHANNEL = 'concursos-offline-downloads';

export type DownloadPhase = 'download' | 'update' | 'media';

export type DownloadEvent =
  | { type: 'started'; contestStorageId: string; phase: DownloadPhase }
  | { type: 'progress'; contestStorageId: string; phase: DownloadPhase; completed: number; total: number; downloadedBytes: number; totalBytes?: number }
  | { type: 'completed'; contestStorageId: string; phase: DownloadPhase; reason?: string }
  | { type: 'failed'; contestStorageId: string; phase: DownloadPhase; message: string; reason?: string };

type Publish = (payload: DownloadEvent) => void;

let publisher: BroadcastChannel | null = null;
const listeners = new Set<Publish>();
const latest = new Map<string, DownloadEvent>();

function deliver(payload: DownloadEvent): void {
  if (payload.type === 'started' || payload.type === 'progress') latest.set(payload.contestStorageId, payload);
  else latest.delete(payload.contestStorageId);
  for (const listener of listeners) {
    try { listener(payload); } catch { /* A interface não governa a transferência. */ }
  }
}

function channel(): BroadcastChannel | null {
  if (publisher) return publisher;
  if (typeof BroadcastChannel === 'undefined') return null;
  try {
    publisher = new BroadcastChannel(DOWNLOAD_EVENTS_CHANNEL);
    publisher.addEventListener('message', (event: MessageEvent<unknown>) => {
      if (isDownloadEvent(event.data)) deliver(event.data);
    });
    return publisher;
  } catch {
    return null;
  }
}

export function publishDownloadEvent(payload: DownloadEvent): void {
  deliver(payload);
  try {
    channel()?.postMessage(payload);
  } catch {
    // Progresso é best-effort: falha de canal nunca interrompe o download.
  }
}

const PHASES: readonly DownloadPhase[] = ['download', 'update', 'media'];
const EVENT_TYPES: readonly DownloadEvent['type'][] = ['started', 'progress', 'completed', 'failed'];

function isDownloadEvent(data: unknown): data is DownloadEvent {
  if (!data || typeof data !== 'object') return false;
  const candidate = data as Partial<DownloadEvent>;
  if (typeof candidate.contestStorageId !== 'string') return false;
  if (!PHASES.includes(candidate.phase as DownloadPhase)) return false;
  if (!EVENT_TYPES.includes(candidate.type as DownloadEvent['type'])) return false;
  if (candidate.type === 'progress') {
    return (
      typeof candidate.completed === 'number' &&
      typeof candidate.total === 'number' &&
      typeof candidate.downloadedBytes === 'number'
    );
  }
  if (candidate.type === 'failed') return typeof candidate.message === 'string';
  return true;
}

export function subscribeDownloadEvents(handler: Publish): () => void {
  channel();
  listeners.add(handler);
  for (const event of latest.values()) handler(event);
  return () => { listeners.delete(handler); };
}
