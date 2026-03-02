import { TotalBar } from './../elements/TotalSpentBar';
import convertToCurrency from './../functions/convertToCurrency';


const TotalSpentBar = () => {
  return (
    <TotalBar>
        <p>Total spent this month:</p>
        <p>{convertToCurrency(0)}</p>
    </TotalBar>
  )
}

export default TotalSpentBar;
