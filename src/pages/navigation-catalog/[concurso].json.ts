import type { APIRoute, GetStaticPaths } from 'astro';
import { getCatalog } from '../../lib/catalog';
import type { NavigationCatalog } from '../../lib/navigation';
import { buildNavigationCatalogRoutes } from '../../lib/static-catalogs';

export const getStaticPaths: GetStaticPaths = async () => {
  const { contests } = await getCatalog();
  return contests.map((contest) => ({
    params: { concurso: contest.storageId },
    props: { routes: buildNavigationCatalogRoutes([contest], false) },
  }));
};

export const GET: APIRoute = ({ props }) =>
  new Response(JSON.stringify({ schemaVersion: 1, routes: props.routes } satisfies NavigationCatalog), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
