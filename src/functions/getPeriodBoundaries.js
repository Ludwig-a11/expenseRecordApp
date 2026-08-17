import { startOfMonth, endOfMonth, startOfDay, endOfDay, setDate, getDate, getUnixTime, format } from 'date-fns';

export const PERIOD_TYPES = { MONTHLY: 'monthly', BIWEEKLY: 'biweekly' };

export const getMonthlyPeriod = (referenceDate = new Date()) => ({
  start: startOfMonth(referenceDate),
  end: endOfMonth(referenceDate),
  label: format(referenceDate, "MMMM yyyy"),
});

export const getBiweeklyPeriod = (referenceDate = new Date()) => {
  const day = getDate(referenceDate);

  if (day <= 15) {
    return {
      start: startOfDay(setDate(referenceDate, 1)),
      end: endOfDay(setDate(referenceDate, 15)),
      label: `${format(referenceDate, "MMMM yyyy")} (1st half)`,
    };
  }

  return {
    start: startOfDay(setDate(referenceDate, 16)),
    end: endOfDay(endOfMonth(referenceDate)),
    label: `${format(referenceDate, "MMMM yyyy")} (2nd half)`,
  };
};

export const getPeriodBoundaries = (periodType, referenceDate = new Date()) =>
  periodType === PERIOD_TYPES.BIWEEKLY ? getBiweeklyPeriod(referenceDate) : getMonthlyPeriod(referenceDate);

export const getPeriodTimestamps = (periodType, referenceDate = new Date()) => {
  const { start, end, label } = getPeriodBoundaries(periodType, referenceDate);
  return { startTimestamp: getUnixTime(start), endTimestamp: getUnixTime(end), label };
};
