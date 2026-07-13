import { z } from 'zod';

export const KV_BASE_URL = 'https://kv.helio.me';
export const KV_OPERATIONAL_BODY_LIMIT = 1_850_000;
const KV_ID_PATTERN = /^[A-Za-z0-9_-]{1,100}$/;

const envelopeSchema = z
  .object({
    id: z.string().regex(KV_ID_PATTERN),
    version: z.number().int().positive(),
    created_at: z.string().nullable(),
    updated_at: z.string().nullable(),
    json: z.unknown(),
  })
  .strict();

const versionSchema = z
  .object({
    id: z.string().regex(KV_ID_PATTERN),
    version: z.number().int().positive(),
  })
  .strict();

export interface KvEnvelope<T = unknown> {
  id: string;
  version: number;
  created_at: string | null;
  updated_at: string | null;
  json: T;
}

export class KvClientError extends Error {}

export class KvHttpError extends KvClientError {
  constructor(public readonly status: number, message = `Falha HTTP no KV: ${status}`) {
    super(message);
  }
}

export class KvTimeoutError extends KvClientError {}
export class KvSizeError extends KvClientError {}
export class KvValidationError extends KvClientError {}

export interface KvRequestOptions {
  signal?: AbortSignal;
  timeoutMs?: number;
  retries?: number;
  fetchImpl?: typeof fetch;
  sleep?: (milliseconds: number) => Promise<void>;
  random?: () => number;
}

function assertKvId(id: string): void {
  if (!KV_ID_PATTERN.test(id)) throw new KvValidationError('Identificador KV inválido');
}

function retryDelay(response: Response, random: () => number): number {
  const retryAfter = response.headers.get('Retry-After');
  if (retryAfter) {
    const seconds = Number(retryAfter);
    if (Number.isFinite(seconds)) return Math.max(0, seconds * 1_000);
    const timestamp = Date.parse(retryAfter);
    if (Number.isFinite(timestamp)) return Math.max(0, timestamp - Date.now());
  }
  return 9_500 + Math.floor(random() * 1_500);
}

async function requestKv(url: string, init: RequestInit, options: KvRequestOptions): Promise<Response> {
  const fetchImpl = options.fetchImpl ?? fetch;
  const sleep = options.sleep ?? ((milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds)));
  const random = options.random ?? Math.random;
  const retries = options.retries ?? 2;

  for (let attempt = 0; ; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort('timeout'), options.timeoutMs ?? 8_000);
    const abort = () => controller.abort(options.signal?.reason);
    options.signal?.addEventListener('abort', abort, { once: true });

    try {
      const response = await fetchImpl(url, {
        ...init,
        cache: 'no-store',
        signal: controller.signal,
      });

      if (response.status === 429 && attempt < retries) {
        await sleep(retryDelay(response, random));
        continue;
      }

      return response;
    } catch (error) {
      if (controller.signal.aborted && !options.signal?.aborted) {
        throw new KvTimeoutError('Tempo limite excedido ao acessar o KV');
      }
      throw error;
    } finally {
      clearTimeout(timeout);
      options.signal?.removeEventListener('abort', abort);
    }
  }
}

async function parseEnvelope(response: Response, expectedId: string): Promise<KvEnvelope> {
  let value: unknown;
  try {
    value = await response.json();
  } catch {
    throw new KvValidationError('Resposta KV não contém JSON válido');
  }

  const parsed = envelopeSchema.safeParse(value);
  if (!parsed.success || parsed.data.id !== expectedId) {
    throw new KvValidationError('Envelope KV inválido');
  }
  return parsed.data;
}

export async function readKv(id: string, options: KvRequestOptions = {}): Promise<KvEnvelope | null> {
  assertKvId(id);
  const response = await requestKv(`${KV_BASE_URL}/${id}`, { method: 'GET' }, options);
  if (response.status === 404) return null;
  if (!response.ok) throw new KvHttpError(response.status);
  return parseEnvelope(response, id);
}

export async function readKvVersion(
  id: string,
  options: KvRequestOptions = {},
): Promise<{ id: string; version: number } | null> {
  assertKvId(id);
  const response = await requestKv(`${KV_BASE_URL}/${id}/version`, { method: 'GET' }, options);
  if (response.status === 404) return null;
  if (!response.ok) throw new KvHttpError(response.status);

  const parsed = versionSchema.safeParse(await response.json());
  if (!parsed.success || parsed.data.id !== id) throw new KvValidationError('Versão KV inválida');
  return parsed.data;
}

export async function writeKv(
  id: string,
  value: unknown,
  options: KvRequestOptions = {},
): Promise<KvEnvelope> {
  assertKvId(id);
  const body = JSON.stringify(value);
  const size = new TextEncoder().encode(body).byteLength;
  if (size > KV_OPERATIONAL_BODY_LIMIT) {
    throw new KvSizeError(`Documento excede o limite operacional de ${KV_OPERATIONAL_BODY_LIMIT} bytes`);
  }

  const response = await requestKv(
    `${KV_BASE_URL}/${id}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body,
    },
    options,
  );
  if (!response.ok) throw new KvHttpError(response.status);
  return parseEnvelope(response, id);
}
