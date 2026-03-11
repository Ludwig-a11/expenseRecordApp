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


const ExpenseForm = ({expense = null}) => {

    const [inputDescription, setInputDescription] = useState('');
    const [inputAmount, setInputAmount] = useState('');
    const [category, setCategory] = useState('Home');
    const [date, setDate] = useState(new Date());
    const [stateAlert, setStateAlert] = useState(false);
    const [alert, setAlert] = useState({});
    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if(expense){
        if(expense.data().uidUser === user.uid){
          setCategory(expense.data().category)
          setDate(fromUnixTime(expense.data().date))
          setInputDescription(expense.data().description)
          setInputAmount(expense.data().amount)
        } else {
          navigate('/list-of-expenses');
        }
      }

    },[expense,user.uid, navigate]);

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
};

export default ExpenseForm;
