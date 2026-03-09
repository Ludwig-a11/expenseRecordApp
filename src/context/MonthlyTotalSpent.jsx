import React, { useState, useEffect, useContext } from 'react';
import useGetMonthlyExpenses from '../hooks/useGetMonthlyExpenses';
import PropTypes from 'prop-types';

const MonthlyTotalContext = React.createContext();
const useMonthlyTotal = () => useContext(MonthlyTotalContext)

const TotalSpentProvider = ({children}) => {
    const [total, setTotal] = useState(0);
    const expenses = useGetMonthlyExpenses();

    useEffect (() =>{
        const runningTotal = expenses.reduce((accumulator, expense) => {
            const normalizedAmount = Number(expense?.amount);
            return accumulator + (Number.isFinite(normalizedAmount) ? normalizedAmount : 0);
        }, 0);

        setTotal(runningTotal);
    },[expenses])


    return (
        <MonthlyTotalContext.Provider value={{total: total}}>
            {children}
        </MonthlyTotalContext.Provider>

    );
    
}

TotalSpentProvider.propTypes = {
    children: PropTypes.node.isrequired,
};


export {TotalSpentProvider, useMonthlyTotal};
