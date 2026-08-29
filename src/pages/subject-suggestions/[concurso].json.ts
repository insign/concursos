import type { APIRoute, GetStaticPaths } from 'astro';
import { getCatalog } from '../../lib/catalog';
import { getSubjectSuggestionModel, type SubjectSuggestionPayload } from '../../lib/subject-suggestion';

export const getStaticPaths: GetStaticPaths = async () => {
  const { contests } = await getCatalog();
  return contests.map((contest) => ({
    params: { concurso: contest.storageId },
    props: {
      payload: {
        schemaVersion: 1,
        contestSlug: contest.slug,
        contestStorageId: contest.storageId,
        model: getSubjectSuggestionModel(contest),
      } satisfies SubjectSuggestionPayload,
    },
  }));
};

export const GET: APIRoute = ({ props }) =>
  new Response(JSON.stringify(props.payload), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
