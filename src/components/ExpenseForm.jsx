import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
  FilterContainer,
  Form,
  Input,
  BigInput,
  ButtonContainer,
} from "./../elements/FormElements";
import Button from "./../elements/Button";
import SelectCategories from "./SelectCategories";
import DatePicker from './DatePicker';
import { getUnixTime, fromUnixTime } from "date-fns";
import addExpense from './../firebase/addExpense';
import { useAuth } from './../context/AuthContext';
import Alert from './../elements/Alert';
import {useNavigate} from 'react-router-dom';
import editExpense from "./../firebase/editExpense";
import styles from "./ExpenseForm.module.css";


const normalizeAmount = (value) => {
  const parsedValue = parseFloat(value);
  return Number.isNaN(parsedValue) ? "" : parsedValue.toFixed(2);
};

const ExpenseForm = ({ expense = null, onDirtyChange = null }) => {

    const [inputDescription, setInputDescription] = useState('');
    const [inputAmount, setInputAmount] = useState('');
    const [category, setCategory] = useState('Home');
    const [date, setDate] = useState(new Date());
    const [stateAlert, setStateAlert] = useState(false);
    const [alert, setAlert] = useState({});
    const [initialFormState, setInitialFormState] = useState(null);
    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if(expense){
        if(expense.data().uidUser === user.uid){
          const currentData = expense.data();
          const initialDate = fromUnixTime(currentData.date);
          const initialAmount = String(currentData.amount);

          setCategory(currentData.category);
          setDate(initialDate);
          setInputDescription(currentData.description);
          setInputAmount(initialAmount);
          setInitialFormState({
            category: currentData.category,
            description: currentData.description,
            amount: normalizeAmount(initialAmount),
            date: getUnixTime(initialDate),
          });
        } else {
          navigate('/list-of-expenses');
        }
      }

    },[expense,user.uid, navigate]);

    useEffect(() => {
      if (!expense || !initialFormState || !onDirtyChange) {
        return;
      }

      const currentFormState = {
        category,
        description: inputDescription,
        amount: normalizeAmount(inputAmount),
        date: getUnixTime(date),
      };

      const hasUnsavedChanges =
        currentFormState.category !== initialFormState.category ||
        currentFormState.description !== initialFormState.description ||
        currentFormState.amount !== initialFormState.amount ||
        currentFormState.date !== initialFormState.date;

      onDirtyChange(hasUnsavedChanges);
    }, [
      category,
      date,
      expense,
      initialFormState,
      inputAmount,
      inputDescription,
      onDirtyChange,
    ]);

    const handleChange = (e) => {
    if (e.target.name === 'description') {
        setInputDescription(e.target.value);
    } else if (e.target.name === 'amount') {

        let value = e.target.value;

        value = value.replace(/[^0-9.]/g, '');

        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('');
        }

        if (value.includes('.')) {
            const [integer, decimal] = value.split('.');
            value = integer + '.' + decimal.slice(0, 2);
        }

        setInputAmount(value);
    }
};

const handleSubmit = (e) =>{
  e.preventDefault();
  let amount = parseFloat(inputAmount).toFixed(2);

  if(inputDescription !== '' && inputAmount !== ''){
    if(amount){
      if(expense){
        editExpense({
          id: expense.id,
          category: category,
          description: inputDescription,
          amount: amount,
          date: getUnixTime(date)
        }).then(() => {
          if (onDirtyChange) {
            onDirtyChange(false);
          }
          navigate('/list-of-expenses')
        }).catch((error) =>{
          console.log(error);
        })
      } else {
        addExpense({
          category: category,
          description: inputDescription,
          amount: amount,
          date: getUnixTime(date),
          uidUser: user.uid
        })
        .then(()=>{
          setCategory('Home');
          setInputDescription('');
          setInputAmount('');
          setDate(new Date());

          setStateAlert(true);
          setAlert({type: 'success', message: 'Your expense has been added successfully'})
        })
        .catch((error)=>{
          setStateAlert(true);
          setAlert({type: 'error', message: 'Something went wrong. Try again later'})
          console.log(error);
        })
      }
    } else {
      setStateAlert(true);
      setAlert({type: 'error', message: 'The value you entered is not correct'})
    }
  } else {
    setStateAlert(true);
    setAlert({type: 'error', message: 'Fill in all the fields'})
  }

}

  return (
    <Form onSubmit={handleSubmit}>
      <div className={styles.formLayout}>
        <div className={styles.topControls}>
          <FilterContainer>
            <SelectCategories
              category={category}
              setCategory={setCategory}
            />
            <DatePicker
              date={date}
              setDate={setDate}
            />
          </FilterContainer>
        </div>

        <div className={styles.fieldsGrid}>
          <div className={styles.fieldBlock}>
            <label htmlFor="description" className={styles.fieldLabel}>Description</label>
            <Input
                type="text"
                name="description"
                id="description"
                placeholder="Example: Weekly groceries"
                value={inputDescription}
                onChange={handleChange}
            />
          </div>

          <div className={styles.fieldBlock}>
            <label htmlFor="amount" className={styles.fieldLabel}>Amount</label>
            <BigInput
                type="text"
                name="amount"
                id="amount"
                placeholder="$0.00"
                value={inputAmount}
                onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.submitRow}>
          <ButtonContainer>
            <Button as="button" primario type="submit">
                {expense ? 'Save Changes': 'Add Expense'}
            </Button>
          </ButtonContainer>
        </div>
      </div>

      <Alert
        type={alert.type}
        message={alert.message}
        alertState={stateAlert}
        setAlertState={setStateAlert}
      />
    </Form>
  );
};

ExpenseForm.propTypes = {

  expense:PropTypes.shape({
    id:PropTypes.string,
    data:PropTypes.func,
  }),
  onDirtyChange: PropTypes.func,
};

export default ExpenseForm;
