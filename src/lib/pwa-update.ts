import { whenLocalWritesSettled } from './offline-db';

export async function runAfterLocalWritesSettled(
  action: () => void | Promise<void>,
  waitForWrites: () => Promise<void> = whenLocalWritesSettled,
): Promise<void> {
  await waitForWrites();
  await action();
}
