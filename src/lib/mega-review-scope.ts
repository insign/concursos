import type { CatalogGroup, CatalogSubject, CatalogTreeNode } from './catalog';

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
