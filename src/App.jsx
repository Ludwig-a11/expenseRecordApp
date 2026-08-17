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
        <title>App de Gastos</title>
      </Helmet>

      <main className={styles.page}>
        <header className={styles.topBar}>
          <div className={styles.topHead}>
            <div className={styles.titleBlock}>
              <h1 className={styles.title}>Agregar Gasto</h1>
              <p className={styles.subtitle}>Registra tus gastos rápido y mantén tu presupuesto mensual bajo control.</p>
            </div>

            <div className={styles.topControls}>
              <UserBadge />
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
            <Link to="/expenses-by-category" className={styles.actionLink} onClick={closeMobileMenu}>
              Categorías
            </Link>
            <Link to="/list-of-expenses" className={styles.actionLink} onClick={closeMobileMenu}>
              Lista de Gastos
            </Link>
            <Link to="/budget" className={styles.actionLink} onClick={closeMobileMenu}>
              Presupuesto
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
        </section>
      </main>
    </>
  );
}

export default App;
