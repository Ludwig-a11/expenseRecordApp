import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ExpenseForm from "./components/ExpenseForm";
import BudgetSummaryBar from "./components/BudgetSummaryBar";
import LogOutButton from "./components/LogOutButton";
import ThemeToggle from "./components/ThemeToggle";
import UserBadge from "./elements/UserBadge";
import useMobileMenu from "./hooks/useMobileMenu";
import styles from "./App.module.css";

function App() {
  const { isOpen: isMobileMenuOpen, toggle: toggleMobileMenu, close: closeMobileMenu } = useMobileMenu();

  return (
    <>
      <Helmet>
        <title>Expense Tracker App</title>
      </Helmet>

      <main className={styles.page}>
        <header className={styles.topBar}>
          <div className={styles.topHead}>
            <div className={styles.titleBlock}>
              <h1 className={styles.title}>Add Expense</h1>
              <p className={styles.subtitle}>Capture expenses quickly and keep your monthly budget under control.</p>
            </div>

            <div className={styles.topControls}>
              <UserBadge />
              <ThemeToggle />
              <button
                type="button"
                className={styles.menuToggle}
                aria-expanded={isMobileMenuOpen}
                aria-label="Open navigation menu"
                onClick={toggleMobileMenu}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>

          <nav className={`${styles.actions} ${isMobileMenuOpen ? styles.actionsOpen : ""}`}>
            <Link to="/expenses-by-category" className={styles.actionLink} onClick={closeMobileMenu}>
              Categories
            </Link>
            <Link to="/list-of-expenses" className={styles.actionLink} onClick={closeMobileMenu}>
              List of Expenses
            </Link>
            <Link to="/budget" className={styles.actionLink} onClick={closeMobileMenu}>
              Budget
            </Link>
            <LogOutButton className={styles.logoutButton} onClick={closeMobileMenu} />
          </nav>
        </header>

        <div className={styles.totalWrap}>
          <BudgetSummaryBar />
        </div>

        <section className={styles.contentGrid}>
          <div className={styles.formShell}>
            <ExpenseForm />
          </div>

          <aside className={styles.sidePanel}>
            <article className={styles.panelCard}>
              <h2 className={styles.panelTitle}>Quick Summary</h2>
              <p className={styles.panelText}>Use short descriptions and register each expense as soon as it happens.</p>
              <div className={styles.quickStats}>
                <div className={styles.statItem}>Tip: Keep names under 35 characters.</div>
                <div className={styles.statItem}>Tip: Add amount first, then category.</div>
                <div className={styles.statItem}>Tip: Review categories once per week.</div>
              </div>
            </article>

            <article className={styles.tipsCard}>
              <h2 className={styles.panelTitle}>Suggested Workflow</h2>
              <ul className={styles.tipList}>
                <li>Add recurring expenses first (rent, services, transport).</li>
                <li>Register small daily expenses before ending the day.</li>
                <li>Check the monthly total and adjust spending early.</li>
              </ul>
            </article>
          </aside>
        </section>
      </main>
    </>
  );
}

export default App;
