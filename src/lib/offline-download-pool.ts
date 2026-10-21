/**
 * Pool de downloads concorrentes e politica de concorrencia adaptativa.
 *
 * O nivel de paralelismo e uma decisao de produto ja vigente: quanto mais
 * rapida a conexao e mais recursos o aparelho tem, mais transferencias
 * simultaneas. O mesmo pool serve ao pacote do concurso e as midias, para
 * que a politica nao se bifurque.
 */

export const ADAPTIVE_CONCURRENCY_MIN = 2;
export const ADAPTIVE_CONCURRENCY_DEFAULT = 12;
export const ADAPTIVE_CONCURRENCY_MAX = 15;

export interface AdaptiveHints {
  effectiveType?: string;
  type?: string;
  deviceMemory?: number;
  hardwareConcurrency?: number;
}

export function readAdaptiveHints(): AdaptiveHints {
  if (typeof navigator === 'undefined') return {};
  const nav = navigator as unknown as {
    connection?: { effectiveType?: string; type?: string };
    deviceMemory?: number;
    hardwareConcurrency?: number;
  };
  const hints: AdaptiveHints = {};
  if (nav.connection) {
    if (typeof nav.connection.effectiveType === 'string') hints.effectiveType = nav.connection.effectiveType;
    if (typeof nav.connection.type === 'string') hints.type = nav.connection.type;
  }
  if (typeof nav.deviceMemory === 'number' && Number.isFinite(nav.deviceMemory)) hints.deviceMemory = nav.deviceMemory;
  if (typeof nav.hardwareConcurrency === 'number' && Number.isFinite(nav.hardwareConcurrency)) hints.hardwareConcurrency = nav.hardwareConcurrency;
  return hints;
}

export function resolveAdaptiveConcurrency(hints: AdaptiveHints = readAdaptiveHints()): number {
  const et = hints.effectiveType;
  const type = hints.type;
  const isWifi = type === 'wifi';
  const isFast = et === '4g' || isWifi;
  if (et === 'slow-2g' || et === '2g') return 2;
  if (et === '3g') return 4;
  if (isWifi && hints.deviceMemory !== undefined && hints.deviceMemory >= 8 && hints.hardwareConcurrency !== undefined && hints.hardwareConcurrency >= 8) return 15;
  if (isWifi && hints.deviceMemory !== undefined && hints.deviceMemory >= 4 && hints.hardwareConcurrency !== undefined && hints.hardwareConcurrency >= 4) return 12;
  if (isFast) return 12;
  if (hints.effectiveType === undefined && hints.type === undefined) {
    if ((hints.deviceMemory !== undefined && hints.deviceMemory >= 4) || (hints.hardwareConcurrency !== undefined && hints.hardwareConcurrency >= 4)) return 12;
  }
  return 4;
}

/**
 * Executa `worker` sobre `items` com no maximo `concurrency` tarefas em voo.
 * O primeiro erro aborta as demais e e re-lancado ao final.
 */
export async function runConcurrentPool<T>(
  items: readonly T[],
  concurrency: number,
  worker: (item: T, signal: AbortSignal | undefined) => Promise<void>,
): Promise<void> {
  if (items.length === 0) return;
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const signal = controller?.signal;
  const poolSize = Math.max(1, Math.min(concurrency, items.length));
  // nextIndex++ é atômico no JS single-thread: incremento síncrono antes de qualquer await distribui sem duplicação
  let nextIndex = 0;
  let firstError: unknown = null;
  let hasError = false;
  const runners = Array.from({ length: poolSize }, async () => {
    while (true) {
      if (signal?.aborted) break;
      if (hasError) break;
      const index = nextIndex++;
      if (index >= items.length) break;
      const item = items[index]!;
      try {
        await worker(item, signal);
      } catch (error) {
        if (!hasError) {
          hasError = true;
          firstError = error;
          try {
            controller?.abort();
          } catch {}
        }
        break;
      }
    }
  });
  await Promise.all(runners);
  if (hasError) throw firstError;
}
