import "./App.css";
import { Helmet } from "react-helmet";
import {
  Header,
  Title,
  HeaderContainer,
  ButtonsContainer,
} from "./elements/Header";
import Button from "./elements/Button";
import LogOutButton from "./components/LogOutButton";

function App() {
  return (
    <>
      <Helmet>
        <title>Expense Tracker</title>
      </Helmet>

      <Header>
        <HeaderContainer>
          <Title>Add Expense</Title>
          <ButtonsContainer>
            <Button to="/expenses-by-category">Categories</Button>
            <Button to="/list-of-expenses">List of Expenses</Button>
            <LogOutButton />
          </ButtonsContainer>
        </HeaderContainer>
      </Header>
    </>
  );
}

export default App;
