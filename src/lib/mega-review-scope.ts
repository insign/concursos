import type { CatalogGroup, CatalogSubject, CatalogTreeNode } from './catalog';
import type { CatalogGroupIndex, CatalogTreeNodeIndex } from './catalog-core';

export type MegaReviewScopeEntry =
  | { kind: 'subject'; subject: CatalogSubject }
  | { kind: 'review'; group: CatalogGroup };

function collectNode(node: CatalogTreeNode, entries: MegaReviewScopeEntry[]): void {
  if (node.kind === 'subject') {
    entries.push({ kind: 'subject', subject: node });
    return;
  }

  if (node.megaReview) {
    entries.push({ kind: 'review', group: node });
    return;
  }

  node.children.forEach((child) => collectNode(child, entries));
}

export function collectMegaReviewScope(group: CatalogGroup): MegaReviewScopeEntry[] {
  const entries: MegaReviewScopeEntry[] = [];
  group.children.forEach((child) => collectNode(child, entries));
  return entries;
}

export interface LinkedMegaReviewScope {
  canonicalSubjectIds: string[];
  unresolvedSubjectIds: string[];
  key: string;
}

export interface MegaReviewScopeDiff {
  missing: string[];
  extra: string[];
}

/**
 * Chave de comparação derivada de um conjunto de IDs canônicos.
 * Ordenada e determinística; o interior pode ser substituído por um
 * fingerprint com hash (#723) sem alterar os chamadores.
 */
export function megaReviewScopeKey(canonicalSubjectIds: readonly string[]): string {
  return [...new Set(canonicalSubjectIds)].sort().join('\n');
}

export function diffMegaReviewScopes(
  actual: readonly string[],
  expected: readonly string[],
): MegaReviewScopeDiff {
  const actualSet = new Set(actual);
  const expectedSet = new Set(expected);
  return {
    missing: [...expectedSet].filter((id) => !actualSet.has(id)).sort(),
    extra: [...actualSet].filter((id) => !expectedSet.has(id)).sort(),
  };
}

/**
 * Deriva o escopo canônico de uma mega revisão de biblioteca a partir dos
 * assuntos de biblioteca existentes: todos os IDs sob o prefixo do grupo.
 */
export function deriveBibliotecaMegaReviewScope(
  canonicalGroupId: string,
  bibliotecaSubjectIds: Iterable<string>,
): string[] {
  const prefix = `${canonicalGroupId}/`;
  const matched: string[] = [];
  for (const id of bibliotecaSubjectIds) {
    if (id.startsWith(prefix)) {
      matched.push(id);
    }
  }
  return [...new Set(matched)].sort();
}

function collectIndexSubjectIds(node: CatalogTreeNodeIndex, ids: string[]): void {
  if (node.kind === 'subject') {
    ids.push(node.id);
    return;
  }
  node.children.forEach((child) => collectIndexSubjectIds(child, ids));
}

/**
 * Deriva o escopo de um grupo consumidor resolvendo cada assunto descendente
 * pelo vínculo de assunto. Achata delegações de sub-revisões: a validação de
 * compatibilidade considera todos os descendentes, não a apresentação.
 * Assuntos físicos sem vínculo são reportados como não resolvidos.
 */
export function deriveLinkedMegaReviewScope(
  group: CatalogGroupIndex,
  canonicalBySubjectId: ReadonlyMap<string, string>,
): LinkedMegaReviewScope {
  const subjectIds: string[] = [];
  group.children.forEach((child) => collectIndexSubjectIds(child, subjectIds));

  const canonicalSubjectIds: string[] = [];
  const unresolvedSubjectIds: string[] = [];
  for (const subjectId of subjectIds) {
    const canonical = canonicalBySubjectId.get(subjectId);
    if (canonical === undefined) {
      unresolvedSubjectIds.push(subjectId);
    } else {
      canonicalSubjectIds.push(canonical);
    }
  }
  canonicalSubjectIds.sort();
  unresolvedSubjectIds.sort();
  return {
    canonicalSubjectIds,
    unresolvedSubjectIds,
    key: megaReviewScopeKey(canonicalSubjectIds),
  };
}
