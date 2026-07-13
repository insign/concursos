import { z } from 'zod';
import { getSharedDocumentRecord, saveSharedDocument } from './offline-db';
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
  await saveSharedDocument('preferences', profileId, preferencesSchema.parse(preferences), dirtyFields);
}

export function withPreference(
  preferences: Preferences,
  field: PreferenceField,
  value: QuestionLayout | CorrectionMode | boolean,
): Preferences {
  return { ...preferences, [field]: value };
}
