import { useState, useEffect } from 'react'
import {db} from './../firebase/firebase.config';
import {useAuth} from './../context/AuthContext';
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';

const useGetExpensesBetween = (startTimestamp, endTimestamp) => {
  const [expenses, setExpenses] = useState([]);
  const {user} = useAuth();

  useEffect(() =>{
      if(user && startTimestamp != null && endTimestamp != null){
        const getQuery = query(
        collection(db, 'expenses'),
        orderBy('date', 'desc'),
        where('date', '>=', startTimestamp),
        where('date', '<=', endTimestamp),
        where('uidUser', '==', user.uid)
      );

      const unsuscribe = onSnapshot(getQuery, (snapshot) => {
        setExpenses(snapshot.docs.map((document) =>{
            return {...document.data(), id: document.id}
        }))
      }, (error) => {console.log(error)});

      return unsuscribe;
      }

  },[user, startTimestamp, endTimestamp]);

    return expenses;
}

export default useGetExpensesBetween
