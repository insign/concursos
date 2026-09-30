import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { parsePrintPreferences, type PrintPreferences } from '../../src/lib/print-preferences';

const preference: PrintPreferences = {
  schemaVersion: 1,
  sections: ['cheat-sheet', 'questoes'],
  includeGabarito: false,
};

describe('print preferences format', () => {
  it('preserves a selection and hidden answer-key preference in canonical order', () => {
    expect(parsePrintPreferences(JSON.stringify({ ...preference, sections: ['questoes', 'conteudo', 'questoes'] })))
      .toEqual({ ...preference, sections: ['conteudo', 'questoes'] });
    expect(parsePrintPreferences(JSON.stringify({ ...preference, sections: ['conteudo'] })))
      .toEqual({ ...preference, sections: ['conteudo'] });
  });

  it('distinguishes an explicitly empty selection from missing preferences', () => {
    expect(parsePrintPreferences(null)).toBeNull();
    expect(parsePrintPreferences(JSON.stringify({ ...preference, sections: [] })))
      .toEqual({ ...preference, sections: [] });
  });

  it.each([
    '{', 'null', '[]', 'true', '{}',
    JSON.stringify({ ...preference, schemaVersion: 2 }),
    JSON.stringify({ ...preference, sections: 'questoes' }),
    JSON.stringify({ ...preference, sections: ['conteudo', 'unknown'] }),
    JSON.stringify({ ...preference, sections: [null] }),
    JSON.stringify({ ...preference, includeGabarito: 'false' }),
    JSON.stringify({ schemaVersion: 1, sections: ['questoes'] }),
  ])('rejects malformed or unsupported stored data: %s', (raw) => {
    expect(parsePrintPreferences(raw)).toBeNull();
  });
});

describe('print preferences storage', () => {
  const values = new Map<string, string>();
  const storage = {
    getItem: vi.fn((key: string) => values.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => { values.set(key, value); }),
  };

  beforeEach(() => {
    vi.resetModules();
    values.clear();
    storage.getItem.mockReset().mockImplementation((key) => values.get(key) ?? null);
    storage.setItem.mockReset().mockImplementation((key, value) => { values.set(key, value); });
    vi.stubGlobal('localStorage', storage);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('survives a new document and reads later changes or removal from another tab', async () => {
    const first = await import('../../src/lib/print-preferences');
    expect(first.loadPrintPreferences()).toBeNull();
    expect(storage.setItem).not.toHaveBeenCalled();
    first.savePrintPreferences(preference);
    vi.resetModules();
    const second = await import('../../src/lib/print-preferences');
    expect(second.loadPrintPreferences()).toEqual(preference);
    values.set(second.PRINT_PREFERENCES_STORAGE_KEY, JSON.stringify({ ...preference, sections: [] }));
    expect(second.loadPrintPreferences()?.sections).toEqual([]);
    values.delete(second.PRINT_PREFERENCES_STORAGE_KEY);
    expect(second.loadPrintPreferences()).toBeNull();
  });

  it('keeps edits in memory after a failed write instead of restoring stale data', async () => {
    const store = await import('../../src/lib/print-preferences');
    store.savePrintPreferences({ ...preference, includeGabarito: true });
    storage.setItem.mockImplementationOnce(() => { throw new DOMException('Quota exceeded', 'QuotaExceededError'); });
    expect(() => store.savePrintPreferences(preference)).not.toThrow();
    expect(store.loadPrintPreferences()).toEqual(preference);
    store.savePrintPreferences({ ...preference, sections: [] });
    expect(JSON.parse(values.get(store.PRINT_PREFERENCES_STORAGE_KEY)!)).toEqual({ ...preference, sections: [] });
  });

  it('handles failed reads without preventing edits', async () => {
    const store = await import('../../src/lib/print-preferences');
    storage.getItem.mockImplementation(() => { throw new DOMException('Blocked', 'SecurityError'); });
    expect(store.loadPrintPreferences()).toBeNull();
    store.savePrintPreferences(preference);
    expect(store.loadPrintPreferences()).toEqual(preference);
  });

  it('guards the localStorage getter itself and shares memory between callers', async () => {
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      get: () => { throw new DOMException('Blocked', 'SecurityError'); },
    });
    const first = await import('../../src/lib/print-preferences');
    expect(first.loadPrintPreferences()).toBeNull();
    expect(() => first.savePrintPreferences(preference)).not.toThrow();
    const second = await import('../../src/lib/print-preferences');
    expect(second.loadPrintPreferences()).toEqual(preference);
  });
});
