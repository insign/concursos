/**
 * Helpers puros de data civil para a prova objetiva (issue 781).
 *
 * Toda a aritmética usa dias civis `YYYY-MM-DD`, sem hora, sem fuso e sem
 * horário de verão. A conversão para dias de época usa algoritmo inteiro
 * (Howard Hinnant), nunca `new Date('AAAA-MM-DD')` nem `toISOString()`.
 */

export const ISO_CALENDAR_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function daysInMonth(year: number, month: number): number {
  switch (month) {
    case 2:
      return isLeapYear(year) ? 29 : 28;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    default:
      return 31;
  }
}

/** Valida formato `YYYY-MM-DD` e existência real no calendário civil. */
export function isValidCalendarDate(value: string): boolean {
  if (!ISO_CALENDAR_DATE_PATTERN.test(value)) return false;
  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(5, 7));
  const day = Number(value.slice(8, 10));
  if (month < 1 || month > 12 || day < 1 || day > 31) return false;
  return day <= daysInMonth(year, month);
}

function parseParts(isoDate: string): { year: number; month: number; day: number } {
  if (!isValidCalendarDate(isoDate)) {
    throw new Error(`Data inválida: "${isoDate}"`);
  }
  return {
    year: Number(isoDate.slice(0, 4)),
    month: Number(isoDate.slice(5, 7)),
    day: Number(isoDate.slice(8, 10)),
  };
}

/** Converte data civil em contagem inteira de dias (algoritmo days-from-civil). */
export function calendarDateToEpochDays(isoDate: string): number {
  const { year, month, day } = parseParts(isoDate);
  const y = month <= 2 ? year - 1 : year;
  const era = Math.floor((y >= 0 ? y : y - 399) / 400);
  const yoe = y - era * 400;
  const mp = month <= 2 ? month + 9 : month - 3;
  const doy = Math.floor((153 * mp + 2) / 5) + day - 1;
  const doe = yoe * 365 + Math.floor(yoe / 4) - Math.floor(yoe / 100) + doy;
  return era * 146097 + doe - 719468;
}

/**
 * Diferença em dias civis: `target - reference`.
 * Positivo = alvo no futuro; zero = mesmo dia; negativo = alvo no passado.
 */
export function diffCalendarDays(targetIso: string, referenceIso: string): number {
  return calendarDateToEpochDays(targetIso) - calendarDateToEpochDays(referenceIso);
}

/** Data civil local de "hoje" no formato `YYYY-MM-DD`. */
export function getLocalTodayIso(now: Date = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Dias até a prova a partir de hoje (`YYYY-MM-DD`): positivo = faltam, negativo = passou. */
export function daysUntilExam(examIso: string, todayIso: string): number {
  return diffCalendarDays(examIso, todayIso);
}

export type ExamDateStatus = 'sem-data' | 'hoje' | 'futura' | 'passada';

/** Classifica a situação da prova a partir da diferença em dias (nula = sem data). */
export function examStatus(days: number | null): ExamDateStatus {
  if (days === null) return 'sem-data';
  if (days === 0) return 'hoje';
  return days > 0 ? 'futura' : 'passada';
}

/** Formata `YYYY-MM-DD` como `DD/MM/AAAA` para exibição. */
export function formatExamDatePtBr(isoDate: string): string {
  const { year, month, day } = parseParts(isoDate);
  return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${String(year).padStart(4, '0')}`;
}
