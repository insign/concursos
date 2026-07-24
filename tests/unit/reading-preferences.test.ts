import { describe, expect, it } from 'vitest';
import {
  clampReadingPreferences,
  DEFAULT_READING_PREFERENCES,
  fontStackFor,
  readingPreferencesSchema,
  READING_COLOR_SCHEMES,
  READING_FONTS,
} from '../../src/lib/reading-preferences';

describe('reading preferences document', () => {
  it('accepts the defaults and validates the schema strictly', () => {
    expect(readingPreferencesSchema.safeParse(DEFAULT_READING_PREFERENCES).success).toBe(true);
    // Versão inválida, fonte fora do enum, campo extra e limites são rejeitados.
    expect(
      readingPreferencesSchema.safeParse({ ...DEFAULT_READING_PREFERENCES, schemaVersion: 2 }).success,
    ).toBe(false);
    expect(
      readingPreferencesSchema.safeParse({ ...DEFAULT_READING_PREFERENCES, fontFamily: 'comic' }).success,
    ).toBe(false);
    expect(
      readingPreferencesSchema.safeParse({ ...DEFAULT_READING_PREFERENCES, colorScheme: 'neon' }).success,
    ).toBe(false);
    expect(
      readingPreferencesSchema.safeParse({ ...DEFAULT_READING_PREFERENCES, extra: 1 }).success,
    ).toBe(false);
    expect(
      readingPreferencesSchema.safeParse({ ...DEFAULT_READING_PREFERENCES, fontSize: 40 }).success,
    ).toBe(false);
  });

  it('keeps the defaults consistent with the catalogs', () => {
    expect(READING_FONTS.some((font) => font.id === DEFAULT_READING_PREFERENCES.fontFamily)).toBe(true);
    expect(
      READING_COLOR_SCHEMES.some((scheme) => scheme.id === DEFAULT_READING_PREFERENCES.colorScheme),
    ).toBe(true);
    // O default 'auto' não sobrepõe cores.
    const auto = READING_COLOR_SCHEMES.find((scheme) => scheme.id === 'auto');
    expect(auto?.background).toBeNull();
    expect(auto?.text).toBeNull();
  });

  it('resolves a font stack for a known id and falls back for unknown', () => {
    expect(fontStackFor('inter')).toContain('Inter');
    // @ts-expect-error id inexistente cai no primeiro catálogo.
    expect(fontStackFor('missing')).toBe(READING_FONTS[0].stack);
  });

  it('clamps out-of-range numbers to the allowed bounds', () => {
    const low = clampReadingPreferences({
      fontSize: 5,
      lineHeight: 0.5,
      contentWidth: 10,
      horizontalSpacing: -20,
    });
    expect(low.fontSize).toBe(15);
    expect(low.lineHeight).toBe(1.3);
    expect(low.contentWidth).toBe(52);
    expect(low.horizontalSpacing).toBe(0);

    const high = clampReadingPreferences({
      fontSize: 99,
      lineHeight: 9,
      contentWidth: 999,
      horizontalSpacing: 999,
    });
    expect(high.fontSize).toBe(26);
    expect(high.lineHeight).toBe(2.1);
    expect(high.contentWidth).toBe(92);
    expect(high.horizontalSpacing).toBe(48);
  });

  it('rounds integers and recovers from NaN with defaults', () => {
    const rounded = clampReadingPreferences({ fontSize: 19.7, contentWidth: 71.4, horizontalSpacing: 5.6 });
    expect(rounded.fontSize).toBe(20);
    expect(rounded.contentWidth).toBe(71);
    expect(rounded.horizontalSpacing).toBe(6);

    const broken = clampReadingPreferences({ fontSize: Number.NaN, lineHeight: Number.NaN });
    expect(broken.fontSize).toBe(DEFAULT_READING_PREFERENCES.fontSize);
    expect(broken.lineHeight).toBe(DEFAULT_READING_PREFERENCES.lineHeight);
  });

  it('always forces the current schema version and returns a valid document', () => {
    const result = clampReadingPreferences({ fontFamily: 'atkinson', colorScheme: 'sepia' });
    expect(result.schemaVersion).toBe(1);
    expect(readingPreferencesSchema.safeParse(result).success).toBe(true);
  });
});
