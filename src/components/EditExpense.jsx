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
  
  

  return (
    <>
      <Helmet>
        <title>Edit Expense</title>
      </Helmet>

      <Header>
        <HeaderContainer>
          <ButtonsContainer>
            <BackButton route="/list-of-expenses" />
          </ButtonsContainer>
          <Title>Edit Expense</Title>
        </HeaderContainer>
      </Header>
      <ExpenseForm expense={expense} />
      <TotalSpentBar />
    </>
  )
}

export default EditExpense