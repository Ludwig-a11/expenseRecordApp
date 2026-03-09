import { useMemo } from 'react';
import useGetMonthlyExpenses from './useGetMonthlyExpenses';

const CATEGORY_IDS = [
    'Food',
    'Accounts and Payments',
    'Home',
    'Transport',
    'Clothing',
    'Health and Hygiene',
    'Shopping',
    'Fun',
];

const useMonthlyExpensesByCategory = () => {
    const expenses = useGetMonthlyExpenses();

    const expensesByCategory = useMemo(() => {
        const initialTotals = CATEGORY_IDS.reduce((accumulator, category) => {
            accumulator[category] = 0;
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
            accumulator[category] += Number.isFinite(amount) ? amount : 0;

            return accumulator;
        }, initialTotals);

        return CATEGORY_IDS.map((category) => ({
            category,
            amount: totalsByCategory[category],
        }));
    }, [expenses]);

    return expensesByCategory;
}

export default useMonthlyExpensesByCategory
