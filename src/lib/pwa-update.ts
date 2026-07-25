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
