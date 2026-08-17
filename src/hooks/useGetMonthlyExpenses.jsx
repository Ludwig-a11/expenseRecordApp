import { startOfMonth, getUnixTime, endOfMonth } from 'date-fns';
import useGetExpensesBetween from './useGetExpensesBetween';

const useGetMonthlyExpenses = () => {
  const monthStartTimestamp = getUnixTime(startOfMonth(new Date()));
  const monthEndTimestamp = getUnixTime(endOfMonth(new Date()));

  return useGetExpensesBetween(monthStartTimestamp, monthEndTimestamp);
}

export default useGetMonthlyExpenses;
