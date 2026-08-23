import PropTypes from "prop-types";
import { getCategoryLabel } from "./../functions/categoryLabels";
import { getCategoryIcon } from "./../functions/categoryIcons";
import convertToCurrency from "./../functions/convertToCurrency";
import styles from "./ExpenseListItem.module.css";

const ExpenseListItem = ({ expense, meta = null }) => (
  <div className={styles.item}>
    <span className={styles.icon} aria-hidden="true">{getCategoryIcon(expense.category)}</span>

    <div className={styles.info}>
      <p className={styles.description}>{expense.description}</p>
      <p className={styles.category}>{getCategoryLabel(expense.category)}{meta ? ` · ${meta}` : ""}</p>
    </div>

    <p className={styles.amount}>-{convertToCurrency(expense.amount)}</p>
  </div>
);

ExpenseListItem.propTypes = {
  expense: PropTypes.shape({
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  meta: PropTypes.string,
};

export default ExpenseListItem;
