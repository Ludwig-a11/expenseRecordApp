import { describe, it, expect } from 'vitest';
import { getDate, getUnixTime } from 'date-fns';
import { PERIOD_TYPES, getMonthlyPeriod, getBiweeklyPeriod, getPeriodBoundaries } from './getPeriodBoundaries';

describe('getMonthlyPeriod', () => {
  it('spans the full calendar month regardless of the reference day', () => {
    const { start, end } = getMonthlyPeriod(new Date(2026, 1, 10)); // Feb 2026 (28 days)
    expect(start.getDate()).toBe(1);
    expect(end.getDate()).toBe(28);
    expect(start.getMonth()).toBe(1);
    expect(end.getMonth()).toBe(1);
  });
});

describe('getBiweeklyPeriod', () => {
  it('day 1 falls in the 1st-half quincena (1-15)', () => {
    const { start, end } = getBiweeklyPeriod(new Date(2026, 7, 1));
    expect(getDate(start)).toBe(1);
    expect(getDate(end)).toBe(15);
  });

  it('day 15 (the boundary) still falls in the 1st-half quincena', () => {
    const { start, end } = getBiweeklyPeriod(new Date(2026, 7, 15));
    expect(getDate(start)).toBe(1);
    expect(getDate(end)).toBe(15);
  });

  it('day 16 (the boundary) falls in the 2nd-half quincena', () => {
    const { start, end } = getBiweeklyPeriod(new Date(2026, 7, 16));
    expect(getDate(start)).toBe(16);
    expect(getDate(end)).toBe(31); // August has 31 days
  });

  it('2nd-half quincena ends on day 28 for a 28-day February', () => {
    const { end } = getBiweeklyPeriod(new Date(2026, 1, 20));
    expect(getDate(end)).toBe(28);
  });

  it('2nd-half quincena ends on day 30 for a 30-day month', () => {
    const { end } = getBiweeklyPeriod(new Date(2026, 3, 20)); // April has 30 days
    expect(getDate(end)).toBe(30);
  });

  it('2nd-half quincena ends on day 31 for a 31-day month', () => {
    const { end } = getBiweeklyPeriod(new Date(2026, 0, 20)); // January has 31 days
    expect(getDate(end)).toBe(31);
  });

  it('start is always before end', () => {
    const { start: start1, end: end1 } = getBiweeklyPeriod(new Date(2026, 7, 5));
    const { start: start2, end: end2 } = getBiweeklyPeriod(new Date(2026, 7, 20));
    expect(getUnixTime(start1)).toBeLessThan(getUnixTime(end1));
    expect(getUnixTime(start2)).toBeLessThan(getUnixTime(end2));
  });
});

describe('getPeriodBoundaries', () => {
  it('dispatches to the monthly calculation for PERIOD_TYPES.MONTHLY', () => {
    const referenceDate = new Date(2026, 4, 10);
    expect(getPeriodBoundaries(PERIOD_TYPES.MONTHLY, referenceDate)).toEqual(getMonthlyPeriod(referenceDate));
  });

  it('dispatches to the biweekly calculation for PERIOD_TYPES.BIWEEKLY', () => {
    const referenceDate = new Date(2026, 4, 10);
    expect(getPeriodBoundaries(PERIOD_TYPES.BIWEEKLY, referenceDate)).toEqual(getBiweeklyPeriod(referenceDate));
  });

  it('defaults to the monthly calculation for an unrecognized period type', () => {
    const referenceDate = new Date(2026, 4, 10);
    expect(getPeriodBoundaries('unknown', referenceDate)).toEqual(getMonthlyPeriod(referenceDate));
  });
});
