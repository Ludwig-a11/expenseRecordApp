import { Link } from "react-router-dom";
import { differenceInCalendarDays } from "date-fns";
import { useBudget } from "./../context/BudgetContext";
import { getPeriodBoundaries } from "./../functions/getPeriodBoundaries";
import convertToCurrency from "./../functions/convertToCurrency";
import styles from "./BudgetSummaryBar.module.css";

const PERIOD_LABELS = {
  monthly: "Presupuesto mensual",
  biweekly: "Presupuesto quincenal",
};

const BudgetSummaryBar = () => {
  const { budget, loading, spent, remaining, percentUsed, isOverBudget } = useBudget();

  if (loading) {
    return null;
  }

  if (!budget) {
    return (
      <Link to="/budget" className={styles.summaryBar}>
        <div className={styles.topRow}>
          <p className={styles.label}>Aún no tienes presupuesto</p>
          <span className={styles.setBudgetLink}>Configurar presupuesto</span>
        </div>
      </Link>
    );
  }

  const periodEnd = getPeriodBoundaries(budget.periodType).end;
  const daysRemaining = Math.max(differenceInCalendarDays(periodEnd, new Date()), 0);

  return (
    <Link to="/budget" className={styles.summaryBar}>
      <div className={styles.topRow}>
        <p className={styles.label}>{PERIOD_LABELS[budget.periodType] || "Presupuesto"}</p>
        <p className={styles.daysRemaining}>quedan {daysRemaining} {daysRemaining === 1 ? "día" : "días"}</p>
      </div>

      <div className={styles.amountRow}>
        <span className={styles.amountValue}>
          {isOverBudget ? convertToCurrency(0) : convertToCurrency(remaining)}
        </span>
        <span className={styles.amountHint}>
          {isOverBudget ? `excedido por ${convertToCurrency(Math.abs(remaining))}` : `disponibles de ${convertToCurrency(budget.amount)}`}
        </span>
      </div>

      <div className={styles.progressTrack}>
        <div
          className={`${styles.progressFill} ${isOverBudget ? styles.progressFillOver : ""}`}
          style={{ width: `${percentUsed}%` }}
        />
      </div>

      <div className={styles.bottomRow}>
        <span className={styles.bottomLabel}>Gastado <strong>{convertToCurrency(spent)}</strong></span>
        <span className={styles.bottomPercent}>{Math.round(percentUsed)}%</span>
      </div>
    </Link>
  );
};

export default BudgetSummaryBar;
