import { availableParallelism } from 'node:os';

export function resolveConcurrency(value = process.env.BUILD_CONCURRENCY) {
  const parsed = Number.parseInt(value ?? '', 10);
  if (Number.isFinite(parsed) && parsed > 0) return Math.min(parsed, 64);
  return Math.min(Math.max(availableParallelism(), 2), 16);
}

export async function mapConcurrent(items, concurrency, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function run() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await worker(items[index], index);
    }
  }

  const workerCount = Math.min(Math.max(concurrency, 1), Math.max(items.length, 1));
  await Promise.all(Array.from({ length: workerCount }, () => run()));
  return results;
}
