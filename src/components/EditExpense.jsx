import { Helmet } from "react-helmet";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";
import useGetExpense from "../hooks/useGetExpense";
import BudgetSummaryBar from "./BudgetSummaryBar";
import LogOutButton from "./LogOutButton";
import Alert from "../elements/Alert";
import styles from "./../App.module.css";

const UNSAVED_CHANGES_MESSAGE = "Tienes cambios sin guardar";

const EditExpense = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [stateAlert, setStateAlert] = useState(false);
  const { id } = useParams();
  const [expense] = useGetExpense(id);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const showUnsavedChangesAlert = () => {
    setStateAlert(false);
    setTimeout(() => {
      setStateAlert(true);
    }, 0);
  };

  const handleBackToListClick = (event) => {
    if (hasUnsavedChanges) {
      event.preventDefault();
      showUnsavedChangesAlert();
      return;
    }

    closeMobileMenu();
  };

  const handleLogOutClick = () => {
    if (hasUnsavedChanges) {
      showUnsavedChangesAlert();
      return false;
    }

    closeMobileMenu();
    return true;
  };

  return (
    <>
      <Helmet>
        <title>Editar Gasto</title>
      </Helmet>

      <main className={styles.page}>
        <header className={styles.topBar}>
          <div className={styles.topHead}>
            <div className={styles.titleBlock}>
              <h1 className={styles.title}>Editar Gasto</h1>
              <p className={styles.subtitle}>Actualiza detalles, categoría, monto o fecha manteniendo tu total mensual exacto.</p>
            </div>

            <button
              type="button"
              className={styles.menuToggle}
              aria-expanded={isMobileMenuOpen}
              aria-label="Abrir menú de navegación"
              onClick={() => setIsMobileMenuOpen((current) => !current)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>

          <nav className={`${styles.actions} ${isMobileMenuOpen ? styles.actionsOpen : ""}`}>
            <Link to="/list-of-expenses" className={styles.actionLink} onClick={handleBackToListClick}>
              Volver a la Lista
            </Link>
            <LogOutButton className={styles.logoutButton} onClick={handleLogOutClick} />
          </nav>
        </header>

        <div className={styles.totalWrap}>
          <BudgetSummaryBar />
        </div>

        <section className={styles.contentGrid}>
          <div className={styles.formShell}>
            <ExpenseForm expense={expense} onDirtyChange={setHasUnsavedChanges} />
          </div>

          <aside className={styles.sidePanel}>
            <article className={styles.panelCard}>
              <h2 className={styles.panelTitle}>Resumen de Edición</h2>
              <p className={styles.panelText}>Ajusta solo lo que cambió para mantener tu historial limpio y fácil de revisar después.</p>
              <div className={styles.quickStats}>
                <div className={styles.statItem}>Verifica la categoría y el monto antes de guardar.</div>
                <div className={styles.statItem}>Corrige la fecha si el cargo se registró después.</div>
                <div className={styles.statItem}>Usa descripciones claras para identificar cambios rápido.</div>
              </div>
            </article>

            <article className={styles.tipsCard}>
              <h2 className={styles.panelTitle}>Flujo de Edición</h2>
              <ul className={styles.tipList}>
                <li>Revisa los detalles originales del registro antes de cambiar valores.</li>
                <li>Actualiza monto y fecha juntos al corregir errores de registro.</li>
                <li>Guarda los cambios y confirma que la barra de total refleje la actualización.</li>
              </ul>
            </article>
          </aside>
        </section>
      </main>

      <Alert
        type="error"
        message={UNSAVED_CHANGES_MESSAGE}
        alertState={stateAlert}
        setAlertState={setStateAlert}
      />
    </>
  );
};

export default EditExpense;
