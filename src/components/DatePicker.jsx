import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import format from 'date-fns/format';
import { es } from 'date-fns/locale';
import PropTypes from 'prop-types';
import { forwardRef, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './DatePicker.module.css';

const formatDate = (date = new Date()) => {
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: es })
}

const DatePickerContainer = ({ children }) => (
    <div className={styles.datePickerContainer}>{children}</div>
);

const DateInput = forwardRef((props, ref) => <input ref={ref} className={styles.input} {...props} />);
DateInput.displayName = 'DateInput';

const CalendarContainer = ({ anchorRect, children }) => (
    <div
        className={styles.calendarContainer}
        style={anchorRect ? { top: anchorRect.bottom + 8, left: anchorRect.left, width: anchorRect.width } : undefined}
    >
        {children}
    </div>
);

const childrenShape = PropTypes.node.isRequired;

DatePickerContainer.propTypes = {
    children: childrenShape,
};

CalendarContainer.propTypes = {
    anchorRect: PropTypes.object,
    children: childrenShape,
};

const DatePicker = ({ date, setDate }) => {

    const [calendar, setcalendar] = useState(false);
    const [anchorRect, setAnchorRect] = useState(null);
    const inputRef = useRef(null);

    const handleToggleCalendar = () => {
        if (!calendar && inputRef.current) {
            setAnchorRect(inputRef.current.getBoundingClientRect());
        }
        setcalendar((current) => !current);
    };

    const handleDateSelect = (selectedDate) => {
        if (!selectedDate) return;
        setDate(selectedDate);
        setcalendar(false);
    };

  return (
    <DatePickerContainer>
        <DateInput
            ref={inputRef}
            type="text"
            readOnly
            value={formatDate(date)}
            onClick={handleToggleCalendar}
        />
        {calendar && createPortal(
            <CalendarContainer anchorRect={anchorRect}>
                <DayPicker
                    mode='single'
                    selected={date}
                    onSelect={handleDateSelect}
                    locale={es}
                />
            </CalendarContainer>,
            document.body
        )}
    </DatePickerContainer>
  )
}

DatePicker.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    setDate: PropTypes.func.isRequired,
};

export default DatePicker
