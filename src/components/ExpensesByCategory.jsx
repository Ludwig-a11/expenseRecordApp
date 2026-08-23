import { Helmet } from "react-helmet";
import BudgetSummaryBar from "./BudgetSummaryBar";
import useMonthlyExpensesByCategory from "../hooks/useMonthlyExpensesByCategory";
import convertToCurrency from "./../functions/convertToCurrency";
import { getCategoryLabel } from "./../functions/categoryLabels";
import { useAddExpenseModal } from "./../context/AddExpenseModalContext";
import styles from "./ExpensesByCategory.module.css";

const ExpensesByCategory = () => {
  const { open: openAddExpense } = useAddExpenseModal();
  const expensesByCategory = useMonthlyExpensesByCategory();
  const total = expensesByCategory.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const withPercentages = expensesByCategory.map((item) => {
    const amount = Number(item.amount || 0);
    const percentage = total > 0 ? (amount / total) * 100 : 0;
    return {
      ...item,
      amount,
      percentage,
    };
  });

  const sorted = [...withPercentages].sort((a, b) => b.amount - a.amount);

  return (
    <>
      <Helmet>
        <title>Categorías</title>
      </Helmet>

      <main className={styles.page}>
        <header className={styles.topBar}>
          <div className={styles.titleWrap}>
            <h1 className={styles.title}>Categorías</h1>
            <p className={styles.subtitle}>Descubre qué categorías consumen más de tu presupuesto mensual.</p>
          </div>
        </header>

        <div className={styles.totalWrap}>
          <BudgetSummaryBar />
        </div>

        <section className={styles.listShell}>
          {total > 0 && (
            <div className={styles.summaryRow}>
              Categoría con más gasto: {getCategoryLabel(sorted[0].category)} ({convertToCurrency(sorted[0].amount)})
            </div>
          )}

          {total === 0 ? (
            <div className={styles.emptyState}>
              <div>
                <h2 className={styles.emptyTitle}>Aún no hay datos este mes</h2>
                <p className={styles.emptyText}>Agrega gastos para ver la distribución por categoría.</p>
                <button type="button" className={styles.primaryBtn} onClick={() => openAddExpense()}>
                  Agregar Nuevo Gasto
                </button>
              </div>
            </div>
          ) : (
            <ul className={styles.categoryList}>
              {sorted.map((item) => (
                <li key={item.category} className={styles.itemCard}>
                  <div className={styles.rowTop}>
                    <p className={styles.category}>{getCategoryLabel(item.category)}</p>
                    <p className={styles.value}>{convertToCurrency(item.amount)}</p>
                  </div>

                  <div className={styles.progressTrack}>
                    <div className={styles.progressFill} style={{ width: `${item.percentage}%` }} />
                  </div>

                  <p className={styles.percent}>{item.percentage.toFixed(1)}% del total mensual</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
};

export default ExpensesByCategory;
