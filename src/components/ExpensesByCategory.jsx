import { Helmet } from "react-helmet";
import { useState } from "react";
import { format, subMonths } from "date-fns";
import { es } from "date-fns/locale";
import useCategoryMonthComparison from "../hooks/useCategoryMonthComparison";
import { useAddExpenseModal } from "./../context/AddExpenseModalContext";
import SegmentedToggle from "./../elements/SegmentedToggle";
import MonthPicker from "./MonthPicker";
import CategoryCard from "./CategoryCard";
import CategoryListRow from "./CategoryListRow";
import InsightBanner from "./InsightBanner";
import styles from "./ExpensesByCategory.module.css";

const CardsIcon = () => (
  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
    <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" />
  </svg>
);

const ListIcon = () => (
  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
    <path d="M4 5h16v3H4V5Zm0 5.5h16v3H4v-3ZM4 16h16v3H4v-3Z" />
  </svg>
);

const VIEW_OPTIONS = [
  { value: "cards", label: "Vista de tarjetas", icon: <CardsIcon /> },
  { value: "list", label: "Vista de lista", icon: <ListIcon /> },
];

const ExpensesByCategory = () => {
  const { open: openAddExpense } = useAddExpenseModal();
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState("cards");

  const categories = useCategoryMonthComparison(selectedMonth);
  const withSpend = categories.filter((item) => item.amount > 0);
  const total = withSpend.reduce((sum, item) => sum + item.amount, 0);

  const previousMonth = subMonths(selectedMonth, 1);
  const previousMonthLabel = format(previousMonth, "MMMM", { locale: es });
  const previousMonthShortLabel = format(previousMonth, "MMM", { locale: es }).toLowerCase();

  return (
    <>
      <Helmet>
        <title>Categorías</title>
      </Helmet>

      <main className={styles.page}>
        <header className={styles.topBar}>
          <div className={styles.titleWrap}>
            <h1 className={styles.title}>Categorías</h1>
            <p className={styles.subtitle}>Descubre qué categorías consumen más de tu presupuesto mensual.</p>
          </div>

          <div className={styles.headerControls}>
            <SegmentedToggle
              value={viewMode}
              onChange={setViewMode}
              options={VIEW_OPTIONS}
              groupLabel="Vista de categorías"
            />
            <MonthPicker selectedMonth={selectedMonth} onChange={setSelectedMonth} />
          </div>
        </header>

        {total > 0 && <InsightBanner topCategory={withSpend[0]} previousMonthLabel={previousMonthLabel} />}

        {total === 0 ? (
          <div className={styles.emptyState}>
            <div>
              <h2 className={styles.emptyTitle}>Aún no hay datos este mes</h2>
              <p className={styles.emptyText}>Agrega gastos para ver la distribución por categoría.</p>
              <button type="button" className={styles.primaryBtn} onClick={() => openAddExpense()}>
                Agregar Nuevo Gasto
              </button>
            </div>
          </div>
        ) : viewMode === "cards" ? (
          <div className={styles.categoryGrid}>
            {withSpend.map((item) => (
              <CategoryCard
                key={item.category}
                category={item.category}
                amount={item.amount}
                count={item.count}
                percentageOfMonth={item.percentageOfMonth}
                percentChange={item.percentChange}
                previousMonthLabel={previousMonthShortLabel}
              />
            ))}
          </div>
        ) : (
          <div className={styles.categoryList}>
            {withSpend.map((item) => (
              <CategoryListRow
                key={item.category}
                category={item.category}
                amount={item.amount}
                count={item.count}
                percentageOfMonth={item.percentageOfMonth}
                percentChange={item.percentChange}
              />
            ))}
          </div>
        )}

        <p className={styles.hint}>Toca una categoría para ver sus movimientos.</p>
      </main>
    </>
  );
};

export default ExpensesByCategory;
