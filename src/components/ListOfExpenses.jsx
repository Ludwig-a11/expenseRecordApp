import { Helmet } from "react-helmet";
import { useState } from "react";
import { Link } from "react-router-dom";
import { format, fromUnixTime } from "date-fns";
import { es } from "date-fns/locale";
import BudgetSummaryBar from "./BudgetSummaryBar";
import ThemeToggle from "./ThemeToggle";
import useGetExpenses from "./../hooks/useGetExpenses";
import useMobileMenu from "./../hooks/useMobileMenu";
import convertToCurrency from "./../functions/convertToCurrency";
import { getCategoryLabel } from "./../functions/categoryLabels";
import deleteExpense from "./../firebase/deleteExpense";
import Alert from "./../elements/Alert";
import ConfirmDialog from "./../elements/ConfirmDialog";
import styles from "./ListOfExpenses.module.css";

const ListOfExpenses = () => {
  const { isOpen: isMobileMenuOpen, toggle: toggleMobileMenu, close: closeMobileMenu } = useMobileMenu();
  const [expenses, getMoreExpenses, thereIsMoreToUpload, removeExpenseFromState] = useGetExpenses();
  const [stateAlert, setStateAlert] = useState(false);
  const [alert, setAlert] = useState({});
  const [expenseIdPendingDelete, setExpenseIdPendingDelete] = useState(null);

  const formatDate = (date) => {
    return format(fromUnixTime(date), "dd 'de' MMMM 'de' yyyy", { locale: es });
  };

  const dateIsEqual = (expensesList, index, expense) => {
    if (index !== 0) {
      const currentDate = formatDate(expense.date);
      const previousExpenseDate = formatDate(expensesList[index - 1].date);
      return currentDate === previousExpenseDate;
    }

    return false;
  };

  const handleRequestDelete = (expenseId) => {
    setExpenseIdPendingDelete(expenseId);
  };

  const handleCancelDelete = () => {
    setExpenseIdPendingDelete(null);
  };

  const handleConfirmDelete = async () => {
    const expenseId = expenseIdPendingDelete;
    setExpenseIdPendingDelete(null);

    try {
      await deleteExpense(expenseId);
      removeExpenseFromState(expenseId);
    } catch (error) {
      console.error(error);
      setStateAlert(true);
      setAlert({
        type: 'error',
        message: error.code === 'permission-denied'
          ? "No tienes permiso para eliminar este gasto"
          : 'Algo salió mal. Intenta de nuevo más tarde',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Lista de Gastos</title>
      </Helmet>

      <main className={styles.page}>
        <header className={styles.topBar}>
          <div className={styles.topHead}>
            <div className={styles.titleWrap}>
              <h1 className={styles.title}>Lista de Gastos</h1>
              <p className={styles.subtitle}>Revisa, edita o elimina tus registros por fecha.</p>
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
            <Link to="/expenses-by-category" className={styles.headerBtn} onClick={closeMobileMenu}>
              Categorías
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
          {expenses.length === 0 && (
            <div className={styles.emptyState}>
              <div>
                <h2 className={styles.emptyTitle}>Aún no hay gastos</h2>
                <p className={styles.emptyText}>Empieza agregando tu primer gasto para ver tu historial aquí.</p>
                <Link to="/" className={styles.primaryBtn}>
                  Agregar Nuevo Gasto
                </Link>
              </div>
            </div>
          )}

          {expenses.map((expense, index) => (
            <div className={styles.group} key={expense.id}>
              {!dateIsEqual(expenses, index, expense) && <div className={styles.dateBadge}>{formatDate(expense.date)}</div>}

              <article className={styles.itemCard}>
                <p className={styles.category}>{getCategoryLabel(expense.category)}</p>
                <p className={styles.description}>{expense.description}</p>
                <p className={styles.value}>{convertToCurrency(expense.amount)}</p>
                <div className={styles.rowActions}>
                  <Link
                    to={`/edit-expense/${expense.id}`}
                    className={`${styles.actionBtn} ${styles.rowActionBtn}`}
                    aria-label="Editar gasto"
                    title="Editar"
                  >
                    <span className={styles.btnIcon} aria-hidden="true">
                      <svg viewBox="0 0 24 24" focusable="false">
                        <path d="M3 17.25V21h3.75L17.8 9.94l-3.75-3.75L3 17.25Zm14.71-9.04a1 1 0 0 0 0-1.41l-2.5-2.5a1 1 0 0 0-1.41 0l-1.42 1.42 3.75 3.75 1.58-1.26Z" />
                      </svg>
                    </span>
                  </Link>
                  <button
                    type="button"
                    className={`${styles.dangerBtn} ${styles.rowActionBtn}`}
                    onClick={() => handleRequestDelete(expense.id)}
                    aria-label="Eliminar gasto"
                    title="Eliminar"
                  >
                    <span className={styles.btnIcon} aria-hidden="true">
                      <svg viewBox="0 0 24 24" focusable="false">
                        <path d="M9 3h6l1 2h5v2H3V5h5l1-2Zm1 6h2v9h-2V9Zm4 0h2v9h-2V9ZM6 9h2v9H6V9Z" />
                      </svg>
                    </span>
                  </button>
                </div>
              </article>
            </div>
          ))}

          {thereIsMoreToUpload && (
            <div className={styles.loadMoreWrap}>
              <button type="button" className={styles.loadMoreBtn} onClick={() => getMoreExpenses()}>
                Cargar Más
              </button>
            </div>
          )}
        </section>
      </main>

      <Alert
        type={alert.type}
        message={alert.message}
        alertState={stateAlert}
        setAlertState={setStateAlert}
      />

      <ConfirmDialog
        open={expenseIdPendingDelete !== null}
        title="Eliminar gasto"
        message="¿Seguro que quieres eliminar este gasto? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        danger
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default ListOfExpenses;
