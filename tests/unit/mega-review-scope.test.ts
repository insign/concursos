import { describe, expect, it } from 'vitest';
import { collectMegaReviewScope } from '../../src/lib/mega-review-scope';
import type { CatalogGroup, CatalogSubject } from '../../src/lib/catalog';

function subject(id: string): CatalogSubject {
  return { kind: 'subject', id } as CatalogSubject;
}

function group(id: string, children: Array<CatalogGroup | CatalogSubject>, hasReview = false): CatalogGroup {
  return {
    kind: 'group',
    id,
    megaReview: hasReview ? { id, slug: `${id.replaceAll('/', '-')}-review`, title: id } : null,
    children,
  } as CatalogGroup;
}

describe('mega review scope', () => {
  it('collects all descendants in tree order', () => {
    const root = group('concurso/grupo', [
      subject('concurso/grupo/primeiro'),
      group('concurso/grupo/subgrupo', [subject('concurso/grupo/subgrupo/segundo')]),
    ]);

    expect(collectMegaReviewScope(root).map((entry) => entry.kind === 'subject' ? entry.subject.id : entry.group.id)).toEqual([
      'concurso/grupo/primeiro',
      'concurso/grupo/subgrupo/segundo',
    ]);
  });

  it('delegates a nested group that has its own review', () => {
    const nested = group('concurso/grupo/subgrupo', [subject('concurso/grupo/subgrupo/segundo')], true);
    const root = group('concurso/grupo', [subject('concurso/grupo/primeiro'), nested]);

    expect(collectMegaReviewScope(root)).toMatchObject([
      { kind: 'subject', subject: { id: 'concurso/grupo/primeiro' } },
      { kind: 'review', group: { id: 'concurso/grupo/subgrupo' } },
    ]);
  });
});
