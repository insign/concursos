export interface PwaUpdateCheckRegistration {
  update(): Promise<unknown>;
}

export interface PwaUpdateCheckSchedulerOptions {
  getRegistration: () => PwaUpdateCheckRegistration | undefined | null;
  isOnline?: () => boolean;
  isVisible?: () => boolean;
  now?: () => number;
  minIntervalMs?: number;
  intervalMs?: number;
  setInterval?: (callback: () => void, ms: number) => unknown;
  clearInterval?: (handle: unknown) => void;
  subscribe?: (target: 'document' | 'window', type: string, listener: () => void) => () => void;
}

export interface PwaUpdateCheckScheduler {
  check(): Promise<void>;
  start(): void;
  stop(): void;
}

const DEFAULT_MIN_INTERVAL_MS = 15 * 60 * 1000;
const DEFAULT_INTERVAL_MS = 60 * 60 * 1000;
// Cooldown curto pós-falha: evita rajadas de retry sem travar a janela cheia.
const FAILURE_COOLDOWN_MS = 60 * 1000;

export function createPwaUpdateCheckScheduler(
  options: PwaUpdateCheckSchedulerOptions,
): PwaUpdateCheckScheduler {
  const isOnline =
    options.isOnline ?? (() => typeof navigator === 'undefined' || navigator.onLine !== false);
  const isVisible =
    options.isVisible ??
    (() => typeof document === 'undefined' || document.visibilityState === 'visible');
  const now = options.now ?? (() => Date.now());
  const minIntervalMs = options.minIntervalMs ?? DEFAULT_MIN_INTERVAL_MS;
  const intervalMs = options.intervalMs ?? DEFAULT_INTERVAL_MS;
  const schedule = options.setInterval ?? ((callback, ms) => setInterval(callback, ms));
  const unschedule =
    options.clearInterval ?? ((handle) => clearInterval(handle as ReturnType<typeof setInterval>));
  const subscribe = options.subscribe;

  let lastCheck = Number.NEGATIVE_INFINITY;
  let lastFailure = Number.NEGATIVE_INFINITY;
  let inFlight: Promise<void> | null = null;
  let timer: unknown = null;
  let detach: Array<() => void> = [];

  const check = async (): Promise<void> => {
    if (inFlight) {
      await inFlight;
      return;
    }
    if (!isOnline() || !isVisible()) return;
    const registration = options.getRegistration();
    if (!registration) return;
    if (now() - lastCheck < minIntervalMs) return;
    if (now() - lastFailure < FAILURE_COOLDOWN_MS) return;
    const pending = (async (): Promise<void> => {
      try {
        await registration.update();
        // Só conta para o throttle o check que realmente consultou.
        lastCheck = now();
      } catch {
        // Check best-effort; o próximo gatilho tenta de novo após o cooldown.
        lastFailure = now();
      }
    })();
    inFlight = pending;
    try {
      await pending;
    } finally {
      if (inFlight === pending) inFlight = null;
    }
  };

  const onVisible = (): void => {
    if (isVisible()) void check();
  };
  const onOnline = (): void => {
    void check();
  };

  return {
    check,
    start() {
      if (timer !== null || detach.length > 0) return;
      if (subscribe) {
        detach = [
          subscribe('document', 'visibilitychange', onVisible),
          subscribe('window', 'focus', onVisible),
          subscribe('window', 'online', onOnline),
        ];
      } else if (typeof document !== 'undefined' && typeof window !== 'undefined') {
        document.addEventListener('visibilitychange', onVisible);
        window.addEventListener('focus', onVisible);
        window.addEventListener('online', onOnline);
        detach = [
          () => document.removeEventListener('visibilitychange', onVisible),
          () => window.removeEventListener('focus', onVisible),
          () => window.removeEventListener('online', onOnline),
        ];
      }
      timer = schedule(() => void check(), intervalMs);
    },
    stop() {
      if (timer !== null) {
        try {
          unschedule(timer);
        } catch {
          // Timer best-effort; nunca bloqueia a parada.
        }
        timer = null;
      }
      for (const remove of detach) {
        try {
          remove();
        } catch {
          // Remoção best-effort; nunca bloqueia a parada.
        }
      }
      detach = [];
    },
  };
}
