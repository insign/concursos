import { describe, expect, it } from 'vitest';
import {
  reduceOfflineDownload,
  type OfflineDownloadState,
} from '../../src/lib/offline-download-indicator';

const idle: OfflineDownloadState = { state: 'idle', percent: null, message: null };

describe('offline download indicator state', () => {
  it('tracks started → progress → success', () => {
    let state = reduceOfflineDownload(idle, { type: 'started' });
    expect(state.state).toBe('active');
    state = reduceOfflineDownload(state, { type: 'background-progress', percent: 55 });
    expect(state.percent).toBe(55);
    state = reduceOfflineDownload(state, { type: 'completed' });
    expect(state.state).toBe('success');
  });

  it('ignores progress after a failure', () => {
    let state = reduceOfflineDownload(idle, {
      type: 'failed',
      message: 'interrompido',
    });
    state = reduceOfflineDownload(state, { type: 'progress', percent: 40 });
    expect(state).toMatchObject({ state: 'failed', message: 'interrompido' });
  });

  it('native success keeps in-flight until adoption confirms, then idle clears the flash', () => {
    let state = reduceOfflineDownload(idle, { type: 'started' });
    state = reduceOfflineDownload(state, { type: 'background-result', ok: true });
    // Aguarda o Service Worker confirmar a adoção antes de celebrar.
    expect(state.state).toBe('active');
    state = reduceOfflineDownload(state, { type: 'completed' });
    expect(state.state).toBe('success');
    state = reduceOfflineDownload(state, { type: 'idle-timeout' });
    expect(state.state).toBe('idle');
  });

  it('clamps nothing here but keeps percent from background events', () => {
    const state = reduceOfflineDownload(idle, { type: 'background-progress', percent: 42.5 });
    expect(state.percent).toBe(42.5);
  });
});
