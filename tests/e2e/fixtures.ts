import { expect, test as base } from '@playwright/test';

export interface MockKvDocument {
  version: number;
  createdAt: string | null;
  json: unknown;
}

interface Fixtures {
  kvStore: Map<string, MockKvDocument>;
}

export const test = base.extend<Fixtures>({
  kvStore: async ({}, use) => {
    await use(new Map());
  },
  page: async ({ page, kvStore }, use) => {
    await page.route('https://kv.helio.me/**', async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const id = decodeURIComponent(url.pathname.slice(1).replace(/\/version$/, ''));
      const existing = kvStore.get(id);

      if (request.method() === 'GET' && url.pathname.endsWith('/version')) {
        if (!existing) return route.fulfill({ status: 404, json: { error: 'not found' } });
        return route.fulfill({ status: 200, json: { id, version: existing.version } });
      }

      if (request.method() === 'GET') {
        if (!existing) return route.fulfill({ status: 404, json: { error: 'not found' } });
        return route.fulfill({
          status: 200,
          headers: { 'Cache-Control': 'no-store' },
          json: {
            id,
            version: existing.version,
            created_at: existing.createdAt,
            updated_at: '2026-07-13T12:00:00.000Z',
            json: existing.json,
          },
        });
      }

      if (request.method() === 'PUT') {
        const next: MockKvDocument = {
          version: (existing?.version ?? 0) + 1,
          createdAt: existing?.createdAt ?? '2026-07-13T12:00:00.000Z',
          json: request.postDataJSON(),
        };
        kvStore.set(id, next);
        return route.fulfill({
          status: 200,
          headers: { 'Cache-Control': 'no-store' },
          json: {
            id,
            version: next.version,
            created_at: next.createdAt,
            updated_at: '2026-07-13T12:00:01.000Z',
            json: next.json,
          },
        });
      }

      return route.fulfill({ status: 405, json: { error: 'method not allowed' } });
    });

    await use(page);
  },
});

export { expect };
