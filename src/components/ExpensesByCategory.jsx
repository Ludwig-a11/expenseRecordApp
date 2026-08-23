import { Helmet } from "react-helmet";
import { useState } from "react";
import { format, subMonths } from "date-fns";
import { es } from "date-fns/locale";
import useCategoryMonthComparison from "../hooks/useCategoryMonthComparison";
import { useAddExpenseModal } from "./../context/AddExpenseModalContext";
import MonthPicker from "./MonthPicker";
import CategoryCard from "./CategoryCard";
import InsightBanner from "./InsightBanner";
import styles from "./ExpensesByCategory.module.css";

const ExpensesByCategory = () => {
  const { open: openAddExpense } = useAddExpenseModal();
  const [selectedMonth, setSelectedMonth] = useState(new Date());

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

          <MonthPicker selectedMonth={selectedMonth} onChange={setSelectedMonth} />
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
        ) : (
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
        )}

        <p className={styles.hint}>Toca una categoría para ver sus movimientos.</p>
      </main>
    </>
  );
};

export default ExpensesByCategory;
