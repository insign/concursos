import type { ContestData, GroupData, QuestionSet, SubjectData } from './content-schema';
import { parseGroupId, parseSubjectId } from './content-paths';

export interface CatalogRecord<T> {
  id: string;
  data: T;
}

export interface CatalogSources {
  contests: CatalogRecord<ContestData>[];
  groups: CatalogRecord<GroupData>[];
  contents: CatalogRecord<SubjectData>[];
  cheatSheetIds: string[];
  questionSets: CatalogRecord<QuestionSet>[];
}

export interface CatalogGroupReference {
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
}

export interface CatalogGroupIndex extends GroupData {
  kind: 'group';
  id: string;
  slug: string;
  contestSlug: string;
  parentGroupId: string | null;
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

function compareCatalogEntries(
  a: Pick<CatalogTreeNodeIndex, 'id' | 'order' | 'title'>,
  b: Pick<CatalogTreeNodeIndex, 'id' | 'order' | 'title'>,
): number {
  return a.order - b.order || a.title.localeCompare(b.title, 'pt-BR') || a.id.localeCompare(b.id);
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

export function buildCatalogIndex(sources: CatalogSources): CatalogIndex {
  assertUnique(sources.contests.map(({ id }) => id), 'ID de concurso');
  assertUnique(sources.groups.map(({ id }) => id), 'ID de grupo');
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
      children: [],
    });
  }

  for (const group of groupsById.values()) {
    if (group.parentGroupId !== null && !groupsById.has(group.parentGroupId)) {
      throw new Error(`Grupo "${group.id}" não possui descritor do grupo pai "${group.parentGroupId}"`);
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

  for (const content of sources.contents) {
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
