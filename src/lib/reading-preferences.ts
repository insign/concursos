import { z } from 'zod';
import { getSharedDocumentRecord, updateSharedDocuments } from './offline-db';

// Famílias empacotadas localmente (src/styles/fonts.css), curadas para leitura prolongada
// com bom suporte ao português: duas serifadas e duas sem serifa.
export const READING_FONTS = [
  { id: 'lora', label: 'Lora (serifada)', stack: "'Lora', Georgia, 'Times New Roman', serif" },
  { id: 'source-serif', label: 'Source Serif (serifada)', stack: "'Source Serif 4', Georgia, serif" },
  { id: 'inter', label: 'Inter (sem serifa)', stack: "'Inter', system-ui, sans-serif" },
  { id: 'atkinson', label: 'Atkinson Hyperlegible (sem serifa)', stack: "'Atkinson Hyperlegible', system-ui, sans-serif" },
] as const;

export type ReadingFontId = (typeof READING_FONTS)[number]['id'];

// Combinações de cores prontas com contraste adequado (a personalização de cor é por preset
// para nunca produzir texto ilegível). 'auto' segue o tema global (#98) sem sobrepor.
export const READING_COLOR_SCHEMES = [
  { id: 'auto', label: 'Automático (tema do site)', background: null, text: null },
  { id: 'claro', label: 'Claro', background: '#fffdf8', text: '#1b2a26' },
  { id: 'sepia', label: 'Sépia', background: '#f2e8d2', text: '#43341f' },
  { id: 'cinza', label: 'Cinza', background: '#33383b', text: '#e8edef' },
  { id: 'escuro', label: 'Escuro', background: '#14181a', text: '#e7ece8' },
] as const;

export type ReadingColorSchemeId = (typeof READING_COLOR_SCHEMES)[number]['id'];

export const readingPreferencesSchema = z
  .object({
    schemaVersion: z.literal(1),
    fontFamily: z.enum(['lora', 'source-serif', 'inter', 'atkinson']),
    fontSize: z.number().int().min(15).max(26),
    lineHeight: z.number().min(1.3).max(2.1),
    contentWidth: z.number().int().min(52).max(92),
    horizontalSpacing: z.number().int().min(0).max(48),
    colorScheme: z.enum(['auto', 'claro', 'sepia', 'cinza', 'escuro']),
  })
  .strict();

export type ReadingPreferences = z.infer<typeof readingPreferencesSchema>;
export type ReadingPreferenceField = Exclude<keyof ReadingPreferences, 'schemaVersion'>;

export const DEFAULT_READING_PREFERENCES: ReadingPreferences = {
  schemaVersion: 1,
  fontFamily: 'lora',
  fontSize: 19,
  lineHeight: 1.7,
  contentWidth: 72,
  horizontalSpacing: 0,
  colorScheme: 'auto',
};

export function fontStackFor(id: ReadingFontId): string {
  return (READING_FONTS.find((font) => font.id === id) ?? READING_FONTS[0]).stack;
}

/** Aplica limites e normaliza uma preferência arbitrária para valores válidos. */
export function clampReadingPreferences(input: Partial<ReadingPreferences>): ReadingPreferences {
  const base = { ...DEFAULT_READING_PREFERENCES, ...input, schemaVersion: 1 as const };
  const clampNumber = (value: number, min: number, max: number, fallback: number) =>
    Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;
  const merged: ReadingPreferences = {
    ...base,
    fontSize: clampNumber(Math.round(base.fontSize), 15, 26, DEFAULT_READING_PREFERENCES.fontSize),
    lineHeight: clampNumber(base.lineHeight, 1.3, 2.1, DEFAULT_READING_PREFERENCES.lineHeight),
    contentWidth: clampNumber(Math.round(base.contentWidth), 52, 92, DEFAULT_READING_PREFERENCES.contentWidth),
    horizontalSpacing: clampNumber(Math.round(base.horizontalSpacing), 0, 48, DEFAULT_READING_PREFERENCES.horizontalSpacing),
  };
  const parsed = readingPreferencesSchema.safeParse(merged);
  return parsed.success ? parsed.data : DEFAULT_READING_PREFERENCES;
}

export async function loadReadingPreferences(profileId: string): Promise<ReadingPreferences> {
  const record = await getSharedDocumentRecord('leitura', profileId);
  const parsed = readingPreferencesSchema.safeParse(record?.current);
  return parsed.success ? parsed.data : DEFAULT_READING_PREFERENCES;
}

export async function saveReadingPreferences(
  profileId: string,
  preferences: ReadingPreferences,
  dirtyFields: ReadingPreferenceField[],
): Promise<void> {
  const parsed = readingPreferencesSchema.parse(preferences);
  await updateSharedDocuments(profileId, [
    {
      storeName: 'leitura',
      dirtyFields,
      updateCurrent: (current) => {
        const parsedCurrent = readingPreferencesSchema.safeParse(current);
        if (!parsedCurrent.success) return parsed;
        const merged = { ...parsedCurrent.data };
        for (const field of dirtyFields) merged[field] = parsed[field] as never;
        return merged;
      },
    },
  ]);
}
