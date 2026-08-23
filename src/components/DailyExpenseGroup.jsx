import PropTypes from "prop-types";
import ExpenseListItem from "./ExpenseListItem";
import styles from "./DailyExpenseGroup.module.css";

const DailyExpenseGroup = ({ label, items }) => (
  <div className={styles.group}>
    <p className={styles.label}>{label}</p>
    <div className={styles.list}>
      {items.map((expense) => (
        <ExpenseListItem key={expense.id} expense={expense} />
      ))}
    </div>
  </div>
);

DailyExpenseGroup.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DailyExpenseGroup;
