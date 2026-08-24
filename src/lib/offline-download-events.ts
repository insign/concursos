export const DOWNLOAD_EVENTS_CHANNEL = 'concursos-offline-downloads';

export type DownloadPhase = 'download' | 'update';

export type DownloadEvent =
  | { type: 'started'; contestStorageId: string; phase: DownloadPhase }
  | { type: 'progress'; contestStorageId: string; phase: DownloadPhase; completed: number; total: number; downloadedBytes: number }
  | { type: 'completed'; contestStorageId: string; phase: DownloadPhase; reason?: string }
  | { type: 'failed'; contestStorageId: string; phase: DownloadPhase; message: string; reason?: string };

type Publish = (payload: DownloadEvent) => void;

let publisher: BroadcastChannel | null = null;

function channel(): BroadcastChannel | null {
  if (publisher) return publisher;
  if (typeof BroadcastChannel === 'undefined') return null;
  try {
    publisher = new BroadcastChannel(DOWNLOAD_EVENTS_CHANNEL);
    return publisher;
  } catch {
    return null;
  }
}

export function publishDownloadEvent(payload: DownloadEvent): void {
  try {
    channel()?.postMessage(payload);
  } catch {
    // Progresso é best-effort: falha de canal nunca interrompe o download.
  }
}

const PHASES: readonly DownloadPhase[] = ['download', 'update'];
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
  // Instância própria: BroadcastChannel não entrega mensagens ao próprio
  // emissor, e o emissor deste contexto usa o singleton de publicação.
  if (typeof BroadcastChannel === 'undefined') return () => undefined;
  const bus = new BroadcastChannel(DOWNLOAD_EVENTS_CHANNEL);
  const listener = (event: MessageEvent) => {
    const data = event.data as unknown;
    if (!isDownloadEvent(data)) return;
    handler(data);
  };
  bus.addEventListener('message', listener);
  return () => {
    bus.removeEventListener('message', listener);
    bus.close();
  };
}
