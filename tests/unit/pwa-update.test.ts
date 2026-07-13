import { describe, expect, it, vi } from 'vitest';
import { runAfterLocalWritesSettled } from '../../src/lib/pwa-update';

describe('PWA updates', () => {
  it('waits for local writes before activating a waiting worker', async () => {
    let releaseWrites: () => void = () => undefined;
    const writesSettled = new Promise<void>((resolve) => {
      releaseWrites = resolve;
    });
    const action = vi.fn();
    const update = runAfterLocalWritesSettled(action, () => writesSettled);

    await Promise.resolve();
    expect(action).not.toHaveBeenCalled();
    releaseWrites();
    await update;
    expect(action).toHaveBeenCalledOnce();
  });

  it('does not reload when waiting for durability fails', async () => {
    const action = vi.fn();
    await expect(
      runAfterLocalWritesSettled(action, () => Promise.reject(new Error('write failed'))),
    ).rejects.toThrow('write failed');
    expect(action).not.toHaveBeenCalled();
  });
});
