import { runAfterLocalWritesSettled } from './pwa-update';

const activities = new Set<string>();
let revision = 0;

export function setRuntimeActivity(key: string, active: boolean): void {
  if (activities.has(key) === active) return;
  if (active) activities.add(key);
  else activities.delete(key);
  revision++;
  window.dispatchEvent(new Event('concursos:runtime-activity'));
}

export const getRuntimeActivityRevision = (): number => revision;
export const hasRuntimeActivity = (): boolean => activities.size > 0;

export function waitForRuntimeIdle(): Promise<void> {
  if (!hasRuntimeActivity()) return Promise.resolve();
  return new Promise((resolve) => {
    const check = () => {
      if (hasRuntimeActivity()) return;
      window.removeEventListener('concursos:runtime-activity', check);
      resolve();
    };
    window.addEventListener('concursos:runtime-activity', check);
    check();
  });
}

export async function runAfterRuntimeIdle(action: () => void): Promise<void> {
  while (true) {
    await waitForRuntimeIdle();
    const before = revision;
    await runAfterLocalWritesSettled(() => undefined);
    if (hasRuntimeActivity() || before !== revision) continue;
    action();
    return;
  }
}
