import { startOfMonth, getUnixTime, endOfMonth } from 'date-fns';
import useGetExpensesBetween from './useGetExpensesBetween';

const useGetMonthlyExpenses = (referenceDate = new Date()) => {
  const monthStartTimestamp = getUnixTime(startOfMonth(referenceDate));
  const monthEndTimestamp = getUnixTime(endOfMonth(referenceDate));

  return useGetExpensesBetween(monthStartTimestamp, monthEndTimestamp);
}

export default useGetMonthlyExpenses;
