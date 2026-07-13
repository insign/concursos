import { getCollection, type CollectionEntry } from 'astro:content';
import {
  buildCatalogIndex,
  createOfflineInventory,
  type CatalogContestIndex,
  type CatalogIndex,
  type CatalogSubjectIndex,
} from './catalog-core';

export * from './catalog-core';

export interface CatalogSubject extends CatalogSubjectIndex {
  contentEntry: CollectionEntry<'conteudos'>;
  cheatSheetEntry: CollectionEntry<'cheatSheets'>;
  questionSetEntry: CollectionEntry<'questoes'>;
}

export interface CatalogContest extends Omit<CatalogContestIndex, 'subjects'> {
  subjects: CatalogSubject[];
  offlineInventory: ReturnType<typeof createOfflineInventory>;
}

export interface Catalog extends Omit<CatalogIndex, 'contests'> {
  contests: CatalogContest[];
}

export async function getCatalog(): Promise<Catalog> {
  const [contestEntries, contentEntries, cheatSheetEntries, questionSetEntries] = await Promise.all([
    getCollection('concursos'),
    getCollection('conteudos'),
    getCollection('cheatSheets'),
    getCollection('questoes'),
  ]);

  const index = buildCatalogIndex({
    contests: contestEntries.map(({ id, data }) => ({ id, data })),
    contents: contentEntries.map(({ id, data }) => ({ id, data })),
    cheatSheetIds: cheatSheetEntries.map(({ id }) => id),
    questionSets: questionSetEntries.map(({ id, data }) => ({ id, data })),
  });

  const contentById = new Map(contentEntries.map((entry) => [entry.id, entry]));
  const cheatSheetById = new Map(cheatSheetEntries.map((entry) => [entry.id, entry]));
  const questionSetById = new Map(questionSetEntries.map((entry) => [entry.id, entry]));

  return {
    contests: index.contests.map((contest) => {
      const subjects = contest.subjects.map((subject): CatalogSubject => ({
        ...subject,
        contentEntry: contentById.get(subject.id)!,
        cheatSheetEntry: cheatSheetById.get(subject.id)!,
        questionSetEntry: questionSetById.get(subject.id)!,
      }));

      return {
        ...contest,
        subjects,
        offlineInventory: createOfflineInventory(contest),
      };
    }),
  };
}

export async function getSubjectStaticPaths() {
  const catalog = await getCatalog();

  return catalog.contests.flatMap((contest) =>
    contest.subjects.map((subject) => ({
      params: { concurso: contest.slug, assunto: subject.slug },
      props: { contest, subject },
    })),
  );
}
