import { Header, Title, HeaderContainer, ButtonsContainer} from "./../elements/Header";
import { Helmet } from "react-helmet";
import BackButton from "../elements/BackButton";
import { useAuth } from "./../context/AuthContext";
import TotalSpentBar from "./TotalSpentBar";
import useGetExpenses from "./../hooks/useGetExpenses";
import {
  List,
  ListElement,
  ListOfCategories,
  ElementListOfCategories,
  Category,
  Description,
  Value,
  DateBadge,
  ButtonsContainerOfList,
  ActionButton,
  ActionLink,
  SubtitleContainer,
  Subtitle,
  CentralButtonContainer,
  UploadMoreButton,
} from "./../elements/ElementsOfList";
import convertToCurrency from "./../functions/convertToCurrency";
import {Link} from "react-router-dom";
import Button from "./../elements/Button";
import { format, fromUnixTime } from "date-fns";

const ListOfExpenses = () => {
  //const {user} = useAuth();
  //console.log(user)
  const [expenses, getMoreExpenses, thereIsMoreToUpload] = useGetExpenses();

  const formatDate = (date) => {
    return format(fromUnixTime(date),"dd 'de' MMMM 'de' yyyy");
  }

  const dateIsEqual = (expenses, index, expense) => {
    if(index !== 0){
      const currentDate = formatDate(expense.date);
      const previousExpenseDate = formatDate(expenses[index -1].date);

      if(currentDate === previousExpenseDate){
        return true;
      } else {
        return false;
      }
    }

    return false;
  }


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
      <List>
        {expenses.map((expense, index)=>{
          return(
            <div key={expense.id}>
              {!dateIsEqual(expenses, index, expense) && <DateBadge>{formatDate(expense.date)}</DateBadge>}
              <ListElement key={expense.id}>
                <Category>
                  {expense.category}
                </Category>
                <Description>
                  {expense.description}
                </Description>
                <Value>{convertToCurrency(expense.amount)}</Value>
                <ButtonsContainer>
                  <ActionButton as={Link} to={`/edit/${expense.id}`}>
                    Edit
                  </ActionButton>
                  <ActionButton >
                    Delete
                  </ActionButton>
                </ButtonsContainer>
              </ListElement>
            </div>
          );
        })}
        
        {thereIsMoreToUpload && 
          <CentralButtonContainer>
            <UploadMoreButton onClick={() =>{getMoreExpenses()}}>Upload More</UploadMoreButton>
          </CentralButtonContainer>
        }

        {expenses.length === 0 && 
          <SubtitleContainer>
            <Subtitle>There is no expenses to display.</Subtitle>
            <Button as={Link} to="/">Add New Expense</Button>
          </SubtitleContainer>
        }
      </List>
      <TotalSpentBar />
    </>
  );
};

export default ListOfExpenses;
