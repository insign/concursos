import type { APIRoute } from 'astro';
import { getCatalog } from '../lib/catalog';
import { buildSyncCatalogSubjects } from '../lib/static-catalogs';

export const prerender = true;

export const GET: APIRoute = async () => {
  const { contests } = await getCatalog();
  const subjects = buildSyncCatalogSubjects(contests);

  return new Response(JSON.stringify({ schemaVersion: 1, subjects }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
