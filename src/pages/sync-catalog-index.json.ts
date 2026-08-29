import type { APIRoute } from 'astro';
import { getCatalog } from '../lib/catalog';

export const prerender = true;

export const GET: APIRoute = async () => {
  const { contests } = await getCatalog();
  return new Response(JSON.stringify({
    schemaVersion: 1,
    contests: contests.map((contest) => ({
      contestStorageId: contest.storageId,
      subjectCount: contest.subjects.length,
      href: `/sync-catalog/${contest.storageId}.json`,
    })),
  }), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
