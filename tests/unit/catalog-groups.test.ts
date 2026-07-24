import { describe, expect, it } from 'vitest';
import {
  CATALOG_GROUPS_STORAGE_KEY,
  parseCollapsedGroups,
  serializeCollapsedGroups,
} from '../../src/lib/catalog-groups';

describe('catalog groups persistence', () => {
  it('uses a stable, namespaced storage key', () => {
    expect(CATALOG_GROUPS_STORAGE_KEY).toBe('concursos:catalog-groups');
  });

  it('treats missing or empty input as no collapsed groups (default expanded)', () => {
    expect(parseCollapsedGroups(null)).toEqual(new Set());
    expect(parseCollapsedGroups(undefined)).toEqual(new Set());
    expect(parseCollapsedGroups('')).toEqual(new Set());
  });

  it('tolerates malformed or unexpected payloads without throwing', () => {
    expect(parseCollapsedGroups('{ not json')).toEqual(new Set());
    expect(parseCollapsedGroups('123')).toEqual(new Set());
    expect(parseCollapsedGroups('"a-string"')).toEqual(new Set());
    expect(parseCollapsedGroups('null')).toEqual(new Set());
    expect(parseCollapsedGroups('[]')).toEqual(new Set());
    expect(parseCollapsedGroups('{"version":1}')).toEqual(new Set());
    expect(parseCollapsedGroups('{"version":1,"collapsed":"nope"}')).toEqual(new Set());
    expect(parseCollapsedGroups('{"version":1,"collapsed":{"a":true}}')).toEqual(new Set());
  });

  it('ignores documents with a missing or unknown version instead of misreading them', () => {
    // Sem checar a versão, esta carga seria restaurada erroneamente.
    expect(parseCollapsedGroups('{"collapsed":["concurso/grupo"]}')).toEqual(new Set());
    expect(parseCollapsedGroups('{"version":0,"collapsed":["concurso/grupo"]}')).toEqual(new Set());
    expect(parseCollapsedGroups('{"version":2,"collapsed":["concurso/grupo"]}')).toEqual(new Set());
    expect(parseCollapsedGroups('{"version":"1","collapsed":["concurso/grupo"]}')).toEqual(new Set());
  });

  it('keeps only non-empty string ids from the collapsed list', () => {
    expect(
      parseCollapsedGroups('{"version":1,"collapsed":["concurso/grupo",42,"",null,"concurso/outro"]}'),
    ).toEqual(new Set(['concurso/grupo', 'concurso/outro']));
  });

  it('serializes a versioned, deterministically ordered document', () => {
    const serialized = serializeCollapsedGroups(new Set(['b/two', 'a/one', 'a/one']));
    expect(serialized).toBe('{"version":1,"collapsed":["a/one","b/two"]}');
    expect(JSON.parse(serialized)).toEqual({ version: 1, collapsed: ['a/one', 'b/two'] });
  });

  it('round-trips a set of collapsed ids', () => {
    const collapsed = new Set(['concurso/grupo-1', 'concurso/grupo-2/sub']);
    expect(parseCollapsedGroups(serializeCollapsedGroups(collapsed))).toEqual(collapsed);
  });
});
