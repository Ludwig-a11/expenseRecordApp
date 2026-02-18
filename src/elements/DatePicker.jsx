import PropTypes from "prop-types";
import styles from "./DatePicker.module.css";

const DatePickerContainer = ({ children }) => (
  <div className={styles.datePickerContainer}>{children}</div>
);

const DateInput = (props) => <input className={styles.input} {...props} />;

const CalendarContainer = ({ children }) => (
  <div className={styles.calendarContainer}>{children}</div>
);

const childrenShape = PropTypes.node.isRequired;

DatePickerContainer.propTypes = {
  children: childrenShape,
};

CalendarContainer.propTypes = {
  children: childrenShape,
};

export { DatePickerContainer, DateInput, CalendarContainer };
