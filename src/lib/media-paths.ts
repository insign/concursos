export const MEDIA_FOLDER = 'midia';
export const MEDIA_CATALOG_FILE = 'catalogo.json';
export const MEDIA_ROUTE_PREFIX = '/media/';

export const MEDIA_EXTENSIONS = ['mp3', 'm4a', 'ogg', 'opus', 'mp4', 'webm'] as const;

export type MediaExtension = (typeof MEDIA_EXTENSIONS)[number];
export type MediaKind = 'audio' | 'video';

const MEDIA_MIME_BY_EXTENSION: Record<MediaExtension, string> = {
  mp3: 'audio/mpeg',
  m4a: 'audio/mp4',
  ogg: 'audio/ogg',
  opus: 'audio/ogg',
  mp4: 'video/mp4',
  webm: 'video/webm',
};

const MEDIA_KIND_BY_EXTENSION: Record<MediaExtension, MediaKind> = {
  mp3: 'audio',
  m4a: 'audio',
  ogg: 'audio',
  opus: 'audio',
  mp4: 'video',
  webm: 'video',
};

export const MEDIA_FILE_NAME_PATTERN = new RegExp(
  `^[a-z0-9]+(?:-[a-z0-9]+)*\\.(?:${MEDIA_EXTENSIONS.join('|')})$`,
);

const MEDIA_EXTENSION_PATTERN = new RegExp(`\\.(${MEDIA_EXTENSIONS.join('|')})$`);

export function mediaExtensionFromFile(file: string): MediaExtension | null {
  const match = MEDIA_EXTENSION_PATTERN.exec(file);
  if (!match) return null;
  return match[1] as MediaExtension;
}

export function mediaMimeFromFile(file: string): string | null {
  const extension = mediaExtensionFromFile(file);
  return extension ? MEDIA_MIME_BY_EXTENSION[extension] : null;
}

export function mediaKindFromFile(file: string): MediaKind | null {
  const extension = mediaExtensionFromFile(file);
  return extension ? MEDIA_KIND_BY_EXTENSION[extension] : null;
}

/**
 * URL imutável da mídia: o conteúdo é endereçado pelo SHA-256, então trocar o
 * arquivo gera outra URL e o cache pode ser eterno. A rota é servida pela
 * Pages Function `/media/*`, que devolve 206 parcial a partir do objeto no R2.
 */
export function mediaUrl(sha256: string, file: string): string {
  const extension = mediaExtensionFromFile(file);
  if (!extension) {
    throw new Error(`Extensão de mídia não suportada: "${file}"`);
  }
  return `${MEDIA_ROUTE_PREFIX}${sha256}.${extension}`;
}

export function mediaLabel(file: string): string {
  const stem = file.replace(MEDIA_EXTENSION_PATTERN, '');
  const words = stem.split('-').filter(Boolean);
  if (words.length === 0) return stem;
  const sentence = words.join(' ');
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}
