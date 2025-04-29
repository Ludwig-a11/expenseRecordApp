import {Header, Title, HeaderContainer, ButtonsContainer} from "./../elements/Header"
import {Helmet} from "react-helmet"
import BackButton from "../elements/BackButton"


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
    </>
  )
}

export default ExpensesByCategory