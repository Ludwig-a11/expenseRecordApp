import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import Alert from "./../elements/Alert";
import { useBudget } from "./../context/BudgetContext";
import { PERIOD_TYPES } from "./../functions/getPeriodBoundaries";
import convertToCurrency from "./../functions/convertToCurrency";
import useMobileMenu from "./../hooks/useMobileMenu";
import styles from "./Budget.module.css";

const Budget = () => {
  const { budget, loading, periodLabel, spent, remaining, percentUsed, isOverBudget, saveBudget } = useBudget();
  const { isOpen: isMobileMenuOpen, toggle: toggleMobileMenu, close: closeMobileMenu } = useMobileMenu();

  const [periodType, setPeriodType] = useState(PERIOD_TYPES.MONTHLY);
  const [inputAmount, setInputAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateAlert, setStateAlert] = useState(false);
  const [alert, setAlert] = useState({});

  useEffect(() => {
    if (budget) {
      setPeriodType(budget.periodType);
      setInputAmount(String(budget.amount));
    }
  }, [budget]);

  const handleAmountChange = (e) => {
    let value = e.target.value.replace(/[^0-9.]/g, "");
    const parts = value.split(".");
    if (parts.length > 2) {
      value = parts[0] + "." + parts.slice(1).join("");
    }
    if (value.includes(".")) {
      const [integer, decimal] = value.split(".");
      value = integer + "." + decimal.slice(0, 2);
    }
    setInputAmount(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const amount = parseFloat(inputAmount);

    if (!inputAmount || Number.isNaN(amount) || amount <= 0) {
      setStateAlert(true);
      setAlert({ type: "error", message: "Enter a valid budget amount" });
      return;
    }

    setIsSubmitting(true);
    saveBudget({ periodType, amount })
      .then(() => {
        setStateAlert(true);
        setAlert({ type: "success", message: "Your budget has been saved" });
      })
      .catch((error) => {
        console.error(error);
        setStateAlert(true);
        setAlert({ type: "error", message: "Something went wrong. Try again later" });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>Budget</title>
      </Helmet>

      <main className={styles.page}>
        <header className={styles.topBar}>
          <div className={styles.topHead}>
            <div className={styles.titleWrap}>
              <h1 className={styles.title}>Budget</h1>
              <p className={styles.subtitle}>Set how much you can spend this period and track it in real time.</p>
            </div>

            <div className={styles.topControls}>
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
            <Link to="/" className={styles.headerBtn} onClick={closeMobileMenu}>
              Add Expense
            </Link>
            <Link to="/expenses-by-category" className={styles.headerBtn} onClick={closeMobileMenu}>
              Categories
            </Link>
            <Link to="/list-of-expenses" className={styles.headerBtn} onClick={closeMobileMenu}>
              List of Expenses
            </Link>
          </nav>
        </header>

        <section className={styles.contentShell}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.toggleGroup} role="group" aria-label="Budget period">
              <button
                type="button"
                className={`${styles.toggleBtn} ${periodType === PERIOD_TYPES.BIWEEKLY ? styles.toggleBtnActive : ""}`}
                onClick={() => setPeriodType(PERIOD_TYPES.BIWEEKLY)}
                aria-pressed={periodType === PERIOD_TYPES.BIWEEKLY}
              >
                Biweekly
              </button>
              <button
                type="button"
                className={`${styles.toggleBtn} ${periodType === PERIOD_TYPES.MONTHLY ? styles.toggleBtnActive : ""}`}
                onClick={() => setPeriodType(PERIOD_TYPES.MONTHLY)}
                aria-pressed={periodType === PERIOD_TYPES.MONTHLY}
              >
                Monthly
              </button>
            </div>

            <div className={styles.fieldBlock}>
              <label htmlFor="budget-amount" className={styles.fieldLabel}>Budget amount</label>
              <input
                type="text"
                id="budget-amount"
                name="amount"
                placeholder="$0.00"
                className={styles.bigInput}
                value={inputAmount}
                onChange={handleAmountChange}
              />
            </div>

            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {budget ? "Save Changes" : "Set Budget"}
            </button>
          </form>

          <div className={styles.progressCard}>
            {!loading && !budget ? (
              <div className={styles.emptyState}>
                <h2 className={styles.emptyTitle}>No budget set yet</h2>
                <p className={styles.emptyText}>Set a budget on the left to start tracking it here.</p>
              </div>
            ) : (
              <>
                <p className={styles.periodLabel}>{periodLabel}</p>

                <div className={styles.progressTrack}>
                  <div
                    className={`${styles.progressFill} ${isOverBudget ? styles.progressFillOver : ""}`}
                    style={{ width: `${percentUsed}%` }}
                  />
                </div>

                <div className={styles.statsRow}>
                  <div>
                    <p className={styles.statLabel}>Spent</p>
                    <p className={styles.statValue}>{convertToCurrency(spent)}</p>
                  </div>
                  <div>
                    <p className={styles.statLabel}>{isOverBudget ? "Over budget by" : "Remaining"}</p>
                    <p className={`${styles.statValue} ${isOverBudget ? styles.statValueDanger : ""}`}>
                      {convertToCurrency(Math.abs(remaining))}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Alert
        type={alert.type}
        message={alert.message}
        alertState={stateAlert}
        setAlertState={setStateAlert}
      />
    </>
  );
};

export default Budget;
