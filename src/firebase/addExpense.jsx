import { db } from './firebase.config';
import { collection,addDoc } from 'firebase/firestore';

const addExpense = ({ category, description, amount, date, uidUser }) => {
    return addDoc(collection(db, 'expenses'),{
        category: category,
        description: description,
        amount:Number(amount),
        date: date,
        uidUser: uidUser
    });

}

export default addExpense