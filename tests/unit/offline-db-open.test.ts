import { beforeEach, describe, expect, it, vi } from 'vitest';

const openDB = vi.hoisted(() => vi.fn());

vi.mock('idb', async (importOriginal) => {
  const actual = await importOriginal<typeof import('idb')>();
  return { ...actual, openDB: (...args: unknown[]) => openDB(...args) };
});

describe('openOfflineDb recovery', () => {
  beforeEach(() => {
    vi.resetModules();
    openDB.mockReset();
  });

  it('allows a later open after the first openDB rejects', async () => {
    const database = { close: vi.fn() };
    openDB.mockRejectedValueOnce(new Error('quota')).mockResolvedValueOnce(database);

    const { openOfflineDb } = await import('../../src/lib/offline-db');
    const first = openOfflineDb();
    const concurrent = openOfflineDb();
    await expect(first).rejects.toThrow('quota');
    await expect(concurrent).rejects.toThrow('quota');
    expect(openDB).toHaveBeenCalledTimes(1);

    await expect(openOfflineDb()).resolves.toBe(database);
    expect(openDB).toHaveBeenCalledTimes(2);
  });
});
