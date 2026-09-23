import { z } from 'zod';
import {
  diffCalendarDays,
  getLocalTodayIso,
  isValidCalendarDate,
  isoWeekday,
} from './exam-date';

export const forecastFrequencySchema = z.enum(['seg-sex', 'todos-os-dias', 'alternados']);
export type ForecastFrequency = z.infer<typeof forecastFrequencySchema>;

export const forecastScopeKindSchema = z.enum(['concurso', 'grupo']);
export type ForecastScopeKind = z.infer<typeof forecastScopeKindSchema>;

/** Seleção de escopo em memória (ADR-001: grupo nunca é persistido). */
export const forecastScopeSchema = z
  .object({
    kind: forecastScopeKindSchema,
    groupId: z.string().min(1).max(512).nullable(),
  })
  .strict();
export type ForecastScope = z.infer<typeof forecastScopeSchema>;

/** Parâmetros persistidos por concurso (sem escopo, por ADR-001). */
export const forecastParamsSchema = z
  .object({
    schemaVersion: z.literal(1),
    frequency: forecastFrequencySchema,
    subjectsPerDay: z.number().int().min(1).max(20),
    subtractStudied: z.boolean(),
  })
  .strict();
export type ForecastParams = z.infer<typeof forecastParamsSchema>;

export const DEFAULT_FORECAST_PARAMS: ForecastParams = {
  schemaVersion: 1,
  frequency: 'seg-sex',
  subjectsPerDay: 1,
  subtractStudied: true,
};

/** Unidade mínima de contagem: origem deduplicada + marcas de conclusão dos consumidores. */
export interface ForecastUnit {
  originKey: string;
  studiedSubjectIds: string[];
  groupPathIds: string[];
}

/**
 * Filtra unidades pelo escopo (concurso = todas; grupo = descendentes cujo
 * caminho contém o grupo). A deduplicação por origem acontece depois.
 */
export function filterUnitsByScope(
  units: readonly ForecastUnit[],
  scope: ForecastScope,
): ForecastUnit[] {
  if (scope.kind === 'concurso' || !scope.groupId) return [...units];
  const groupId: string = scope.groupId;
  return units.filter((unit) => unit.groupPathIds.includes(groupId));
}

/**
 * Deduplica unidades pela origem resolvida (canônico compartilhado conta uma
 * vez), fundindo marcas de conclusão e caminhos de grupo de todos os
 * consumidores para não perder informação na ordem de entrada.
 */
export function deduplicateUnits(units: readonly ForecastUnit[]): ForecastUnit[] {
  const byOrigin = new Map<string, ForecastUnit>();
  for (const unit of units) {
    const existing = byOrigin.get(unit.originKey);
    if (!existing) {
      byOrigin.set(unit.originKey, { ...unit, studiedSubjectIds: [...unit.studiedSubjectIds], groupPathIds: [...unit.groupPathIds] });
      continue;
    }
    for (const id of unit.studiedSubjectIds) {
      if (!existing.studiedSubjectIds.includes(id)) existing.studiedSubjectIds.push(id);
    }
    for (const id of unit.groupPathIds) {
      if (!existing.groupPathIds.includes(id)) existing.groupPathIds.push(id);
    }
  }
  return [...byOrigin.values()];
}

export type ForecastStatus =
  | 'ok'
  | 'concluido'
  | 'escopo-vazio'
  | 'ritmo-invalido'
  | 'horizonte-excedido';

export type ForecastExamKind = 'sem-data' | 'folga' | 'no-dia' | 'atraso' | 'prova-passada';

export interface ForecastResult {
  status: ForecastStatus;
  totalSubjects: number;
  remainingSubjects: number;
  studyDaysNeeded: number;
  completionIso: string | null;
  subjectsPerWeek: number;
  examKind: ForecastExamKind;
  examDays: number | null;
}

/** Teto da varredura dia a dia (~55 anos), para nunca travar em ritmo/escopo degenerado. */
export const FORECAST_HORIZON_DAYS = 20_000;

/** Dias de estudo por semana civil para cada frequência (alternados = média de longo prazo). */
export function studyDaysPerWeek(frequency: ForecastFrequency): number {
  if (frequency === 'seg-sex') return 5;
  if (frequency === 'todos-os-dias') return 7;
  return 3.5;
}

/** Ritmo efetivo em assuntos por semana civil. */
export function subjectsPerWeek(subjectsPerDay: number, frequency: ForecastFrequency): number {
  return subjectsPerDay * studyDaysPerWeek(frequency);
}

function isStudyDay(cursorIso: string, todayIso: string, frequency: ForecastFrequency): boolean {
  if (frequency === 'todos-os-dias') return true;
  if (frequency === 'seg-sex') {
    const dow = isoWeekday(cursorIso);
    return dow >= 1 && dow <= 5;
  }
  return diffCalendarDays(cursorIso, todayIso) % 2 === 0;
}

/**
 * Projeta a data de conclusão varrendo dias civis a partir de hoje (hoje conta
 * quando for dia de estudo). Retorna `null` além do horizonte.
 */
export function projectCompletionIso(
  todayIso: string,
  studyDaysNeeded: number,
  frequency: ForecastFrequency,
): string | null {
  if (!isValidCalendarDate(todayIso) || studyDaysNeeded <= 0) return todayIso;
  let cursor = todayIso;
  let remaining = studyDaysNeeded;
  for (let elapsed = 0; elapsed <= FORECAST_HORIZON_DAYS; elapsed += 1) {
    if (isStudyDay(cursor, todayIso, frequency)) {
      remaining -= 1;
      if (remaining === 0) return cursor;
    }
    cursor = addOneDay(cursor);
  }
  return null;
}

function addOneDay(isoDate: string): string {
  const year = Number(isoDate.slice(0, 4));
  const month = Number(isoDate.slice(5, 7));
  const day = Number(isoDate.slice(8, 10));
  const leap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const monthDays = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1]!;
  if (day < monthDays) {
    return `${isoDate.slice(0, 8)}${String(day + 1).padStart(2, '0')}`;
  }
  if (month < 12) {
    return `${isoDate.slice(0, 5)}${String(month + 1).padStart(2, '0')}-01`;
  }
  return `${String(year + 1).padStart(4, '0')}-01-01`;
}

/**
 * Calcula a previsão a partir das unidades do escopo. `todayIso` é injetável
 * para testes; em produção use `getLocalTodayIso()`.
 */
export function calculateForecast(
  units: readonly ForecastUnit[],
  studiedIds: ReadonlySet<string>,
  params: ForecastParams,
  examDate: string | null,
  todayIso: string = getLocalTodayIso(),
): ForecastResult {
  const parsed = forecastParamsSchema.safeParse(params);
  if (!parsed.success || !Number.isInteger(params.subjectsPerDay) || params.subjectsPerDay < 1) {
    return {
      status: 'ritmo-invalido',
      totalSubjects: units.length,
      remainingSubjects: units.length,
      studyDaysNeeded: 0,
      completionIso: null,
      subjectsPerWeek: 0,
      examKind: 'sem-data',
      examDays: null,
    };
  }
  if (units.length === 0) {
    return {
      status: 'escopo-vazio',
      totalSubjects: 0,
      remainingSubjects: 0,
      studyDaysNeeded: 0,
      completionIso: null,
      subjectsPerWeek: subjectsPerWeek(params.subjectsPerDay, params.frequency),
      examKind: 'sem-data',
      examDays: null,
    };
  }
  const remainingUnits = params.subtractStudied
    ? units.filter((unit) => !unit.studiedSubjectIds.some((id) => studiedIds.has(id)))
    : [...units];
  if (remainingUnits.length === 0) {
    const examDays = examDate ? diffCalendarDays(examDate, todayIso) : null;
    return {
      status: 'concluido',
      totalSubjects: units.length,
      remainingSubjects: 0,
      studyDaysNeeded: 0,
      completionIso: todayIso,
      subjectsPerWeek: subjectsPerWeek(params.subjectsPerDay, params.frequency),
      examKind: examKindFor(examDays),
      examDays,
    };
  }
  const studyDaysNeeded = Math.ceil(remainingUnits.length / params.subjectsPerDay);
  const completionIso = projectCompletionIso(todayIso, studyDaysNeeded, params.frequency);
  if (!completionIso) {
    return {
      status: 'horizonte-excedido',
      totalSubjects: units.length,
      remainingSubjects: remainingUnits.length,
      studyDaysNeeded,
      completionIso: null,
      subjectsPerWeek: subjectsPerWeek(params.subjectsPerDay, params.frequency),
      examKind: 'sem-data',
      examDays: null,
    };
  }
  const examDays = examDate ? diffCalendarDays(examDate, completionIso) : null;
  return {
    status: 'ok',
    totalSubjects: units.length,
    remainingSubjects: remainingUnits.length,
    studyDaysNeeded,
    completionIso,
    subjectsPerWeek: subjectsPerWeek(params.subjectsPerDay, params.frequency),
    examKind: examKindFor(examDays),
    examDays,
  };
}

function examKindFor(examDays: number | null): ForecastExamKind {
  if (examDays === null) return 'sem-data';
  if (examDays > 0) return 'folga';
  if (examDays === 0) return 'no-dia';
  return 'atraso';
}
