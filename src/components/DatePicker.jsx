import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import { 
    DatePickerContainer, 
    DateInput, 
    CalendarContainer } 
from './../elements/DatePicker';
import { useState } from 'react';

const formatDate = (date = new Date()) => {
    return format(date,`MMMM dd, yyyy`)
}
const DatePicker = ({ date, setDate }) => {

    const [calendar, setcalendar] = useState(false);

    const handleDateSelect = (selectedDate) => {
        if (!selectedDate) return;
        setDate(selectedDate);
        setcalendar(false);
    };

  return (
    <DatePickerContainer>
        <DateInput 
            type="text" 
            readOnly 
            value={formatDate(date)}
            onClick={() => setcalendar(!calendar)}
        />
        {calendar && (
            <CalendarContainer>
                <DayPicker 
                    mode='single'
                    selected={date}
                    onSelect={handleDateSelect}
                />
            </CalendarContainer>
        )}
    </DatePickerContainer>
  )
}

DatePicker.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    setDate: PropTypes.func.isRequired,
};

export default DatePicker
