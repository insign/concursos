import { describe, expect, it, vi } from 'vitest';
import { flushPendingLocalState } from '../../src/lib/local-durability';
import { bindAnswerWriteDurability } from '../../src/lib/questionnaire-controller';

describe('questionnaire durability flusher', () => {
  it('awaits queued writes before flushPendingLocalState resolves', async () => {
    let release: () => void = () => undefined;
    const pending = new Promise<void>((resolve) => {
      release = resolve;
    });
    const save = vi.fn(() => pending);
    const writes = bindAnswerWriteDurability();
    void writes.enqueue(save);
    await Promise.resolve();
    expect(save).toHaveBeenCalledOnce();

    let flushed = false;
    const flush = flushPendingLocalState().then(() => {
      flushed = true;
    });
    await Promise.resolve();
    expect(flushed).toBe(false);

    release();
    await flush;
    expect(flushed).toBe(true);
  });
});
