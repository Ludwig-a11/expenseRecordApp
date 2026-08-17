import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import BudgetSummaryBar from "./BudgetSummaryBar";
import ThemeToggle from "./ThemeToggle";
import useMonthlyExpensesByCategory from "../hooks/useMonthlyExpensesByCategory";
import useMobileMenu from "../hooks/useMobileMenu";
import convertToCurrency from "./../functions/convertToCurrency";
import { getCategoryLabel } from "./../functions/categoryLabels";
import styles from "./ExpensesByCategory.module.css";

const ExpensesByCategory = () => {
  const { isOpen: isMobileMenuOpen, toggle: toggleMobileMenu, close: closeMobileMenu } = useMobileMenu();
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
        <title>Gastos por Categoría</title>
      </Helmet>

      <main className={styles.page}>
        <header className={styles.topBar}>
          <div className={styles.topHead}>
            <div className={styles.titleWrap}>
              <h1 className={styles.title}>Gastos por Categoría</h1>
              <p className={styles.subtitle}>Descubre qué categorías consumen más de tu presupuesto mensual.</p>
            </div>

            <div className={styles.topControls}>
              <ThemeToggle />
              <button
                type="button"
                className={styles.menuToggle}
                aria-expanded={isMobileMenuOpen}
                aria-label="Abrir menú de navegación"
                onClick={toggleMobileMenu}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>

          <nav className={`${styles.actions} ${isMobileMenuOpen ? styles.actionsOpen : ""}`}>
            <Link to="/" className={styles.headerBtn} onClick={closeMobileMenu}>
              Agregar Gasto
            </Link>
            <Link to="/list-of-expenses" className={styles.headerBtn} onClick={closeMobileMenu}>
              Lista de Gastos
            </Link>
            <Link to="/budget" className={styles.headerBtn} onClick={closeMobileMenu}>
              Presupuesto
            </Link>
          </nav>
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
                <Link to="/" className={styles.primaryBtn}>
                  Agregar Nuevo Gasto
                </Link>
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
