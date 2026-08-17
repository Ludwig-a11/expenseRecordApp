import { Link } from "react-router-dom";
import { useBudget } from "./../context/BudgetContext";
import convertToCurrency from "./../functions/convertToCurrency";
import styles from "./BudgetSummaryBar.module.css";

const PERIOD_LABELS = {
  monthly: "Monthly budget",
  biweekly: "Biweekly budget",
};

const BudgetSummaryBar = () => {
  const { budget, loading, spent, remaining, percentUsed, isOverBudget } = useBudget();

  if (loading) {
    return null;
  }

  if (!budget) {
    return (
      <div className={styles.summaryBar}>
        <div className={styles.topRow}>
          <p className={styles.label}>No budget set yet</p>
          <Link to="/budget" className={styles.setBudgetLink}>
            Set a budget
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.summaryBar}>
      <div className={styles.topRow}>
        <p className={styles.label}>{PERIOD_LABELS[budget.periodType] || "Budget"}</p>

        <div className={styles.stats}>
          <span className={styles.stat}>
            <span className={styles.statLabel}>Spent</span>
            <span className={styles.statValue}>{convertToCurrency(spent)}</span>
          </span>
          <span className={styles.stat}>
            <span className={styles.statLabel}>{isOverBudget ? "Over by" : "Remaining"}</span>
            <span className={`${styles.statValue} ${isOverBudget ? styles.statValueDanger : ""}`}>
              {convertToCurrency(Math.abs(remaining))}
            </span>
          </span>
        </div>
      </div>

      <div className={styles.progressTrack}>
        <div
          className={`${styles.progressFill} ${isOverBudget ? styles.progressFillOver : ""}`}
          style={{ width: `${percentUsed}%` }}
        />
      </div>
    </div>
  );
};

export default BudgetSummaryBar;
