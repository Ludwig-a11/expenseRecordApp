import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './AuthContext';
import useGetBudget from './../hooks/useGetBudget';
import useGetExpensesBetween from './../hooks/useGetExpensesBetween';
import { getPeriodTimestamps, PERIOD_TYPES } from './../functions/getPeriodBoundaries';
import setBudgetDoc from './../firebase/setBudget';
import deleteBudgetDoc from './../firebase/deleteBudget';

const BudgetContext = React.createContext();
const useBudget = () => useContext(BudgetContext);

const BudgetProvider = ({ children }) => {
    const { user } = useAuth();
    const { budget, loading: budgetLoading } = useGetBudget();

    const periodType = budget?.periodType ?? PERIOD_TYPES.MONTHLY;
    const { startTimestamp, endTimestamp, label: periodLabel } = useMemo(
        () => getPeriodTimestamps(periodType),
        [periodType]
    );

    const expenses = useGetExpensesBetween(startTimestamp, endTimestamp);

    const spent = useMemo(
        () => expenses.reduce((accumulator, expense) => {
            const amount = Number(expense?.amount);
            return accumulator + (Number.isFinite(amount) ? amount : 0);
        }, 0),
        [expenses]
    );

    const amount = Number(budget?.amount) || 0;
    const remaining = amount - spent;
    const percentUsed = amount > 0 ? Math.min((spent / amount) * 100, 100) : 0;
    const isOverBudget = amount > 0 && spent > amount;

    const saveBudget = ({ periodType: newPeriodType, amount: newAmount }) => {
        if (!user?.uid) return Promise.reject(new Error('No authenticated user'));
        return setBudgetDoc({ uidUser: user.uid, periodType: newPeriodType, amount: newAmount });
    };

    const clearBudget = () => {
        if (!user?.uid) return Promise.reject(new Error('No authenticated user'));
        return deleteBudgetDoc(user.uid);
    };

    return (
        <BudgetContext.Provider
            value={{
                budget,
                loading: budgetLoading,
                periodLabel,
                spent,
                remaining,
                percentUsed,
                isOverBudget,
                saveBudget,
                clearBudget,
            }}
        >
            {children}
        </BudgetContext.Provider>
    );
};

BudgetProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { BudgetProvider, useBudget };
