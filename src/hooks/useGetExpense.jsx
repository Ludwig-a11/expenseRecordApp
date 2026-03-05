import { useEffect, useState } from 'react'
import {db} from './../firebase/firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';



const useGetExpense = (id) => {
    const navigate = useNavigate();
    const [expense, setExpense] = useState('');

  useEffect(() =>{
    const getExpense = async () => {
        const document = await getDoc(doc(db, 'expenses', id));
        if(document.exists){
            setExpense(document);
        } else {
            navigate('/list-of-expenses');
        }
    }
    getExpense();
  },[navigate, id]);

    return [expense];
}

export default useGetExpense;