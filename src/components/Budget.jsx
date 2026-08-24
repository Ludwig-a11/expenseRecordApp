import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import Alert from "./../elements/Alert";
import { useBudget } from "./../context/BudgetContext";
import { PERIOD_TYPES } from "./../functions/getPeriodBoundaries";
import convertToCurrency from "./../functions/convertToCurrency";
import styles from "./Budget.module.css";

const Budget = () => {
  const { budget, loading, periodLabel, spent, remaining, percentUsed, isOverBudget, saveBudget } = useBudget();

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
      setAlert({ type: "error", message: "Ingresa un monto de presupuesto válido" });
      return;
    }

    setIsSubmitting(true);
    saveBudget({ periodType, amount })
      .then(() => {
        setStateAlert(true);
        setAlert({ type: "success", message: "Tu presupuesto se guardó correctamente" });
      })
      .catch((error) => {
        console.error(error);
        setStateAlert(true);
        setAlert({ type: "error", message: "Algo salió mal. Intenta de nuevo más tarde" });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>Presupuesto</title>
      </Helmet>

      <main className={styles.page}>
        <header className={styles.topBar}>
          <div className={styles.titleWrap}>
            <h1 className={styles.title}>Presupuesto</h1>
            <p className={styles.subtitle}>Define cuánto puedes gastar en este periodo y síguelo en tiempo real.</p>
          </div>
        </header>

        <section className={styles.contentShell}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.toggleGroup} role="group" aria-label="Periodo del presupuesto">
              <button
                type="button"
                className={`${styles.toggleBtn} ${periodType === PERIOD_TYPES.BIWEEKLY ? styles.toggleBtnActive : ""}`}
                onClick={() => setPeriodType(PERIOD_TYPES.BIWEEKLY)}
                aria-pressed={periodType === PERIOD_TYPES.BIWEEKLY}
              >
                Quincenal
              </button>
              <button
                type="button"
                className={`${styles.toggleBtn} ${periodType === PERIOD_TYPES.MONTHLY ? styles.toggleBtnActive : ""}`}
                onClick={() => setPeriodType(PERIOD_TYPES.MONTHLY)}
                aria-pressed={periodType === PERIOD_TYPES.MONTHLY}
              >
                Mensual
              </button>
            </div>

            <div className={styles.fieldBlock}>
              <label htmlFor="budget-amount" className={styles.fieldLabel}>Monto del presupuesto</label>
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
              {budget ? "Guardar Cambios" : "Guardar Presupuesto"}
            </button>
          </form>

          <div className={styles.progressCard}>
            {!loading && !budget ? (
              <div className={styles.emptyState}>
                <h2 className={styles.emptyTitle}>Aún no tienes presupuesto</h2>
                <p className={styles.emptyText}>Configura uno a la izquierda para empezar a seguirlo aquí.</p>
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
                    <p className={styles.statLabel}>Gastado</p>
                    <p className={styles.statValue}>{convertToCurrency(spent)}</p>
                  </div>
                  <div>
                    <p className={styles.statLabel}>{isOverBudget ? "Excedido por" : "Restante"}</p>
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
