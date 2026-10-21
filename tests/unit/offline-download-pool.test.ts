import { describe, expect, it } from 'vitest';
import { runConcurrentPool } from '../../src/lib/offline-download-pool';

describe('concurrent download pool', () => {
  it('aborts the remaining items and rethrows the first error', async () => {
    const started: number[] = [];
    await expect(
      runConcurrentPool([1, 2, 3, 4], 2, async (item) => {
        started.push(item);
        if (item === 1) throw new Error('falhou');
        await new Promise((resolve) => setTimeout(resolve, 20));
      }),
    ).rejects.toThrow('falhou');
    expect(started).toContain(1);
  });

  it('keeps going and reports each failure when abortOnError is false', async () => {
    const processed: number[] = [];
    const failures: number[] = [];
    await runConcurrentPool(
      [1, 2, 3, 4],
      2,
      async (item) => {
        processed.push(item);
        if (item % 2 === 1) throw new Error(`falhou ${item}`);
      },
      {
        abortOnError: false,
        onItemError: (_error, item) => failures.push(item),
      },
    );

    expect(processed.sort()).toEqual([1, 2, 3, 4]);
    expect(failures.sort()).toEqual([1, 3]);
  });

  it('does not start more items than the concurrency allows', async () => {
    let inFlight = 0;
    let maxInFlight = 0;
    await runConcurrentPool(
      Array.from({ length: 8 }, (_, index) => index),
      3,
      async () => {
        inFlight += 1;
        maxInFlight = Math.max(maxInFlight, inFlight);
        await new Promise((resolve) => setTimeout(resolve, 5));
        inFlight -= 1;
      },
    );
    expect(maxInFlight).toBeLessThanOrEqual(3);
    expect(maxInFlight).toBeGreaterThan(1);
  });
});
