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

const ExpenseForm = () => {

    const [inputDescription, setInputDescription] = useState('');
    const [inputAmount, setInputAmount] = useState('');
    const [category, setCategory] = useState('Home');
    const [date, setDate] = useState(new Date());

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

  return (
    <Form>
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
    </Form>
  );
};

export default ExpenseForm;
