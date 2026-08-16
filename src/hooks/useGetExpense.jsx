import { useEffect, useState } from 'react'
import {db} from './../firebase/firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './../context/AuthContext';



const useGetExpense = (id) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [expense, setExpense] = useState('');

  useEffect(() =>{
    let isMounted = true;

    const getExpense = async () => {
        const document = await getDoc(doc(db, 'expenses', id));
        if (!isMounted) return;

        if(document.exists() && document.data().uidUser === user?.uid){
            setExpense(document);
        } else {
            navigate('/list-of-expenses');
        }
    }
    getExpense();

    return () => { isMounted = false; };
  },[navigate, id, user]);

    return [expense];
}

export default useGetExpense;