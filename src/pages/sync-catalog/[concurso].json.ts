import type { APIRoute, GetStaticPaths } from 'astro';
import { getCatalog } from '../../lib/catalog';
import { buildSyncCatalogSubjects } from '../../lib/static-catalogs';

export const getStaticPaths: GetStaticPaths = async () => {
  const { contests } = await getCatalog();
  return contests.map((contest) => ({
    params: { concurso: contest.storageId },
    props: { subjects: buildSyncCatalogSubjects([contest]) },
  }));
};

export const GET: APIRoute = ({ props }) =>
  new Response(JSON.stringify({ schemaVersion: 1, subjects: props.subjects }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
