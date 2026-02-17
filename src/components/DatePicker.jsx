import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import format from 'date-fns/format';
import PropTypes from 'prop-types';

const DatePicker = ({ date, setDate }) => {



  return (
    <div>
        <input 
            type="text" 
            readOnly 
            value={format(date,`MMMM dd, yyyy`)}/>
        <DayPicker 
            mode='single'
            selected={date}
            onSelect={setDate}
        />
    </div>
  )
}

DatePicker.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    setDate: PropTypes.func.isRequired,
};

export default DatePicker
