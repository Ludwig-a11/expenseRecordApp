import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import TotalSpentBar from "./TotalSpentBar";
import useMonthlyExpensesByCategory from "../hooks/useMonthlyExpensesByCategory";
import convertToCurrency from "./../functions/convertToCurrency";
import styles from "./ExpensesByCategory.module.css";

const ExpensesByCategory = () => {
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
        <title>Expenses by Category</title>
      </Helmet>

      <main className={styles.page}>
        <header className={styles.topBar}>
          <div className={styles.titleWrap}>
            <h1 className={styles.title}>Expenses by Category</h1>
            <p className={styles.subtitle}>See which categories are consuming most of your monthly budget.</p>
          </div>

          <nav className={styles.actions}>
            <Link to="/" className={styles.headerBtn}>
              Add Expense
            </Link>
            <Link to="/list-of-expenses" className={styles.headerBtn}>
              List of Expenses
            </Link>
          </nav>
        </header>

        <div className={styles.totalWrap}>
          <TotalSpentBar />
        </div>

        <section className={styles.listShell}>
          {total > 0 && (
            <div className={styles.summaryRow}>
              Highest category: {sorted[0].category} ({convertToCurrency(sorted[0].amount)})
            </div>
          )}

          {total === 0 ? (
            <div className={styles.emptyState}>
              <div>
                <h2 className={styles.emptyTitle}>No monthly data yet</h2>
                <p className={styles.emptyText}>Add expenses to see your category distribution.</p>
                <Link to="/" className={styles.primaryBtn}>
                  Add New Expense
                </Link>
              </div>
            </div>
          ) : (
            <ul className={styles.categoryList}>
              {sorted.map((item) => (
                <li key={item.category} className={styles.itemCard}>
                  <div className={styles.rowTop}>
                    <p className={styles.category}>{item.category}</p>
                    <p className={styles.value}>{convertToCurrency(item.amount)}</p>
                  </div>

                  <div className={styles.progressTrack}>
                    <div className={styles.progressFill} style={{ width: `${item.percentage}%` }} />
                  </div>

                  <p className={styles.percent}>{item.percentage.toFixed(1)}% of monthly total</p>
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
