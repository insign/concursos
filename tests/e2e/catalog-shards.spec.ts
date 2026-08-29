import { expect, test } from './fixtures';

interface CatalogIndex {
  contests: Array<{ href: string }>;
}

test('keeps legacy catalogs equivalent to additive contest shards', async ({ request }) => {
  const [syncGlobalResponse, syncIndexResponse, navigationGlobalResponse, navigationIndexResponse] = await Promise.all([
    request.get('/sync-catalog.json'),
    request.get('/sync-catalog-index.json'),
    request.get('/navigation-catalog.json'),
    request.get('/navigation-catalog-index.json'),
  ]);
  for (const response of [syncGlobalResponse, syncIndexResponse, navigationGlobalResponse, navigationIndexResponse]) {
    expect(response.ok()).toBe(true);
  }

  const syncGlobal = await syncGlobalResponse.json() as { subjects: unknown[] };
  const syncIndex = await syncIndexResponse.json() as CatalogIndex;
  const syncShards = await Promise.all(syncIndex.contests.map(async ({ href }) => {
    const response = await request.get(href);
    expect(response.ok()).toBe(true);
    return (await response.json() as { subjects: unknown[] }).subjects;
  }));
  expect(syncShards.flat()).toEqual(syncGlobal.subjects);

  const navigationGlobal = await navigationGlobalResponse.json() as {
    routes: Array<{ contestStorageId: string | null }>;
  };
  const navigationIndex = await navigationIndexResponse.json() as CatalogIndex;
  const navigationShards = await Promise.all(navigationIndex.contests.map(async ({ href }) => {
    const response = await request.get(href);
    expect(response.ok()).toBe(true);
    return (await response.json() as { routes: unknown[] }).routes;
  }));
  const globalRoutes = navigationGlobal.routes.filter(({ contestStorageId }) => contestStorageId === null);
  expect([...globalRoutes, ...navigationShards.flat()]).toEqual(navigationGlobal.routes);
});
