import type { APIRoute } from 'astro';
import { getCatalog } from '../lib/catalog';

export const prerender = true;

export const GET: APIRoute = async () => {
  const { contests } = await getCatalog();
  return new Response(JSON.stringify({
    schemaVersion: 1,
    contests: contests.map((contest) => ({
      contestStorageId: contest.storageId,
      routeCount: 1 + contest.subjects.length * 3,
      href: `/navigation-catalog/${contest.storageId}.json`,
    })),
  }), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
