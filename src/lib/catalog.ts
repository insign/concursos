import { getCollection, type CollectionEntry } from 'astro:content';
import {
  buildCatalogIndex,
  createOfflineInventory,
  type CatalogContestIndex,
  type CatalogGroupIndex,
  type CatalogIndex,
  type CatalogSubjectIndex,
  type CatalogTreeNodeIndex,
} from './catalog-core';

export * from './catalog-core';

export interface CatalogSubject extends CatalogSubjectIndex {
  contentEntry: CollectionEntry<'conteudos'>;
  cheatSheetEntry: CollectionEntry<'cheatSheets'>;
  questionSetEntry: CollectionEntry<'questoes'>;
}

export interface CatalogGroup extends Omit<CatalogGroupIndex, 'children'> {
  children: CatalogTreeNode[];
}

export type CatalogTreeNode = CatalogGroup | CatalogSubject;

export interface CatalogContest extends Omit<CatalogContestIndex, 'children' | 'subjects'> {
  subjects: CatalogSubject[];
  children: CatalogGroup[];
  offlineInventory: ReturnType<typeof createOfflineInventory>;
}

export interface Catalog extends Omit<CatalogIndex, 'contests'> {
  contests: CatalogContest[];
}

function createContestOfflineInventory(contest: CatalogContestIndex) {
  const inventory = createOfflineInventory(contest);
  return {
    ...inventory,
    routes: [
      ...inventory.routes,
      '/simulados/',
      '/simulados/catalog.json',
      `/simulados/pool/${contest.storageId}.json`,
    ],
  };
}

export async function getCatalog(): Promise<Catalog> {
  const [contestEntries, groupEntries, contentEntries, cheatSheetEntries, questionSetEntries] = await Promise.all([
    getCollection('concursos'),
    getCollection('grupos'),
    getCollection('conteudos'),
    getCollection('cheatSheets'),
    getCollection('questoes'),
  ]);

  const index = buildCatalogIndex({
    contests: contestEntries.map(({ id, data }) => ({ id, data })),
    groups: groupEntries.map(({ id, data }) => ({ id, data })),
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
      const subjectsById = new Map(subjects.map((subject) => [subject.id, subject]));

      const hydrateNode = (node: CatalogTreeNodeIndex): CatalogTreeNode =>
        node.kind === 'subject' ? subjectsById.get(node.id)! : hydrateGroup(node);
      const hydrateGroup = (group: CatalogGroupIndex): CatalogGroup => ({
        ...group,
        children: group.children.map(hydrateNode),
      });

      return {
        ...contest,
        subjects,
        children: contest.children.map(hydrateGroup),
        offlineInventory: createContestOfflineInventory(contest),
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
