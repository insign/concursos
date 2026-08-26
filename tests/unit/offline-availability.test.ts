import { describe, expect, it } from 'vitest';
import { evaluateOfflineAvailability } from '../../src/lib/offline-availability';

describe('evaluateOfflineAvailability', () => {
  it('reports not-downloaded when no record and no failure', () => {
    expect(evaluateOfflineAvailability({ hasRecord: false, cachePresent: false })).toEqual({ status: 'not-downloaded' });
  });

  it('reports retry-advice when orphan job without transfer', () => {
    expect(evaluateOfflineAvailability({ hasRecord: false, cachePresent: false, orphanJobWithoutTransfer: true })).toEqual({
      status: 'retry-advice',
      message: 'Um download em segundo plano não foi concluído. Toque em Baixar novamente.',
    });
  });

  it('reports retry-advice with recent failure message', () => {
    expect(
      evaluateOfflineAvailability({ hasRecord: false, cachePresent: false, recentFailureMessage: 'quota error', orphanJobWithoutTransfer: false }),
    ).toEqual({ status: 'retry-advice', message: 'quota error' });
  });

  it('reports ghost-package when record exists but cache missing', () => {
    expect(evaluateOfflineAvailability({ hasRecord: true, cachePresent: false, recordManifestHash: 'abc', currentManifestHash: 'abc' })).toEqual({
      status: 'ghost-package',
    });
  });

  it('reports update-available when hash differs', () => {
    expect(
      evaluateOfflineAvailability({ hasRecord: true, cachePresent: true, recordManifestHash: 'aaa', currentManifestHash: 'bbb' }),
    ).toEqual({ status: 'update-available' });
  });

  it('reports downloaded when hashes match', () => {
    expect(
      evaluateOfflineAvailability({ hasRecord: true, cachePresent: true, recordManifestHash: 'aaa', currentManifestHash: 'aaa' }),
    ).toEqual({ status: 'downloaded' });
  });

  it('reports downloaded when currentManifestHash unavailable', () => {
    expect(evaluateOfflineAvailability({ hasRecord: true, cachePresent: true, recordManifestHash: 'aaa', currentManifestHash: null })).toEqual({
      status: 'downloaded',
    });
  });
});
