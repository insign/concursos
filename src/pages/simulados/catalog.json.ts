import type { APIRoute } from 'astro';
import { getCatalog } from '../../lib/catalog';
import type { QuestionOrigin } from '../../lib/content-schema';
import type { SimuladosCatalog } from '../../lib/simulados-catalog';

export const prerender = true;

function countOrigin(questions: Array<{ origin: QuestionOrigin }>, origin: QuestionOrigin): number {
  return questions.reduce((total, question) => total + Number(question.origin === origin), 0);
}

export const GET: APIRoute = async () => {
  const { contests } = await getCatalog();
  const payload: SimuladosCatalog = {
    schemaVersion: 1,
    contests: contests.map((contest) => ({
      storageId: contest.storageId,
      slug: contest.slug,
      title: contest.title,
      order: contest.order,
      subjects: contest.subjects.map((subject) => {
        const questions = subject.questionSetEntry.data.questions;
        const authorial = countOrigin(questions, 'authorial');
        const previousExam = countOrigin(questions, 'previous_exam');
        return {
          storageId: subject.storageId,
          slug: subject.slug,
          title: subject.title,
          order: subject.order,
          counts: {
            all: questions.length,
            authorial,
            previous_exam: previousExam,
          },
        };
      }),
    })),
  };

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
};
