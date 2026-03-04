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
          <ButtonsContainer>
            <BackButton />
          </ButtonsContainer>
          <Title>Expenses by Category</Title>
        </HeaderContainer>
      </Header>
      <TotalSpentBar />
    </>
  )
}

export default ExpensesByCategory