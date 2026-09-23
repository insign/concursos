import { beforeEach, describe, expect, it } from 'vitest';
import 'fake-indexeddb/auto';
import {
  buildForecastDocumentId,
  validateUserAlias,
} from '../../src/lib/identity';
import { deleteOfflineDatabase, getSharedDocumentRecord, openOfflineDb } from '../../src/lib/offline-db';
import {
  contestForecastSettings,
  DEFAULT_CONTEST_SETTINGS,
  EMPTY_FORECAST_SETTINGS,
  forecastSettingsSchema,
  loadForecastSettings,
  saveContestForecastSettings,
} from '../../src/lib/forecast-settings';

const profileId = 'perfil-previsao';

beforeEach(async () => {
  await deleteOfflineDatabase();
});

describe('forecastSettingsSchema', () => {
  it('aceita documento versionado por concurso sem escopo (ADR-001)', () => {
    expect(
      forecastSettingsSchema.parse({
        schemaVersion: 1,
        contests: { exemplo: { frequency: 'seg-sex', subjectsPerDay: 2, subtractStudied: true } },
      }),
    ).toBeTruthy();
    expect(EMPTY_FORECAST_SETTINGS).toEqual({ schemaVersion: 1, contests: {} });
  });

  it('rejeita ritmo inválido, grupo persistido e campos extras', () => {
    expect(() =>
      forecastSettingsSchema.parse({
        schemaVersion: 1,
        contests: { exemplo: { frequency: 'seg-sex', subjectsPerDay: 0, subtractStudied: true } },
      }),
    ).toThrow();
    expect(() =>
      forecastSettingsSchema.parse({
        schemaVersion: 1,
        contests: {
          exemplo: { frequency: 'seg-sex', subjectsPerDay: 1, subtractStudied: true, scopeGroupId: 'x' },
        },
      }),
    ).toThrow();
  });

  it('gera ID remoto dentro do limite', () => {
    expect(buildForecastDocumentId(profileId)).toBe(`concursos--${profileId}--previsoes`);
    expect(() => validateUserAlias('x'.repeat(33))).toThrow();
  });
});

describe('forecast settings persistence', () => {
  it('cria o store previsoes no upgrade e isola por alias e concurso', async () => {
    expect((await openOfflineDb()).objectStoreNames.contains('previsoes')).toBe(true);
    await saveContestForecastSettings(profileId, 'exemplo', {
      frequency: 'todos-os-dias',
      subjectsPerDay: 3,
      subtractStudied: false,
    });
    const settings = await loadForecastSettings(profileId);
    expect(contestForecastSettings(settings, 'exemplo')).toEqual({
      frequency: 'todos-os-dias',
      subjectsPerDay: 3,
      subtractStudied: false,
    });
    expect(contestForecastSettings(settings, 'outro')).toEqual(DEFAULT_CONTEST_SETTINGS);
    expect(await loadForecastSettings('outro-alias')).toEqual(EMPTY_FORECAST_SETTINGS);
    const record = await getSharedDocumentRecord('previsoes', profileId);
    expect(record).toMatchObject({ outboxState: 'pending', dirtyFields: ['exemplo'] });
  });

  it('atualiza um concurso sem tocar o outro', async () => {
    await saveContestForecastSettings(profileId, 'a', {
      frequency: 'seg-sex',
      subjectsPerDay: 1,
      subtractStudied: true,
    });
    await saveContestForecastSettings(profileId, 'b', {
      frequency: 'alternados',
      subjectsPerDay: 2,
      subtractStudied: false,
    });
    const settings = await loadForecastSettings(profileId);
    expect(settings.contests.a?.subjectsPerDay).toBe(1);
    expect(settings.contests.b?.frequency).toBe('alternados');
  });
});
