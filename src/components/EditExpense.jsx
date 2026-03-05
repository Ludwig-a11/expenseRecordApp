import {Header, Title, HeaderContainer, ButtonsContainer} from "./../elements/Header"
import {Helmet} from "react-helmet"
import BackButton from "../elements/BackButton"
import TotalSpentBar from "./TotalSpentBar"
import ExpenseForm from "./ExpenseForm";
import { useParams } from "react-router-dom";
import useGetExpense from "../hooks/useGetExpense";



const EditExpense = () => {

  const {id} = useParams();
  const [expense] = useGetExpense(id);

  console.log(expense);

  return (
    <>
      <Helmet>
        <title>Edit Expense</title>
      </Helmet>

      <Header>
        <HeaderContainer>
          <ButtonsContainer>
            <BackButton />
          </ButtonsContainer>
          <Title>Edit Expense</Title>
        </HeaderContainer>
      </Header>
      <ExpenseForm />
      <TotalSpentBar />
    </>
  )
}

export default EditExpense