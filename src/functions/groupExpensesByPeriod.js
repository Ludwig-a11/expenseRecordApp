import {
  startOfDay, endOfDay,
  startOfWeek, endOfWeek,
  startOfMonth, endOfMonth,
  format, isWithinInterval, fromUnixTime,
} from 'date-fns';
import { es } from 'date-fns/locale';
import getPercentChange from './getPercentChange';

const WEEK_STARTS_ON = 1; // Monday

const getBoundsForUnit = (unit, date) => {
  if (unit === 'day') return { start: startOfDay(date), end: endOfDay(date) };
  if (unit === 'month') return { start: startOfMonth(date), end: endOfMonth(date) };
  return { start: startOfWeek(date, { weekStartsOn: WEEK_STARTS_ON }), end: endOfWeek(date, { weekStartsOn: WEEK_STARTS_ON }) };
};

const formatLabel = (unit, start, end) => {
  if (unit === 'day') return format(start, "dd 'de' MMMM", { locale: es });
  if (unit === 'month') return format(start, 'MMMM yyyy', { locale: es });
  return `Semana ${format(start, 'd')} – ${format(end, 'd MMM', { locale: es })}`;
};

const groupExpensesByPeriod = (expenses, { unit = 'week', periodCount = 8 } = {}) => {
  const now = new Date();
  const periods = [];

  for (let i = 0; i < periodCount; i += 1) {
    const reference = unit === 'day'
      ? new Date(now.getFullYear(), now.getMonth(), now.getDate() - i)
      : unit === 'month'
        ? new Date(now.getFullYear(), now.getMonth() - i, 1)
        : new Date(now.getFullYear(), now.getMonth(), now.getDate() - i * 7);

    periods.push(getBoundsForUnit(unit, reference));
  }

  const groups = periods.map(({ start, end }) => ({
    key: start.toISOString(),
    start,
    end,
    label: formatLabel(unit, start, end),
    total: 0,
    count: 0,
    expenses: [],
  }));

  expenses.forEach((expense) => {
    const date = fromUnixTime(expense.date);
    const group = groups.find((candidate) => isWithinInterval(date, { start: candidate.start, end: candidate.end }));

    if (!group) return;

    const amount = Number(expense.amount) || 0;
    group.total += amount;
    group.count += 1;
    group.expenses.push(expense);
  });

  const nonEmptyGroups = groups.filter((group) => group.count > 0 || group.key === groups[0].key);

  return nonEmptyGroups.map((group, index) => {
    const previousGroup = nonEmptyGroups[index + 1];
    return {
      ...group,
      percentChange: previousGroup ? getPercentChange(group.total, previousGroup.total) : null,
    };
  });
};

export default groupExpensesByPeriod;
