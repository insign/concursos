import { describe, expect, it } from 'vitest';
import {
  addCalendarDays,
  calendarDateToEpochDays,
  epochDaysToCalendarDate,
  isoWeekday,
} from '../../src/lib/exam-date';

describe('epochDaysToCalendarDate', () => {
  it('inverte calendarDateToEpochDays em 2020–2032', () => {
    for (let epoch = calendarDateToEpochDays('2020-01-01'); epoch <= calendarDateToEpochDays('2032-12-31'); epoch += 1) {
      const iso = epochDaysToCalendarDate(epoch);
      expect(calendarDateToEpochDays(iso)).toBe(epoch);
    }
  });

  it('atravessa 29/02 e viradas de mês e ano', () => {
    expect(epochDaysToCalendarDate(calendarDateToEpochDays('2024-02-29'))).toBe('2024-02-29');
    expect(epochDaysToCalendarDate(calendarDateToEpochDays('2026-12-31'))).toBe('2026-12-31');
    expect(epochDaysToCalendarDate(0)).toBe('1970-01-01');
  });

  it('rejeita contagem não inteira', () => {
    expect(() => epochDaysToCalendarDate(1.5)).toThrow();
  });
});

describe('addCalendarDays', () => {
  it('soma e subtrai dias civis', () => {
    expect(addCalendarDays('2024-02-28', 1)).toBe('2024-02-29');
    expect(addCalendarDays('2024-02-28', 2)).toBe('2024-03-01');
    expect(addCalendarDays('2026-12-31', 1)).toBe('2027-01-01');
    expect(addCalendarDays('2026-09-23', -1)).toBe('2026-09-22');
    expect(addCalendarDays('2026-09-23', 0)).toBe('2026-09-23');
  });

  it('rejeita dias não inteiros e data inválida', () => {
    expect(() => addCalendarDays('2026-09-23', 1.5)).toThrow();
    expect(() => addCalendarDays('2026-02-30', 1)).toThrow();
  });
});

describe('isoWeekday', () => {
  it('usa o padrão ISO com âncora em 1970-01-01 (quinta)', () => {
    expect(isoWeekday('1970-01-01')).toBe(4);
    expect(isoWeekday('2026-09-23')).toBe(3);
    expect(isoWeekday('2026-09-26')).toBe(6);
    expect(isoWeekday('2026-09-27')).toBe(7);
    expect(isoWeekday('2026-09-28')).toBe(1);
  });
});
