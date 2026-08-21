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
import { parseResolutionId } from './content-paths';

export * from './catalog-core';

// Flip para true no commit de obrigatoriedade, após a migração completa.
const REQUIRE_REFERENCES = false;

export interface CatalogSubject extends CatalogSubjectIndex {
  contentEntry: CollectionEntry<'conteudos'>;
  cheatSheetEntry: CollectionEntry<'cheatSheets'>;
  questionSetEntry: CollectionEntry<'questoes'>;
  resolutionEntries: CollectionEntry<'resolucoes'>[];
  referencesEntry: CollectionEntry<'referencias'> | null;
  resolutionReferencesEntry: CollectionEntry<'referencias'> | null;
}

export interface CatalogGroup extends Omit<CatalogGroupIndex, 'children'> {
  children: CatalogTreeNode[];
  megaReviewEntry: CollectionEntry<'megaRevisoes'> | null;
  megaReviewReferencesEntry: CollectionEntry<'referencias'> | null;
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
  const hasResolutions = contest.subjects.some((subject) => subject.resolutions.length > 0);
  return {
    ...inventory,
    routes: [
      ...inventory.routes,
      '/navigation-catalog.json',
      '/simulados/',
      '/simulados/catalog.json',
      `/simulados/pool/${contest.storageId}.json`,
      ...(hasResolutions ? [`/resolucoes/${contest.storageId}/index.json`] : []),
    ],
  };
}

export async function getCatalog(): Promise<Catalog> {
  const [contestEntries, groupEntries, megaReviewEntries, contentEntries, cheatSheetEntries, questionSetEntries, resolutionEntries, referenceEntries] = await Promise.all([
    getCollection('concursos'),
    getCollection('grupos'),
    getCollection('megaRevisoes'),
    getCollection('conteudos'),
    getCollection('cheatSheets'),
    getCollection('questoes'),
    getCollection('resolucoes'),
    getCollection('referencias'),
  ]);

  for (const entry of referenceEntries) {
    if (!(entry.body ?? '').trim()) {
      throw new Error(`Referências "${entry.id}" não possuem conteúdo`);
    }
  }

  const index = buildCatalogIndex({
    contests: contestEntries.map(({ id, data }) => ({ id, data })),
    groups: groupEntries.map(({ id, data }) => ({ id, data })),
    megaReviews: megaReviewEntries.map(({ id, data }) => ({ id, data })),
    contents: contentEntries.map(({ id, data }) => ({ id, data })),
    cheatSheetIds: cheatSheetEntries.map(({ id }) => id),
    questionSets: questionSetEntries.map(({ id, data }) => ({ id, data })),
    resolutions: resolutionEntries.map(({ id, data }) => ({ id, data })),
    references: referenceEntries.map(({ id, data }) => ({ id, data })),
  }, { requireReferences: REQUIRE_REFERENCES });

  const contentById = new Map(contentEntries.map((entry) => [entry.id, entry]));
  const megaReviewById = new Map(megaReviewEntries.map((entry) => [entry.id, entry]));
  const cheatSheetById = new Map(cheatSheetEntries.map((entry) => [entry.id, entry]));
  const questionSetById = new Map(questionSetEntries.map((entry) => [entry.id, entry]));
  const referenceById = new Map(referenceEntries.map((entry) => [entry.id, entry]));
  const resolutionEntriesBySubjectId = new Map<string, CollectionEntry<'resolucoes'>[]>();
  for (const entry of resolutionEntries) {
    const subjectId = parseResolutionId(entry.id).subjectId;
    const entries = resolutionEntriesBySubjectId.get(subjectId) ?? [];
    entries.push(entry);
    resolutionEntriesBySubjectId.set(subjectId, entries);
  }

  return {
    contests: index.contests.map((contest) => {
      const subjects = contest.subjects.map((subject): CatalogSubject => ({
        ...subject,
        contentEntry: contentById.get(subject.id)!,
        cheatSheetEntry: cheatSheetById.get(subject.id)!,
        questionSetEntry: questionSetById.get(subject.id)!,
        resolutionEntries: resolutionEntriesBySubjectId.get(subject.id) ?? [],
        referencesEntry: referenceById.get(subject.id) ?? null,
        resolutionReferencesEntry: referenceById.get(`${subject.id}/resolucoes`) ?? null,
      }));
      const subjectsById = new Map(subjects.map((subject) => [subject.id, subject]));

      const hydrateNode = (node: CatalogTreeNodeIndex): CatalogTreeNode =>
        node.kind === 'subject' ? subjectsById.get(node.id)! : hydrateGroup(node);
      const hydrateGroup = (group: CatalogGroupIndex): CatalogGroup => ({
        ...group,
        megaReviewEntry: group.megaReview ? megaReviewById.get(group.megaReview.id)! : null,
        megaReviewReferencesEntry: group.megaReview
          ? referenceById.get(`${group.megaReview.id}/mega-revisao`) ?? null
          : null,
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
