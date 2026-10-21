/**
 * Entrega de mídia do bucket R2 na própria origem do site.
 *
 * O Cloudflare Pages responde 200 para HTTP Range em assets estáticos, e o
 * iOS Safari exige 206 para reproduzir áudio e vídeo. Por isso a mídia não é
 * servida como asset estático: ela é lida do R2 com leitura por intervalo e
 * devolvida como 206 Partial Content.
 *
 * A chave do objeto é o SHA-256 do arquivo, de modo que a URL é imutável e o
 * cache pode ser eterno.
 */

const MEDIA_KEY_PATTERN = /^[a-f0-9]{64}\.(mp3|m4a|ogg|opus|mp4|webm)$/;

const MIME_BY_EXTENSION: Record<string, string> = {
  mp3: 'audio/mpeg',
  m4a: 'audio/mp4',
  ogg: 'audio/ogg',
  opus: 'audio/ogg',
  mp4: 'video/mp4',
  webm: 'video/webm',
};

interface R2ObjectMetadata {
  size: number;
  httpEtag: string;
}

interface R2ObjectBody extends R2ObjectMetadata {
  body: ReadableStream | null;
}

interface R2BucketLike {
  head(key: string): Promise<R2ObjectMetadata | null>;
  get(
    key: string,
    options?: { range?: { offset: number; length: number } },
  ): Promise<R2ObjectBody | null>;
}

interface MediaEventContext {
  request: Request;
  env: { MIDIA?: R2BucketLike };
  params: { path?: string | string[] };
}

type ParsedRange = { offset: number; length: number } | 'unsatisfiable' | null;

function parseRange(header: string | null, size: number): ParsedRange {
  if (!header) return null;
  const match = /^bytes=(\d*)-(\d*)$/i.exec(header.trim());
  if (!match) return null;
  const rawStart = match[1] ?? '';
  const rawEnd = match[2] ?? '';
  if (!rawStart && !rawEnd) return null;

  if (!rawStart) {
    const suffix = Number(rawEnd);
    if (!Number.isSafeInteger(suffix) || suffix <= 0) return 'unsatisfiable';
    const length = Math.min(suffix, size);
    return { offset: size - length, length };
  }

  const start = Number(rawStart);
  if (!Number.isSafeInteger(start) || start >= size) return 'unsatisfiable';
  if (!rawEnd) return { offset: start, length: size - start };

  const end = Number(rawEnd);
  if (!Number.isSafeInteger(end) || end < start) return null;
  return { offset: start, length: Math.min(end, size - 1) - start + 1 };
}

function mediaKey(params: MediaEventContext['params']): string | null {
  const raw = params.path;
  const name = Array.isArray(raw) ? raw.join('/') : (raw ?? '');
  if (!MEDIA_KEY_PATTERN.test(name)) return null;
  return `media/${name}`;
}

export async function onRequest(context: MediaEventContext): Promise<Response> {
  const { request, env, params } = context;

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response(null, { status: 405, headers: { Allow: 'GET, HEAD' } });
  }

  const key = mediaKey(params);
  if (!key) {
    return new Response('Mídia não encontrada', { status: 404 });
  }
  if (!env.MIDIA) {
    // Binding ausente é erro de configuração do projeto, não mídia inexistente.
    return new Response('Armazenamento de mídia indisponível', { status: 500 });
  }

  const metadata = await env.MIDIA.head(key);
  if (!metadata) {
    return new Response('Mídia não encontrada', { status: 404 });
  }

  const extension = key.slice(key.lastIndexOf('.') + 1);
  const mime = MIME_BY_EXTENSION[extension] ?? 'application/octet-stream';
  const headers = new Headers();
  headers.set('Content-Type', mime);
  headers.set('Accept-Ranges', 'bytes');
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  headers.set('ETag', metadata.httpEtag);
  headers.set('X-Content-Type-Options', 'nosniff');

  const range = parseRange(request.headers.get('Range'), metadata.size);

  if (range === 'unsatisfiable') {
    headers.set('Content-Range', `bytes */${metadata.size}`);
    headers.set('Content-Length', '0');
    return new Response(null, { status: 416, headers });
  }

  if (!range) {
    headers.set('Content-Length', String(metadata.size));
    if (request.method === 'HEAD') {
      return new Response(null, { status: 200, headers });
    }
    const object = await env.MIDIA.get(key);
    if (!object) {
      return new Response('Mídia não encontrada', { status: 404 });
    }
    return new Response(object.body, { status: 200, headers });
  }

  const object = await env.MIDIA.get(key, { range: { offset: range.offset, length: range.length } });
  if (!object) {
    return new Response('Mídia não encontrada', { status: 404 });
  }

  headers.set('Content-Range', `bytes ${range.offset}-${range.offset + range.length - 1}/${metadata.size}`);
  headers.set('Content-Length', String(range.length));
  return new Response(object.body, { status: 206, headers });
}
