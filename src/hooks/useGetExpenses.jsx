import { useState, useEffect } from 'react';
import { db } from './../firebase/firebase.config';
import { useAuth } from './../context/AuthContext';
import { collection, onSnapshot, query, orderBy, where, limit } from 'firebase/firestore';

const PAGE_SIZE = 10;

const useGetExpenses = () => {
    const { user } = useAuth();
    const [pageLimit, setPageLimit] = useState(PAGE_SIZE);
    const [expenses, setExpenses] = useState([]);
    const [thereIsMoreToUpload, setThereIsMoreToUpload] = useState(false);

    useEffect(() => {
        if (!user?.uid) return;

        const expensesQuery = query(
            collection(db, 'expenses'),
            where('uidUser', "==", user.uid),
            orderBy('date', 'desc'),
            limit(pageLimit)
        );

        const unsubscribe = onSnapshot(expensesQuery, (snapshot) => {
            setExpenses(snapshot.docs.map((document) => ({ ...document.data(), id: document.id })));
            setThereIsMoreToUpload(snapshot.docs.length === pageLimit);
        }, (error) => console.log(error));

        return unsubscribe;
    }, [user, pageLimit]);

    const getMoreExpenses = () => setPageLimit((current) => current + PAGE_SIZE);

    return [expenses, getMoreExpenses, thereIsMoreToUpload];
}

export default useGetExpenses
