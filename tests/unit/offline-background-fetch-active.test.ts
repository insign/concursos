import { describe, expect, it } from 'vitest';
import {
  getActivePackageFetches,
  hasActivePackageDownload,
} from '../../src/lib/offline-background-fetch';

function registrationWith(fetches: Array<{ id: string }>) {
  const store = new Map(fetches.map((fetch) => [fetch.id, { id: fetch.id }]));
  return {
    backgroundFetch: {
      async getIds(): Promise<string[]> {
        return [...store.keys()];
      },
      async get(id: string) {
        return store.get(id);
      },
    },
  };
}

describe('active package fetches', () => {
  it('lists only our downloads and extracts the contest storage id', async () => {
    const fetches = await getActivePackageFetches(
      registrationWith([
        { id: 'offline-package-1724400000000-tcema-2026' },
        { id: 'outro-app-outro-conteudo' },
        { id: 'offline-package-1724400000001-exemplo' },
      ]),
    );
    expect(fetches).toEqual([
      { id: 'offline-package-1724400000000-tcema-2026', contestStorageId: 'tcema-2026' },
      { id: 'offline-package-1724400000001-exemplo', contestStorageId: 'exemplo' },
    ]);
  });

  it('detects an active download by contest', async () => {
    const registration = registrationWith([{ id: 'offline-package-1724400000002-exemplo' }]);
    await expect(hasActivePackageDownload(registration, 'exemplo')).resolves.toBe(true);
    await expect(hasActivePackageDownload(registration, 'tcema')).resolves.toBe(false);
  });

  it('propagates per-id get() rejection as uncertainty', async () => {
    const registration = {
      backgroundFetch: {
        async getIds() {
          return ['offline-package-1724400000003-exemplo'];
        },
        async get() {
          throw new Error('record unavailable');
        },
      },
    };
    await expect(getActivePackageFetches(registration)).rejects.toThrow('record unavailable');
  });

  it('tolerates browsers without Background Fetch or with failing managers', async () => {
    await expect(getActivePackageFetches({})).resolves.toEqual([]);
    await expect(
      getActivePackageFetches({
        backgroundFetch: {
          getActiveFetches: () => Promise.reject(new Error('boom')),
        },
      }),
    ).resolves.toEqual([]);
  });
});
