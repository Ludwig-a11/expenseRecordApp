import { db } from './firebase.config';
import { doc, deleteDoc } from 'firebase/firestore';

const deleteBudget = (uidUser) => {
    return deleteDoc(doc(db, 'budgets', uidUser));
};

export default deleteBudget;
