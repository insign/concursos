import { getCollection, type CollectionEntry } from 'astro:content';
import {
  buildCatalogIndex,
  createOfflineInventory,
  remapBibliotecaResolutionId,
  type CatalogContestIndex,
  type CatalogGroupIndex,
  type CatalogIndex,
  type CatalogSubjectIndex,
  type CatalogTreeNodeIndex,
} from './catalog-core';
import { parseBibliotecaResolutionId, parseResolutionId } from './content-paths';

export * from './catalog-core';

// Obrigatório desde a migração completa dos companions de referências.
const REQUIRE_REFERENCES = true;

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
      `/navigation-catalog/${contest.storageId}.json`,
      `/subject-suggestions/${contest.storageId}.json`,
      '/simulados/',
      '/simulados/catalog.json',
      `/simulados/pool/${contest.storageId}.json`,
      ...(hasResolutions ? [`/resolucoes/${contest.storageId}/index.json`] : []),
    ],
  };
}

async function loadCatalog(): Promise<Catalog> {
  const [
    contestEntries,
    groupEntries,
    megaReviewEntries,
    megaReviewVinculoEntries,
    contentEntries,
    cheatSheetEntries,
    questionSetEntries,
    resolutionEntries,
    referenceEntries,
    bibliotecaContentEntries,
    bibliotecaCheatSheetEntries,
    bibliotecaQuestionSetEntries,
    bibliotecaResolutionEntries,
    bibliotecaReferenceEntries,
    bibliotecaMegaReviewEntries,
    vinculoEntries,
  ] = await Promise.all([
    getCollection('concursos'),
    getCollection('grupos'),
    getCollection('megaRevisoes'),
    getCollection('megaReviewVinculos'),
    getCollection('conteudos'),
    getCollection('cheatSheets'),
    getCollection('questoes'),
    getCollection('resolucoes'),
    getCollection('referencias'),
    getCollection('bibliotecaConteudos'),
    getCollection('bibliotecaCheatSheets'),
    getCollection('bibliotecaQuestoes'),
    getCollection('bibliotecaResolucoes'),
    getCollection('bibliotecaReferencias'),
    getCollection('bibliotecaMegaRevisoes'),
    getCollection('vinculos'),
  ]);

  for (const entry of referenceEntries) {
    if (!(entry.body ?? '').trim()) {
      throw new Error(`Referências "${entry.id}" não possuem conteúdo`);
    }
  }
  for (const entry of bibliotecaReferenceEntries) {
    if (!(entry.body ?? '').trim()) {
      throw new Error(`Referências de biblioteca "${entry.id}" não possuem conteúdo`);
    }
  }

  const index = buildCatalogIndex({
    contests: contestEntries.map(({ id, data }) => ({ id, data })),
    groups: groupEntries.map(({ id, data }) => ({ id, data })),
    megaReviews: megaReviewEntries.map(({ id, data }) => ({ id, data })),
    megaReviewVinculos: megaReviewVinculoEntries.map(({ id, data }) => ({ id, data })),
    contents: contentEntries.map(({ id, data }) => ({ id, data })),
    cheatSheetIds: cheatSheetEntries.map(({ id }) => id),
    questionSets: questionSetEntries.map(({ id, data }) => ({ id, data })),
    resolutions: resolutionEntries.map(({ id, data }) => ({ id, data })),
    references: referenceEntries.map(({ id, data }) => ({ id, data })),
    bibliotecaContents: bibliotecaContentEntries.map(({ id, data }) => ({ id, data })),
    bibliotecaCheatSheetIds: bibliotecaCheatSheetEntries.map(({ id }) => id),
    bibliotecaQuestionSets: bibliotecaQuestionSetEntries.map(({ id, data }) => ({ id, data })),
    bibliotecaResolutions: bibliotecaResolutionEntries.map(({ id, data }) => ({ id, data })),
    bibliotecaReferences: bibliotecaReferenceEntries.map(({ id, data }) => ({ id, data })),
    bibliotecaMegaReviews: bibliotecaMegaReviewEntries.map(({ id, data }) => ({ id, data })),
    vinculos: vinculoEntries.map(({ id, data }) => ({ id, data })),
  }, { requireReferences: REQUIRE_REFERENCES });

  const contentById = new Map(contentEntries.map((entry) => [entry.id, entry]));
  const megaReviewById = new Map(megaReviewEntries.map((entry) => [entry.id, entry]));
  const megaReviewVinculoById = new Map(megaReviewVinculoEntries.map((entry) => [entry.id, entry]));
  const bibliotecaMegaReviewById = new Map(bibliotecaMegaReviewEntries.map((entry) => [entry.id, entry]));
  const cheatSheetById = new Map(cheatSheetEntries.map((entry) => [entry.id, entry]));
  const questionSetById = new Map(questionSetEntries.map((entry) => [entry.id, entry]));
  const referenceById = new Map(referenceEntries.map((entry) => [entry.id, entry]));
  const vinculoById = new Map(vinculoEntries.map((entry) => [entry.id, entry]));
  const bibliotecaContentById = new Map(bibliotecaContentEntries.map((entry) => [entry.id, entry]));
  const bibliotecaCheatById = new Map(bibliotecaCheatSheetEntries.map((entry) => [entry.id, entry]));
  const bibliotecaQuestionById = new Map(bibliotecaQuestionSetEntries.map((entry) => [entry.id, entry]));
  const bibliotecaReferenceById = new Map(bibliotecaReferenceEntries.map((entry) => [entry.id, entry]));
  const bibliotecaResolutionEntriesByCanonical = new Map<string, typeof bibliotecaResolutionEntries>();
  for (const entry of bibliotecaResolutionEntries) {
    const { bibliotecaId } = parseBibliotecaResolutionId(entry.id);
    const list = bibliotecaResolutionEntriesByCanonical.get(bibliotecaId) ?? [];
    list.push(entry);
    bibliotecaResolutionEntriesByCanonical.set(bibliotecaId, list);
  }
  const resolutionEntriesBySubjectId = new Map<string, CollectionEntry<'resolucoes'>[]>();
  for (const entry of resolutionEntries) {
    const subjectId = parseResolutionId(entry.id).subjectId;
    const entries = resolutionEntriesBySubjectId.get(subjectId) ?? [];
    entries.push(entry);
    resolutionEntriesBySubjectId.set(subjectId, entries);
  }
  // Provide synthetic resolution entries for vinculated subjects via biblioteca,
  // remapped to the consumer namespace so resolution pages can parse their IDs.
  for (const vinculo of vinculoEntries) {
    const canonical = vinculo.data.canonical as string;
    const bibResList = bibliotecaResolutionEntriesByCanonical.get(canonical);
    if (!bibResList || bibResList.length === 0) continue;
    resolutionEntriesBySubjectId.set(
      vinculo.id,
      bibResList.map((entry) => ({
        ...entry,
        id: remapBibliotecaResolutionId(vinculo.id, entry.id),
      })) as unknown as CollectionEntry<'resolucoes'>[],
    );
  }

  return {
    contests: index.contests.map((contest) => {
      const subjects = contest.subjects.map((subject): CatalogSubject => {
        const vinculo = vinculoById.get(subject.id);
        const canonical = vinculo?.data.canonical as string | undefined;
        const contentEntry =
          contentById.get(subject.id) ??
          (canonical ? (bibliotecaContentById.get(canonical) as unknown as CollectionEntry<'conteudos'>) : undefined);
        const cheatSheetEntry =
          cheatSheetById.get(subject.id) ??
          (canonical ? (bibliotecaCheatById.get(canonical) as unknown as CollectionEntry<'cheatSheets'>) : undefined);
        const questionSetEntry =
          questionSetById.get(subject.id) ??
          (canonical ? (bibliotecaQuestionById.get(canonical) as unknown as CollectionEntry<'questoes'>) : undefined);
        const referencesEntry =
          referenceById.get(subject.id) ??
          (canonical ? (bibliotecaReferenceById.get(canonical) as unknown as CollectionEntry<'referencias'>) : null);
        const resolutionReferencesEntry =
          referenceById.get(`${subject.id}/resolucoes`) ??
          (canonical
            ? (bibliotecaReferenceById.get(`${canonical}/resolucoes`) as unknown as CollectionEntry<'referencias'>)
            : null);
        if (!contentEntry || !cheatSheetEntry || !questionSetEntry) {
          throw new Error(`Entradas de catálogo ausentes para o assunto "${subject.id}"`);
        }
        return {
          ...subject,
          contentEntry: contentEntry as CollectionEntry<'conteudos'>,
          cheatSheetEntry: cheatSheetEntry as CollectionEntry<'cheatSheets'>,
          questionSetEntry: questionSetEntry as CollectionEntry<'questoes'>,
          resolutionEntries: resolutionEntriesBySubjectId.get(subject.id) ?? [],
          referencesEntry: (referencesEntry ?? null) as CollectionEntry<'referencias'> | null,
          resolutionReferencesEntry: (resolutionReferencesEntry ?? null) as CollectionEntry<'referencias'> | null,
        };
      });
      const subjectsById = new Map(subjects.map((subject) => [subject.id, subject]));

      const hydrateNode = (node: CatalogTreeNodeIndex): CatalogTreeNode =>
        node.kind === 'subject' ? subjectsById.get(node.id)! : hydrateGroup(node);
      const hydrateGroup = (group: CatalogGroupIndex): CatalogGroup => {
        let megaReviewEntry: CollectionEntry<'megaRevisoes'> | null = null;
        let megaReviewReferencesEntry: CollectionEntry<'referencias'> | null = null;
        if (group.megaReview) {
          const link = megaReviewVinculoById.get(group.megaReview.id);
          if (link) {
            const canonical = (link.data as { canonical: string }).canonical;
            megaReviewEntry =
              (bibliotecaMegaReviewById.get(`${canonical}/mega-revisao`) as unknown as
                | CollectionEntry<'megaRevisoes'>
                | undefined) ?? null;
            megaReviewReferencesEntry =
              (bibliotecaReferenceById.get(`${canonical}/mega-revisao`) as unknown as
                | CollectionEntry<'referencias'>
                | undefined) ?? null;
          } else {
            megaReviewEntry = megaReviewById.get(group.megaReview.id) ?? null;
            megaReviewReferencesEntry =
              referenceById.get(`${group.megaReview.id}/mega-revisao`) ?? null;
          }
          if (!megaReviewEntry) {
            throw new Error(`Entradas de mega revisão ausentes para o grupo "${group.megaReview.id}"`);
          }
        }
        return {
          ...group,
          megaReviewEntry,
          megaReviewReferencesEntry,
          children: group.children.map(hydrateNode),
        };
      };

      return {
        ...contest,
        subjects,
        children: contest.children.map(hydrateGroup),
        offlineInventory: createContestOfflineInventory(contest),
      };
    }),
  };
}

let catalogPromise: Promise<Catalog> | null = null;

export function getCatalog(): Promise<Catalog> {
  if (!catalogPromise) {
    catalogPromise = loadCatalog().catch((error: unknown) => {
      catalogPromise = null;
      throw error;
    });
  }
  return catalogPromise;
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
