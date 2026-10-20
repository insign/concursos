import type { MediaCatalogData } from './content-schema';
import { mediaKindFromFile, mediaLabel, mediaMimeFromFile, mediaUrl } from './media-paths';

export interface SubjectMediaItem {
  /** Identidade estável do conteúdo: o SHA-256 do arquivo publicado. */
  id: string;
  file: string;
  label: string;
  kind: 'audio' | 'video';
  mime: string;
  bytes: number;
  url: string;
}

export interface MediaCatalogResolution {
  /** `true` quando o consumidor tem vínculo canônico e também uma mídia própria. */
  mixedOrigin: boolean;
  media: SubjectMediaItem[];
}

/**
 * Converte o catálogo de uma origem em descritores de mídia prontos para a
 * página. O MIME e a URL são derivados do nome do arquivo, nunca lidos do
 * catálogo, para que não haja divergência entre o arquivo publicado e a
 * descrição servida.
 */
export function buildSubjectMediaItems(catalog: MediaCatalogData | null | undefined): SubjectMediaItem[] {
  if (!catalog) return [];
  return catalog.items.map((item) => {
    const kind = mediaKindFromFile(item.file);
    const mime = mediaMimeFromFile(item.file);
    if (!kind || !mime) {
      throw new Error(`Extensão de mídia não suportada em "${item.file}"`);
    }
    return {
      id: item.sha256,
      file: item.file,
      label: mediaLabel(item.file),
      kind,
      mime,
      bytes: item.bytes,
      url: mediaUrl(item.sha256, item.file),
    };
  });
}

/**
 * Resolve a mídia do assunto consumidor: um consumidor com vínculo canônico
 * usa exclusivamente a mídia da origem canônica; um assunto físico usa a
 * própria. Misturar as duas é erro de build.
 */
export function resolveSubjectMedia(input: {
  subjectId: string;
  canonicalId: string | null;
  ownCatalog: MediaCatalogData | null | undefined;
  canonicalCatalog: MediaCatalogData | null | undefined;
}): MediaCatalogResolution {
  const { subjectId, canonicalId, ownCatalog, canonicalCatalog } = input;
  if (ownCatalog && canonicalId) {
    throw new Error(
      `Assunto "${subjectId}" possui vínculo canônico e catálogo de mídia próprio; a mídia pertence à origem canônica`,
    );
  }
  const catalog = canonicalId ? canonicalCatalog : ownCatalog;
  return { mixedOrigin: false, media: buildSubjectMediaItems(catalog) };
}
