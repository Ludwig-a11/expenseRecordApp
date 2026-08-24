import PropTypes from "prop-types";
import { format, fromUnixTime } from "date-fns";
import PercentChangeBadge from "./../../elements/PercentChangeBadge";
import { getCategoryLabel } from "./../../functions/categoryLabels";
import { getCategoryIcon } from "./../../functions/categoryIcons";
import convertToCurrency from "./../../functions/convertToCurrency";
import styles from "./CompactPeriodGroup.module.css";

const ChevronIcon = ({ open }) => (
  <svg
    viewBox="0 0 24 24"
    focusable="false"
    aria-hidden="true"
    className={open ? styles.chevronOpen : ""}
  >
    <path d="M7 10l5 5 5-5z" />
  </svg>
);

ChevronIcon.propTypes = { open: PropTypes.bool.isRequired };

const CompactPeriodGroup = ({ group, isOpen, onToggle }) => (
  <div className={styles.group}>
    <button type="button" className={styles.header} onClick={onToggle} aria-expanded={isOpen}>
      <ChevronIcon open={isOpen} />
      <span className={styles.label}>{group.label}</span>
      <span className={styles.summary}>
        {convertToCurrency(group.total)}
        <span className={styles.dot}>·</span>
        <PercentChangeBadge percentChange={group.percentChange} />
      </span>
    </button>

    {isOpen && (
      <div className={styles.rows}>
        {group.expenses.map((expense) => (
          <div key={expense.id} className={styles.row}>
            <span className={styles.icon} aria-hidden="true">{getCategoryIcon(expense.category)}</span>
            <span className={styles.description}>
              {getCategoryLabel(expense.category)}
              <span className={styles.day}> · {format(fromUnixTime(expense.date), "d")}</span>
            </span>
            <span className={styles.amount}>-{convertToCurrency(expense.amount)}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

CompactPeriodGroup.propTypes = {
  group: PropTypes.shape({
    label: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    percentChange: PropTypes.number,
    expenses: PropTypes.array.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default CompactPeriodGroup;
