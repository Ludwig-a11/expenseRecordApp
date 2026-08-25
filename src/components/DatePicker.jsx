import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import format from 'date-fns/format';
import { es } from 'date-fns/locale';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from './../elements/Modal';
import styles from './DatePicker.module.css';

const formatDate = (date = new Date()) => {
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: es })
}

const DatePickerContainer = ({ children }) => (
    <div className={styles.datePickerContainer}>{children}</div>
);

DatePickerContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const DatePicker = ({ date, setDate }) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleDateSelect = (selectedDate) => {
        if (!selectedDate) return;
        setDate(selectedDate);
        setIsOpen(false);
    };

  return (
    <DatePickerContainer>
        <input
            type="text"
            readOnly
            className={styles.input}
            value={formatDate(date)}
            onClick={() => setIsOpen(true)}
        />
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} labelledBy="date-picker-title">
            <h2 id="date-picker-title" className={styles.title}>Selecciona una fecha</h2>
            <div className={styles.calendarWrap}>
                <DayPicker
                    mode='single'
                    selected={date}
                    onSelect={handleDateSelect}
                    locale={es}
                />
            </div>
        </Modal>
    </DatePickerContainer>
  )
}

DatePicker.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    setDate: PropTypes.func.isRequired,
};

export default DatePicker
