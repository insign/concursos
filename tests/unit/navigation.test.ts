import { describe, expect, it } from 'vitest';
import { buildNavigationContestDocumentId } from '../../src/lib/identity';
import {
  clearContestPoint,
  contestDocumentsEqual,
  contestShardFingerprint,
  createContestDocument,
  createNavigationDocument,
  isResumablePoint,
  isSafeNavigationRoute,
  mergeContestDocuments,
  navigationContestDocumentSchema,
  navigationDestination,
  navigationDocumentSchema,
  navigationFingerprint,
  navigationPendingRouteKey,
  newestContestPoint,
  newestContestResume,
  newestGlobalResume,
  normalizeNavigationDocument,
  normalizeTextQuote,
  resumeReadingDestination,
  resolveNavigationVersionAction,
  upsertContestPoint,
  type NavigationContext,
  type NavigationContestDocument,
  type NavigationDocument,
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

function point(
  subjectStorageId: string,
  progress: number,
  updatedAt: string,
  route = `/concursos/tce-ma-2026/${subjectStorageId}/`,
): NavigationDocument {
  return createNavigationDocument(
    route,
    { ...context, readingMode: false, subjectStorageId },
    {
      contentVersion: 'conteudos/tce-ma-2026/interpretacao-textos',
      sectionId: 'conceitos',
      blockId: 'conceitos-bloco-2',
      blockIndex: 7,
      relativeOffset: 0.35,
      textQuote: 'Trecho próximo ao ponto de leitura.',
      progress,
    },
    new Date(updatedAt),
  );
}

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

  it('identifies resumable content points and forces focus', () => {
    const document = point('interpretacao-textos', 0.61, '2026-07-25T00:00:00.000Z');
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

    expect(isResumablePoint(document)).toBe(true);
    expect(isResumablePoint(noPosition)).toBe(false);
    expect(isResumablePoint(questions)).toBe(false);
    expect(navigationDestination(document)).toBe(document.route);
    expect(resumeReadingDestination(document)).toBe(`${document.route}#focus`);
    expect(navigationPendingRouteKey('perfil-teste')).toBe(
      'concursos:navigation-restored:perfil-teste:pending-route',
    );
  });
});

describe('contest reading history', () => {
  it('builds a contest document id within the KV budget', () => {
    expect(buildNavigationContestDocumentId('perfil-teste', 'tce-ma-2026')).toBe(
      'concursos--perfil-teste--navegacao--tce-ma-2026',
    );
    const longest = buildNavigationContestDocumentId('a'.repeat(32), 'c'.repeat(20));
    expect(longest.length).toBeLessThanOrEqual(100);
  });

  it('upserts points per subject without a cap', () => {
    let shard: NavigationContestDocument | null = null;
    shard = upsertContestPoint(shard, point('assunto-a', 0.4, '2026-09-20T00:00:00.000Z'));
    shard = upsertContestPoint(shard, point('assunto-b', 0.7, '2026-09-21T00:00:00.000Z'));
    expect(Object.keys(shard.points).sort()).toEqual(['assunto-a', 'assunto-b']);
    expect(shard.contestStorageId).toBe('tce-ma-2026');
    expect(navigationContestDocumentSchema.parse(shard)).toEqual(shard);
  });

  it('keeps the furthest progress on the same subject', () => {
    let shard: NavigationContestDocument | null = null;
    shard = upsertContestPoint(shard, point('assunto-a', 0.8, '2026-09-20T00:00:00.000Z'));
    shard = upsertContestPoint(shard, point('assunto-a', 0.3, '2026-09-21T00:00:00.000Z'));
    expect(shard.points['assunto-a'].readingPosition?.progress).toBe(0.8);
  });

  it('drops positions below the resume threshold instead of storing them', () => {
    const shard = upsertContestPoint(null, point('assunto-a', 0.01, '2026-09-20T00:00:00.000Z'));
    expect(shard.points).toEqual({});
    expect(shard.cursor).not.toBeNull();
  });

  it('clears a single subject as a publishable tombstone', () => {
    let shard: NavigationContestDocument | null = null;
    shard = upsertContestPoint(shard, point('assunto-a', 0.4, '2026-09-20T00:00:00.000Z'));
    shard = upsertContestPoint(shard, point('assunto-b', 0.7, '2026-09-21T00:00:00.000Z'));
    shard = clearContestPoint(shard, 'tce-ma-2026', 'assunto-a', new Date('2026-09-22T00:00:00.000Z'));
    expect(Object.keys(shard.points)).toEqual(['assunto-b']);
    expect(shard.cleared['assunto-a']).toBe('2026-09-22T00:00:00.000Z');
    expect(navigationContestDocumentSchema.parse(shard)).toEqual(shard);
  });

  it('drops the resumable position of a cleared subject from the cursor', () => {
    let shard: NavigationContestDocument | null = null;
    shard = upsertContestPoint(shard, point('assunto-a', 0.4, '2026-09-20T00:00:00.000Z'));
    expect(shard.cursor?.context.subjectStorageId).toBe('assunto-a');
    shard = clearContestPoint(shard, 'tce-ma-2026', 'assunto-a', new Date('2026-09-22T00:00:00.000Z'));
    expect(shard.points).toEqual({});
    expect(shard.cursor?.readingPosition).toBeNull();
    expect(newestContestPoint(shard)).toBeNull();
    expect(newestContestResume(shard)).toBeNull();
  });

  it('never offers a cleared subject through cursor or route lookup', () => {
    let shard: NavigationContestDocument | null = null;
    shard = upsertContestPoint(shard, point('assunto-a', 0.4, '2026-09-20T00:00:00.000Z'));
    shard = upsertContestPoint(shard, point('assunto-b', 0.7, '2026-09-21T00:00:00.000Z'));
    shard = clearContestPoint(shard, 'tce-ma-2026', 'assunto-a', new Date('2026-09-22T00:00:00.000Z'));
    // Assunto B continua retomável; A não reaparece por cursor.
    expect(newestContestPoint(shard)?.context.subjectStorageId).toBe('assunto-b');
    expect(newestContestResume(shard)?.context.subjectStorageId).toBe('assunto-b');
  });

  it('lets a tombstone win ties against a same-instant point', () => {
    const instant = '2026-09-22T00:00:00.000Z';
    const withPoint = upsertContestPoint(null, point('assunto-a', 0.4, instant));
    const cleared = clearContestPoint(withPoint, 'tce-ma-2026', 'assunto-a', new Date(instant));
    expect(cleared.cleared['assunto-a']).toBe(instant);
    expect(cleared.points).toEqual({});
    expect(mergeContestDocuments(withPoint, cleared).points).toEqual({});
    expect(mergeContestDocuments(cleared, withPoint).points).toEqual({});
  });

  it('compares shards canonically regardless of key order and cursor', () => {
    const a = upsertContestPoint(
      upsertContestPoint(null, point('assunto-a', 0.4, '2026-09-20T00:00:00.000Z')),
      point('assunto-b', 0.7, '2026-09-21T00:00:00.000Z'),
    );
    const b = upsertContestPoint(
      upsertContestPoint(null, point('assunto-b', 0.7, '2026-09-21T00:00:00.000Z')),
      point('assunto-a', 0.4, '2026-09-20T00:00:00.000Z'),
    );
    expect(contestDocumentsEqual(a, b)).toBe(true);
    const withCursor = upsertContestPoint(a, point('assunto-c', 0.9, '2026-09-23T00:00:00.000Z'));
    expect(contestDocumentsEqual(a, withCursor)).toBe(false);
  });

  it('never offers a cursor belonging to another or no contest', () => {
    const shard = navigationContestDocumentSchema.parse({
      schemaVersion: 2,
      contestStorageId: 'tce-ma-2026',
      updatedAt: '2026-09-22T00:00:00.000Z',
      cursor: {
        schemaVersion: 1,
        updatedAt: '2026-09-22T00:00:00.000Z',
        route: '/simulados/',
        context: {
          ...context,
          contestStorageId: null,
          subjectStorageId: null,
          activeTab: 'simulados',
          readingMode: false,
        },
        readingPosition: null,
      },
      points: {},
      cleared: {},
    });
    expect(newestContestResume(shard)).toBeNull();
  });

  it('keeps the tombstone monotonic across repeated clears', () => {
    const future = '2027-01-01T00:00:00.000Z';
    const withPoint = upsertContestPoint(null, point('assunto-a', 0.4, future));
    const first = clearContestPoint(withPoint, 'tce-ma-2026', 'assunto-a', new Date('2026-09-22T00:00:00.000Z'));
    expect(first.cleared['assunto-a']).toBe(future);
    const second = clearContestPoint(first, 'tce-ma-2026', 'assunto-a', new Date('2026-09-23T00:00:00.000Z'));
    expect(second.cleared['assunto-a']).toBe(future);
    // Ponto remoto datado no futuro não ressuscita após a segunda limpeza.
    const remoteFuture = upsertContestPoint(null, point('assunto-a', 0.5, future));
    expect(mergeContestDocuments(second, remoteFuture).points).toEqual({});
  });

  it('compares cleared tombstones canonically regardless of key order', () => {
    const clearedA = navigationContestDocumentSchema.parse({
      schemaVersion: 2,
      contestStorageId: 'tce-ma-2026',
      updatedAt: '2026-09-22T00:00:00.000Z',
      cursor: null,
      points: {},
      cleared: {
        'assunto-a': '2026-09-20T00:00:00.000Z',
        'assunto-b': '2026-09-21T00:00:00.000Z',
      },
    });
    const clearedB = navigationContestDocumentSchema.parse({
      ...clearedA,
      cleared: {
        'assunto-b': '2026-09-21T00:00:00.000Z',
        'assunto-a': '2026-09-20T00:00:00.000Z',
      },
    });
    expect(contestDocumentsEqual(clearedA, clearedB)).toBe(true);
  });

  it('merges disjoint subjects by union', () => {
    const local = upsertContestPoint(null, point('assunto-a', 0.4, '2026-09-20T00:00:00.000Z'));
    const remote = upsertContestPoint(null, point('assunto-b', 0.7, '2026-09-21T00:00:00.000Z'));
    const merged = mergeContestDocuments(local, remote);
    expect(Object.keys(merged.points).sort()).toEqual(['assunto-a', 'assunto-b']);
  });

  it('lets a newer tombstone win over an older point and vice-versa', () => {
    const withPoint = upsertContestPoint(null, point('assunto-a', 0.4, '2026-09-20T00:00:00.000Z'));
    const cleared = clearContestPoint(withPoint, 'tce-ma-2026', 'assunto-a', new Date('2026-09-22T00:00:00.000Z'));
    expect(mergeContestDocuments(withPoint, cleared).points).toEqual({});
    const revived = upsertContestPoint(null, point('assunto-a', 0.5, '2026-09-23T00:00:00.000Z'));
    const merged = mergeContestDocuments(cleared, revived);
    expect(merged.points['assunto-a'].readingPosition?.progress).toBe(0.5);
    expect(merged.cleared).toEqual({});
  });

  it('rejects cross-contest merges and inconsistent points', () => {
    const local = upsertContestPoint(null, point('assunto-a', 0.4, '2026-09-20T00:00:00.000Z'));
    const otherContest = createContestDocument('outro-concurso');
    expect(() => mergeContestDocuments(local, otherContest)).toThrow();
    expect(() =>
      navigationContestDocumentSchema.parse({
        ...local,
        points: { 'assunto-errado': local.points['assunto-a'] },
      }),
    ).toThrow();
  });

  it('selects the newest resume per contest and globally', () => {
    const first = upsertContestPoint(null, point('assunto-a', 0.4, '2026-09-20T00:00:00.000Z'));
    const withNewer = upsertContestPoint(first, point('assunto-b', 0.2, '2026-09-21T00:00:00.000Z'));
    expect(newestContestResume(withNewer)?.context.subjectStorageId).toBe('assunto-b');
    expect(newestContestResume(createContestDocument('vazio'))).toBeNull();
    const global = newestGlobalResume([first, withNewer]);
    expect(global?.document.context.subjectStorageId).toBe('assunto-b');
    expect(newestGlobalResume([])).toBeNull();
  });

  it('does not include updatedAt in the shard fingerprint', () => {
    const shard = upsertContestPoint(null, point('assunto-a', 0.4, '2026-09-20T00:00:00.000Z'));
    const touched = { ...shard, updatedAt: new Date('2026-10-01T00:00:00.000Z').toISOString() };
    expect(contestShardFingerprint(shard)).toBe(contestShardFingerprint(touched));
  });

  it('keeps a 200-point shard far below the KV body limit', () => {
    let shard: NavigationContestDocument | null = null;
    for (let index = 0; index < 200; index += 1) {
      shard = upsertContestPoint(
        shard,
        point(`assunto-${index}`, 0.5, '2026-09-20T00:00:00.000Z'),
      );
    }
    const bytes = new TextEncoder().encode(JSON.stringify(shard)).length;
    expect(bytes).toBeLessThan(1_850_000);
    expect(bytes / 200).toBeLessThan(1_000);
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
