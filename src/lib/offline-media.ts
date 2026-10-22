import { z } from 'zod';
import { readAdaptiveHints, runConcurrentPool, resolveAdaptiveConcurrency } from './offline-download-pool';
import { OFFLINE_MEDIA_CACHE } from './pwa-cache';

/**
 * Midia no pacote offline do concurso.
 *
 * A midia e opt-in: o usuario marca a opcao no botao de download e os
 * arquivos de audio/video daquele concurso passam a ser baixados junto,
 * em paralelo, com o mesmo nivel de agressividade ja decidido para o
 * pacote de conteudo.
 *
 * O manifesto do pacote offline NAO muda (ADR-008 e o contrato de
 * integridade do pacote). A lista de midias vive em um inventario
 * proprio, versionado, que nunca entra no hash do pacote.
 */

export const MEDIA_URL_PATTERN = /^\/media\/[a-f0-9]{64}\.(?:mp3|m4a|ogg|opus|mp4|webm)$/;

const MEDIA_MIME_BY_EXTENSION: Record<string, string> = {
  mp3: 'audio/mpeg',
  m4a: 'audio/mp4',
  ogg: 'audio/ogg',
  opus: 'audio/ogg',
  mp4: 'video/mp4',
  webm: 'video/webm',
};

/**
 * Teto de downloads de midia simultaneos. O paralelismo continua sendo o
 * adaptativo ja decidido, mas limitado: cada transferencia segura o
 * arquivo inteiro em memoria para conferir o SHA-256, e seis audios de
 * 15 MB ja ocupam cerca de 90 MB.
 */
export const MEDIA_CONCURRENCY_MAX = 6;

/**
 * Tempo maximo, em milissegundos, sem nenhum byte recebido antes de a
 * transferencia ser considerada travada. Em rede movel a conexao pode
 * ficar pendurada (troca de rede, tela bloqueada, portal cativo) e o
 * `fetch` nunca falha: sem este limite, a fase de midia ficaria parada
 * indefinidamente, sem erro e sem retomada.
 */
export const MEDIA_IDLE_TIMEOUT_MS = 45_000;

export const offlineMediaItemSchema = z
  .object({
    url: z.string().regex(MEDIA_URL_PATTERN),
    sha256: z.string().regex(/^[a-f0-9]{64}$/),
    bytes: z.number().int().positive(),
  })
  .strict();

export const offlineMediaInventorySchema = z
  .object({
    schemaVersion: z.literal(1),
    contestStorageId: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    inventoryHash: z.string().regex(/^[a-f0-9]{20}$/),
    estimatedBytes: z.number().int().nonnegative(),
    items: z.array(offlineMediaItemSchema).max(4096),
  })
  .strict()
  .superRefine((inventory, context) => {
    const seen = new Set<string>();
    for (const item of inventory.items) {
      const digest = item.url.slice('/media/'.length).split('.')[0];
      if (digest !== item.sha256) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: `URL de midia fora do contrato: ${item.url}`,
          path: ['items'],
        });
        return;
      }
      if (seen.has(item.url)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Midia repetida no inventario: ${item.url}`,
          path: ['items'],
        });
        return;
      }
      seen.add(item.url);
    }
  });

export type OfflineMediaItem = z.infer<typeof offlineMediaItemSchema>;
export type OfflineMediaInventory = z.infer<typeof offlineMediaInventorySchema>;

/**
 * Erro da fase de midias. Distingue a falha do download do audio da falha
 * do pacote de conteudo, para a interface falar com o usuario a partir do
 * que de fato deu errado.
 */
export class OfflineMediaError extends Error {
  readonly phase = 'media' as const;

  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'OfflineMediaError';
  }
}

export interface MediaDownloadProgress {
  /** Arquivos concluidos (reusados entram na contagem). */
  completed: number;
  total: number;
  /** Bytes ja verificados somados aos bytes em transferencia. */
  downloadedBytes: number;
  /** Bytes do inventario inteiro, para a barra de progresso por byte. */
  totalBytes: number;
  reused: number;
}

export interface MediaDownloadOutcome {
  /** URLs verificadas e guardadas nesta operacao (as reusadas entram tambem). */
  urls: string[];
  /** URLs que faltam para o inventario estar completo. */
  missing: string[];
  /** URLs cuja transferencia falhou nesta operacao. */
  failed: string[];
  /** Primeiro erro observado, para a interface explicar a causa. */
  firstError?: string;
  downloadedBytes: number;
}

interface MediaEnvironment {
  cacheStorage?: CacheStorage;
  fetch?: typeof fetch;
  origin?: string;
}

function mediaEnvironment(overrides: MediaEnvironment = {}) {
  return {
    cacheStorage: overrides.cacheStorage ?? globalThis.caches,
    fetch: overrides.fetch ?? globalThis.fetch,
    origin: overrides.origin ?? (typeof location === 'undefined' ? 'http://localhost' : location.origin),
  };
}

function mediaMimeFromUrl(url: string): string {
  const extension = url.slice(url.lastIndexOf('.') + 1);
  return MEDIA_MIME_BY_EXTENSION[extension] ?? 'application/octet-stream';
}

function toHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function sha256Hex(contents: BufferSource): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', contents);
  return toHex(digest);
}

/**
 * Identidade do conjunto de midias: muda quando qualquer arquivo muda de
 * bytes ou entra/sai do inventario. Permite detectar atualizacao sem
 * baixar nada.
 */
export async function mediaInventoryHash(items: readonly OfflineMediaItem[]): Promise<string> {
  // A URL entra no hash: a extensao faz parte da identidade servida
  // (o MIME sai dela) e o mesmo conteudo pode mudar de extensao.
  const lines = [...items]
    .map((item) => `${item.url}\t${item.bytes}`)
    .sort()
    .join('\n');
  const digest = await sha256Hex(new TextEncoder().encode(lines));
  return digest.slice(0, 20);
}

/**
 * Monta o inventario de um concurso a partir das midias resolvidas dos
 * assuntos consumidores. A midia canonica aparece uma vez, mesmo quando
 * varios assuntos e varios concursos a compartilham.
 */
export async function buildOfflineMediaInventory(
  contestStorageId: string,
  media: readonly { url: string; id: string; bytes: number }[],
): Promise<OfflineMediaInventory> {
  const unique = new Map<string, OfflineMediaItem>();
  for (const item of media) {
    if (unique.has(item.url)) continue;
    unique.set(item.url, { url: item.url, sha256: item.id, bytes: item.bytes });
  }
  const items = [...unique.values()].sort((left, right) => left.url.localeCompare(right.url));
  const estimatedBytes = items.reduce((total, item) => total + item.bytes, 0);
  return {
    schemaVersion: 1,
    contestStorageId,
    inventoryHash: await mediaInventoryHash(items),
    estimatedBytes,
    items,
  };
}

export function mediaInventoryUrl(contestStorageId: string): string {
  return `/offline-media/${contestStorageId}.json`;
}

/**
 * Concorrencia das midias: adaptativa, limitada pelo teto de memoria. Cada
 * transferencia segura o arquivo inteiro em memoria para conferir o
 * SHA-256, entao um aparelho com pouca memoria baixa para 2.
 */
export function resolveMediaConcurrency(): number {
  const hints = readAdaptiveHints();
  const adaptive = resolveAdaptiveConcurrency(hints);
  const memory = hints.deviceMemory;
  const cap =
    typeof memory === 'number' && memory > 0
      ? memory <= 4
        ? 2
        : MEDIA_CONCURRENCY_MAX
      : // Sem a API de memoria do aparelho (iOS Safari), o numero de
        // nucleos e o melhor sinal disponivel: um aparelho com poucos
        // nucleos costuma ter pouca memoria.
        Math.max(2, Math.min(MEDIA_CONCURRENCY_MAX, hints.hardwareConcurrency ?? 4));
  return Math.max(2, Math.min(cap, adaptive));
}

function requestForOfflineMedia(url: string, origin: string): Request {
  const parsed = new URL(url, origin);
  if (parsed.origin !== origin || !MEDIA_URL_PATTERN.test(parsed.pathname)) {
    throw new Error('O inventario de midia contem um recurso externo invalido.');
  }
  return new Request(parsed, { credentials: 'same-origin' });
}

/**
 * Baixa as midias do inventario em paralelo, gravando cada arquivo so
 * depois de conferir tamanho e SHA-256. Arquivos ja guardados sao
 * reaproveitados, o que evita repetir a transferencia da midia canonica
 * compartilhada entre concursos.
 */
export interface MediaDownloadOptions {
  /**
   * Chamado durante a leitura de cada parte do corpo. Mantem a coordenacao
   * do download viva mesmo quando um arquivo unico demora mais que o
   * intervalo de renovacao.
   */
  renew?: () => Promise<void>;
  /** Aborta o trabalho em andamento quando a coordenacao e perdida. */
  signal?: AbortSignal;
  /**
   * Silencio maximo, em milissegundos, antes de a transferencia ser
   * abortada. Sobrescreve `MEDIA_IDLE_TIMEOUT_MS` (usado em testes).
   */
  idleTimeoutMs?: number;
}

interface ReadMediaBodyOptions {
  /** Notificado a cada parte recebida, para o progresso por byte. */
  onBytes?: (bytes: number) => void;
  /** Aborta a requisicao quando o corpo para de chegar. */
  onStall?: () => void;
  idleTimeoutMs?: number;
}

/**
 * Le o corpo em partes, renovando a coordenacao a cada parte e vigiando o
 * silencio da conexao. Uma transferencia so e concluida quando o arquivo
 * inteiro chegou.
 */
async function readMediaBody(
  response: Response,
  expectedBytes: number,
  url: string,
  renew?: () => Promise<void>,
  options: ReadMediaBodyOptions = {},
): Promise<ArrayBuffer> {
  const body = response.body;
  if (!body) {
    const buffer = await response.arrayBuffer();
    options.onBytes?.(buffer.byteLength);
    return buffer;
  }
  const reader = body.getReader();
  // O tamanho vem do catalogo: um unico buffer evita manter duas copias
  // do arquivo em memoria com ate seis transferencias em voo.
  const contents = new Uint8Array(expectedBytes);
  let total = 0;
  let stalled = false;
  const idleTimeoutMs = options.idleTimeoutMs ?? MEDIA_IDLE_TIMEOUT_MS;
  let idleTimer: ReturnType<typeof setTimeout> | undefined;
  const armIdle = (): void => {
    if (idleTimeoutMs <= 0) return;
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      stalled = true;
      options.onStall?.();
      void reader.cancel().catch(() => undefined);
    }, idleTimeoutMs);
  };
  const stallError = (): Error =>
    new Error(`A conexão parou de responder ao baixar a mídia ${url}`);

  try {
    armIdle();
    while (true) {
      const { done, value } = await reader.read().catch((error: unknown) => {
        if (stalled) throw stallError();
        throw error;
      });
      if (done) break;
      if (value) {
        if (total + value.byteLength > expectedBytes) {
          await reader.cancel().catch(() => undefined);
          throw new Error(`Tamanho invalido para midia ${url}`);
        }
        contents.set(value, total);
        total += value.byteLength;
        options.onBytes?.(value.byteLength);
      }
      armIdle();
      if (renew) await renew();
    }
    if (stalled) throw stallError();
  } finally {
    if (idleTimer) clearTimeout(idleTimer);
  }
  if (total !== expectedBytes) throw new Error(`Tamanho invalido para midia ${url}`);
  return contents.buffer;
}

export async function downloadOfflineMedia(
  inventory: OfflineMediaInventory,
  onProgress: (progress: MediaDownloadProgress) => void = () => undefined,
  overrides: MediaEnvironment = {},
  options: MediaDownloadOptions = {},
): Promise<MediaDownloadOutcome> {
  const { cacheStorage, fetch: fetchResource, origin } = mediaEnvironment(overrides);
  if (!cacheStorage) throw new Error('Armazenamento de midia indisponivel neste navegador.');
  const cache = await cacheStorage.open(OFFLINE_MEDIA_CACHE);

  const missing: OfflineMediaItem[] = [];
  const reused: string[] = [];
  for (const item of inventory.items) {
    const request = requestForOfflineMedia(item.url, origin);
    const cached = await cache.match(request, { ignoreVary: true });
    if (cached) {
      reused.push(item.url);
      continue;
    }
    missing.push(item);
  }

  const totalBytes = inventory.estimatedBytes > 0
    ? inventory.estimatedBytes
    : inventory.items.reduce((total, item) => total + item.bytes, 0);
  const reusedBytes = inventory.items.reduce(
    (total, item) => (reused.includes(item.url) ? total + item.bytes : total),
    0,
  );
  let completed = 0;
  // Os bytes verificados so entram depois do SHA-256; os bytes em
  // transferencia entram durante a leitura. A barra de progresso usa a
  // soma, para se mover dentro do primeiro arquivo em vez de esperar que
  // ele termine inteiro (o que parecia "parado em 0%").
  let verifiedBytes = reusedBytes;
  let liveBytes = 0;
  let lastReportAt = 0;
  const report = (force = false): void => {
    const now = Date.now();
    if (!force && now - lastReportAt < 250) return;
    lastReportAt = now;
    onProgress({
      completed: reused.length + completed,
      total: inventory.items.length,
      downloadedBytes: Math.min(totalBytes, verifiedBytes + liveBytes),
      totalBytes,
      reused: reused.length,
    });
  };
  report(true);

  const failed: string[] = [];
  let firstError: string | undefined;
  await runConcurrentPool(missing, resolveMediaConcurrency(), async (item, signal) => {
    if (signal?.aborted) return;
    const request = requestForOfflineMedia(item.url, origin);
    // O sinal externo (coordenacao perdida) e o silencio da conexao
    // precisam abortar a mesma requisicao, cada um pela sua causa.
    const local = new AbortController();
    const abortLocal = (): void => {
      try {
        local.abort();
      } catch {
        // Ja abortado: nada a fazer.
      }
    };
    signal?.addEventListener('abort', abortLocal, { once: true });
    // O limite de silencio tambem vale antes dos cabecalhos: uma conexao
    // trocada, um portal cativo ou a aba suspensa deixam o `fetch`
    // pendente para sempre, e sem este temporizador a fase de midia
    // ficaria parada sem erro (o mesmo sintoma de "0%").
    const idleTimeoutMs = options.idleTimeoutMs ?? MEDIA_IDLE_TIMEOUT_MS;
    let stalledBeforeHeaders = false;
    const headerTimer =
      idleTimeoutMs > 0
        ? setTimeout(() => {
            stalledBeforeHeaders = true;
            abortLocal();
          }, idleTimeoutMs)
        : undefined;
    const clearHeaderTimer = (): void => {
      if (headerTimer !== undefined) clearTimeout(headerTimer);
    };
    let itemBytes = 0;
    try {
      let response: Response;
      try {
        response = await fetchResource(
          new Request(request, { headers: { 'X-PWA-Offline': '1' } }),
          { cache: 'reload', credentials: 'same-origin', signal: local.signal },
        );
      } catch (error) {
        if (stalledBeforeHeaders) {
          throw new Error(`A conexão parou de responder ao baixar a mídia ${item.url}`);
        }
        throw error;
      }
      // A resposta chegou: a leitura do corpo passa a ter o proprio
      // temporizador, renovado a cada parte recebida.
      clearHeaderTimer();
      stalledBeforeHeaders = false;
      if (!response.ok || response.type === 'opaque') {
        throw new Error(`Falha ao baixar midia ${item.url}: HTTP ${response.status}`);
      }
      if (response.status !== 200) {
        // A Function devolve 206 quando a requisicao leva Range; um 206 nao
        // pode ser gravado no cache e indicaria integridade comprometida.
        throw new Error(`Resposta inesperada para midia ${item.url}: HTTP ${response.status}`);
      }
      const buffer = await readMediaBody(response, item.bytes, item.url, options.renew, {
        onBytes: (bytes) => {
          itemBytes += bytes;
          liveBytes += bytes;
          report();
        },
        onStall: abortLocal,
        ...(options.idleTimeoutMs !== undefined ? { idleTimeoutMs: options.idleTimeoutMs } : {}),
      });
      if (buffer.byteLength !== item.bytes) {
        throw new Error(`Tamanho invalido para midia ${item.url}`);
      }
      const digest = await sha256Hex(buffer);
      if (digest !== item.sha256) {
        throw new Error(`Integridade invalida para midia ${item.url}`);
      }
      await cache.put(
        requestForOfflineMedia(item.url, origin),
        new Response(buffer, {
          status: 200,
          headers: {
            'Content-Type': mediaMimeFromUrl(item.url),
            'Content-Length': String(item.bytes),
            'Accept-Ranges': 'bytes',
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        }),
      );
      // Sai dos bytes em voo antes de entrar nos verificados: a soma nao
      // pode contar o mesmo arquivo duas vezes.
      liveBytes -= itemBytes;
      itemBytes = 0;
      verifiedBytes += item.bytes;
      completed += 1;
      report(true);
    } finally {
      clearHeaderTimer();
      liveBytes -= itemBytes;
      signal?.removeEventListener('abort', abortLocal);
    }
  }, {
    // Um arquivo indisponivel nao pode travar os demais: a midia e
    // idempotente e o que falhou fica registrado para retomada.
    abortOnError: false,
    ...(options.signal ? { signal: options.signal } : {}),
    onItemError: (error, item) => {
      failed.push(item.url);
      firstError ??= error instanceof Error ? error.message : String(error);
      // O arquivo que falhou saiu dos bytes em voo: a barra precisa
      // voltar ao total real antes de seguir.
      report(true);
    },
  });

  const stored = new Set<string>(reused);
  for (const item of missing) {
    if (await cache.match(requestForOfflineMedia(item.url, origin), { ignoreVary: true })) stored.add(item.url);
  }
  const storedBytes = inventory.items.reduce(
    (total, item) => (stored.has(item.url) ? total + item.bytes : total),
    0,
  );
  return {
    urls: [...stored],
    missing: inventory.items.filter((item) => !stored.has(item.url)).map((item) => item.url),
    failed,
    ...(firstError ? { firstError } : {}),
    downloadedBytes: storedBytes - reusedBytes,
  };
}

/** URLs do inventario que ja estao guardadas e verificadas no cache. */
export async function storedMediaUrls(
  inventory: OfflineMediaInventory,
  overrides: MediaEnvironment = {},
): Promise<string[]> {
  return mediaUrlsInCache(
    inventory.items.map((item) => item.url),
    overrides,
  );
}

/** URLs que ainda estao guardadas no cache de midia. */
export async function mediaUrlsInCache(
  urls: readonly string[],
  overrides: MediaEnvironment = {},
): Promise<string[]> {
  const { cacheStorage, origin } = mediaEnvironment(overrides);
  if (!cacheStorage) return [];
  const cache = await cacheStorage.open(OFFLINE_MEDIA_CACHE);
  const stored: string[] = [];
  for (const url of urls) {
    const request = requestForOfflineMedia(url, origin);
    if (await cache.match(request, { ignoreVary: true })) stored.push(url);
  }
  return stored;
}

export interface ByteRange {
  offset: number;
  length: number;
}

/**
 * Interpreta `Range: bytes=...` com a mesma gramatica da Function de
 * midia: fechado, aberto e por sufixo. Intervalos multiplos nao sao
 * suportados e devolvem `null` para que a resposta completa seja usada.
 */
export function parseByteRange(header: string | null, size: number): ByteRange | 'unsatisfiable' | null {
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

/**
 * Responde a uma requisicao de midia a partir do cache local. Sem faixa, a
 * resposta completa e devolvida; com faixa, um `206` e sintetizado, porque o
 * iOS Safari recusa `200` em requisicoes de audio e video.
 */
export async function matchOfflineMedia(request: Request): Promise<Response | undefined> {
  const { cacheStorage } = mediaEnvironment();
  if (!cacheStorage) return undefined;
  const cache = await cacheStorage.open(OFFLINE_MEDIA_CACHE);
  const cached = await cache.match(request.url, { ignoreVary: true });
  if (!cached) return undefined;

  const contentType = cached.headers.get('Content-Type') ?? mediaMimeFromUrl(new URL(request.url).pathname);
  const immutable = { 'Cache-Control': 'public, max-age=31536000, immutable' };

  const declared = Number(cached.headers.get('Content-Length'));
  const declaredSize = Number.isFinite(declared) && declared > 0 ? declared : undefined;
  const rangeHeader = request.headers.get('Range');
  if (!rangeHeader) {
    if (request.method === 'HEAD') {
      const size = declaredSize ?? (await cached.blob()).size;
      return new Response(null, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Content-Length': String(size),
          'Accept-Ranges': 'bytes',
          ...immutable,
        },
      });
    }
    return cached;
  }

  // Uma sondagem HEAD nao deve custar o corpo do arquivo: o tamanho
  // guardado no cabecalho basta para montar a resposta.
  if (request.method === 'HEAD' && declaredSize !== undefined) {
    const headRange = parseByteRange(rangeHeader, declaredSize);
    if (headRange === null) {
      return new Response(null, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Content-Length': String(declaredSize),
          'Accept-Ranges': 'bytes',
          ...immutable,
        },
      });
    }
    if (headRange === 'unsatisfiable') {
      return new Response(null, {
        status: 416,
        headers: { 'Content-Range': `bytes */${declaredSize}`, 'Accept-Ranges': 'bytes' },
      });
    }
    return new Response(null, {
      status: 206,
      headers: {
        'Content-Type': contentType,
        'Content-Length': String(headRange.length),
        'Content-Range': `bytes ${headRange.offset}-${headRange.offset + headRange.length - 1}/${declaredSize}`,
        'Accept-Ranges': 'bytes',
        ...immutable,
      },
    });
  }

  // O tamanho vem do corpo guardado: o Content-Length pode faltar e uma
  // faixa valida seria respondida com 416 sem ele.
  const blob = await cached.blob();
  const range = parseByteRange(rangeHeader, blob.size);
  if (range === null) {
    // Faixa invalida ou multipla: responde o arquivo inteiro. O corpo da
    // resposta em cache ja foi consumido, entao a resposta e recriada.
    return new Response(blob, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': String(blob.size),
        'Accept-Ranges': 'bytes',
        ...immutable,
      },
    });
  }
  if (range === 'unsatisfiable') {
    return new Response(null, {
      status: 416,
      headers: { 'Content-Range': `bytes */${blob.size}`, 'Accept-Ranges': 'bytes' },
    });
  }

  const headers = {
    'Content-Type': contentType,
    'Content-Length': String(range.length),
    'Content-Range': `bytes ${range.offset}-${range.offset + range.length - 1}/${blob.size}`,
    'Accept-Ranges': 'bytes',
    ...immutable,
  };
  // Uma sondagem HEAD nao deve custar o corpo do arquivo.
  if (request.method === 'HEAD') {
    return new Response(null, { status: 206, headers });
  }
  return new Response(blob.slice(range.offset, range.offset + range.length), { status: 206, headers });
}

/**
 * Remove do cache as midias que nenhum concurso baixado referencia. A midia
 * canonica compartilhada permanece enquanto algum concurso precisar dela.
 */
export async function pruneUnreferencedMedia(
  referencedUrls: ReadonlySet<string>,
  overrides: MediaEnvironment = {},
): Promise<number> {
  const { cacheStorage } = mediaEnvironment(overrides);
  if (!cacheStorage) return 0;
  const cache = await cacheStorage.open(OFFLINE_MEDIA_CACHE);
  const requests = await cache.keys();
  let removed = 0;
  for (const request of requests) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/media/')) continue;
    if (referencedUrls.has(url.pathname)) continue;
    await cache.delete(request);
    removed += 1;
  }
  return removed;
}
