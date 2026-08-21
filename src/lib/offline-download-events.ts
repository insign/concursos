export const DOWNLOAD_EVENTS_CHANNEL = 'concursos-offline-downloads';

export type DownloadPhase = 'download' | 'update';

export type DownloadEvent =
  | { type: 'started'; contestStorageId: string; phase: DownloadPhase }
  | { type: 'progress'; contestStorageId: string; phase: DownloadPhase; completed: number; total: number; downloadedBytes: number }
  | { type: 'completed'; contestStorageId: string; phase: DownloadPhase }
  | { type: 'failed'; contestStorageId: string; phase: DownloadPhase; message: string };

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

export function subscribeDownloadEvents(handler: Publish): () => void {
  // Instância própria: BroadcastChannel não entrega mensagens ao próprio
  // emissor, e o emissor deste contexto usa o singleton de publicação.
  if (typeof BroadcastChannel === 'undefined') return () => undefined;
  const bus = new BroadcastChannel(DOWNLOAD_EVENTS_CHANNEL);
  const listener = (event: MessageEvent) => {
    const data = event.data as DownloadEvent | null | undefined;
    if (!data || typeof data !== 'object' || typeof data.type !== 'string') return;
    handler(data);
  };
  bus.addEventListener('message', listener);
  return () => {
    bus.removeEventListener('message', listener);
    bus.close();
  };
}
