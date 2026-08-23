import { useMemo } from 'react';
import { endOfDay, getUnixTime, startOfDay, startOfMonth, startOfWeek, subDays, subMonths, subWeeks } from 'date-fns';
import useGetExpensesBetween from './useGetExpensesBetween';
import groupExpensesByPeriod from './../functions/groupExpensesByPeriod';

const WEEK_STARTS_ON = 1;

const getRangeStart = (unit, periodCount, now) => {
  if (unit === 'day') return startOfDay(subDays(now, periodCount - 1));
  if (unit === 'month') return startOfMonth(subMonths(now, periodCount - 1));
  return startOfWeek(subWeeks(now, periodCount - 1), { weekStartsOn: WEEK_STARTS_ON });
};

const useExpensesGroupedByPeriod = (unit = 'week', periodCount = 8) => {
  const now = new Date();
  const startTimestamp = getUnixTime(getRangeStart(unit, periodCount, now));
  const endTimestamp = getUnixTime(endOfDay(now));

  const expenses = useGetExpensesBetween(startTimestamp, endTimestamp);

  return useMemo(
    () => groupExpensesByPeriod(expenses, { unit, periodCount }),
    [expenses, unit, periodCount]
  );
};

export default useExpensesGroupedByPeriod;
