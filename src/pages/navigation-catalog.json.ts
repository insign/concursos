import type { APIRoute } from 'astro';
import { getCatalog } from '../lib/catalog';
import type { NavigationCatalog } from '../lib/navigation';
import { buildNavigationCatalogRoutes } from '../lib/static-catalogs';

export const prerender = true;

export const GET: APIRoute = async () => {
  const { contests } = await getCatalog();
  const routes = buildNavigationCatalogRoutes(contests);

  return new Response(JSON.stringify({ schemaVersion: 1, routes } satisfies NavigationCatalog), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
