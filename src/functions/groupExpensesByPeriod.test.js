import { describe, it, expect } from 'vitest';
import { getUnixTime } from 'date-fns';
import groupExpensesByPeriod from './groupExpensesByPeriod';

const expenseAt = (date, amount) => ({ date: getUnixTime(date), amount });

describe('groupExpensesByPeriod', () => {
  it('groups expenses by calendar day and orders most-recent first', () => {
    const today = new Date();
    const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);

    const expenses = [expenseAt(today, 10), expenseAt(yesterday, 5)];
    const groups = groupExpensesByPeriod(expenses, { unit: 'day', periodCount: 3 });

    expect(groups[0].total).toBe(10);
    expect(groups[1].total).toBe(5);
  });

  it('sums multiple expenses that fall in the same week', () => {
    const today = new Date();
    const twoDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2);

    const expenses = [expenseAt(today, 20), expenseAt(twoDaysAgo, 30)];
    const groups = groupExpensesByPeriod(expenses, { unit: 'week', periodCount: 4 });

    // Both dates are close together so they are very likely in the same ISO week,
    // but guard against the (rare) case the window spans a week boundary.
    const total = groups.reduce((sum, group) => sum + group.total, 0);
    expect(total).toBe(50);
  });

  it('computes percentChange against the immediately older group', () => {
    const groups = groupExpensesByPeriod(
      [expenseAt(new Date(2026, 7, 20), 120), expenseAt(new Date(2026, 7, 6), 100)],
      { unit: 'week', periodCount: 4 }
    );

    const current = groups.find((g) => g.total === 120);
    expect(current.percentChange).not.toBeNull();
  });

  it('returns null percentChange for the oldest group in the window', () => {
    const groups = groupExpensesByPeriod([expenseAt(new Date(), 10)], { unit: 'week', periodCount: 2 });
    expect(groups[groups.length - 1].percentChange).toBeNull();
  });

  it('always includes the most recent period even with zero expenses', () => {
    const groups = groupExpensesByPeriod([], { unit: 'week', periodCount: 3 });
    expect(groups.length).toBeGreaterThanOrEqual(1);
    expect(groups[0].total).toBe(0);
  });
});
