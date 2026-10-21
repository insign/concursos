export const SHARED_ASSET_CACHE = 'shared-assets-v1';
export const RUNTIME_PAGE_CACHE = 'runtime-pages-v1';
export const RUNTIME_MEDIA_CACHE = 'runtime-media-v1';
export const CONTEST_CACHE_PREFIX = 'contest--';

/**
 * Midia baixada pelo usuario junto com o curso offline. O enderecamento e
 * por conteudo (a URL da midia carrega o SHA-256), entao a mesma faixa
 * canonica compartilhada por varios concursos ocupa uma unica entrada.
 */
export const OFFLINE_MEDIA_CACHE = 'offline-media-v1';

export function contestCacheName(contestStorageId: string, manifestHash: string): string {
  return `${CONTEST_CACHE_PREFIX}${contestStorageId}--${manifestHash}`;
}

export function normalizeNavigationPath(pathname: string): string {
  const directoryPath = pathname.endsWith('/index.html') ? pathname.slice(0, -'index.html'.length) : pathname;
  if (directoryPath === '/') return directoryPath;
  return directoryPath.endsWith('/') ? directoryPath : `${directoryPath}/`;
}
