import { z } from 'zod';
import { getSharedDocumentRecord, updateSharedDocuments, type SharedDocumentUpdate } from './offline-db';
import type { CorrectionMode, QuestionLayout } from './questionnaire';

export const preferencesSchema = z
  .object({
    schemaVersion: z.literal(1),
    questionLayout: z.enum(['single', 'ten', 'all']),
    correctionMode: z.enum(['immediate', 'on-submit']),
    shuffleQuestions: z.boolean(),
  })
  .strict();

export type Preferences = z.infer<typeof preferencesSchema>;
export type PreferenceField = Exclude<keyof Preferences, 'schemaVersion'>;

export const DEFAULT_PREFERENCES: Preferences = {
  schemaVersion: 1,
  questionLayout: 'single',
  correctionMode: 'on-submit',
  shuffleQuestions: false,
};

export function mergePreferences(
  local: Preferences,
  base: Preferences | null,
  remote: Preferences | null,
): Preferences {
  if (!remote) return local;
  if (!base) return remote;

  const merged = { ...local };
  for (const field of ['questionLayout', 'correctionMode', 'shuffleQuestions'] as const) {
    const localChanged = local[field] !== base[field];
    const remoteChanged = remote[field] !== base[field];
    if (!localChanged && remoteChanged) merged[field] = remote[field] as never;
    else if (localChanged && remoteChanged && local[field] !== remote[field]) merged[field] = remote[field] as never;
  }
  return merged;
}

export async function loadPreferences(profileId: string): Promise<Preferences> {
  const record = await getSharedDocumentRecord('preferences', profileId);
  const parsed = preferencesSchema.safeParse(record?.current);
  return parsed.success ? parsed.data : DEFAULT_PREFERENCES;
}

export async function savePreferences(
  profileId: string,
  preferences: Preferences,
  dirtyFields: PreferenceField[],
): Promise<void> {
  const parsedPreferences = preferencesSchema.parse(preferences);
  const updates: SharedDocumentUpdate[] = [
    {
      storeName: 'preferences',
      dirtyFields,
      updateCurrent: (current) => {
        const parsedCurrent = preferencesSchema.safeParse(current);
        if (!parsedCurrent.success) return parsedPreferences;
        const merged = { ...parsedCurrent.data };
        for (const field of dirtyFields) merged[field] = parsedPreferences[field] as never;
        return merged;
      },
    },
  ];

  if (dirtyFields.includes('correctionMode')) {
    const {
      EMPTY_PROGRESS,
      PREFERENCES_PROGRESS_DIRTY_FIELD,
      progressSchema,
      sanitizeProgressForCorrectionMode,
    } = await import('./progress');
    updates.push({
      storeName: 'progress',
      dirtyFields: [PREFERENCES_PROGRESS_DIRTY_FIELD],
      updateCurrent: (current) => {
        const parsed = progressSchema.safeParse(current);
        return sanitizeProgressForCorrectionMode(
          parsed.success ? parsed.data : EMPTY_PROGRESS,
          parsedPreferences.correctionMode,
        ).document;
      },
    });
  }

  await updateSharedDocuments(profileId, updates);
}

export function withPreference(
  preferences: Preferences,
  field: PreferenceField,
  value: QuestionLayout | CorrectionMode | boolean,
): Preferences {
  return { ...preferences, [field]: value };
}
