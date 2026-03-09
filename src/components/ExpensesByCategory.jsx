import {Header, Title, HeaderContainer, ButtonsContainer} from "./../elements/Header"
import {Helmet} from "react-helmet"
import BackButton from "../elements/BackButton"
import TotalSpentBar from "./TotalSpentBar"
import useMonthlyExpensesByCategory from "../hooks/useMonthlyExpensesByCategory";
import {
  ListOfCategories,
  ElementListOfCategories,
  Category,
  Value
} from './../elements/ElementsOfList';
import convertToCurrency from './../functions/convertToCurrency';


const ExpensesByCategory = () => {

  const expensesbyCategory = useMonthlyExpensesByCategory();
  //console.log(expenses);

  return (
    <>
      <Helmet>
        <title>Expenses by Category</title>
      </Helmet>

      <Header>
        <HeaderContainer>
          <ButtonsContainer>
            <BackButton />
          </ButtonsContainer>
          <Title>Expenses by Category</Title>
        </HeaderContainer>
      </Header>
      <ListOfCategories>
        {expensesbyCategory.map((element, index)=>{
          return (
            <ElementListOfCategories key={index}>
              <Category>{element.category}</Category>
              <Value>{convertToCurrency(element.amount)}</Value>

            </ElementListOfCategories>
          )
        })}
      </ListOfCategories>
      <TotalSpentBar />
    </>
  )
}

export default ExpensesByCategory
