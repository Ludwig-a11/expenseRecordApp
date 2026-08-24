import PropTypes from "prop-types";
import { getCategoryLabel } from "./../functions/categoryLabels";
import convertToCurrency from "./../functions/convertToCurrency";
import styles from "./InsightBanner.module.css";

const InsightBanner = ({ topCategory, previousMonthLabel }) => {
  const { category, amount, percentageOfMonth, percentChange } = topCategory;
  const rounded = percentChange === null ? null : Math.round(percentChange);

  return (
    <div className={styles.banner}>
      <span className={styles.icon} aria-hidden="true">📈</span>
      <p className={styles.text}>
        <strong>{getCategoryLabel(category)}</strong> es tu categoría más alta:{" "}
        <strong>{convertToCurrency(amount)}</strong> ({percentageOfMonth.toFixed(1)}% del mes)
        {rounded !== null && (
          <> y va <strong>{Math.abs(rounded)}%</strong> {rounded >= 0 ? "arriba" : "abajo"} de {previousMonthLabel}.</>
        )}
      </p>
    </div>
  );
};

InsightBanner.propTypes = {
  topCategory: PropTypes.shape({
    category: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    percentageOfMonth: PropTypes.number.isRequired,
    percentChange: PropTypes.number,
  }).isRequired,
  previousMonthLabel: PropTypes.string.isRequired,
};

export default InsightBanner;
