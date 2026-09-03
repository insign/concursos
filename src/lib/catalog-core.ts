import type {
  ContestData,
  GroupData,
  MegaReviewData,
  MegaReviewVinculoData,
  QuestionSet,
  ReferenceData,
  ResolutionData,
  SubjectData,
} from './content-schema';
import {
  parseBibliotecaId,
  parseBibliotecaMegaReferenceId,
  parseBibliotecaReferenceId,
  parseBibliotecaResolutionId,
  parseGroupId,
  parseReferenceId,
  parseResolutionId,
  parseSubjectId,
} from './content-paths';
import { megaReviewRoute } from './mega-review-routes';
import { deriveBibliotecaMegaReviewScope, deriveLinkedMegaReviewScope, diffMegaReviewScopes } from './mega-review-scope';
import type { ResolutionDescriptor } from './resolution-routes';

export interface CatalogRecord<T> {
  id: string;
  data: T;
}

export interface VinculoData {
  schemaVersion: 1;
  canonical: string;
  order: number;
}

export interface CatalogSources {
  contests: CatalogRecord<ContestData>[];
  groups: CatalogRecord<GroupData>[];
  megaReviews?: CatalogRecord<MegaReviewData>[];
  contents: CatalogRecord<SubjectData>[];
  cheatSheetIds: string[];
  questionSets: CatalogRecord<QuestionSet>[];
  resolutions?: CatalogRecord<ResolutionData>[];
  references?: CatalogRecord<ReferenceData>[];
  bibliotecaContents?: CatalogRecord<SubjectData>[];
  bibliotecaCheatSheetIds?: string[];
  bibliotecaQuestionSets?: CatalogRecord<QuestionSet>[];
  bibliotecaResolutions?: CatalogRecord<ResolutionData>[];
  bibliotecaReferences?: CatalogRecord<ReferenceData>[];
  bibliotecaMegaReviews?: CatalogRecord<MegaReviewData>[];
  megaReviewVinculos?: CatalogRecord<MegaReviewVinculoData>[];
  vinculos?: CatalogRecord<VinculoData>[];
}

export interface CatalogIndexOptions {
  requireReferences?: boolean;
}

export type CatalogResolutionRecord = CatalogRecord<ResolutionData>;

export interface CatalogGroupReference {
  id: string;
  slug: string;
  title: string;
}

export interface CatalogMegaReviewIndex {
  id: string;
  slug: string;
  title: string;
}

export interface CatalogSubjectIndex extends SubjectData {
  kind: 'subject';
  id: string;
  slug: string;
  contestSlug: string;
  groupPath: CatalogGroupReference[];
  previousSubjectId: string | null;
  nextSubjectId: string | null;
  resolutions: ResolutionDescriptor[];
}

export interface CatalogGroupIndex extends GroupData {
  kind: 'group';
  id: string;
  slug: string;
  contestSlug: string;
  parentGroupId: string | null;
  megaReview: CatalogMegaReviewIndex | null;
  children: CatalogTreeNodeIndex[];
}

export type CatalogTreeNodeIndex = CatalogGroupIndex | CatalogSubjectIndex;

export interface CatalogContestIndex extends ContestData {
  id: string;
  slug: string;
  subjects: CatalogSubjectIndex[];
  children: CatalogGroupIndex[];
}

export interface CatalogIndex {
  contests: CatalogContestIndex[];
}

export interface OfflineInventory {
  schemaVersion: 3;
  contestSlug: string;
  contestStorageId: string;
  manifestHash: string;
  sharedHash: string;
  routes: string[];
  assets: string[];
  sharedAssets: string[];
  estimatedBytes: number | null;
  resources: Record<string, string>;
  sharedResources: Record<string, string>;
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

function compareCatalogEntries(
  a: Pick<CatalogTreeNodeIndex, 'id' | 'order' | 'title'>,
  b: Pick<CatalogTreeNodeIndex, 'id' | 'order' | 'title'>,
): number {
  return a.order - b.order || a.title.localeCompare(b.title, 'pt-BR') || a.id.localeCompare(b.id);
}

/**
 * Remapeia um ID de resolução de biblioteca para o namespace do assunto
 * consumidor. A hidratação deve expor IDs do consumidor porque as páginas
 * de resoluções derivam o assunto via `parseResolutionId`.
 */
export function remapBibliotecaResolutionId(
  vinculoSubjectId: string,
  bibliotecaResolutionId: string,
): string {
  const { questionId } = parseBibliotecaResolutionId(bibliotecaResolutionId);
  return `${vinculoSubjectId}/resolucoes/${questionId}`;
}

function sortTree(nodes: CatalogTreeNodeIndex[]): void {
  nodes.sort(compareCatalogEntries);

  for (const node of nodes) {
    if (node.kind === 'group') {
      sortTree(node.children);
    }
  }
}

function hasSubjectDescendant(group: CatalogGroupIndex): boolean {
  return group.children.some(
    (child) => child.kind === 'subject' || hasSubjectDescendant(child),
  );
}

function appendMegaReviewRoutes(
  groups: CatalogGroupIndex[],
  contestSlug: string,
  routes: string[],
): void {
  for (const group of groups) {
    if (group.megaReview) routes.push(megaReviewRoute(contestSlug, group.megaReview.slug));
    appendMegaReviewRoutes(
      group.children.filter((child): child is CatalogGroupIndex => child.kind === 'group'),
      contestSlug,
      routes,
    );
  }
}

export function buildCatalogIndex(sources: CatalogSources, options: CatalogIndexOptions = {}): CatalogIndex {
  const requireReferences = options.requireReferences === true;

  // ----- biblioteca + vinculo preprocessing -----
  const bibliotecaContents = sources.bibliotecaContents ?? [];
  const bibliotecaCheatSheetIds = sources.bibliotecaCheatSheetIds ?? [];
  const bibliotecaQuestionSets = sources.bibliotecaQuestionSets ?? [];
  const bibliotecaReferences = sources.bibliotecaReferences ?? [];
  const bibliotecaResolutions = sources.bibliotecaResolutions ?? [];
  const vinculos = sources.vinculos ?? [];

  // Validate biblioteca uniqueness
  assertUnique(bibliotecaContents.map(({ id }) => id), 'ID de biblioteca');
  assertUnique(bibliotecaCheatSheetIds, 'ID de cheat sheet de biblioteca');
  assertUnique(bibliotecaQuestionSets.map(({ id }) => id), 'ID de questões de biblioteca');
  assertUnique(bibliotecaResolutions.map(({ id }) => id), 'ID de resolução de biblioteca');
  assertUnique(bibliotecaReferences.map(({ id }) => id), 'ID de referências de biblioteca');
  assertUnique(vinculos.map(({ id }) => id), 'ID de vínculo');

  const bibliotecaContentIds = new Set(bibliotecaContents.map(({ id }) => id));
  const bibliotecaCheatIds = new Set(bibliotecaCheatSheetIds);
  const bibliotecaQuestionIds = new Set(bibliotecaQuestionSets.map(({ id }) => id));
  const bibliotecaQuestionById = new Map(bibliotecaQuestionSets.map((qs) => [qs.id, qs]));
  const bibliotecaDataById = new Map(bibliotecaContents.map((c) => [c.id, c]));

  if (bibliotecaContents.length > 0) {
    assertMatchingSubjectFiles(bibliotecaContentIds, bibliotecaCheatIds, 'cheat sheet de biblioteca');
    assertMatchingSubjectFiles(bibliotecaContentIds, bibliotecaQuestionIds, 'arquivo de questões de biblioteca');
  }

  // Validate biblioteca resolutions
  const bibliotecaResolutionsBySubject = new Map<string, ResolutionDescriptor[]>();
  for (const resolution of bibliotecaResolutions) {
    const { bibliotecaId, questionId } = parseBibliotecaResolutionId(resolution.id);
    if (!bibliotecaContentIds.has(bibliotecaId)) {
      throw new Error(`Resolução de biblioteca órfã para o assunto "${bibliotecaId}"`);
    }
    const questionSet = bibliotecaQuestionById.get(bibliotecaId)?.data;
    const question = questionSet?.questions.find((candidate) => candidate.id === questionId);
    if (!question) {
      throw new Error(`Resolução de biblioteca "${resolution.id}" referencia questão inexistente`);
    }
    if (resolution.data.questionRevision !== question.revision) {
      throw new Error(
        `Resolução de biblioteca "${resolution.id}" usa a revisão ${resolution.data.questionRevision}, ` +
          `mas a questão usa a revisão ${question.revision}`,
      );
    }
    const list = bibliotecaResolutionsBySubject.get(bibliotecaId) ?? [];
    list.push({ questionId, questionRevision: resolution.data.questionRevision });
    bibliotecaResolutionsBySubject.set(bibliotecaId, list);
  }

  // Validate biblioteca references
  const bibliotecaSubjectReferenceIds = new Set<string>();
  const bibliotecaResolutionReferenceIds = new Set<string>();
  for (const reference of bibliotecaReferences) {
    const parsed = parseBibliotecaReferenceId(reference.id);
    if (parsed.kind === 'mega-review') {
      // Referências de mega revisão canônica: orfandade validada no bloco
      // de mega revisões canônicas abaixo, após carregar os vínculos.
      continue;
    }
    if (parsed.kind === 'subject') {
      if (!bibliotecaContentIds.has(parsed.subjectId!)) {
        throw new Error(`Referências de biblioteca órfãs para o assunto "${parsed.subjectId}"`);
      }
      bibliotecaSubjectReferenceIds.add(parsed.subjectId!);
      continue;
    }
    if (!bibliotecaContentIds.has(parsed.subjectId!) || !bibliotecaResolutionsBySubject.has(parsed.subjectId!)) {
      throw new Error(`Referências de biblioteca órfãs para as resoluções do assunto "${parsed.subjectId}"`);
    }
    bibliotecaResolutionReferenceIds.add(parsed.subjectId!);
  }
  if (bibliotecaContents.length > 0) {
    // Biblioteca references are optional globally, but if requireReferences is true we enforce? For now don't enforce,
    // because biblioteca is not part of contest subjects directly. Synthetic validation will occur later.
  }

  // Build vinculo synthetic data
  const contentIdsPhysical = new Set(sources.contents.map(({ id }) => id));
  // Check collision vinculo vs physical
  for (const vinculo of vinculos) {
    if (contentIdsPhysical.has(vinculo.id)) {
      throw new Error(`Vínculo "${vinculo.id}" colide com assunto físico "${vinculo.id}"`);
    }
    // Validate canonical exists
    if (!bibliotecaContentIds.has(vinculo.data.canonical)) {
      throw new Error(`Vínculo "${vinculo.id}" referencia biblioteca inexistente "${vinculo.data.canonical}"`);
    }
    // Validate canonical parsing
    parseBibliotecaId(vinculo.data.canonical);
    // Validate subject slug matches? Enforce that vinculo slug equals canonical slug for coherence
    const { subjectSlug: vinculoSlug } = parseSubjectId(vinculo.id);
    const { subjectSlug: canonicalSlug } = parseBibliotecaId(vinculo.data.canonical);
    if (vinculoSlug !== canonicalSlug) {
      throw new Error(
        `Vínculo "${vinculo.id}" tem slug "${vinculoSlug}" divergente do canônico "${canonicalSlug}"`,
      );
    }
  }

  // Check duplicate canonical within same contest? Not error but we ensure pair uniqueness later handles it.
  // Also need to ensure vinculo canonical pair not duplicating storageId pair? That will be caught later.

  const syntheticContents: CatalogRecord<SubjectData>[] = [];
  const syntheticCheatSheetIds: string[] = [];
  const syntheticQuestionSets: CatalogRecord<QuestionSet>[] = [];
  const syntheticReferences: CatalogRecord<ReferenceData>[] = [];
  const syntheticResolutions: CatalogRecord<ResolutionData>[] = [];

  for (const vinculo of vinculos) {
    const canonical = vinculo.data.canonical;
    const bibEntry = bibliotecaDataById.get(canonical)!;
    const bibQuestionSet = bibliotecaQuestionById.get(canonical)!;

    const syntheticData: SubjectData = {
      ...bibEntry.data,
      order: vinculo.data.order,
    };

    syntheticContents.push({ id: vinculo.id, data: syntheticData });
    syntheticCheatSheetIds.push(vinculo.id);
    syntheticQuestionSets.push({ id: vinculo.id, data: bibQuestionSet.data });

    // References: if biblioteca has subject reference for canonical, create synthetic for vinculo
    if (bibliotecaSubjectReferenceIds.has(canonical)) {
      const bibRef = bibliotecaReferences.find((r) => r.id === canonical)!;
      syntheticReferences.push({ id: vinculo.id, data: bibRef.data });
    }
    // Resolution companion references
    if (bibliotecaResolutionReferenceIds.has(canonical)) {
      const bibResRefId = `${canonical}/resolucoes`;
      const bibResRef = bibliotecaReferences.find((r) => r.id === bibResRefId)!;
      syntheticReferences.push({ id: `${vinculo.id}/resolucoes`, data: bibResRef.data });
    }

    // Resolutions remap
    for (const bibRes of bibliotecaResolutions) {
      const { bibliotecaId, questionId } = parseBibliotecaResolutionId(bibRes.id);
      if (bibliotecaId !== canonical) continue;
      syntheticResolutions.push({
        id: `${vinculo.id}/resolucoes/${questionId}`,
        data: bibRes.data,
      });
    }
  }

  // ----- canonical mega reviews + links -----
  const bibliotecaMegaReviews = sources.bibliotecaMegaReviews ?? [];
  const megaReviewVinculos = sources.megaReviewVinculos ?? [];
  assertUnique(bibliotecaMegaReviews.map(({ id }) => id), 'ID de mega revisão de biblioteca');
  assertUnique(megaReviewVinculos.map(({ id }) => id), 'ID de vínculo de mega revisão');

  const bibliotecaMegaById = new Map(bibliotecaMegaReviews.map((review) => [review.id, review]));
  for (const review of bibliotecaMegaReviews) {
    parseBibliotecaMegaReferenceId(review.id);
  }
  for (const reference of sources.bibliotecaReferences ?? []) {
    const parsed = parseBibliotecaReferenceId(reference.id);
    if (parsed.kind === 'mega-review' && !bibliotecaMegaById.has(reference.id)) {
      throw new Error(`Referências de biblioteca órfãs para a mega revisão "${reference.id}"`);
    }
  }

  const syntheticMegaReviews: CatalogRecord<MegaReviewData>[] = [];
  for (const vinculo of megaReviewVinculos) {
    parseGroupId(vinculo.id);
    const canonicalId = `${vinculo.data.canonical}/mega-revisao`;
    if (!bibliotecaMegaById.has(canonicalId)) {
      throw new Error(
        `Vínculo de mega revisão "${vinculo.id}" referencia mega revisão canônica inexistente "${vinculo.data.canonical}"`,
      );
    }
    syntheticMegaReviews.push({ id: vinculo.id, data: bibliotecaMegaById.get(canonicalId)!.data });
  }

  const physicalMegaReviewIds = new Set((sources.megaReviews ?? []).map(({ id }) => id));
  for (const review of syntheticMegaReviews) {
    if (physicalMegaReviewIds.has(review.id)) {
      throw new Error(
        `Mega revisão "${review.id}" possui conteúdo físico e vínculo canônico; use apenas um`,
      );
    }
  }

  const bibliotecaReferenceById = new Map(
    (sources.bibliotecaReferences ?? []).map((reference) => [reference.id, reference]),
  );
  const localReferenceIds = new Set((sources.references ?? []).map(({ id }) => id));
  for (const vinculo of megaReviewVinculos) {
    if (localReferenceIds.has(`${vinculo.id}/mega-revisao`)) {
      throw new Error(
        `Mega revisão vinculada "${vinculo.id}" possui referências locais; ` +
          `remova-as para usar o canônico "${vinculo.data.canonical}"`,
      );
    }
    const bibRef = bibliotecaReferenceById.get(`${vinculo.data.canonical}/mega-revisao`);
    if (bibRef) {
      syntheticReferences.push({ id: `${vinculo.id}/mega-revisao`, data: bibRef.data });
    }
  }

  // Combine physical + synthetic for final catalog validation
  const allContents = [...sources.contents, ...syntheticContents];
  const allCheatSheetIds = [...sources.cheatSheetIds, ...syntheticCheatSheetIds];
  const allQuestionSets = [...sources.questionSets, ...syntheticQuestionSets];
  const allResolutions = [...(sources.resolutions ?? []), ...syntheticResolutions];
  const allReferences = [...(sources.references ?? []), ...syntheticReferences];

  // ----- original validations but using combined -----
  assertUnique(sources.contests.map(({ id }) => id), 'ID de concurso');
  assertUnique(sources.groups.map(({ id }) => id), 'ID de grupo');
  assertUnique(allContents.map(({ id }) => id), 'ID de assunto');
  const megaReviews = [...(sources.megaReviews ?? []), ...syntheticMegaReviews];
  assertUnique(megaReviews.map(({ id }) => id), 'ID de mega revisão');
  assertUnique(allCheatSheetIds, 'ID de cheat sheet');
  assertUnique(allQuestionSets.map(({ id }) => id), 'ID de questões');
  assertUnique(sources.contests.map(({ data }) => data.storageId), 'storageId de concurso');

  // storageId pair-unique: allow same storageId across concursos but not within same contest
  {
    const seen = new Set<string>();
    for (const content of allContents) {
      const { contestSlug } = parseSubjectId(content.id);
      const pair = `${contestSlug}--${content.data.storageId}`;
      if (seen.has(pair)) {
        throw new Error(`storageId de assunto duplicado no par concurso+assunto: "${pair}"`);
      }
      seen.add(pair);
    }
  }

  const contestsById = new Map(sources.contests.map((contest) => [contest.id, contest]));
  const contentIds = new Set(allContents.map(({ id }) => id));
  const cheatSheetIds = new Set(allCheatSheetIds);
  const questionSetIds = new Set(allQuestionSets.map(({ id }) => id));
  const questionSetsById = new Map(allQuestionSets.map((questionSet) => [questionSet.id, questionSet]));
  const resolutions = allResolutions;
  assertUnique(resolutions.map(({ id }) => id), 'ID de resolução');

  assertMatchingSubjectFiles(contentIds, cheatSheetIds, 'cheat sheet');
  assertMatchingSubjectFiles(contentIds, questionSetIds, 'arquivo de questões');

  const resolutionsBySubject = new Map<string, ResolutionDescriptor[]>();
  for (const resolution of resolutions) {
    const { subjectId, questionId } = parseResolutionId(resolution.id);
    if (!contentIds.has(subjectId)) {
      throw new Error(`Resolução órfã para o assunto "${subjectId}"`);
    }

    const questionSet = questionSetsById.get(subjectId)?.data;
    const question = questionSet?.questions.find((candidate) => candidate.id === questionId);
    if (!question) {
      throw new Error(`Resolução "${resolution.id}" referencia questão inexistente`);
    }
    if (resolution.data.questionRevision !== question.revision) {
      throw new Error(
        `Resolução "${resolution.id}" usa a revisão ${resolution.data.questionRevision}, ` +
          `mas a questão usa a revisão ${question.revision}`,
      );
    }

    const subjectResolutions = resolutionsBySubject.get(subjectId) ?? [];
    subjectResolutions.push({
      questionId,
      questionRevision: resolution.data.questionRevision,
    });
    resolutionsBySubject.set(subjectId, subjectResolutions);
  }

  const groupsById = new Map<string, CatalogGroupIndex>();

  for (const group of sources.groups) {
    const { contestSlug, groupSlugs } = parseGroupId(group.id);

    if (!contestsById.has(contestSlug)) {
      throw new Error(`Grupo "${group.id}" referencia concurso inexistente`);
    }

    groupsById.set(group.id, {
      kind: 'group',
      id: group.id,
      slug: groupSlugs.at(-1)!,
      contestSlug,
      parentGroupId:
        groupSlugs.length > 1 ? [contestSlug, ...groupSlugs.slice(0, -1)].join('/') : null,
      ...group.data,
      megaReview: null,
      children: [],
    });
  }

  for (const group of groupsById.values()) {
    if (group.parentGroupId !== null && !groupsById.has(group.parentGroupId)) {
      throw new Error(`Grupo "${group.id}" não possui descritor do grupo pai "${group.parentGroupId}"`);
    }
  }

  const megaReviewSlugsByContest = new Map<string, Set<string>>();
  for (const megaReview of megaReviews) {
    const { contestSlug } = parseGroupId(megaReview.id);
    if (!contestsById.has(contestSlug)) {
      throw new Error(`Mega revisão "${megaReview.id}" referencia concurso inexistente`);
    }

    const group = groupsById.get(megaReview.id);
    if (!group) {
      throw new Error(`Mega revisão órfã para o grupo "${megaReview.id}"`);
    }

    const slugs = megaReviewSlugsByContest.get(contestSlug) ?? new Set<string>();
    if (slugs.has(megaReview.data.slug)) {
      throw new Error(
        `Slug público de mega revisão duplicado no concurso "${contestSlug}": "${megaReview.data.slug}"`,
      );
    }
    slugs.add(megaReview.data.slug);
    megaReviewSlugsByContest.set(contestSlug, slugs);
    group.megaReview = {
      id: megaReview.id,
      slug: megaReview.data.slug,
      title: megaReview.data.title ?? group.title,
    };
  }

  const references = allReferences;
  assertUnique(references.map(({ id }) => id), 'ID de referências');
  const subjectReferenceIds = new Set<string>();
  const megaReviewReferenceIds = new Set<string>();
  const resolutionReferenceIds = new Set<string>();

  for (const reference of references) {
    const parsed = parseReferenceId(reference.id);

    if (parsed.kind === 'subject') {
      if (!contentIds.has(parsed.subjectId!)) {
        throw new Error(`Referências órfãs para o assunto "${parsed.subjectId}"`);
      }
      subjectReferenceIds.add(parsed.subjectId!);
      continue;
    }

    if (parsed.kind === 'mega-review') {
      const group = groupsById.get(parsed.groupId!);
      if (!group?.megaReview) {
        throw new Error(`Referências órfãs para a mega revisão do grupo "${parsed.groupId}"`);
      }
      megaReviewReferenceIds.add(parsed.groupId!);
      continue;
    }

    if (!contentIds.has(parsed.subjectId!) || !resolutionsBySubject.has(parsed.subjectId!)) {
      throw new Error(`Referências órfãs para as resoluções do assunto "${parsed.subjectId}"`);
    }
    resolutionReferenceIds.add(parsed.subjectId!);
  }

  if (requireReferences) {
    assertMatchingSubjectFiles(contentIds, subjectReferenceIds, 'referências');

    for (const group of groupsById.values()) {
      if (group.megaReview && !megaReviewReferenceIds.has(group.id)) {
        throw new Error(`Mega revisão "${group.id}" não possui referências`);
      }
    }

    for (const subjectId of resolutionsBySubject.keys()) {
      if (!resolutionReferenceIds.has(subjectId)) {
        throw new Error(`Resoluções do assunto "${subjectId}" não possuem referências`);
      }
    }
  }

  const rootGroupsByContest = new Map<string, CatalogGroupIndex[]>();

  for (const group of groupsById.values()) {
    if (group.parentGroupId === null) {
      const rootGroups = rootGroupsByContest.get(group.contestSlug) ?? [];
      rootGroups.push(group);
      rootGroupsByContest.set(group.contestSlug, rootGroups);
    } else {
      groupsById.get(group.parentGroupId)!.children.push(group);
    }
  }

  const subjectsByContest = new Map<string, CatalogSubjectIndex[]>();
  const publicSubjectSlugsByContest = new Map<string, Set<string>>();

  for (const content of allContents) {
    const { contestSlug, groupSlugs, subjectSlug } = parseSubjectId(content.id);

    if (!contestsById.has(contestSlug)) {
      throw new Error(`Assunto "${content.id}" referencia concurso inexistente`);
    }

    if (groupsById.has(content.id)) {
      throw new Error(`ID editorial não pode representar grupo e assunto: "${content.id}"`);
    }

    const publicSubjectSlugs = publicSubjectSlugsByContest.get(contestSlug) ?? new Set<string>();
    if (publicSubjectSlugs.has(subjectSlug)) {
      throw new Error(
        `Slug público de assunto duplicado no concurso "${contestSlug}": "${subjectSlug}"`,
      );
    }
    publicSubjectSlugs.add(subjectSlug);
    publicSubjectSlugsByContest.set(contestSlug, publicSubjectSlugs);

    const groupPath = groupSlugs.map((groupSlug, index): CatalogGroupReference => {
      const groupId = [contestSlug, ...groupSlugs.slice(0, index + 1)].join('/');
      const group = groupsById.get(groupId);

      if (!group) {
        throw new Error(`Assunto "${content.id}" referencia grupo inexistente "${groupId}"`);
      }

      return { id: group.id, slug: groupSlug, title: group.title };
    });

    const subject: CatalogSubjectIndex = {
      kind: 'subject',
      id: content.id,
      slug: subjectSlug,
      contestSlug,
      groupPath,
      ...content.data,
      previousSubjectId: null,
      nextSubjectId: null,
      resolutions: [...(resolutionsBySubject.get(content.id) ?? [])].sort((a, b) =>
        a.questionId.localeCompare(b.questionId),
      ),
    };
    const subjects = subjectsByContest.get(contestSlug) ?? [];
    subjects.push(subject);
    subjectsByContest.set(contestSlug, subjects);
    groupsById.get(groupPath.at(-1)!.id)!.children.push(subject);
  }

  for (const group of groupsById.values()) {
    if (!hasSubjectDescendant(group)) {
      throw new Error(`Grupo "${group.id}" não possui assunto descendente`);
    }
  }

  // ----- linked mega review scope compatibility -----
  // Cada grupo vinculado deve cobrir exatamente o escopo canônico resolvido
  // pelos vínculos de assunto; a comparação é derivada, sem campo manual.
  const vinculoCanonicalBySubject = new Map(
    vinculos.map((vinculo) => [vinculo.id, vinculo.data.canonical]),
  );
  for (const vinculo of megaReviewVinculos) {
    const group = groupsById.get(vinculo.id)!;
    const scope = deriveLinkedMegaReviewScope(group, vinculoCanonicalBySubject);
    if (scope.unresolvedSubjectIds.length > 0) {
      throw new Error(
        `Mega revisão vinculada "${vinculo.id}" possui assuntos locais sem vínculo: ` +
          scope.unresolvedSubjectIds.map((id) => `"${id}"`).join(', '),
      );
    }
    const expected = deriveBibliotecaMegaReviewScope(vinculo.data.canonical, bibliotecaContentIds);
    if (expected.length === 0) {
      throw new Error(
        `Mega revisão canônica "${vinculo.data.canonical}" não possui assuntos de biblioteca`,
      );
    }
    const diff = diffMegaReviewScopes(scope.canonicalSubjectIds, expected);
    if (diff.missing.length > 0 || diff.extra.length > 0) {
      throw new Error(
        `Escopo incompatível para a mega revisão vinculada "${vinculo.id}" ` +
          `(canônico "${vinculo.data.canonical}")` +
          (diff.missing.length > 0
            ? `; faltando: ${diff.missing.map((id) => `"${id}"`).join(', ')}`
            : '') +
          (diff.extra.length > 0
            ? `; excedentes: ${diff.extra.map((id) => `"${id}"`).join(', ')}`
            : ''),
      );
    }
  }

  for (const rootGroups of rootGroupsByContest.values()) {
    sortTree(rootGroups);
  }

  const contests = sources.contests
    .map((contest): CatalogContestIndex => {
      const subjects = (subjectsByContest.get(contest.id) ?? []).sort(compareCatalogEntries);

      for (const [index, subject] of subjects.entries()) {
        subject.previousSubjectId = subjects[index - 1]?.id ?? null;
        subject.nextSubjectId = subjects[index + 1]?.id ?? null;
      }

      return {
        id: contest.id,
        slug: contest.id,
        ...contest.data,
        subjects,
        children: rootGroupsByContest.get(contest.id) ?? [],
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
    if (subject.resolutions.length > 0) {
      routes.push(`/resolucoes/${contest.storageId}/${subject.storageId}/`);
    }
  }
  appendMegaReviewRoutes(contest.children, contest.slug, routes);

  return {
    schemaVersion: 3,
    contestSlug: contest.slug,
    contestStorageId: contest.storageId,
    manifestHash: 'development',
    sharedHash: 'development',
    routes,
    assets: [...new Set(assets)].sort(),
    sharedAssets: [],
    estimatedBytes: null,
    resources: {},
    sharedResources: {},
  };
}
