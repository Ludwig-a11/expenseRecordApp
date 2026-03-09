import { TotalBar } from './../elements/TotalSpentBar';
import convertToCurrency from './../functions/convertToCurrency';
import { useMonthlyTotal } from './../context/MonthlyTotalSpent';


const TotalSpentBar = () => {

  const {total} = useMonthlyTotal();

  return (
    <TotalBar>
        <p>Total spent this month:</p>
        <p>{convertToCurrency(total)}</p>
    </TotalBar>
  )
}

export default TotalSpentBar;
