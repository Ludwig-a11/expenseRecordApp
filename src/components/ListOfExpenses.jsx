import { Header, Title, HeaderContainer, ButtonsContainer} from "./../elements/Header";
import { Helmet } from "react-helmet";
import BackButton from "../elements/BackButton";
import { useAuth } from "./../context/AuthContext";
import TotalSpentBar from "./TotalSpentBar";

const ListOfExpenses = () => {

  const {user} = useAuth();
  console.log(user)

  return (
    <>
      <Helmet>
        <title>List Of Expenses</title>
      </Helmet>
      <Header>
        <HeaderContainer>
          <Title>List Of Expenses</Title>
          <ButtonsContainer>
            <BackButton />
          </ButtonsContainer>
        </HeaderContainer>
      </Header>
      <TotalSpentBar />
    </>
  );
};

export default ListOfExpenses;
