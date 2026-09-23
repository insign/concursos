import { z } from 'zod';
import { getSharedDocumentRecord, updateSharedDocuments } from './offline-db';
import { forecastFrequencySchema } from './study-forecast';

const contestStorageIdSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(20);

/**
 * Parâmetros da calculadora por concurso (issue 780). Por ADR-001, grupos não
 * têm identidade persistida: o escopo selecionado vive só na tela e nunca é
 * gravado aqui — apenas frequência, ritmo e o alternador de concluídos.
 */
export const forecastContestSettingsSchema = z
  .object({
    frequency: forecastFrequencySchema,
    subjectsPerDay: z.number().int().min(1).max(20),
    subtractStudied: z.boolean(),
  })
  .strict();

export const forecastSettingsSchema = z
  .object({
    schemaVersion: z.literal(1),
    contests: z.record(contestStorageIdSchema, forecastContestSettingsSchema),
  })
  .strict();

export type ForecastContestSettings = z.infer<typeof forecastContestSettingsSchema>;
export type ForecastSettings = z.infer<typeof forecastSettingsSchema>;

export const EMPTY_FORECAST_SETTINGS: ForecastSettings = { schemaVersion: 1, contests: {} };

export const DEFAULT_CONTEST_SETTINGS: ForecastContestSettings = {
  frequency: 'seg-sex',
  subjectsPerDay: 1,
  subtractStudied: true,
};

export async function loadForecastSettings(profileId: string): Promise<ForecastSettings> {
  const record = await getSharedDocumentRecord('previsoes', profileId);
  const parsed = forecastSettingsSchema.safeParse(record?.current);
  return parsed.success ? parsed.data : EMPTY_FORECAST_SETTINGS;
}

export function contestForecastSettings(
  settings: ForecastSettings,
  contestStorageId: string,
): ForecastContestSettings {
  return settings.contests[contestStorageId] ?? DEFAULT_CONTEST_SETTINGS;
}

export async function saveContestForecastSettings(
  profileId: string,
  contestStorageId: string,
  settings: ForecastContestSettings,
): Promise<void> {
  const parsedSettings = forecastContestSettingsSchema.parse(settings);
  if (!contestStorageIdSchema.safeParse(contestStorageId).success) {
    throw new Error(`ID de armazenamento do concurso inválido: "${contestStorageId}"`);
  }
  await updateSharedDocuments(profileId, [
    {
      storeName: 'previsoes',
      dirtyFields: [contestStorageId],
      updateCurrent: (current) => {
        const parsed = forecastSettingsSchema.safeParse(current);
        const base = parsed.success ? parsed.data : EMPTY_FORECAST_SETTINGS;
        return {
          schemaVersion: 1 as const,
          contests: { ...base.contests, [contestStorageId]: parsedSettings },
        };
      },
    },
  ]);
}
