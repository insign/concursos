import { describe, expect, it } from 'vitest';
import {
  collectMegaReviewScope,
  deriveBibliotecaMegaReviewScope,
  deriveLinkedMegaReviewScope,
  diffMegaReviewScopes,
  megaReviewScopeKey,
} from '../../src/lib/mega-review-scope';
import type { CatalogGroup, CatalogSubject } from '../../src/lib/catalog';
import type { CatalogGroupIndex, CatalogSubjectIndex } from '../../src/lib/catalog-core';

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

function indexSubject(id: string): CatalogSubjectIndex {
  return { kind: 'subject', id } as CatalogSubjectIndex;
}

function indexGroup(id: string, children: CatalogGroupIndex['children'] = []): CatalogGroupIndex {
  return { kind: 'group', id, megaReview: null, children } as CatalogGroupIndex;
}

describe('linked mega review scope', () => {
  it('derives the biblioteca scope from the group path prefix', () => {
    expect(
      deriveBibliotecaMegaReviewScope('gestao-contratos', [
        'gestao-contratos/a',
        'gestao-contratos/sub/b',
        'gestao-contratos-outro/c',
        'outro/d',
      ]),
    ).toEqual(['gestao-contratos/a', 'gestao-contratos/sub/b']);
    expect(deriveBibliotecaMegaReviewScope('vazio', ['outro/a'])).toEqual([]);
  });

  it('resolves linked group descendants through subject vinculos', () => {
    const root = indexGroup('concurso/grupo', [
      indexSubject('concurso/grupo/a'),
      indexGroup('concurso/grupo/sub', [indexSubject('concurso/grupo/sub/b')]),
    ]);
    const canonicalBySubject = new Map([
      ['concurso/grupo/a', 'bib/a'],
      ['concurso/grupo/sub/b', 'bib/b'],
    ]);

    expect(deriveLinkedMegaReviewScope(root, canonicalBySubject)).toEqual({
      canonicalSubjectIds: ['bib/a', 'bib/b'],
      unresolvedSubjectIds: [],
      key: 'bib/a\nbib/b',
    });
  });

  it('flattens nested groups with their own review for compatibility', () => {
    const nested = indexGroup('concurso/grupo/sub', [indexSubject('concurso/grupo/sub/b')]);
    nested.megaReview = { id: nested.id, slug: 'sub', title: 'Sub' };
    const root = indexGroup('concurso/grupo', [indexSubject('concurso/grupo/a'), nested]);
    const canonicalBySubject = new Map([
      ['concurso/grupo/a', 'bib/a'],
      ['concurso/grupo/sub/b', 'bib/b'],
    ]);

    expect(deriveLinkedMegaReviewScope(root, canonicalBySubject).canonicalSubjectIds).toEqual([
      'bib/a',
      'bib/b',
    ]);
  });

  it('reports physical descendants as unresolved', () => {
    const root = indexGroup('concurso/grupo', [
      indexSubject('concurso/grupo/a'),
      indexSubject('concurso/grupo/local'),
    ]);
    const scope = deriveLinkedMegaReviewScope(root, new Map([['concurso/grupo/a', 'bib/a']]));

    expect(scope.canonicalSubjectIds).toEqual(['bib/a']);
    expect(scope.unresolvedSubjectIds).toEqual(['concurso/grupo/local']);
  });

  it('compares scopes order-insensitively with missing and extra IDs', () => {
    expect(diffMegaReviewScopes(['b', 'a'], ['a', 'b'])).toEqual({ missing: [], extra: [] });
    expect(diffMegaReviewScopes(['a'], ['a', 'b'])).toEqual({ missing: ['b'], extra: [] });
    expect(diffMegaReviewScopes(['a', 'c'], ['a', 'b'])).toEqual({ missing: ['b'], extra: ['c'] });
    expect(megaReviewScopeKey(['b', 'a', 'a'])).toBe('a\nb');
  });
});
