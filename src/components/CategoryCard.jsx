import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ProgressBar from "./../elements/ProgressBar";
import PercentChangeBadge from "./../elements/PercentChangeBadge";
import { getCategoryLabel } from "./../functions/categoryLabels";
import { getCategoryIcon } from "./../functions/categoryIcons";
import convertToCurrency from "./../functions/convertToCurrency";
import styles from "./CategoryCard.module.css";

const CategoryCard = ({ category, amount, count, percentageOfMonth, percentChange, previousMonthLabel }) => (
  <Link to={`/list-of-expenses?categoria=${encodeURIComponent(category)}`} className={styles.card}>
    <div className={styles.rowTop}>
      <span className={styles.icon} aria-hidden="true">{getCategoryIcon(category)}</span>
      <span className={styles.name}>{getCategoryLabel(category)}</span>
      <span className={styles.amount}>{convertToCurrency(amount)}</span>
    </div>

    <ProgressBar percent={percentageOfMonth} />

    <div className={styles.rowBottom}>
      <span>{count} {count === 1 ? "gasto" : "gastos"}</span>
      <span className={styles.rowBottomRight}>
        {percentageOfMonth.toFixed(1)}%
        <span className={styles.dot}>·</span>
        <PercentChangeBadge percentChange={percentChange} />
        {percentChange !== null && <span className={styles.vsLabel}>vs {previousMonthLabel}</span>}
      </span>
    </div>
  </Link>
);

CategoryCard.propTypes = {
  category: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  percentageOfMonth: PropTypes.number.isRequired,
  percentChange: PropTypes.number,
  previousMonthLabel: PropTypes.string.isRequired,
};

export default CategoryCard;
