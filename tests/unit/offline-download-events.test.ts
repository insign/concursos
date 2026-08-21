import { describe, expect, it } from 'vitest';
import {
  DOWNLOAD_EVENTS_CHANNEL,
  publishDownloadEvent,
  subscribeDownloadEvents,
} from '../../src/lib/offline-download-events';

describe('offline download events', () => {
  it('delivers published events to subscribers', async () => {
    const received: unknown[] = [];
    const unsubscribe = subscribeDownloadEvents((event) => received.push(event));

    publishDownloadEvent({ type: 'started', contestStorageId: 'exemplo', phase: 'update' });
    publishDownloadEvent({
      type: 'progress',
      contestStorageId: 'exemplo',
      phase: 'update',
      completed: 2,
      total: 9,
      downloadedBytes: 128,
    });
    await new Promise((resolve) => setTimeout(resolve, 50));
    unsubscribe();

    expect(received).toEqual([
      { type: 'started', contestStorageId: 'exemplo', phase: 'update' },
      { type: 'progress', contestStorageId: 'exemplo', phase: 'update', completed: 2, total: 9, downloadedBytes: 128 },
    ]);
    expect(DOWNLOAD_EVENTS_CHANNEL).toBe('concursos-offline-downloads');
  });

  it('stops delivering after unsubscribe and tolerates publish without subscribers', async () => {
    const unsubscribe = subscribeDownloadEvents(() => undefined);
    unsubscribe();
    expect(() =>
      publishDownloadEvent({ type: 'completed', contestStorageId: 'outro', phase: 'download' }),
    ).not.toThrow();
  });
});
