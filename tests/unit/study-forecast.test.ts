import { describe, expect, it } from 'vitest';
import {
  calculateForecast,
  deduplicateUnits,
  DEFAULT_FORECAST_PARAMS,
  filterUnitsByScope,
  projectCompletionIso,
  studyDaysPerWeek,
  subjectsPerWeek,
  type ForecastParams,
  type ForecastUnit,
} from '../../src/lib/study-forecast';

const TODAY = '2026-09-23'; // quarta-feira

function unit(originKey: string, studiedId: string, groups = ['g1']): ForecastUnit {
  return { originKey, studiedSubjectIds: [studiedId], groupPathIds: groups };
}

function params(overrides: Partial<ForecastParams> = {}): ForecastParams {
  return { ...DEFAULT_FORECAST_PARAMS, ...overrides, schemaVersion: 1 as const };
}

describe('studyDaysPerWeek/subjectsPerWeek', () => {
  it('aplica multiplicadores 5/7/3.5', () => {
    expect(studyDaysPerWeek('seg-sex')).toBe(5);
    expect(studyDaysPerWeek('todos-os-dias')).toBe(7);
    expect(studyDaysPerWeek('alternados')).toBe(3.5);
    expect(subjectsPerWeek(2, 'seg-sex')).toBe(10);
    expect(subjectsPerWeek(1, 'alternados')).toBe(3.5);
  });
});

describe('projectCompletionIso', () => {
  it('todos-os-dias soma direto com hoje incluso', () => {
    expect(projectCompletionIso(TODAY, 5, 'todos-os-dias')).toBe('2026-09-27');
    expect(projectCompletionIso(TODAY, 1, 'todos-os-dias')).toBe(TODAY);
  });

  it('seg-sex pula fim de semana', () => {
    expect(projectCompletionIso('2026-09-25', 2, 'seg-sex')).toBe('2026-09-28');
    expect(projectCompletionIso('2026-09-26', 1, 'seg-sex')).toBe('2026-09-28');
  });

  it('alternados ancora em hoje (dia sim, dia não)', () => {
    expect(projectCompletionIso(TODAY, 1, 'alternados')).toBe(TODAY);
    expect(projectCompletionIso(TODAY, 2, 'alternados')).toBe('2026-09-25');
    expect(projectCompletionIso(TODAY, 3, 'alternados')).toBe('2026-09-27');
  });
});

describe('filterUnitsByScope/deduplicateUnits', () => {
  const units = [
    unit('o1', 'c--s1', ['g-root', 'g-a']),
    unit('o1', 'c--s1b', ['g-root', 'g-b']),
    unit('o2', 'c--s2', ['g-root', 'g-a']),
  ];

  it('concurso retorna tudo; grupo filtra descendentes', () => {
    expect(filterUnitsByScope(units, { kind: 'concurso', groupId: null })).toHaveLength(3);
    expect(filterUnitsByScope(units, { kind: 'grupo', groupId: 'g-a' })).toHaveLength(2);
    expect(filterUnitsByScope(units, { kind: 'grupo', groupId: 'g-root' })).toHaveLength(3);
    expect(filterUnitsByScope(units, { kind: 'grupo', groupId: 'inexistente' })).toHaveLength(0);
  });

  it('deduplica pela origem preservando a primeira', () => {
    const deduped = deduplicateUnits(filterUnitsByScope(units, { kind: 'grupo', groupId: 'g-root' }));
    expect(deduped.map((u) => u.originKey)).toEqual(['o1', 'o2']);
  });

  it('abatimento conta origem feita se qualquer consumidor estiver marcado', () => {
    const scoped = deduplicateUnits(units);
    const result = calculateForecast(scoped, new Set(['c--s1b']), params(), null, TODAY);
    expect(result.totalSubjects).toBe(2);
    expect(result.remainingSubjects).toBe(1);
  });
});

describe('calculateForecast', () => {
  const units = [unit('o1', 'c--s1'), unit('o2', 'c--s2'), unit('o3', 'c--s3')];

  it('prevê do zero com folga contra a prova', () => {
    const result = calculateForecast(units, new Set(), params({ subjectsPerDay: 3 }), '2026-12-06', TODAY);
    expect(result.status).toBe('ok');
    expect(result.totalSubjects).toBe(3);
    expect(result.remainingSubjects).toBe(3);
    expect(result.studyDaysNeeded).toBe(1);
    expect(result.completionIso).toBe(TODAY);
    expect(result.examKind).toBe('folga');
    expect(result.examDays).toBeGreaterThan(0);
  });

  it('aplica ceil e cruza atraso', () => {
    const result = calculateForecast(
      units,
      new Set(),
      params({ subjectsPerDay: 2, frequency: 'todos-os-dias' }),
      '2026-09-24',
      TODAY,
    );
    expect(result.studyDaysNeeded).toBe(2);
    expect(result.completionIso).toBe('2026-09-24');
    expect(result.examKind).toBe('no-dia');
    expect(result.examDays).toBe(0);
  });

  it('abate estudados quando o alternador liga', () => {
    const studied = new Set(['c--s1', 'c--s3']);
    const result = calculateForecast(units, studied, params({ subjectsPerDay: 1 }), null, TODAY);
    expect(result.remainingSubjects).toBe(1);
    expect(result.examKind).toBe('sem-data');
    expect(result.examDays).toBeNull();
  });

  it('ignora estudados quando o alternador desliga', () => {
    const studied = new Set(['c--s1']);
    const result = calculateForecast(
      units,
      studied,
      params({ subjectsPerDay: 1, subtractStudied: false }),
      null,
      TODAY,
    );
    expect(result.remainingSubjects).toBe(3);
  });

  it('retorna concluido sem inventar data passada', () => {
    const studied = new Set(['c--s1', 'c--s2', 'c--s3']);
    const result = calculateForecast(units, studied, params(), '2026-12-06', TODAY);
    expect(result.status).toBe('concluido');
    expect(result.completionIso).toBe(TODAY);
    expect(result.remainingSubjects).toBe(0);
  });

  it('escopo vazio e ritmo inválido não geram data', () => {
    expect(calculateForecast([], new Set(), params(), null, TODAY).status).toBe('escopo-vazio');
    const bad = calculateForecast(units, new Set(), { ...params(), subjectsPerDay: 0 }, null, TODAY);
    expect(bad.status).toBe('ritmo-invalido');
    expect(bad.completionIso).toBeNull();
    const over = calculateForecast(units, new Set(), { ...params(), subjectsPerDay: 21 }, null, TODAY);
    expect(over.status).toBe('ritmo-invalido');
  });

  it('marca atraso quando a conclusão passa da prova', () => {
    const many = Array.from({ length: 10 }, (_, i) => unit(`o${i}`, `c--s${i}`));
    const result = calculateForecast(
      many,
      new Set(),
      params({ subjectsPerDay: 1, frequency: 'todos-os-dias' }),
      '2026-09-24',
      TODAY,
    );
    expect(result.examKind).toBe('atraso');
    expect(result.examDays).toBeLessThan(0);
  });
});
