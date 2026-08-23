import { useMemo } from 'react';
import useGetMonthlyExpenses from './useGetMonthlyExpenses';
import { CATEGORY_LABELS_ES } from './../functions/categoryLabels';

const CATEGORY_IDS = Object.keys(CATEGORY_LABELS_ES);

const useMonthlyExpensesByCategory = (referenceDate = new Date()) => {
    const expenses = useGetMonthlyExpenses(referenceDate);

    const expensesByCategory = useMemo(() => {
        const initialTotals = CATEGORY_IDS.reduce((accumulator, category) => {
            accumulator[category] = { amount: 0, count: 0 };
            return accumulator;
        }, {});

        const normalizedCategories = CATEGORY_IDS.reduce((accumulator, category) => {
            accumulator[category.toLowerCase()] = category;
            return accumulator;
        }, {});

        const totalsByCategory = expenses.reduce((accumulator, expense) => {
            const rawCategory = String(expense?.category || '').trim().toLowerCase();
            const category = normalizedCategories[rawCategory];

            if (!category) {
                return accumulator;
            }

            const amount = Number(expense?.amount);
            accumulator[category].amount += Number.isFinite(amount) ? amount : 0;
            accumulator[category].count += 1;

            return accumulator;
        }, initialTotals);

        return CATEGORY_IDS.map((category) => ({
            category,
            amount: totalsByCategory[category].amount,
            count: totalsByCategory[category].count,
        }));
    }, [expenses]);

    return expensesByCategory;
}

export default useMonthlyExpensesByCategory
