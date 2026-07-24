import { describe, expect, it } from 'vitest';
import {
  EMPTY_STUDIED,
  isStudied,
  studiedSchema,
  studiedSubjectId,
  toggleStudiedIds,
  type StudiedDocument,
} from '../../src/lib/studied';

const at = '2026-07-24T00:00:00.000Z';

describe('studied subjects document', () => {
  it('builds a stable subject id from storage ids', () => {
    expect(studiedSubjectId('tcema-2026-adm', 'leitura-tipos-generos')).toBe(
      'tcema-2026-adm--leitura-tipos-generos',
    );
  });

  it('validates the versioned schema strictly', () => {
    expect(studiedSchema.safeParse(EMPTY_STUDIED).success).toBe(true);
    expect(
      studiedSchema.safeParse({ schemaVersion: 1, studiedSubjectIds: ['a--b'], updatedAt: at }).success,
    ).toBe(true);
    // Versão inválida, id fora do formato, campo extra e updatedAt inválido são rejeitados.
    expect(studiedSchema.safeParse({ schemaVersion: 2, studiedSubjectIds: [], updatedAt: at }).success).toBe(false);
    expect(studiedSchema.safeParse({ schemaVersion: 1, studiedSubjectIds: ['NOPE'], updatedAt: at }).success).toBe(false);
    expect(studiedSchema.safeParse({ schemaVersion: 1, studiedSubjectIds: [], updatedAt: at, extra: 1 }).success).toBe(false);
    expect(studiedSchema.safeParse({ schemaVersion: 1, studiedSubjectIds: [], updatedAt: 'nope' }).success).toBe(false);
  });

  it('reports whether a subject is studied', () => {
    const doc: StudiedDocument = { schemaVersion: 1, studiedSubjectIds: ['a--b'], updatedAt: at };
    expect(isStudied(doc, 'a--b')).toBe(true);
    expect(isStudied(doc, 'a--c')).toBe(false);
  });

  it('adds a subject keeping the list sorted and deduplicated', () => {
    const doc: StudiedDocument = { schemaVersion: 1, studiedSubjectIds: ['b--two'], updatedAt: at };
    const next = toggleStudiedIds(doc, 'a--one', true, at);
    expect(next.studiedSubjectIds).toEqual(['a--one', 'b--two']);
    // Marcar de novo é idempotente.
    expect(toggleStudiedIds(next, 'a--one', true, at).studiedSubjectIds).toEqual(['a--one', 'b--two']);
    expect(next.updatedAt).toBe(at);
  });

  it('removes a subject without touching the others', () => {
    const doc: StudiedDocument = { schemaVersion: 1, studiedSubjectIds: ['a--one', 'b--two'], updatedAt: at };
    expect(toggleStudiedIds(doc, 'a--one', false, at).studiedSubjectIds).toEqual(['b--two']);
    // Desmarcar um ausente é no-op.
    expect(toggleStudiedIds(doc, 'z--z', false, at).studiedSubjectIds).toEqual(['a--one', 'b--two']);
  });
});
