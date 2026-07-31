import { whenNavigationWritesSettled } from './navigation-db';
import { whenLocalWritesSettled } from './offline-db';

async function whenAllLocalWritesSettled(): Promise<void> {
  await Promise.all([whenLocalWritesSettled(), whenNavigationWritesSettled()]);
}

export async function runAfterLocalWritesSettled(
  action: () => void | Promise<void>,
  waitForWrites: () => Promise<void> = whenAllLocalWritesSettled,
): Promise<void> {
  await waitForWrites();
  await action();
}

export type PwaErrorPhase = 'registration' | 'durability' | 'activation' | 'reload';

export type PwaStatusPayload =
  | { state: 'idle' }
  | { state: 'update-found' }
  | { state: 'waiting-for-durability' }
  | { state: 'activating' }
  | { state: 'reloading' }
  | {
      state: 'error';
      phase: PwaErrorPhase;
      message: string;
      retryable: boolean;
    };

export type PwaStatusDetail = PwaStatusPayload & { revision?: number };

interface PwaUpdateControllerOptions {
  waitForWrites?: () => Promise<void>;
  activate: () => void | Promise<void>;
  reload: () => void | Promise<void>;
  emit: (detail: PwaStatusDetail) => void;
}

export interface PwaUpdateController {
  requestActivation: () => Promise<void>;
  requestReload: () => Promise<void>;
  reportRegistrationError: (error: unknown) => void;
  retry: () => Promise<void>;
}

function errorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

export function createPwaUpdateController(
  options: PwaUpdateControllerOptions,
): PwaUpdateController {
  const waitForWrites = options.waitForWrites ?? whenAllLocalWritesSettled;
  let activation: Promise<void> | null = null;
  let reload: Promise<void> | null = null;
  let failure: {
    request: 'activation' | 'reload' | 'registration';
    revision: number;
    statusRevision: number;
  } | null = null;
  let failureRevision = 0;
  let lastActivationSucceeded: boolean | null = null;
  let serial = Promise.resolve();
  let statusRevision = 0;

  const emit = (detail: PwaStatusPayload, revision: number) => {
    options.emit({ ...detail, revision });
  };

  const run = (
    request: 'activation' | 'reload',
    requiresActivation: boolean,
    knownFailureRevision: number,
    operationStatusRevision: number,
  ): Promise<void> => {
    let phase: PwaErrorPhase = 'durability';
    return (async () => {
      if (request === 'activation') emit({ state: 'update-found' }, operationStatusRevision);
      if (request === 'activation') lastActivationSucceeded = null;
      if (request === 'reload' && requiresActivation && lastActivationSucceeded !== true) return;
      emit({ state: 'waiting-for-durability' }, operationStatusRevision);
      await waitForWrites();
      phase = request;
      emit({ state: request === 'activation' ? 'activating' : 'reloading' }, operationStatusRevision);
      await (request === 'activation' ? options.activate() : options.reload());
      if (request === 'activation') lastActivationSucceeded = true;
      if (request === 'reload') emit({ state: 'idle' }, operationStatusRevision);
      if (failure && failure.revision <= knownFailureRevision) failure = null;
    })().catch((error) => {
      if (request === 'activation') lastActivationSucceeded = false;
      if (!failure || operationStatusRevision >= failure.statusRevision) {
        failure = {
          request,
          revision: ++failureRevision,
          statusRevision: operationStatusRevision,
        };
      }
      emit({
        state: 'error',
        phase,
        message: errorMessage(error, `Falha durante ${phase}.`),
        retryable: true,
      }, operationStatusRevision);
    });
  };

  const enqueue = (operation: () => Promise<void>): Promise<void> => {
    const queued = serial.then(operation);
    serial = queued;
    return queued;
  };

  const startActivation = (knownFailureRevision = failureRevision): Promise<void> => {
    if (activation) return activation;
    const operationStatusRevision = ++statusRevision;
    const operation = enqueue(() =>
      run('activation', false, knownFailureRevision, operationStatusRevision));
    activation = operation.finally(() => {
      activation = null;
    });
    return activation;
  };

  const startReload = (
    requiresActivation: boolean,
    knownFailureRevision = failureRevision,
  ): Promise<void> => {
    if (reload) return reload;
    const operationStatusRevision = ++statusRevision;
    const operation = enqueue(() =>
      run('reload', requiresActivation, knownFailureRevision, operationStatusRevision));
    reload = operation.finally(() => {
      reload = null;
    });
    return reload;
  };

  const requestActivation = (): Promise<void> => startActivation();

  const requestReload = (): Promise<void> => {
    return startReload(activation !== null);
  };

  return {
    requestActivation,
    requestReload,
    reportRegistrationError(error) {
      const registrationStatusRevision = ++statusRevision;
      failure = {
        request: 'registration',
        revision: ++failureRevision,
        statusRevision: registrationStatusRevision,
      };
      emit({
        state: 'error',
        phase: 'registration',
        message: errorMessage(error, 'Falha ao registrar o aplicativo offline.'),
        retryable: true,
      }, registrationStatusRevision);
    },
    retry() {
      const failed = failure;
      if (failed?.request === 'activation') return startActivation(failed.revision);
      if (failed?.request === 'reload' || failed?.request === 'registration') {
        return startReload(false, failed.revision);
      }
      return Promise.resolve();
    },
  };
}
