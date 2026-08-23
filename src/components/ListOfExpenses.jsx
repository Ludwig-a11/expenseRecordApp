import { Helmet } from "react-helmet";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useGetExpenses from "./../hooks/useGetExpenses";
import { getCategoryLabel } from "./../functions/categoryLabels";
import deleteExpense from "./../firebase/deleteExpense";
import Alert from "./../elements/Alert";
import ConfirmDialog from "./../elements/ConfirmDialog";
import { useAddExpenseModal } from "./../context/AddExpenseModalContext";
import ViewModeToggle from "./movimientos/ViewModeToggle";
import SearchBox from "./movimientos/SearchBox";
import CategoryFilterPills from "./movimientos/CategoryFilterPills";
import DetailedList from "./movimientos/DetailedList";
import CompactView from "./movimientos/CompactView";
import styles from "./ListOfExpenses.module.css";

const ListOfExpenses = () => {
  const { open: openAddExpense } = useAddExpenseModal();
  const [expenses, getMoreExpenses, thereIsMoreToUpload, removeExpenseFromState] = useGetExpenses();
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState("detailed");
  const [search, setSearch] = useState("");
  const [stateAlert, setStateAlert] = useState(false);
  const [alert, setAlert] = useState({});
  const [expenseIdPendingDelete, setExpenseIdPendingDelete] = useState(null);

  const selectedCategory = searchParams.get("categoria");

  const handleCategoryChange = (categoryId) => {
    const next = new URLSearchParams(searchParams);
    if (categoryId) {
      next.set("categoria", categoryId);
    } else {
      next.delete("categoria");
    }
    setSearchParams(next);
  };

  const filteredExpenses = expenses.filter((expense) => {
    if (selectedCategory && expense.category !== selectedCategory) return false;

    if (search.trim()) {
      const term = search.trim().toLowerCase();
      const matchesDescription = expense.description?.toLowerCase().includes(term);
      const matchesCategory = getCategoryLabel(expense.category).toLowerCase().includes(term);
      if (!matchesDescription && !matchesCategory) return false;
    }

    return true;
  });

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
        <title>Movimientos</title>
      </Helmet>

      <main className={styles.page}>
        <header className={styles.topBar}>
          <div className={styles.titleWrap}>
            <h1 className={styles.title}>Movimientos</h1>
            <p className={styles.subtitle}>Revisa, edita o elimina tus registros por fecha.</p>
          </div>

          <ViewModeToggle mode={viewMode} onChange={setViewMode} />
        </header>

        {viewMode === "detailed" ? (
          <>
            <SearchBox value={search} onChange={setSearch} />
            <CategoryFilterPills selected={selectedCategory} onChange={handleCategoryChange} />

            {filteredExpenses.length === 0 ? (
              <div className={styles.emptyState}>
                <div>
                  <h2 className={styles.emptyTitle}>
                    {expenses.length === 0 ? "Aún no hay gastos" : "Sin resultados"}
                  </h2>
                  <p className={styles.emptyText}>
                    {expenses.length === 0
                      ? "Empieza agregando tu primer gasto para ver tu historial aquí."
                      : "Ajusta la búsqueda o el filtro de categoría."}
                  </p>
                  {expenses.length === 0 && (
                    <button type="button" className={styles.primaryBtn} onClick={() => openAddExpense()}>
                      Agregar Nuevo Gasto
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <DetailedList expenses={filteredExpenses} onRequestDelete={handleRequestDelete} />
            )}

            {thereIsMoreToUpload && (
              <div className={styles.loadMoreWrap}>
                <button type="button" className={styles.loadMoreBtn} onClick={() => getMoreExpenses()}>
                  Cargar Más
                </button>
              </div>
            )}
          </>
        ) : (
          <CompactView />
        )}
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
