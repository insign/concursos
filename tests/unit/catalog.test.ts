import { describe, expect, it } from 'vitest';
import { buildCatalogIndex, createOfflineInventory, type CatalogSources } from '../../src/lib/catalog-core';

function sources(): CatalogSources {
  return {
    contests: [
      {
        id: 'concurso-b',
        data: {
          schemaVersion: 1,
          title: 'Concurso B',
          description: 'B',
          order: 2,
          storageId: 'b',
        },
      },
      {
        id: 'concurso-a',
        data: {
          schemaVersion: 1,
          title: 'Concurso A',
          description: 'A',
          order: 1,
          storageId: 'a',
        },
      },
    ],
    contents: [
      {
        id: 'concurso-a/segundo',
        data: {
          schemaVersion: 1,
          title: 'Segundo',
          description: 'Segundo',
          order: 2,
          storageId: 'segundo',
        },
      },
      {
        id: 'concurso-a/primeiro',
        data: {
          schemaVersion: 1,
          title: 'Primeiro',
          description: 'Primeiro',
          order: 1,
          storageId: 'primeiro',
        },
      },
    ],
    cheatSheetIds: ['concurso-a/segundo', 'concurso-a/primeiro'],
    questionSets: [
      { id: 'concurso-a/segundo', data: { schemaVersion: 1, questionSetRevision: 1, questions: [] } },
      { id: 'concurso-a/primeiro', data: { schemaVersion: 1, questionSetRevision: 1, questions: [] } },
    ],
  };
}

describe('catalog', () => {
  it('sorts entries and links adjacent subjects', () => {
    const catalog = buildCatalogIndex(sources());
    expect(catalog.contests.map(({ id }) => id)).toEqual(['concurso-a', 'concurso-b']);
    expect(catalog.contests[0]!.subjects.map(({ id }) => id)).toEqual([
      'concurso-a/primeiro',
      'concurso-a/segundo',
    ]);
    expect(catalog.contests[0]!.subjects[0]!.nextSubjectId).toBe('concurso-a/segundo');
    expect(catalog.contests[0]!.subjects[1]!.previousSubjectId).toBe('concurso-a/primeiro');
  });

  it('rejects missing and orphan companion files', () => {
    const missing = sources();
    missing.cheatSheetIds.pop();
    expect(() => buildCatalogIndex(missing)).toThrow('não possui cheat sheet');

    const orphan = sources();
    orphan.questionSets.push({
      id: 'concurso-a/orfao',
      data: { schemaVersion: 1, questionSetRevision: 1, questions: [] },
    });
    expect(() => buildCatalogIndex(orphan)).toThrow('órfão');
  });

  it('rejects nonexistent contests and duplicate storage IDs', () => {
    const nonexistent = sources();
    nonexistent.contents[0]!.id = 'ausente/segundo';
    nonexistent.cheatSheetIds[0] = 'ausente/segundo';
    nonexistent.questionSets[0]!.id = 'ausente/segundo';
    expect(() => buildCatalogIndex(nonexistent)).toThrow('concurso inexistente');

    const duplicate = sources();
    duplicate.contents[1]!.data.storageId = 'segundo';
    expect(() => buildCatalogIndex(duplicate)).toThrow('storageId de assunto duplicado');
  });

  it('rejects duplicate canonical IDs', () => {
    const duplicateContest = sources();
    duplicateContest.contests.push(structuredClone(duplicateContest.contests[0]!));
    expect(() => buildCatalogIndex(duplicateContest)).toThrow('ID de concurso duplicado');

    const duplicateSubject = sources();
    duplicateSubject.contents.push(structuredClone(duplicateSubject.contents[0]!));
    expect(() => buildCatalogIndex(duplicateSubject)).toThrow('ID de assunto duplicado');
  });

  it('generates the contest offline route inventory', () => {
    const contest = buildCatalogIndex(sources()).contests[0]!;
    expect(createOfflineInventory(contest, ['/asset.svg', '/asset.svg'])).toEqual({
      schemaVersion: 1,
      contestSlug: 'concurso-a',
      contestStorageId: 'a',
      routes: [
        '/concursos/concurso-a/',
        '/concursos/concurso-a/primeiro/',
        '/concursos/concurso-a/primeiro/cheat-sheet/',
        '/concursos/concurso-a/primeiro/questoes/',
        '/concursos/concurso-a/segundo/',
        '/concursos/concurso-a/segundo/cheat-sheet/',
        '/concursos/concurso-a/segundo/questoes/',
      ],
      assets: ['/asset.svg'],
    });
  });
});
