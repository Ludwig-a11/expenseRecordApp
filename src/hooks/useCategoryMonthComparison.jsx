import { useMemo } from 'react';
import { subMonths } from 'date-fns';
import useMonthlyExpensesByCategory from './useMonthlyExpensesByCategory';
import getPercentChange from './../functions/getPercentChange';

const useCategoryMonthComparison = (selectedMonth = new Date()) => {
    const currentMonth = useMonthlyExpensesByCategory(selectedMonth);
    const previousMonth = useMonthlyExpensesByCategory(subMonths(selectedMonth, 1));

    return useMemo(() => {
        const previousByCategory = previousMonth.reduce((accumulator, item) => {
            accumulator[item.category] = item.amount;
            return accumulator;
        }, {});

        const total = currentMonth.reduce((sum, item) => sum + item.amount, 0);

        return currentMonth
            .map((item) => {
                const previousAmount = previousByCategory[item.category] || 0;

                return {
                    ...item,
                    previousAmount,
                    percentageOfMonth: total > 0 ? (item.amount / total) * 100 : 0,
                    percentChange: getPercentChange(item.amount, previousAmount),
                };
            })
            .sort((a, b) => b.amount - a.amount);
    }, [currentMonth, previousMonth]);
};

export default useCategoryMonthComparison;
