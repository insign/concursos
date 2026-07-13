import { describe, expect, it, vi } from 'vitest';
import {
  KV_OPERATIONAL_BODY_LIMIT,
  KvHttpError,
  KvSizeError,
  KvTimeoutError,
  KvValidationError,
  readKv,
  writeKv,
} from '../../src/lib/kv-client';

function envelope(id: string, json: unknown, version = 1) {
  return {
    id,
    version,
    created_at: '2026-07-13T12:00:00.000Z',
    updated_at: '2026-07-13T12:00:01.000Z',
    json,
  };
}

describe('KV client', () => {
  it('treats 404 as an absent document and rejects invalid IDs before fetch', async () => {
    const fetchImpl = vi.fn(async () => new Response(null, { status: 404 })) as unknown as typeof fetch;
    await expect(readKv('documento-valido', { fetchImpl })).resolves.toBeNull();
    await expect(readKv('id inválido', { fetchImpl })).rejects.toBeInstanceOf(KvValidationError);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it('writes a complete JSON document without Authorization', async () => {
    const fetchImpl = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      expect(input.toString()).toBe('https://kv.helio.me/documento');
      expect(init?.method).toBe('PUT');
      expect(new Headers(init?.headers).get('Content-Type')).toBe('application/json');
      expect(new Headers(init?.headers).has('Authorization')).toBe(false);
      expect(JSON.parse(String(init?.body))).toEqual({ enabled: true });
      return Response.json(envelope('documento', { enabled: true }));
    }) as unknown as typeof fetch;

    await expect(writeKv('documento', { enabled: true }, { fetchImpl })).resolves.toMatchObject({ version: 1 });
  });

  it('uses bounded Retry-After handling for 429', async () => {
    const sleep = vi.fn(async () => undefined);
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 429, headers: { 'Retry-After': '2' } }))
      .mockResolvedValueOnce(Response.json(envelope('documento', {}))) as unknown as typeof fetch;

    await readKv('documento', { fetchImpl, sleep, retries: 1 });
    expect(sleep).toHaveBeenCalledWith(2_000);
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  it('reports HTTP, timeout, size and malformed-envelope failures', async () => {
    const serverError = vi.fn(async () => new Response(null, { status: 500 })) as unknown as typeof fetch;
    await expect(readKv('documento', { fetchImpl: serverError })).rejects.toBeInstanceOf(KvHttpError);

    const malformed = vi.fn(async () => Response.json({ id: 'outro', version: 1 })) as unknown as typeof fetch;
    await expect(readKv('documento', { fetchImpl: malformed })).rejects.toBeInstanceOf(KvValidationError);

    const hanging = vi.fn(
      async (_input: RequestInfo | URL, init?: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')));
        }),
    ) as unknown as typeof fetch;
    await expect(readKv('documento', { fetchImpl: hanging, timeoutMs: 1 })).rejects.toBeInstanceOf(
      KvTimeoutError,
    );

    await expect(writeKv('documento', 'x'.repeat(KV_OPERATIONAL_BODY_LIMIT))).rejects.toBeInstanceOf(KvSizeError);
  });
});
