import type { APIRoute, GetStaticPaths } from 'astro';
import { getCatalog, type CatalogContest } from '../../../lib/catalog';
import type { ResolutionCatalog } from '../../../lib/resolution-routes';

export const prerender = true;

interface Props {
  contest: CatalogContest;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { contests } = await getCatalog();
  return contests.map((contest) => ({
    params: { concurso: contest.storageId },
    props: { contest },
  }));
};

export const GET: APIRoute<Props> = async ({ props }) => {
  const payload: ResolutionCatalog = {
    schemaVersion: 1,
    contestStorageId: props.contest.storageId,
    subjects: props.contest.subjects
      .filter((subject) => subject.resolutions.length > 0)
      .map((subject) => ({
        subjectStorageId: subject.storageId,
        resolutions: subject.resolutions,
      })),
  };

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
};
