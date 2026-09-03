import { describe, expect, it } from 'vitest';
import {
  buildCatalogIndex,
  createOfflineInventory,
  remapBibliotecaResolutionId,
  type CatalogSources,
} from '../../src/lib/catalog-core';

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
      schemaVersion: 3,
      contestSlug: 'concurso-a',
      contestStorageId: 'a',
      manifestHash: 'development',
      sharedHash: 'development',
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
      resources: {},
      sharedResources: {},
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

describe('catalog references', () => {
  function addReference(source: CatalogSources, id: string): void {
    source.references ??= [];
    source.references.push({ id, data: {} });
  }

  it('accepts coherent optional references and rejects orphan subjects', () => {
    const fixture = sources();
    addReference(fixture, 'concurso-a/area-a/fundamentos/primeiro');
    expect(() => buildCatalogIndex(fixture)).not.toThrow();

    const orphan = sources();
    addReference(orphan, 'concurso-a/area-a/inexistente');
    expect(() => buildCatalogIndex(orphan)).toThrow('Referências órfãs para o assunto');
  });

  it('rejects duplicate ids and mega review or resolution orphans', () => {
    const duplicated = sources();
    addReference(duplicated, 'concurso-a/area-a/fundamentos/primeiro');
    addReference(duplicated, 'concurso-a/area-a/fundamentos/primeiro');
    expect(() => buildCatalogIndex(duplicated)).toThrow('ID de referências duplicado');

    const reviewRefs = sources();
    addMegaReview(reviewRefs, 'concurso-a/area-b', 'revisao-b');
    addReference(reviewRefs, 'concurso-a/area-b/mega-revisao');
    expect(() => buildCatalogIndex(reviewRefs)).not.toThrow();

    const orphanReviewRefs = sources();
    addMegaReview(orphanReviewRefs, 'concurso-a/area-b', 'revisao-b');
    addReference(orphanReviewRefs, 'concurso-a/area-a/mega-revisao');
    expect(() => buildCatalogIndex(orphanReviewRefs)).toThrow('Referências órfãs para a mega revisão');

    const orphanResolutionRefs = sources();
    addReference(orphanResolutionRefs, 'concurso-a/area-b/segundo/resolucoes');
    expect(() => buildCatalogIndex(orphanResolutionRefs)).toThrow(
      'Referências órfãs para as resoluções',
    );
  });

  it('enforces the obligatory matrix only when required', () => {
    const fixture = sources();
    expect(() => buildCatalogIndex(fixture)).not.toThrow();
    expect(() => buildCatalogIndex(fixture, { requireReferences: true })).toThrow(
      'Assunto "concurso-a/area-b/segundo" não possui referências',
    );

    const complete = sources();
    addReference(complete, 'concurso-a/area-a/fundamentos/primeiro');
    addReference(complete, 'concurso-a/area-b/segundo');
    expect(() => buildCatalogIndex(complete, { requireReferences: true })).not.toThrow();

    const withReview = structuredClone(complete);
    addMegaReview(withReview, 'concurso-a/area-b', 'revisao-b');
    expect(() => buildCatalogIndex(withReview, { requireReferences: true })).toThrow(
      'Mega revisão "concurso-a/area-b" não possui referências',
    );
    addReference(withReview, 'concurso-a/area-b/mega-revisao');
    expect(() => buildCatalogIndex(withReview, { requireReferences: true })).not.toThrow();

    const withResolutions = structuredClone(withReview);
    const secondSet = withResolutions.questionSets.find(
      (set) => set.id === 'concurso-a/area-b/segundo',
    )!;
    secondSet.data.questions.push({
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
    withResolutions.resolutions = [
      {
        id: 'concurso-a/area-b/segundo/resolucoes/q001',
        data: { schemaVersion: 1, questionRevision: 1 },
      },
    ];
    expect(() => buildCatalogIndex(withResolutions, { requireReferences: true })).toThrow(
      'Resoluções do assunto "concurso-a/area-b/segundo" não possuem referências',
    );
    addReference(withResolutions, 'concurso-a/area-b/segundo/resolucoes');
    expect(() => buildCatalogIndex(withResolutions, { requireReferences: true })).not.toThrow();
  });

  it('keeps optional mode permissive about absent companions', () => {
    const withReview = sources();
    addMegaReview(withReview, 'concurso-a/area-b', 'revisao-b');
    expect(() => buildCatalogIndex(withReview, { requireReferences: false })).not.toThrow();
  });
});

function linkedSources(): CatalogSources {
  const fixture: CatalogSources = {
    contests: [
      {
        id: 'concurso-a',
        data: { schemaVersion: 1, title: 'A', description: 'A', order: 1, storageId: 'a' },
      },
      {
        id: 'concurso-b',
        data: { schemaVersion: 1, title: 'B', description: 'B', order: 2, storageId: 'b' },
      },
    ],
    groups: [
      { id: 'concurso-a/area', data: { schemaVersion: 1, title: 'Área', order: 1 } },
      { id: 'concurso-b/campo', data: { schemaVersion: 1, title: 'Campo', order: 1 } },
    ],
    contents: [],
    cheatSheetIds: [],
    questionSets: [],
    bibliotecaContents: [
      {
        id: 'bib-grupo/x',
        data: { schemaVersion: 1, title: 'X', description: 'X', order: 1, storageId: 'x' },
      },
      {
        id: 'bib-grupo/y',
        data: { schemaVersion: 1, title: 'Y', description: 'Y', order: 2, storageId: 'y' },
      },
    ],
    bibliotecaCheatSheetIds: ['bib-grupo/x', 'bib-grupo/y'],
    bibliotecaQuestionSets: [
      { id: 'bib-grupo/x', data: questionSet() },
      { id: 'bib-grupo/y', data: questionSet() },
    ],
    bibliotecaMegaReviews: [
      { id: 'bib-grupo/mega-revisao', data: { schemaVersion: 1, slug: 'revisao' } },
    ],
    megaReviewVinculos: [
      { id: 'concurso-a/area', data: { schemaVersion: 1, canonical: 'bib-grupo' } },
      { id: 'concurso-b/campo', data: { schemaVersion: 1, canonical: 'bib-grupo' } },
    ],
    vinculos: [],
  };
  for (const contest of ['concurso-a', 'concurso-b'] as const) {
    const group = contest === 'concurso-a' ? 'area' : 'campo';
    // Assuntos existem apenas como vínculos: o pipeline sintético cria as
    // visões a partir da biblioteca; conteúdo físico coexistente é inválido.
    for (const subject of ['x', 'y']) {
      const id = `${contest}/${group}/${subject}`;
      fixture.vinculos!.push({
        id,
        data: { schemaVersion: 1, canonical: `bib-grupo/${subject}`, order: 1 },
      });
    }
  }
  return fixture;
}

function dropSubject(fixture: CatalogSources, id: string): void {
  fixture.vinculos = (fixture.vinculos ?? []).filter((vinculo) => vinculo.id !== id);
}

describe('linked mega reviews', () => {
  it('shares one canonical review across contests with per-contest routes', () => {
    const catalog = buildCatalogIndex(linkedSources());
    const [contestA, contestB] = catalog.contests;

    expect(contestA!.children[0]!.megaReview).toMatchObject({
      id: 'concurso-a/area',
      slug: 'revisao',
    });
    expect(contestB!.children[0]!.megaReview).toMatchObject({
      id: 'concurso-b/campo',
      slug: 'revisao',
    });

    const inventoryA = createOfflineInventory(contestA!);
    const inventoryB = createOfflineInventory(contestB!);
    expect(inventoryA.routes).toContain('/revisoes/concurso-a/revisao/');
    expect(inventoryB.routes).toContain('/revisoes/concurso-b/revisao/');
    expect(inventoryA.routes).not.toContain('/revisoes/concurso-b/revisao/');
    expect(
      [...inventoryA.routes, ...inventoryB.routes].some((route) => route.includes('biblioteca')),
    ).toBe(false);
  });

  it('rejects links to nonexistent canonical reviews', () => {
    const fixture = linkedSources();
    fixture.megaReviewVinculos![0]!.data.canonical = 'ausente';
    expect(() => buildCatalogIndex(fixture)).toThrow('inexistente');
  });

  it('rejects physical content beside a canonical link', () => {
    const fixture = linkedSources();
    addMegaReview(fixture, 'concurso-a/area', 'outra');
    expect(() => buildCatalogIndex(fixture)).toThrow('apenas um');
  });

  it('rejects incompatible scopes reporting missing IDs', () => {
    const fixture = linkedSources();
    dropSubject(fixture, 'concurso-b/campo/y');
    expect(() => buildCatalogIndex(fixture)).toThrow('incompatível');
    expect(() => buildCatalogIndex(fixture)).toThrow('bib-grupo/y');
  });

  it('rejects linked groups with local subjects', () => {
    const fixture = linkedSources();
    addSubject(fixture, 'concurso-a/area/local', 'Local', 3, 'local');
    expect(() => buildCatalogIndex(fixture)).toThrow('sem vínculo');
    expect(() => buildCatalogIndex(fixture)).toThrow('concurso-a/area/local');
  });

  it('does not share reviews by slug without an explicit link', () => {
    const fixture = linkedSources();
    fixture.megaReviewVinculos = [];
    addMegaReview(fixture, 'concurso-a/area', 'revisao');
    addMegaReview(fixture, 'concurso-b/campo', 'revisao');
    const catalog = buildCatalogIndex(fixture);
    expect(catalog.contests[0]!.children[0]!.megaReview).toMatchObject({ id: 'concurso-a/area' });
    expect(catalog.contests[1]!.children[0]!.megaReview).toMatchObject({ id: 'concurso-b/campo' });
  });

  it('rejects duplicate public slugs within one contest', () => {
    const fixture = linkedSources();
    fixture.groups.push({ id: 'concurso-a/extra', data: { schemaVersion: 1, title: 'Extra', order: 2 } });
    for (const subject of ['x', 'y']) {
      fixture.vinculos!.push({
        id: `concurso-a/extra/${subject}`,
        data: { schemaVersion: 1, canonical: `bib-grupo/${subject}`, order: 1 },
      });
    }
    fixture.megaReviewVinculos!.push({
      id: 'concurso-a/extra',
      data: { schemaVersion: 1, canonical: 'bib-grupo' },
    });
    expect(() => buildCatalogIndex(fixture)).toThrow('duplicado');
  });

  it('remaps biblioteca resolution IDs to the consumer namespace', () => {
    expect(remapBibliotecaResolutionId('concurso-a/area/x', 'bib-grupo/x/resolucoes/q001')).toBe(
      'concurso-a/area/x/resolucoes/q001',
    );
    expect(() => remapBibliotecaResolutionId('concurso-a/area/x', 'bib-grupo/x/q001')).toThrow(
      'ID de resolução de biblioteca inválido',
    );
  });

  it('reuses canonical references and rejects local companions', () => {
    const fixture = linkedSources();
    for (const vinculo of fixture.vinculos!) {
      fixture.references ??= [];
      fixture.references.push({ id: vinculo.id, data: {} });
    }
    fixture.bibliotecaReferences = [{ id: 'bib-grupo/mega-revisao', data: {} }];
    expect(() => buildCatalogIndex(fixture, { requireReferences: true })).not.toThrow();

    const withLocal = structuredClone(fixture);
    withLocal.references!.push({ id: 'concurso-a/area/mega-revisao', data: {} });
    expect(() => buildCatalogIndex(withLocal, { requireReferences: true })).toThrow(
      'referências locais',
    );

    const withoutCanonical = structuredClone(fixture);
    withoutCanonical.bibliotecaReferences = [];
    expect(() => buildCatalogIndex(withoutCanonical, { requireReferences: true })).toThrow(
      'não possui referências',
    );
  });
});
