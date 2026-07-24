import type { APIRoute, GetStaticPaths } from 'astro';
import { getCatalog, type CatalogContest } from '../../../lib/catalog';
import type { SimuladoPoolPayload } from '../../../lib/simulados-catalog';

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
  const { contest } = props;
  const payload: SimuladoPoolPayload = {
    schemaVersion: 1,
    contestStorageId: contest.storageId,
    contestSlug: contest.slug,
    contestTitle: contest.title,
    subjects: contest.subjects.map((subject) => ({
      subjectStorageId: subject.storageId,
      subjectSlug: subject.slug,
      title: subject.title,
      questions: subject.questionSetEntry.data.questions.map((question) => ({
        questionId: question.id,
        questionRevision: question.revision,
        origin: question.origin,
        prompt: question.prompt,
        options: question.options,
        correctOptionId: question.correctOptionId,
        explanation: question.explanation,
      })),
    })),
  };

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
};
