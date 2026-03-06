import { db } from './firebase.config';
import { doc, updateDoc } from 'firebase/firestore';

const editExpense = async ({ id, category, description, amount, date }) => {
    const document = doc(db, 'expenses', id);

    return await updateDoc(document, {
        category: category,
        description: description,
        amount:Number(amount),
        date: date
    });

}

export default editExpense