import type { ContestData, QuestionSet, SubjectData } from './content-schema';
import { parseSubjectId } from './content-paths';

export interface CatalogRecord<T> {
  id: string;
  data: T;
}

export interface CatalogSources {
  contests: CatalogRecord<ContestData>[];
  contents: CatalogRecord<SubjectData>[];
  cheatSheetIds: string[];
  questionSets: CatalogRecord<QuestionSet>[];
}

export interface CatalogSubjectIndex extends SubjectData {
  id: string;
  slug: string;
  contestSlug: string;
  previousSubjectId: string | null;
  nextSubjectId: string | null;
}

export interface CatalogContestIndex extends ContestData {
  id: string;
  slug: string;
  subjects: CatalogSubjectIndex[];
}

export interface CatalogIndex {
  contests: CatalogContestIndex[];
}

export interface OfflineInventory {
  schemaVersion: 1;
  contestSlug: string;
  contestStorageId: string;
  manifestHash: string;
  routes: string[];
  assets: string[];
  sharedAssets: string[];
  estimatedBytes: number | null;
}

function assertUnique(values: string[], label: string): void {
  const seen = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      throw new Error(`${label} duplicado: "${value}"`);
    }
    seen.add(value);
  }
}

function assertMatchingSubjectFiles(
  contentIds: Set<string>,
  companionIds: Set<string>,
  companionLabel: string,
): void {
  for (const id of contentIds) {
    if (!companionIds.has(id)) {
      throw new Error(`Assunto "${id}" não possui ${companionLabel}`);
    }
  }

  for (const id of companionIds) {
    if (!contentIds.has(id)) {
      throw new Error(`${companionLabel} órfão para o assunto "${id}"`);
    }
  }
}

export function buildCatalogIndex(sources: CatalogSources): CatalogIndex {
  assertUnique(sources.contests.map(({ id }) => id), 'ID de concurso');
  assertUnique(sources.contents.map(({ id }) => id), 'ID de assunto');
  assertUnique(sources.cheatSheetIds, 'ID de cheat sheet');
  assertUnique(sources.questionSets.map(({ id }) => id), 'ID de questões');
  assertUnique(sources.contests.map(({ data }) => data.storageId), 'storageId de concurso');
  assertUnique(sources.contents.map(({ data }) => data.storageId), 'storageId de assunto');

  const contestsById = new Map(sources.contests.map((contest) => [contest.id, contest]));
  const contentIds = new Set(sources.contents.map(({ id }) => id));
  const cheatSheetIds = new Set(sources.cheatSheetIds);
  const questionSetIds = new Set(sources.questionSets.map(({ id }) => id));

  assertMatchingSubjectFiles(contentIds, cheatSheetIds, 'cheat sheet');
  assertMatchingSubjectFiles(contentIds, questionSetIds, 'arquivo de questões');

  const subjectsByContest = new Map<string, CatalogSubjectIndex[]>();

  for (const content of sources.contents) {
    const { contestSlug, subjectSlug } = parseSubjectId(content.id);

    if (!contestsById.has(contestSlug)) {
      throw new Error(`Assunto "${content.id}" referencia concurso inexistente`);
    }

    const subjects = subjectsByContest.get(contestSlug) ?? [];
    subjects.push({
      id: content.id,
      slug: subjectSlug,
      contestSlug,
      ...content.data,
      previousSubjectId: null,
      nextSubjectId: null,
    });
    subjectsByContest.set(contestSlug, subjects);
  }

  const contests = sources.contests
    .map((contest): CatalogContestIndex => {
      const subjects = (subjectsByContest.get(contest.id) ?? []).sort(
        (a, b) => a.order - b.order || a.title.localeCompare(b.title, 'pt-BR') || a.id.localeCompare(b.id),
      );

      for (const [index, subject] of subjects.entries()) {
        subject.previousSubjectId = subjects[index - 1]?.id ?? null;
        subject.nextSubjectId = subjects[index + 1]?.id ?? null;
      }

      return {
        id: contest.id,
        slug: contest.id,
        ...contest.data,
        subjects,
      };
    })
    .sort(
      (a, b) => a.order - b.order || a.title.localeCompare(b.title, 'pt-BR') || a.id.localeCompare(b.id),
    );

  return { contests };
}

export function createOfflineInventory(
  contest: CatalogContestIndex,
  assets: string[] = [],
): OfflineInventory {
  const routes = [`/concursos/${contest.slug}/`];

  for (const subject of contest.subjects) {
    const base = `/concursos/${contest.slug}/${subject.slug}`;
    routes.push(`${base}/`, `${base}/cheat-sheet/`, `${base}/questoes/`);
  }

  return {
    schemaVersion: 1,
    contestSlug: contest.slug,
    contestStorageId: contest.storageId,
    manifestHash: 'development',
    routes,
    assets: [...new Set(assets)].sort(),
    sharedAssets: [],
    estimatedBytes: null,
  };
}
