import { useState } from "react";
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


const ExpenseForm = () => {

    const [inputDescription, setInputDescription] = useState('');
    const [inputAmount, setInputAmount] = useState('');
    const [category, setCategory] = useState('Home');
    const [date, setDate] = useState(new Date());
    const [stateAlert, setStateAlert] = useState(false);
    const [alert, setAlert] = useState({});
    const {user} = useAuth();

    const handleChange = (e) => {
    if (e.target.name === 'description') {
        setInputDescription(e.target.value);
    } else if (e.target.name === 'amount') {

        let value = e.target.value;

        // Elimina todo lo que no sea número o punto
        value = value.replace(/[^0-9.]/g, '');

        // Permite solo un punto decimal
        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('');
        }

        // Limita a 2 decimales
        if (value.includes('.')) {
            const [integer, decimal] = value.split('.');
            value = integer + '.' + decimal.slice(0, 2);
        }

        setInputAmount(value);
    }
};

const handleSubmit = (e) =>{
  e.preventDefault();
  //Transforming amount in number with 2 decimals
  let amount = parseFloat(inputAmount).toFixed(2);
  
  //Checking exits description and value
  if(inputDescription !== '' && inputAmount !== ''){
    if(amount){
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
      })
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
      <div>
        <Input
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            value={inputDescription}
            onChange={handleChange}
        />
        <BigInput 
            type="text" 
            name="amount" 
            id="amount" 
            placeholder="$0.00" 
            value={inputAmount}
            onChange={handleChange}
        />
      </div>
      <ButtonContainer>
        <Button as="button" primario type="submit">
            Add New Expense
        </Button>
      </ButtonContainer>
      <Alert 
        type={alert.type}
        message={alert.message}
        alertState={stateAlert}
        setAlertState={setStateAlert}
      />
    </Form>
  );
};

export default ExpenseForm;
