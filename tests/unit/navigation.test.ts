import { describe, expect, it } from 'vitest';
import {
  canResumeReading,
  clearReadingPosition,
  createNavigationDocument,
  isSafeNavigationRoute,
  navigationDestination,
  navigationDocumentSchema,
  navigationFingerprint,
  navigationPendingRouteKey,
  normalizeNavigationDocument,
  normalizeTextQuote,
  resumeReadingDestination,
  resolveNavigationVersionAction,
  shouldPreserveReadingForContestCatalog,
  type NavigationCatalogEntry,
  type NavigationContext,
} from '../../src/lib/navigation';

const context: NavigationContext = {
  contestStorageId: 'tce-ma-2026',
  groupId: 'portugues',
  subjectStorageId: 'interpretacao-textos',
  questionId: null,
  activeTab: 'content',
  readingMode: true,
  questionOrigin: null,
  questionLayout: null,
  shuffleQuestions: null,
};

describe('navigation document', () => {
  it('accepts an internal semantic reading position', () => {
    const document = createNavigationDocument(
      '/concursos/tce-ma-2026/interpretacao-textos/',
      context,
      {
        contentVersion: 'conteudos/tce-ma-2026/interpretacao-textos',
        sectionId: 'conceitos',
        blockId: 'conceitos-bloco-2',
        blockIndex: 7,
        relativeOffset: 0.35,
        textQuote: 'Trecho próximo ao ponto de leitura.',
        progress: 0.61,
      },
      new Date('2026-07-25T00:00:00.000Z'),
    );

    expect(navigationDocumentSchema.parse(document)).toEqual(document);
    expect(document.updatedAt).toBe('2026-07-25T00:00:00.000Z');
  });

  it('rejects external, protocol-relative and non-canonical routes', () => {
    expect(isSafeNavigationRoute('https://example.com/')).toBe(false);
    expect(isSafeNavigationRoute('//example.com/')).toBe(false);
    expect(isSafeNavigationRoute('/concursos/../configuracoes/')).toBe(false);
    expect(isSafeNavigationRoute('/concursos/%2e%2e/configuracoes/')).toBe(false);
    expect(isSafeNavigationRoute('/concursos/seguro/#trecho')).toBe(false);
    expect(isSafeNavigationRoute('/concursos/seguro/')).toBe(true);
  });

  it('normalizes and limits the recovery quote', () => {
    expect(normalizeTextQuote('  um\n\n trecho   com espaços  ', 18)).toBe('um trecho com espa');
  });

  it('does not include updatedAt in the semantic fingerprint', () => {
    const first = createNavigationDocument('/', { ...context, activeTab: 'catalog', readingMode: false }, null, new Date(0));
    const second = { ...first, updatedAt: new Date(1_000).toISOString() };
    expect(navigationFingerprint(first)).toBe(navigationFingerprint(second));
  });

  it('normalizes legacy reading routes while keeping fragments out of storage', () => {
    const legacy = createNavigationDocument(
      '/concursos/tce-ma-2026/interpretacao-textos/leitura/?origem=remota',
      { ...context, activeTab: 'reading' },
      null,
    );
    const normalized = normalizeNavigationDocument(legacy);

    expect(normalized.route).toBe('/concursos/tce-ma-2026/interpretacao-textos/?origem=remota');
    expect(normalized.context.activeTab).toBe('content');
    expect(normalized.context.readingMode).toBe(true);
    expect(navigationDestination(normalized)).toBe(
      '/concursos/tce-ma-2026/interpretacao-textos/?origem=remota#focus',
    );
    expect(isSafeNavigationRoute(normalized.route)).toBe(true);
  });

  it('does not emit a reading destination for a non-content tab', () => {
    const invalid = createNavigationDocument(
      '/concursos/tce-ma-2026/interpretacao-textos/questoes/',
      { ...context, activeTab: 'questions', readingMode: true },
      null,
    );
    const normalized = normalizeNavigationDocument(invalid);

    expect(normalized.context.readingMode).toBe(false);
    expect(navigationDestination(normalized)).toBe(invalid.route);
  });

  it('offers content with a saved position for the current contest and forces focus', () => {
    const document = createNavigationDocument(
      '/concursos/tce-ma-2026/interpretacao-textos/',
      { ...context, readingMode: false },
      {
        contentVersion: 'conteudos/tce-ma-2026/interpretacao-textos',
        sectionId: 'conceitos',
        blockId: 'conceitos-bloco-2',
        blockIndex: 7,
        relativeOffset: 0.35,
        textQuote: 'Trecho próximo ao ponto de leitura.',
        progress: 0.61,
      },
    );

    expect(canResumeReading(document, 'tce-ma-2026')).toBe(true);
    expect(canResumeReading(document, 'outro-concurso')).toBe(false);
    expect(navigationDestination(document)).toBe(document.route);
    expect(resumeReadingDestination(document)).toBe(`${document.route}#focus`);
    expect(navigationPendingRouteKey('perfil-teste')).toBe(
      'concursos:navigation-restored:perfil-teste:pending-route',
    );
  });

  it('rejects documents without a resumable content position', () => {
    const noPosition = createNavigationDocument(
      '/concursos/tce-ma-2026/interpretacao-textos/',
      { ...context, readingMode: false },
      null,
    );
    const questions = createNavigationDocument(
      '/concursos/tce-ma-2026/interpretacao-textos/questoes/',
      { ...context, activeTab: 'questions', readingMode: false },
      null,
    );

    expect(canResumeReading(noPosition, 'tce-ma-2026')).toBe(false);
    expect(canResumeReading(questions, 'tce-ma-2026')).toBe(false);
  });

  it('clears only the matching subject reading position', () => {
    const document = createNavigationDocument(
      '/concursos/tce-ma-2026/interpretacao-textos/',
      { ...context, readingMode: false },
      {
        contentVersion: null,
        sectionId: null,
        blockId: null,
        blockIndex: 4,
        relativeOffset: 0,
        textQuote: '',
        progress: 0.5,
      },
      new Date('2026-07-25T00:00:00.000Z'),
    );
    const cleared = clearReadingPosition(
      document,
      'tce-ma-2026',
      'interpretacao-textos',
      new Date('2026-07-26T00:00:00.000Z'),
    );

    expect(cleared).toEqual({
      ...document,
      updatedAt: '2026-07-26T00:00:00.000Z',
      readingPosition: null,
    });
    expect(cleared.route).toBe(document.route);
    expect(cleared.context).toEqual(document.context);
    expect(clearReadingPosition(document, 'outro-concurso', 'interpretacao-textos')).toBe(document);
    expect(clearReadingPosition(document, 'tce-ma-2026', 'outro-assunto')).toBe(document);
    expect(
      clearReadingPosition(cleared, 'tce-ma-2026', 'interpretacao-textos'),
    ).toBe(cleared);
  });

  it('preserves a reading position only when capturing a contest catalog', () => {
    const document = createNavigationDocument(
      '/concursos/tce-ma-2026/interpretacao-textos/',
      { ...context, readingMode: false },
      {
        contentVersion: null,
        sectionId: null,
        blockId: null,
        blockIndex: 4,
        relativeOffset: 0,
        textQuote: '',
        progress: 0.5,
      },
    );
    const contestCatalog: NavigationCatalogEntry = {
      route: '/concursos/tce-ma-2026/',
      contestStorageId: 'tce-ma-2026',
      subjectStorageId: null,
      activeTab: 'catalog',
      readingMode: false,
    };

    expect(shouldPreserveReadingForContestCatalog(document, contestCatalog)).toBe(true);
    expect(
      shouldPreserveReadingForContestCatalog(document, {
        ...contestCatalog,
        route: '/',
        contestStorageId: null,
      }),
    ).toBe(false);
    expect(
      shouldPreserveReadingForContestCatalog(document, {
        ...contestCatalog,
        activeTab: 'questions',
      }),
    ).toBe(false);
    expect(
      shouldPreserveReadingForContestCatalog(document, {
        ...contestCatalog,
        route: '/concursos/outro-concurso/',
        contestStorageId: 'outro-concurso',
      }),
    ).toBe(false);
  });
});

describe('navigation version resolution', () => {
  const clean = {
    remoteVersion: 2,
    remoteCreatedAt: '2026-07-25T00:00:00.000Z',
    outboxState: 'clean' as const,
  };
  const pending = { ...clean, outboxState: 'pending' as const };

  it('adopts a newer remote envelope version', () => {
    expect(resolveNavigationVersionAction(pending, 3, clean.remoteCreatedAt)).toBe('adopt-remote');
  });

  it('preserves a pending document without known remote lineage', () => {
    expect(
      resolveNavigationVersionAction(
        { remoteVersion: null, remoteCreatedAt: null, outboxState: 'pending' },
        1,
        clean.remoteCreatedAt,
      ),
    ).toBe('publish-local');
  });

  it('publishes a pending local document when versions are equal', () => {
    expect(resolveNavigationVersionAction(pending, 2, clean.remoteCreatedAt)).toBe('publish-local');
  });

  it('does nothing for equal clean versions', () => {
    expect(resolveNavigationVersionAction(clean, 2, clean.remoteCreatedAt)).toBe('noop');
  });

  it('adopts a recreated remote document when the local record is clean', () => {
    expect(
      resolveNavigationVersionAction(clean, 2, '2026-07-26T00:00:00.000Z'),
    ).toBe('adopt-remote');
    expect(
      resolveNavigationVersionAction(clean, 1, '2026-07-26T00:00:00.000Z'),
    ).toBe('adopt-remote');
  });

  it('preserves an explicit pending local change across remote recreation', () => {
    expect(
      resolveNavigationVersionAction(pending, 1, '2026-07-26T00:00:00.000Z'),
    ).toBe('publish-local');
  });

  it('does not resurrect a deleted remote document from a clean local copy', () => {
    expect(resolveNavigationVersionAction(clean, null, null)).toBe('noop');
    expect(resolveNavigationVersionAction(pending, null, null)).toBe('publish-local');
  });
});
