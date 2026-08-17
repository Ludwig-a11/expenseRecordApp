import { db } from './firebase.config';
import { doc, setDoc } from 'firebase/firestore';
import { getUnixTime } from 'date-fns';

const setBudget = ({ uidUser, periodType, amount }) => {
    return setDoc(doc(db, 'budgets', uidUser), {
        uidUser: uidUser,
        periodType: periodType,
        amount: Number(amount),
        updatedAt: getUnixTime(new Date()),
    });
}

export default setBudget
