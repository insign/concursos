import type { APIRoute } from 'astro';
import { getCatalog } from '../lib/catalog';
import type { QuestionSet, SyncQuestionSet } from '../lib/content-schema';

export const prerender = true;

function syncQuestionSet({ schemaVersion, questionSetRevision, questions }: QuestionSet): SyncQuestionSet {
  return {
    schemaVersion,
    questionSetRevision,
    questions: questions.map(({ origin: _origin, ...question }) => question),
  };
}

export const GET: APIRoute = async () => {
  const { contests } = await getCatalog();
  const subjects = contests.flatMap((contest) =>
    contest.subjects.map((subject) => ({
      contestStorageId: contest.storageId,
      subjectStorageId: subject.storageId,
      questionSet: syncQuestionSet(subject.questionSetEntry.data),
    })),
  );

  return new Response(JSON.stringify({ schemaVersion: 1, subjects }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
