import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import PercentChangeBadge from "./../elements/PercentChangeBadge";
import { getCategoryLabel } from "./../functions/categoryLabels";
import { getCategoryIcon } from "./../functions/categoryIcons";
import convertToCurrency from "./../functions/convertToCurrency";
import styles from "./CategoryListRow.module.css";

const CategoryListRow = ({ category, amount, count, percentageOfMonth, percentChange }) => (
  <Link to={`/list-of-expenses?categoria=${encodeURIComponent(category)}`} className={styles.row}>
    <span className={styles.icon} aria-hidden="true">{getCategoryIcon(category)}</span>

    <div className={styles.info}>
      <span className={styles.name}>{getCategoryLabel(category)}</span>
      <span className={styles.meta}>{count} {count === 1 ? "gasto" : "gastos"} · {percentageOfMonth.toFixed(1)}%</span>
    </div>

    <div className={styles.right}>
      <span className={styles.amount}>{convertToCurrency(amount)}</span>
      <PercentChangeBadge percentChange={percentChange} />
    </div>
  </Link>
);

CategoryListRow.propTypes = {
  category: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  percentageOfMonth: PropTypes.number.isRequired,
  percentChange: PropTypes.number,
};

export default CategoryListRow;
