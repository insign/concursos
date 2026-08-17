import { describe, expect, it } from 'vitest';
import { buildCatalogIndex, createOfflineInventory, type CatalogSources } from '../../src/lib/catalog-core';

function questionSet() {
  return { schemaVersion: 1 as const, questionSetRevision: 1, questions: [] };
}

function sources(): CatalogSources {
  return {
    contests: [
      {
        id: 'concurso-b',
        data: { schemaVersion: 1, title: 'Concurso B', description: 'B', order: 2, storageId: 'b' },
      },
      {
        id: 'concurso-a',
        data: { schemaVersion: 1, title: 'Concurso A', description: 'A', order: 1, storageId: 'a' },
      },
    ],
    groups: [
      {
        id: 'concurso-a/area-b',
        data: { schemaVersion: 1, title: 'Área B', description: 'Grupo B', order: 2 },
      },
      {
        id: 'concurso-a/area-a/fundamentos',
        data: { schemaVersion: 1, title: 'Fundamentos', order: 1 },
      },
      {
        id: 'concurso-a/area-a',
        data: { schemaVersion: 1, title: 'Área A', order: 1 },
      },
    ],
    contents: [
      {
        id: 'concurso-a/area-b/segundo',
        data: {
          schemaVersion: 1,
          title: 'Segundo',
          description: 'Segundo',
          order: 2,
          storageId: 'segundo',
        },
      },
      {
        id: 'concurso-a/area-a/fundamentos/primeiro',
        data: {
          schemaVersion: 1,
          title: 'Primeiro',
          description: 'Primeiro',
          order: 1,
          storageId: 'primeiro',
        },
      },
    ],
    cheatSheetIds: [
      'concurso-a/area-b/segundo',
      'concurso-a/area-a/fundamentos/primeiro',
    ],
    questionSets: [
      { id: 'concurso-a/area-b/segundo', data: questionSet() },
      { id: 'concurso-a/area-a/fundamentos/primeiro', data: questionSet() },
    ],
  };
}

function addGroup(source: CatalogSources, id: string, title: string, order = 1): void {
  source.groups.push({ id, data: { schemaVersion: 1, title, order } });
}

function addMegaReview(source: CatalogSources, id: string, slug: string, title?: string): void {
  source.megaReviews ??= [];
  source.megaReviews.push({
    id,
    data: { schemaVersion: 1, slug, ...(title ? { title } : {}) },
  });
}

function addSubject(
  source: CatalogSources,
  id: string,
  title: string,
  order: number,
  storageId: string,
): void {
  source.contents.push({
    id,
    data: { schemaVersion: 1, title, description: title, order, storageId },
  });
  source.cheatSheetIds.push(id);
  source.questionSets.push({ id, data: questionSet() });
}

function renameSubject(source: CatalogSources, index: number, id: string): void {
  source.contents[index]!.id = id;
  source.cheatSheetIds[index] = id;
  source.questionSets[index]!.id = id;
}

describe('catalog', () => {
  it('builds a sorted tree and keeps a globally sorted subject projection', () => {
    const catalog = buildCatalogIndex(sources());
    expect(catalog.contests.map(({ id }) => id)).toEqual(['concurso-a', 'concurso-b']);

    const contest = catalog.contests[0]!;
    expect(contest.children.map(({ id }) => id)).toEqual(['concurso-a/area-a', 'concurso-a/area-b']);
    expect(contest.children[0]!.children[0]).toMatchObject({
      kind: 'group',
      id: 'concurso-a/area-a/fundamentos',
    });
    expect(contest.children[0]!.children[0]!.kind === 'group'
      ? contest.children[0]!.children[0]!.children[0]
      : null).toMatchObject({
      kind: 'subject',
      id: 'concurso-a/area-a/fundamentos/primeiro',
    });
    expect(contest.subjects.map(({ id }) => id)).toEqual([
      'concurso-a/area-a/fundamentos/primeiro',
      'concurso-a/area-b/segundo',
    ]);
    expect(contest.subjects[0]!.groupPath).toEqual([
      { id: 'concurso-a/area-a', slug: 'area-a', title: 'Área A' },
      {
        id: 'concurso-a/area-a/fundamentos',
        slug: 'fundamentos',
        title: 'Fundamentos',
      },
    ]);
    expect(contest.subjects[0]!.nextSubjectId).toBe('concurso-a/area-b/segundo');
    expect(contest.subjects[1]!.previousSubjectId).toBe(
      'concurso-a/area-a/fundamentos/primeiro',
    );
    expect(contest.children[0]!.megaReview).toBeNull();
  });

  it('sorts sibling groups and subjects deterministically', () => {
    const fixture = sources();
    addSubject(fixture, 'concurso-a/area-a/abordagem', 'Abordagem', 1, 'abordagem');
    const area = buildCatalogIndex(fixture).contests[0]!.children[0]!;
    expect(area.children.map(({ title }) => title)).toEqual(['Abordagem', 'Fundamentos']);
  });

  it('rejects direct subjects and missing group descriptors', () => {
    const direct = sources();
    renameSubject(direct, 0, 'concurso-a/segundo');
    expect(() => buildCatalogIndex(direct)).toThrow('<concurso>/<grupo>');

    const missing = sources();
    renameSubject(missing, 0, 'concurso-a/area-b/ausente/segundo');
    expect(() => buildCatalogIndex(missing)).toThrow('referencia grupo inexistente');
  });

  it('rejects invalid group ancestry and groups without subject descendants', () => {
    const nonexistentContest = sources();
    addGroup(nonexistentContest, 'ausente/grupo', 'Grupo');
    expect(() => buildCatalogIndex(nonexistentContest)).toThrow('concurso inexistente');

    const missingParent = sources();
    addGroup(missingParent, 'concurso-a/ausente/subgrupo', 'Subgrupo');
    expect(() => buildCatalogIndex(missingParent)).toThrow('descritor do grupo pai');

    const empty = sources();
    addGroup(empty, 'concurso-a/vazio', 'Vazio');
    expect(() => buildCatalogIndex(empty)).toThrow('não possui assunto descendente');
  });

  it('rejects duplicate public subject slugs across groups', () => {
    const duplicate = sources();
    addSubject(duplicate, 'concurso-a/area-b/primeiro', 'Outro primeiro', 3, 'outro-primeiro');
    expect(() => buildCatalogIndex(duplicate)).toThrow('Slug público de assunto duplicado');
  });

  it('rejects missing and orphan companion files', () => {
    const missing = sources();
    missing.cheatSheetIds.pop();
    expect(() => buildCatalogIndex(missing)).toThrow('não possui cheat sheet');

    const orphan = sources();
    orphan.questionSets.push({
      id: 'concurso-a/area-a/orfao',
      data: questionSet(),
    });
    expect(() => buildCatalogIndex(orphan)).toThrow('órfão');
  });

  it('indexes resolutions by subject and validates their question revision', () => {
    const fixture = sources();
    const subjectId = fixture.questionSets[0]!.id;
    fixture.questionSets[0]!.data.questions.push({
      id: 'q001',
      revision: 1,
      origin: 'authorial',
      prompt: 'Pergunta?',
      options: [
        { id: 'a', text: 'A' },
        { id: 'b', text: 'B' },
      ],
      correctOptionId: 'a',
      explanation: 'Explicação.',
    });
    fixture.resolutions = [
      {
        id: `${subjectId}/resolucoes/q001`,
        data: { schemaVersion: 1, questionRevision: 1 },
      },
    ];

    expect(buildCatalogIndex(fixture).contests[0]!.subjects[1]!.resolutions).toEqual([
      { questionId: 'q001', questionRevision: 1 },
    ]);

    const future = structuredClone(fixture);
    future.resolutions![0]!.data.questionRevision = 2;
    expect(() => buildCatalogIndex(future)).toThrow('usa a revisão 2');

    const unknownQuestion = structuredClone(fixture);
    unknownQuestion.resolutions![0]!.id = `${subjectId}/resolucoes/missing`;
    expect(() => buildCatalogIndex(unknownQuestion)).toThrow('questão inexistente');

    const orphan = structuredClone(fixture);
    orphan.resolutions![0]!.id = 'concurso-a/area-a/orfao/resolucoes/q001';
    expect(() => buildCatalogIndex(orphan)).toThrow('Resolução órfã');
  });

  it('rejects nonexistent contests and duplicate storage IDs', () => {
    const nonexistent = sources();
    renameSubject(nonexistent, 0, 'ausente/grupo/segundo');
    expect(() => buildCatalogIndex(nonexistent)).toThrow('concurso inexistente');

    const duplicate = sources();
    duplicate.contents[1]!.data.storageId = 'segundo';
    expect(() => buildCatalogIndex(duplicate)).toThrow('storageId de assunto duplicado');
  });

  it('rejects duplicate canonical IDs', () => {
    const duplicateContest = sources();
    duplicateContest.contests.push(structuredClone(duplicateContest.contests[0]!));
    expect(() => buildCatalogIndex(duplicateContest)).toThrow('ID de concurso duplicado');

    const duplicateGroup = sources();
    duplicateGroup.groups.push(structuredClone(duplicateGroup.groups[0]!));
    expect(() => buildCatalogIndex(duplicateGroup)).toThrow('ID de grupo duplicado');

    const duplicateSubject = sources();
    duplicateSubject.contents.push(structuredClone(duplicateSubject.contents[0]!));
    expect(() => buildCatalogIndex(duplicateSubject)).toThrow('ID de assunto duplicado');
  });

  it('indexes optional mega reviews without changing the subject projection', () => {
    const fixture = sources();
    addMegaReview(fixture, 'concurso-a/area-a', 'area-a-revisao', 'Revisão da Área A');
    addMegaReview(fixture, 'concurso-a/area-a/fundamentos', 'fundamentos-revisao');

    const catalog = buildCatalogIndex(fixture);
    const contest = catalog.contests[0]!;
    const area = contest.children[0]!;
    const nested = area.children[0]!;

    expect(area.megaReview).toEqual({
      id: 'concurso-a/area-a',
      slug: 'area-a-revisao',
      title: 'Revisão da Área A',
    });
    expect(nested.kind === 'group' ? nested.megaReview : null).toEqual({
      id: 'concurso-a/area-a/fundamentos',
      slug: 'fundamentos-revisao',
      title: 'Fundamentos',
    });
    expect(contest.subjects.map(({ id }) => id)).toEqual([
      'concurso-a/area-a/fundamentos/primeiro',
      'concurso-a/area-b/segundo',
    ]);

    const inventory = createOfflineInventory(contest);
    expect(inventory.routes).toContain('/revisoes/concurso-a/area-a-revisao/');
    expect(inventory.routes).toContain('/revisoes/concurso-a/fundamentos-revisao/');
  });

  it('rejects orphan, invalid-contest and duplicate mega reviews', () => {
    const orphan = sources();
    addMegaReview(orphan, 'concurso-a/ausente', 'revisao-ausente');
    expect(() => buildCatalogIndex(orphan)).toThrow('Mega revisão órfã');

    const invalidContest = sources();
    addMegaReview(invalidContest, 'ausente/grupo', 'revisao-ausente');
    expect(() => buildCatalogIndex(invalidContest)).toThrow('referencia concurso inexistente');

    const duplicateId = sources();
    addMegaReview(duplicateId, 'concurso-a/area-a', 'revisao-a');
    addMegaReview(duplicateId, 'concurso-a/area-a', 'revisao-b');
    expect(() => buildCatalogIndex(duplicateId)).toThrow('ID de mega revisão duplicado');

    const duplicateSlug = sources();
    addMegaReview(duplicateSlug, 'concurso-a/area-a', 'revisao');
    addMegaReview(duplicateSlug, 'concurso-a/area-b', 'revisao');
    expect(() => buildCatalogIndex(duplicateSlug)).toThrow('Slug público de mega revisão duplicado');
  });

  it('generates only short public routes in the offline inventory', () => {
    const contest = buildCatalogIndex(sources()).contests[0]!;
    const inventory = createOfflineInventory(contest, ['/asset.svg', '/asset.svg']);
    expect(inventory).toEqual({
      schemaVersion: 1,
      contestSlug: 'concurso-a',
      contestStorageId: 'a',
      manifestHash: 'development',
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
      sharedAssets: [],
      estimatedBytes: null,
    });
    expect(inventory.routes.join('\n')).not.toMatch(/area-a|area-b|fundamentos/);
    expect(inventory.routes.join('\n')).not.toContain('/leitura/');
    expect(inventory.routes.join('\n')).not.toContain('#focus');
  });

  it('adds resolution routes only to contests with resolution content', () => {
    const fixture = sources();
    const subjectId = fixture.questionSets[0]!.id;
    fixture.questionSets[0]!.data.questions.push({
      id: 'q001',
      revision: 1,
      origin: 'authorial',
      prompt: 'Pergunta?',
      options: [
        { id: 'a', text: 'A' },
        { id: 'b', text: 'B' },
      ],
      correctOptionId: 'a',
      explanation: 'Explicação.',
    });
    fixture.resolutions = [{
      id: `${subjectId}/resolucoes/q001`,
      data: { schemaVersion: 1, questionRevision: 1 },
    }];
    const contest = buildCatalogIndex(fixture).contests[0]!;
    const inventory = createOfflineInventory(contest);
    expect(inventory.routes).toContain('/resolucoes/a/segundo/');
  });
});
