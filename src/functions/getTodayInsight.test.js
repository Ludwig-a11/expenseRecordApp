import { describe, it, expect } from 'vitest';
import getTodayInsight from './getTodayInsight';

describe('getTodayInsight', () => {
  it('highlights the category with the biggest increase vs the previous month', () => {
    const text = getTodayInsight({
      categoryComparison: [
        { category: 'Food', amount: 420, percentChange: 18 },
        { category: 'Transport', amount: 50, percentChange: -11 },
      ],
      previousMonthLabel: 'julio',
    });

    expect(text).toBe('Llevas 18% más en Comida que en julio.');
  });

  it('falls back to budget pace when no category increased', () => {
    const text = getTodayInsight({
      categoryComparison: [{ category: 'Food', amount: 100, percentChange: -5 }],
      previousMonthLabel: 'julio',
      budget: { amount: 1500, remaining: 259.5, percentUsed: 83 },
    });

    expect(text).toContain('83%');
  });

  it('warns when the budget is already exceeded', () => {
    const text = getTodayInsight({
      categoryComparison: [],
      previousMonthLabel: 'julio',
      budget: { amount: 1000, remaining: -50, percentUsed: 105 },
    });

    expect(text).toContain('superaste');
  });

  it('gives a generic message when there is no data at all', () => {
    const text = getTodayInsight({ categoryComparison: [], previousMonthLabel: 'julio', budget: null });
    expect(text).toBe('Agrega gastos y configura un presupuesto para ver un análisis de tu mes.');
  });
});
