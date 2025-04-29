import { Header, Title, HeaderContainer, ButtonsContainer} from "./../elements/Header";
import { Helmet } from "react-helmet";
import BackButton from "../elements/BackButton";
import { useAuth } from "./../context/AuthContext";

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
    </>
  );
};

export default ListOfExpenses;
