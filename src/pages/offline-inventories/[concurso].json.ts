import type { APIRoute, GetStaticPaths } from 'astro';
import { getCatalog } from '../../lib/catalog';

export const getStaticPaths: GetStaticPaths = async () => {
  const { contests } = await getCatalog();
  return contests.map((contest) => ({
    params: { concurso: contest.storageId },
    props: { inventory: contest.offlineInventory },
  }));
};

export const GET: APIRoute = ({ props }) =>
  new Response(JSON.stringify(props.inventory), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
