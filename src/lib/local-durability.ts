export type LocalStateFlusher = () => void | Promise<void>;

const flushers = new Set<LocalStateFlusher>();
let localStateRevision = 0;

export function markLocalStatePending(): void {
  localStateRevision += 1;
}

export function getLocalStateRevision(): number {
  return localStateRevision;
}

export function registerLocalStateFlusher(flusher: LocalStateFlusher): () => void {
  flushers.add(flusher);
  return () => flushers.delete(flusher);
}

export async function flushPendingLocalState(): Promise<void> {
  const results = await Promise.allSettled([...flushers].map((flush) => flush()));
  const failure = results.find((result): result is PromiseRejectedResult => result.status === 'rejected');
  if (failure) throw failure.reason;
}
