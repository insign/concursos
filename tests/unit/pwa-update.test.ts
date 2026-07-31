import { describe, expect, it, vi } from 'vitest';
import {
  createPwaUpdateController,
  runAfterLocalWritesSettled,
  type PwaStatusDetail,
} from '../../src/lib/pwa-update';

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

  it('emits the activation lifecycle and deduplicates refresh callbacks', async () => {
    let releaseWrites: () => void = () => undefined;
    const writesSettled = new Promise<void>((resolve) => {
      releaseWrites = resolve;
    });
    const activate = vi.fn(async () => undefined);
    const events: PwaStatusDetail[] = [];
    const controller = createPwaUpdateController({
      waitForWrites: () => writesSettled,
      activate,
      reload: vi.fn(),
      emit: (detail) => events.push(detail),
    });

    const first = controller.requestActivation();
    const duplicate = controller.requestActivation();
    await Promise.resolve();
    expect(activate).not.toHaveBeenCalled();
    expect(events).toEqual([
      { state: 'update-found', revision: 1 },
      { state: 'waiting-for-durability', revision: 1 },
    ]);

    releaseWrites();
    await Promise.all([first, duplicate]);
    expect(activate).toHaveBeenCalledOnce();
    expect(events.at(-1)).toEqual({ state: 'activating', revision: 1 });
  });

  it('serializes reload behind activation and waits for durability again', async () => {
    let releaseActivation: () => void = () => undefined;
    const activationDone = new Promise<void>((resolve) => {
      releaseActivation = resolve;
    });
    const waitForWrites = vi.fn(async () => undefined);
    const reload = vi.fn();
    const events: PwaStatusDetail[] = [];
    const controller = createPwaUpdateController({
      waitForWrites,
      activate: () => activationDone,
      reload,
      emit: (detail) => events.push(detail),
    });

    const activation = controller.requestActivation();
    const reloading = controller.requestReload();
    await Promise.resolve();
    expect(reload).not.toHaveBeenCalled();

    releaseActivation();
    await Promise.all([activation, reloading]);
    expect(waitForWrites).toHaveBeenCalledTimes(2);
    expect(reload).toHaveBeenCalledOnce();
    expect(events.slice(-3)).toEqual([
      { state: 'waiting-for-durability', revision: 2 },
      { state: 'reloading', revision: 2 },
      { state: 'idle', revision: 2 },
    ]);
  });

  it('serializes activation behind an already pending reload', async () => {
    let releaseWrites: () => void = () => undefined;
    const firstWrites = new Promise<void>((resolve) => {
      releaseWrites = resolve;
    });
    const waitForWrites = vi.fn()
      .mockReturnValueOnce(firstWrites)
      .mockResolvedValue(undefined);
    const order: string[] = [];
    const controller = createPwaUpdateController({
      waitForWrites,
      activate: () => {
        order.push('activate');
      },
      reload: () => {
        order.push('reload');
      },
      emit: vi.fn(),
    });

    const reloading = controller.requestReload();
    const activation = controller.requestActivation();
    await Promise.resolve();
    expect(order).toEqual([]);

    releaseWrites();
    await Promise.all([reloading, activation]);
    expect(order).toEqual(['reload', 'activate']);
  });

  it('reports durability failures, skips activation and retries the failed request', async () => {
    const waitForWrites = vi.fn()
      .mockRejectedValueOnce(new Error('gravação pendente'))
      .mockResolvedValue(undefined);
    const activate = vi.fn(async () => undefined);
    const events: PwaStatusDetail[] = [];
    const controller = createPwaUpdateController({
      waitForWrites,
      activate,
      reload: vi.fn(),
      emit: (detail) => events.push(detail),
    });

    await controller.requestActivation();
    expect(activate).not.toHaveBeenCalled();
    expect(events.at(-1)).toEqual({
      state: 'error',
      phase: 'durability',
      message: 'gravação pendente',
      retryable: true,
      revision: 1,
    });

    await controller.retry();
    expect(activate).toHaveBeenCalledOnce();
    expect(events.at(-1)).toEqual({ state: 'activating', revision: 2 });
  });

  it('does not reload when a queued activation fails', async () => {
    const reload = vi.fn();
    const controller = createPwaUpdateController({
      waitForWrites: async () => undefined,
      activate: () => Promise.reject(new Error('ativação falhou')),
      reload,
      emit: vi.fn(),
    });

    const activation = controller.requestActivation();
    const reloading = controller.requestReload();
    await Promise.all([activation, reloading]);
    expect(reload).not.toHaveBeenCalled();
  });

  it('retries registration failures through a durability-safe reload', async () => {
    const events: PwaStatusDetail[] = [];
    const reload = vi.fn();
    const controller = createPwaUpdateController({
      waitForWrites: async () => undefined,
      activate: vi.fn(),
      reload,
      emit: (detail) => events.push(detail),
    });

    controller.reportRegistrationError(new Error('registro indisponível'));
    expect(events).toEqual([{
      state: 'error',
      phase: 'registration',
      message: 'registro indisponível',
      retryable: true,
      revision: 1,
    }]);

    await controller.retry();
    expect(reload).toHaveBeenCalledOnce();
    expect(events.at(-1)).toEqual({ state: 'idle', revision: 2 });
  });

  it('does not let an older activation success erase a registration failure', async () => {
    let releaseActivation: () => void = () => undefined;
    const activationDone = new Promise<void>((resolve) => {
      releaseActivation = resolve;
    });
    const reload = vi.fn();
    const events: PwaStatusDetail[] = [];
    const controller = createPwaUpdateController({
      waitForWrites: async () => undefined,
      activate: () => activationDone,
      reload,
      emit: (detail) => events.push(detail),
    });

    const activation = controller.requestActivation();
    await Promise.resolve();
    controller.reportRegistrationError(new Error('registro falhou'));
    releaseActivation();
    await activation;

    await controller.retry();
    expect(reload).toHaveBeenCalledOnce();
    expect(events).toContainEqual({
      state: 'error',
      phase: 'registration',
      message: 'registro falhou',
      retryable: true,
      revision: 2,
    });
  });

  it('does not let an older activation failure replace registration recovery', async () => {
    let rejectActivation: (error: Error) => void = () => undefined;
    const activationDone = new Promise<void>((_resolve, reject) => {
      rejectActivation = reject;
    });
    const activate = vi.fn(() => activationDone);
    const reload = vi.fn();
    const controller = createPwaUpdateController({
      waitForWrites: async () => undefined,
      activate,
      reload,
      emit: vi.fn(),
    });

    const activation = controller.requestActivation();
    await Promise.resolve();
    controller.reportRegistrationError(new Error('registro falhou'));
    rejectActivation(new Error('ativação antiga falhou'));
    await activation;

    await controller.retry();
    expect(activate).toHaveBeenCalledOnce();
    expect(reload).toHaveBeenCalledOnce();
  });
});
