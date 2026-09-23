import { describe, expect, it } from 'vitest';
import { contestInfoSchema } from '../../src/lib/content-schema';
import {
  calendarDateToEpochDays,
  daysUntilExam,
  diffCalendarDays,
  examStatus,
  formatExamDatePtBr,
  getLocalTodayIso,
  isValidCalendarDate,
} from '../../src/lib/exam-date';

describe('isValidCalendarDate', () => {
  it('aceita datas civis válidas', () => {
    expect(isValidCalendarDate('2026-09-23')).toBe(true);
    expect(isValidCalendarDate('2024-02-29')).toBe(true);
    expect(isValidCalendarDate('2000-02-29')).toBe(true);
  });

  it('rejeita formato inválido e datas inexistentes', () => {
    expect(isValidCalendarDate('2025-02-29')).toBe(false);
    expect(isValidCalendarDate('2026-04-31')).toBe(false);
    expect(isValidCalendarDate('2026-13-01')).toBe(false);
    expect(isValidCalendarDate('2026-00-10')).toBe(false);
    expect(isValidCalendarDate('2026-2-3')).toBe(false);
    expect(isValidCalendarDate('23/09/2026')).toBe(false);
    expect(isValidCalendarDate('')).toBe(false);
    expect(isValidCalendarDate('1900-02-29')).toBe(false);
  });
});

describe('diffCalendarDays', () => {
  it('calcula diferença assinada em dias civis', () => {
    expect(diffCalendarDays('2026-09-24', '2026-09-23')).toBe(1);
    expect(diffCalendarDays('2026-09-23', '2026-09-23')).toBe(0);
    expect(diffCalendarDays('2026-09-23', '2026-09-24')).toBe(-1);
  });

  it('atravessa mês, ano e ano bissexto', () => {
    expect(diffCalendarDays('2026-03-01', '2026-02-28')).toBe(1);
    expect(diffCalendarDays('2024-03-01', '2024-02-28')).toBe(2);
    expect(diffCalendarDays('2027-01-02', '2026-12-30')).toBe(3);
  });

  it('rejeita entradas inválidas', () => {
    expect(() => calendarDateToEpochDays('2026-02-30')).toThrow();
  });
});

describe('daysUntilExam e examStatus', () => {
  it('positivo = faltam, zero = hoje, negativo = passou', () => {
    expect(daysUntilExam('2026-09-24', '2026-09-23')).toBe(1);
    expect(daysUntilExam('2026-09-23', '2026-09-23')).toBe(0);
    expect(daysUntilExam('2026-09-20', '2026-09-23')).toBe(-3);
  });

  it('classifica sem-data, hoje, futura e passada', () => {
    expect(examStatus(null)).toBe('sem-data');
    expect(examStatus(0)).toBe('hoje');
    expect(examStatus(5)).toBe('futura');
    expect(examStatus(-2)).toBe('passada');
  });
});

describe('getLocalTodayIso e formatExamDatePtBr', () => {
  it('usa componentes locais, nunca UTC', () => {
    expect(getLocalTodayIso(new Date(2026, 8, 23, 23, 30))).toBe('2026-09-23');
  });

  it('formata como DD/MM/AAAA', () => {
    expect(formatExamDatePtBr('2026-09-23')).toBe('23/09/2026');
  });
});

describe('contestInfoSchema', () => {
  it('aceita data válida e ausência de data', () => {
    expect(
      contestInfoSchema.parse({ schemaVersion: 1, storageId: 'exemplo', examDate: '2026-10-15' }),
    ).toBeTruthy();
    expect(
      contestInfoSchema.parse({ schemaVersion: 1, storageId: 'exemplo', examDate: null }),
    ).toBeTruthy();
  });

  it('rejeita data inexistente e campos extras', () => {
    expect(() =>
      contestInfoSchema.parse({ schemaVersion: 1, storageId: 'exemplo', examDate: '2026-02-30' }),
    ).toThrow();
    expect(() =>
      contestInfoSchema.parse({
        schemaVersion: 1,
        storageId: 'exemplo',
        examDate: null,
        extra: true,
      }),
    ).toThrow();
  });
});
