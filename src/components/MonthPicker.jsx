import { useState } from "react";
import PropTypes from "prop-types";
import { format, isSameMonth, subMonths } from "date-fns";
import { es } from "date-fns/locale";
import styles from "./MonthPicker.module.css";

const MONTH_OPTIONS_COUNT = 6;

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const MonthPicker = ({ selectedMonth, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = Array.from({ length: MONTH_OPTIONS_COUNT }, (_, index) => subMonths(new Date(), index));

  const handleSelect = (month) => {
    onChange(month);
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <button type="button" className={styles.trigger} onClick={() => setIsOpen((current) => !current)} aria-expanded={isOpen}>
        {capitalize(format(selectedMonth, "MMMM", { locale: es }))}
        <span className={styles.chevron} aria-hidden="true">⌄</span>
      </button>

      {isOpen && (
        <ul className={styles.menu}>
          {options.map((month) => (
            <li key={month.toISOString()}>
              <button
                type="button"
                className={`${styles.option} ${isSameMonth(month, selectedMonth) ? styles.optionActive : ""}`}
                onClick={() => handleSelect(month)}
              >
                {capitalize(format(month, "MMMM yyyy", { locale: es }))}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

MonthPicker.propTypes = {
  selectedMonth: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MonthPicker;
