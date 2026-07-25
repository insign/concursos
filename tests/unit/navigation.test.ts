import { describe, expect, it } from 'vitest';
import {
  createNavigationDocument,
  isSafeNavigationRoute,
  navigationDocumentSchema,
  navigationFingerprint,
  normalizeTextQuote,
  resolveNavigationVersionAction,
  type NavigationContext,
} from '../../src/lib/navigation';

const context: NavigationContext = {
  contestStorageId: 'tce-ma-2026',
  groupId: 'portugues',
  subjectStorageId: 'interpretacao-textos',
  questionId: null,
  activeTab: 'reading',
  readingMode: true,
  questionOrigin: null,
  questionLayout: null,
  shuffleQuestions: null,
};

describe('navigation document', () => {
  it('accepts an internal semantic reading position', () => {
    const document = createNavigationDocument(
      '/concursos/tce-ma-2026/interpretacao-textos/leitura/',
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

  it('rejects external and protocol-relative routes', () => {
    expect(isSafeNavigationRoute('https://example.com/')).toBe(false);
    expect(isSafeNavigationRoute('//example.com/')).toBe(false);
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
});

describe('navigation version resolution', () => {
  it('adopts a newer remote envelope version', () => {
    expect(resolveNavigationVersionAction({ remoteVersion: 2, outboxState: 'pending' }, 3)).toBe('adopt-remote');
  });

  it('publishes a pending local document when versions are equal', () => {
    expect(resolveNavigationVersionAction({ remoteVersion: 3, outboxState: 'pending' }, 3)).toBe('publish-local');
  });

  it('does nothing for equal clean versions', () => {
    expect(resolveNavigationVersionAction({ remoteVersion: 3, outboxState: 'clean' }, 3)).toBe('noop');
  });
});
