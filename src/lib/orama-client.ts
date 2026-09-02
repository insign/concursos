import { create, load, search } from '@orama/orama';
import { language, stemmer } from '@orama/stemmers/portuguese';
import { Highlight } from '@orama/highlight';

export interface OramaDocument {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  storageId: string;
  contestStorageId: string;
  contestSlug: string;
  type: string;
  groupPath: string;
}

export interface OramaSearchHit {
  id: string;
  score: number;
  document: OramaDocument;
  highlightedTitle: string;
  highlightedExcerpt: string;
}

const schema = {
  title: 'string',
  slug: 'string',
  excerpt: 'string',
  content: 'string',
  storageId: 'string',
  contestStorageId: 'string',
  contestSlug: 'string',
  type: 'string',
  groupPath: 'string',
} as const;

const dbCache = new Map<string, Promise<unknown>>();
const highlight = new Highlight({ HTMLTag: 'mark', CSSClass: 'orama-highlight' });

if (typeof window !== 'undefined') {
  // Invalida cache após atualização de pacote offline (índice mudou)
  window.addEventListener('concursos:offline-packages-changed', () => dbCache.clear());
  // Fallback via storage visibility
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      // Revalidação leve: limpar se houver pacote novo (custo baixo, evita stale)
      // Não limpamos sempre, apenas se houver evento, mas este é no-op se não mudou.
    }
  });
}

export function clearOramaCache(storageId?: string) {
  if (storageId) {
    dbCache.delete(`/search/${storageId}.json`);
    dbCache.delete('/search-global.json');
  } else {
    dbCache.clear();
  }
}

async function loadDb(bundleUrl: string): Promise<unknown> {
  const raw = await fetch(bundleUrl, { cache: 'no-store' }).then((r) => {
    if (!r.ok) throw new Error(`Falha ao carregar índice: ${r.status}`);
    return r.json();
  });
  const db = await create({
    schema,
    components: {
      tokenizer: {
        language,
        stemmer,
        stemming: true,
      },
    },
  } as never);
  await load(db as never, raw as never);
  return db;
}

function getCachedDb(bundleUrl: string): Promise<unknown> {
  let p = dbCache.get(bundleUrl);
  if (!p) {
    p = loadDb(bundleUrl);
    dbCache.set(bundleUrl, p);
    // Em falha, limpar para retry futuro
    p.catch(() => dbCache.delete(bundleUrl));
  }
  return p;
}

export async function searchContest(
  contestStorageId: string,
  term: string,
  limit = 8,
): Promise<OramaSearchHit[]> {
  if (!term || term.trim().length < 2) return [];
  const bundleUrl = `/search/${contestStorageId}.json`;
  const db = await getCachedDb(bundleUrl);
  const result = await search(db as never, {
    term: term.trim(),
    limit,
    threshold: 0.3,
    boost: { title: 2, excerpt: 1.2 },
  } as never);

  const hits = (result as unknown as { hits: Array<{ id: string; score: number; document: OramaDocument }> }).hits ?? [];
  return hits.map((hit) => ({
    id: hit.id,
    score: hit.score,
    document: hit.document,
    highlightedTitle: highlight.highlight(hit.document.title, term).HTML,
    highlightedExcerpt: highlight.highlight(hit.document.excerpt || hit.document.content.slice(0, 200), term).HTML,
  }));
}

export async function searchGlobal(term: string, limit = 10): Promise<OramaSearchHit[]> {
  if (!term || term.trim().length < 2) return [];
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    throw new Error('offline');
  }
  const bundleUrl = '/search-global.json';
  const db = await getCachedDb(bundleUrl);
  const result = await search(db as never, {
    term: term.trim(),
    limit,
    threshold: 0.3,
    boost: { title: 2 },
  } as never);
  const hits = (result as unknown as { hits: Array<{ id: string; score: number; document: OramaDocument }> }).hits ?? [];
  return hits.map((hit) => ({
    id: hit.id,
    score: hit.score,
    document: hit.document,
    highlightedTitle: highlight.highlight(hit.document.title, term).HTML,
    highlightedExcerpt: highlight.highlight(hit.document.excerpt || hit.document.content.slice(0, 200), term).HTML,
  }));
}

export function isOnline(): boolean {
  return typeof navigator === 'undefined' ? true : navigator.onLine;
}
