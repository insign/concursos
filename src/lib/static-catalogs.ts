import type { QuestionSet, SyncQuestionSet } from './content-schema';
import type { NavigationCatalog } from './navigation';

export interface StaticCatalogSubject {
  slug: string;
  storageId: string;
  questionSetEntry: { data: QuestionSet };
}

export interface StaticCatalogContest {
  slug: string;
  storageId: string;
  subjects: StaticCatalogSubject[];
}

export interface SyncCatalogSubject {
  contestStorageId: string;
  subjectStorageId: string;
  questionSet: SyncQuestionSet;
}

function syncQuestionSet({ schemaVersion, questionSetRevision, questions }: QuestionSet): SyncQuestionSet {
  return {
    schemaVersion,
    questionSetRevision,
    questions: questions.map(({ origin: _origin, ...question }) => question),
  };
}

export function buildSyncCatalogSubjects(
  contests: readonly StaticCatalogContest[],
): SyncCatalogSubject[] {
  return contests.flatMap((contest) =>
    contest.subjects.map((subject) => ({
      contestStorageId: contest.storageId,
      subjectStorageId: subject.storageId,
      questionSet: syncQuestionSet(subject.questionSetEntry.data),
    })),
  );
}

export function buildNavigationCatalogRoutes(
  contests: readonly StaticCatalogContest[],
  includeGlobalRoutes = true,
): NavigationCatalog['routes'] {
  const routes: NavigationCatalog['routes'] = includeGlobalRoutes
    ? [
        { route: '/', contestStorageId: null, subjectStorageId: null, activeTab: 'catalog', readingMode: false },
        { route: '/simulados/', contestStorageId: null, subjectStorageId: null, activeTab: 'simulados', readingMode: false },
        { route: '/configuracoes/', contestStorageId: null, subjectStorageId: null, activeTab: 'settings', readingMode: false },
      ]
    : [];

  for (const contest of contests) {
    routes.push({
      route: `/concursos/${contest.slug}/`,
      contestStorageId: contest.storageId,
      subjectStorageId: null,
      activeTab: 'catalog',
      readingMode: false,
    });
    for (const subject of contest.subjects) {
      const base = `/concursos/${contest.slug}/${subject.slug}`;
      routes.push(
        { route: `${base}/`, contestStorageId: contest.storageId, subjectStorageId: subject.storageId, activeTab: 'content', readingMode: false },
        { route: `${base}/cheat-sheet/`, contestStorageId: contest.storageId, subjectStorageId: subject.storageId, activeTab: 'cheat-sheet', readingMode: false },
        { route: `${base}/questoes/`, contestStorageId: contest.storageId, subjectStorageId: subject.storageId, activeTab: 'questions', readingMode: false },
      );
    }
  }
  return routes;
}
