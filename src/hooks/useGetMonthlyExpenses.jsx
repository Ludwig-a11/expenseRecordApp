import { useState, useEffect } from 'react'
import {db} from './../firebase/firebase.config';
import { startOfMonth, getUnixTime, endOfMonth } from 'date-fns';
import {useAuth} from './../context/AuthContext';
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore'; 


const useGetMonthlyExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const {user} = useAuth();

  useEffect(() =>{
      const monthStartTimestamp = getUnixTime(startOfMonth(new Date()));
      const monthEndTimestamp = getUnixTime(endOfMonth(new Date()));


      if(user){
        const getQuery = query(
        collection(db, 'expenses'),
        orderBy('date', 'desc'),
        where('date', '>=', monthStartTimestamp),
        where('date', '<=', monthEndTimestamp),
        where('uidUser', '==', user.uid)
      );

      const unsuscribe = onSnapshot(getQuery, (snapshot) => {
        setExpenses(snapshot.docs.map((document) =>{
            return {...document.data(), id: document.id}
        }))
      }, (error) => {console.log(error)});

      return unsuscribe;
      }


  },[user]);
  
    return [expenses];
}

export default useGetMonthlyExpenses;