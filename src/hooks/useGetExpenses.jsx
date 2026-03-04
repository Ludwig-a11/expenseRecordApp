import { useState, useEffect } from 'react';
import { db } from './../firebase/firebase.config';
import { useAuth } from './../context/AuthContext'; 
import { collection, getDocs, query, orderBy, where, limit, startAfter } from 'firebase/firestore';

const useGetExpenses = () => {
    const {user} = useAuth();
    const [expenses, setExpenses] = useState([]);
    const [lastExpense, setLastExpense] = useState(null);
    const [thereIsMoreToUpload, setThereIsMoreToUpload] = useState(false);

    const removeExpenseFromState = (expenseId) => {
        setExpenses((previousExpenses) =>
            previousExpenses.filter((expense) => expense.id !== expenseId)
        );
    };

    const getMoreExpenses = async () => {
        if (!user?.uid || !lastExpense) return;

        const expensesQuery = query(
            collection(db, 'expenses'),
            where('uidUser', "==", user.uid),
            orderBy('date', 'desc'),
            startAfter(lastExpense),
            limit(10)
        );

        try {
            const snapshot = await getDocs(expensesQuery);

            if (snapshot.docs.length > 0) {
                setLastExpense(snapshot.docs[snapshot.docs.length - 1]);
                setExpenses((previousExpenses) =>
                    previousExpenses.concat(
                        snapshot.docs.map((expense) => ({ ...expense.data(), id: expense.id }))
                    )
                );
                setThereIsMoreToUpload(snapshot.docs.length === 10);
            } else {
                setThereIsMoreToUpload(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
  
    useEffect(() => {
        if (!user?.uid) return;

        const getFirstExpensesPage = async () => {
            const expensesQuery = query(
                collection(db, 'expenses'),
                where('uidUser', "==", user.uid),
                orderBy('date', 'desc'),
                limit(10)
            );

            try {
                const snapshot = await getDocs(expensesQuery);

                if (snapshot.docs.length > 0) {
                    setLastExpense(snapshot.docs[snapshot.docs.length - 1]);
                    setThereIsMoreToUpload(snapshot.docs.length === 10);
                } else {
                    setLastExpense(null);
                    setThereIsMoreToUpload(false);
                }

                setExpenses(
                    snapshot.docs.map((expense) => {
                        return { ...expense.data(), id: expense.id };
                    })
                );
            } catch (error) {
                console.log(error);
            }
        };

        getFirstExpensesPage();
    }, [user]);
    
    return [expenses, getMoreExpenses, thereIsMoreToUpload, removeExpenseFromState];
}

export default useGetExpenses
