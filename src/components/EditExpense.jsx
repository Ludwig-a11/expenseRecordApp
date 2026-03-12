import { Helmet } from "react-helmet";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";
import useGetExpense from "../hooks/useGetExpense";
import TotalSpentBar from "./TotalSpentBar";
import LogOutButton from "./LogOutButton";
import Alert from "../elements/Alert";
import styles from "./../App.module.css";

const UNSAVED_CHANGES_MESSAGE = "You have unsaved changes";

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
        <title>Edit Expense</title>
      </Helmet>

      <main className={styles.page}>
        <header className={styles.topBar}>
          <div className={styles.topHead}>
            <div className={styles.titleBlock}>
              <h1 className={styles.title}>Edit Expense</h1>
              <p className={styles.subtitle}>Update details, category, amount or date while keeping your monthly total accurate.</p>
            </div>

            <button
              type="button"
              className={styles.menuToggle}
              aria-expanded={isMobileMenuOpen}
              aria-label="Open navigation menu"
              onClick={() => setIsMobileMenuOpen((current) => !current)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>

          <nav className={`${styles.actions} ${isMobileMenuOpen ? styles.actionsOpen : ""}`}>
            <Link to="/list-of-expenses" className={styles.actionLink} onClick={handleBackToListClick}>
              Back to List
            </Link>
            <LogOutButton className={styles.logoutButton} onClick={handleLogOutClick} />
          </nav>
        </header>

        <div className={styles.totalWrap}>
          <TotalSpentBar />
        </div>

        <section className={styles.contentGrid}>
          <div className={styles.formShell}>
            <ExpenseForm expense={expense} onDirtyChange={setHasUnsavedChanges} />
          </div>

          <aside className={styles.sidePanel}>
            <article className={styles.panelCard}>
              <h2 className={styles.panelTitle}>Edit Summary</h2>
              <p className={styles.panelText}>Adjust only what changed to keep your history clean and easier to audit later.</p>
              <div className={styles.quickStats}>
                <div className={styles.statItem}>Verify category and amount before saving.</div>
                <div className={styles.statItem}>Correct the date if the charge posted later.</div>
                <div className={styles.statItem}>Use clear descriptions to identify updates quickly.</div>
              </div>
            </article>

            <article className={styles.tipsCard}>
              <h2 className={styles.panelTitle}>Editing Workflow</h2>
              <ul className={styles.tipList}>
                <li>Review the original record details before changing values.</li>
                <li>Update amount and date together when fixing posting errors.</li>
                <li>Save changes and confirm the monthly total bar reflects the update.</li>
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
