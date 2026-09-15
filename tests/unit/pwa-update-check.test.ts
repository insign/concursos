import { describe, expect, it, vi } from 'vitest';
import { createPwaUpdateCheckScheduler } from '../../src/lib/pwa-update-check';

function controllableUpdate() {
  let calls = 0;
  let release: () => void = () => undefined;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  return {
    get calls() {
      return calls;
    },
    update: vi.fn(async () => {
      calls += 1;
      await gate;
    }),
    release,
  };
}

describe('PWA update check scheduler', () => {
  it('checks once and skips while a check is in flight', async () => {
    const registration = controllableUpdate();
    const scheduler = createPwaUpdateCheckScheduler({
      getRegistration: () => registration,
      minIntervalMs: 0,
    });

    const first = scheduler.check();
    const second = scheduler.check();
    await Promise.resolve();
    expect(registration.calls).toBe(1);

    registration.release();
    await Promise.all([first, second]);
    expect(registration.calls).toBe(1);
  });

  it('throttles checks inside the minimum interval', async () => {
    let now = 1_000;
    const update = vi.fn(async () => undefined);
    const scheduler = createPwaUpdateCheckScheduler({
      getRegistration: () => ({ update }),
      now: () => now,
      minIntervalMs: 15 * 60 * 1000,
    });

    await scheduler.check();
    now += 60 * 1000;
    await scheduler.check();
    expect(update).toHaveBeenCalledOnce();

    now += 15 * 60 * 1000;
    await scheduler.check();
    expect(update).toHaveBeenCalledTimes(2);
  });

  it('skips when offline, hidden or without registration', async () => {
    const update = vi.fn(async () => undefined);
    const registration = { update };

    const offline = createPwaUpdateCheckScheduler({
      getRegistration: () => registration,
      isOnline: () => false,
      minIntervalMs: 0,
    });
    await offline.check();

    const hidden = createPwaUpdateCheckScheduler({
      getRegistration: () => registration,
      isVisible: () => false,
      minIntervalMs: 0,
    });
    await hidden.check();

    const missing = createPwaUpdateCheckScheduler({
      getRegistration: () => undefined,
      minIntervalMs: 0,
    });
    await missing.check();

    expect(update).not.toHaveBeenCalled();
  });

  it('swallows update rejections without throwing', async () => {
    const scheduler = createPwaUpdateCheckScheduler({
      getRegistration: () => ({ update: () => Promise.reject(new Error('rede caiu')) }),
      minIntervalMs: 0,
    });

    await expect(scheduler.check()).resolves.toBeUndefined();
  });

  it('does not consume the throttle window on a failed check', async () => {
    let now = 1_000;
    let calls = 0;
    const scheduler = createPwaUpdateCheckScheduler({
      getRegistration: () => ({
        update: () => {
          calls += 1;
          return calls === 1
            ? Promise.reject(new Error('rede caiu'))
            : Promise.resolve(undefined);
        },
      }),
      now: () => now,
      minIntervalMs: 15 * 60 * 1000,
    });

    await scheduler.check();
    now += 61 * 1000;
    await scheduler.check();
    expect(calls).toBe(2);
  });

  it('cools down rapid retries after a failure', async () => {
    let now = 1_000;
    let calls = 0;
    const scheduler = createPwaUpdateCheckScheduler({
      getRegistration: () => ({
        update: () => {
          calls += 1;
          return Promise.reject(new Error('rede caiu'));
        },
      }),
      now: () => now,
      minIntervalMs: 15 * 60 * 1000,
    });

    await scheduler.check();
    now += 10 * 1000;
    await scheduler.check();
    expect(calls).toBe(1);

    now += 61 * 1000;
    await scheduler.check();
    expect(calls).toBe(2);
  });

  it('invokes checks through the subscribed visibility listener', async () => {
    const listeners = new Map<string, () => void>();
    const update = vi.fn(async () => undefined);
    const scheduler = createPwaUpdateCheckScheduler({
      getRegistration: () => ({ update }),
      minIntervalMs: 0,
      subscribe: (_target, type, listener) => {
        listeners.set(type, listener);
        return () => {
          listeners.delete(type);
        };
      },
    });

    scheduler.start();
    listeners.get('visibilitychange')?.();
    await Promise.resolve();
    await Promise.resolve();
    expect(update).toHaveBeenCalledOnce();
    scheduler.stop();
  });

  it('subscribes on start and cleans up on stop', async () => {
    const subscriptions: Array<{ target: string; type: string }> = [];
    const unsubscribed: Array<{ target: string; type: string }> = [];
    const timers: Array<() => void> = [];
    const cleared: unknown[] = [];
    const update = vi.fn(async () => undefined);
    const scheduler = createPwaUpdateCheckScheduler({
      getRegistration: () => ({ update }),
      minIntervalMs: 0,
      intervalMs: 1_000,
      setInterval: (callback) => {
        timers.push(callback);
        return timers.length;
      },
      clearInterval: (handle) => {
        cleared.push(handle);
      },
      subscribe: (target, type, listener) => {
        subscriptions.push({ target, type });
        return () => {
          unsubscribed.push({ target, type });
          listener;
        };
      },
    });

    scheduler.start();
    scheduler.start();
    expect(subscriptions).toEqual([
      { target: 'document', type: 'visibilitychange' },
      { target: 'window', type: 'focus' },
      { target: 'window', type: 'online' },
    ]);
    expect(timers).toHaveLength(1);

    timers[0]?.();
    await Promise.resolve();
    await Promise.resolve();
    expect(update).toHaveBeenCalledOnce();

    scheduler.stop();
    expect(cleared).toEqual([1]);
    expect(unsubscribed).toHaveLength(3);
  });
});
