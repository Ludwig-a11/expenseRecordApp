import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { format, subMonths } from "date-fns";
import { es } from "date-fns/locale";
import { useAuth } from "./../context/AuthContext";
import { useBudget } from "./../context/BudgetContext";
import useGetExpenses from "./../hooks/useGetExpenses";
import useCategoryMonthComparison from "./../hooks/useCategoryMonthComparison";
import groupExpensesByDay from "./../functions/groupExpensesByDay";
import getTodayInsight from "./../functions/getTodayInsight";
import { getCategoryLabel } from "./../functions/categoryLabels";
import { getCategoryIcon } from "./../functions/categoryIcons";
import convertToCurrency from "./../functions/convertToCurrency";
import BudgetSummaryBar from "./BudgetSummaryBar";
import ExpenseListItem from "./ExpenseListItem";
import InsightCard from "./InsightCard";
import ProgressBar from "./../elements/ProgressBar";
import styles from "./Inicio.module.css";

const RECENT_EXPENSES_LIMIT = 6;

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const Inicio = () => {
  const { user } = useAuth();
  const { budget, remaining, percentUsed } = useBudget();
  const [expenses] = useGetExpenses();
  const categoryComparison = useCategoryMonthComparison(new Date());

  const firstName = (user?.displayName || "").trim().split(/\s+/)[0];
  const recentGroups = groupExpensesByDay(expenses.slice(0, RECENT_EXPENSES_LIMIT));
  const previousMonthLabel = format(subMonths(new Date(), 1), "MMMM", { locale: es });
  const topCategories = [...categoryComparison].filter((item) => item.amount > 0).slice(0, 5);

  const insightText = getTodayInsight({
    categoryComparison,
    previousMonthLabel,
    budget: budget ? { amount: budget.amount, remaining, percentUsed } : null,
  });

  return (
    <>
      <Helmet>
        <title>Inicio</title>
      </Helmet>

      <main className={styles.page}>
        <div className={styles.mainColumn}>
          <header className={styles.header}>
            <p className={styles.monthLabel}>{capitalize(format(new Date(), "MMMM yyyy", { locale: es }))}</p>
            <h1 className={styles.title}>{firstName ? `Hola, ${firstName}` : "Hola"}</h1>
          </header>

          <BudgetSummaryBar />

          <section className={styles.recentSection}>
            {recentGroups.length === 0 ? (
              <>
                <div className={styles.recentHeader}>
                  <h2 className={styles.recentTitle}>HOY</h2>
                  <Link to="/list-of-expenses" className={styles.viewAllLink}>Ver todo</Link>
                </div>
                <p className={styles.emptyText}>Aún no hay gastos registrados este mes.</p>
              </>
            ) : (
              recentGroups.map((group, index) => (
                <div key={group.label} className={styles.dayGroup}>
                  <div className={styles.recentHeader}>
                    <h2 className={styles.recentTitle}>{group.label}</h2>
                    {index === 0 && <Link to="/list-of-expenses" className={styles.viewAllLink}>Ver todo</Link>}
                  </div>

                  <div className={styles.dayList}>
                    {group.items.map((expense) => (
                      <ExpenseListItem key={expense.id} expense={expense} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </section>
        </div>

        <aside className={styles.sideColumn}>
          <InsightCard text={insightText} />

          {topCategories.length > 0 && (
            <div className={styles.categoryMiniList}>
              <h2 className={styles.categoryMiniTitle}>POR CATEGORÍA</h2>
              {topCategories.map((item) => (
                <div key={item.category} className={styles.categoryMiniRow}>
                  <span className={styles.categoryMiniIcon} aria-hidden="true">{getCategoryIcon(item.category)}</span>
                  <div className={styles.categoryMiniInfo}>
                    <div className={styles.categoryMiniTop}>
                      <span>{getCategoryLabel(item.category)}</span>
                      <span>{convertToCurrency(item.amount)}</span>
                    </div>
                    <ProgressBar percent={item.percentageOfMonth} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>
      </main>
    </>
  );
};

export default Inicio;
