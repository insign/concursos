import { describe, expect, it, vi } from 'vitest';
import {
  DOWNLOAD_EVENTS_CHANNEL,
  publishDownloadEvent,
  subscribeDownloadEvents,
} from '../../src/lib/offline-download-events';

describe('offline download events', () => {
  it('replays an active job after remount without BroadcastChannel and drops terminal snapshots', async () => {
    vi.resetModules();
    vi.stubGlobal('BroadcastChannel', undefined);
    try {
      const events = await import('../../src/lib/offline-download-events');
      events.publishDownloadEvent({ type: 'progress', contestStorageId: 'remount', phase: 'media', completed: 0, total: 2, downloadedBytes: 100 });
      const received: string[] = [];
      const unsubscribe = events.subscribeDownloadEvents((event) => received.push(event.type));
      expect(received).toEqual(['progress']);
      events.publishDownloadEvent({ type: 'completed', contestStorageId: 'remount', phase: 'media' });
      expect(received).toEqual(['progress', 'completed']);
      unsubscribe();
      const fresh = vi.fn();
      events.subscribeDownloadEvents(fresh)();
      expect(fresh).not.toHaveBeenCalled();
    } finally {
      vi.unstubAllGlobals();
    }
  });
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
