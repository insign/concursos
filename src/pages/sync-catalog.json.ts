import type { APIRoute } from 'astro';
import { getCatalog } from '../lib/catalog';

export const prerender = true;

export const GET: APIRoute = async () => {
  const { contests } = await getCatalog();
  const subjects = contests.flatMap((contest) =>
    contest.subjects.map((subject) => ({
      contestStorageId: contest.storageId,
      subjectStorageId: subject.storageId,
      questionSet: subject.questionSetEntry.data,
    })),
  );

  return new Response(JSON.stringify({ schemaVersion: 1, subjects }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
