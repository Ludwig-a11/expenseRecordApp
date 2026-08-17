import { useState, useEffect } from 'react';
import { db } from './../firebase/firebase.config';
import { useAuth } from './../context/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';

const useGetBudget = () => {
    const { user } = useAuth();
    const [budget, setBudget] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.uid) {
            setBudget(null);
            setLoading(false);
            return;
        }

        setLoading(true);

        const unsubscribe = onSnapshot(
            doc(db, 'budgets', user.uid),
            (snapshot) => {
                setBudget(snapshot.exists() ? { ...snapshot.data(), id: snapshot.id } : null);
                setLoading(false);
            },
            (error) => {
                console.log(error);
                setLoading(false);
            }
        );

        return unsubscribe;
    }, [user]);

    return { budget, loading };
};

export default useGetBudget;
