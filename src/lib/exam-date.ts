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

/**
 * Converte contagem inteira de dias de época de volta em data civil `YYYY-MM-DD`.
 * Algoritmo inverso exato (civil-from-days, Howard Hinnant), sem `Date`/fuso.
 */
export function epochDaysToCalendarDate(epochDays: number): string {
  if (!Number.isInteger(epochDays)) {
    throw new Error(`Contagem de dias deve ser inteira: "${epochDays}"`);
  }
  const z = epochDays + 719468;
  const era = Math.floor((z >= 0 ? z : z - 146096) / 146097);
  const doe = z - era * 146097;
  const yoe = Math.floor(
    (doe - Math.floor(doe / 1460) + Math.floor(doe / 36524) - Math.floor(doe / 146096)) / 365,
  );
  const y = yoe + era * 400;
  const doy = doe - (365 * yoe + Math.floor(yoe / 4) - Math.floor(yoe / 100));
  const mp = Math.floor((5 * doy + 2) / 153);
  const d = doy - Math.floor((153 * mp + 2) / 5) + 1;
  const m = mp < 10 ? mp + 3 : mp - 9;
  const year = m <= 2 ? y + 1 : y;
  return `${String(year).padStart(4, '0')}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

/** Soma dias civis inteiros a uma data `YYYY-MM-DD` (aceita valores negativos). */
export function addCalendarDays(isoDate: string, days: number): string {
  if (!Number.isInteger(days)) {
    throw new Error(`Dias a somar devem ser inteiros: "${days}"`);
  }
  return epochDaysToCalendarDate(calendarDateToEpochDays(isoDate) + days);
}

/**
 * Dia da semana civil no padrão ISO: 1 = segunda … 7 = domingo.
 * Derivado da contagem de época (1970-01-01 foi quinta-feira), sem `Date`.
 */
export function isoWeekday(isoDate: string): number {
  const raw = (calendarDateToEpochDays(isoDate) + 3) % 7;
  return (raw < 0 ? raw + 7 : raw) + 1;
}
