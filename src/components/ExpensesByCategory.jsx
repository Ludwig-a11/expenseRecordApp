import {Header, Title, HeaderContainer, ButtonsContainer} from "./../elements/Header"
import {Helmet} from "react-helmet"
import BackButton from "../elements/BackButton"
import TotalSpentBar from "./TotalSpentBar"

const ExpensesByCategory = () => {
  return (
    <>
      <Helmet>
        <title>Expenses by Category</title>
      </Helmet>

      <Header>
        <HeaderContainer>
          <Title>Expenses by Category</Title>
          <ButtonsContainer>
            <BackButton />
          </ButtonsContainer>
        </HeaderContainer>
      </Header>
      <TotalSpentBar />
    </>
  )
}

export default ExpensesByCategory