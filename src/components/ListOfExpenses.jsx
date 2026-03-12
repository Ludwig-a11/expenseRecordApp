import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { format, fromUnixTime } from "date-fns";
import TotalSpentBar from "./TotalSpentBar";
import useGetExpenses from "./../hooks/useGetExpenses";
import convertToCurrency from "./../functions/convertToCurrency";
import deleteExpense from "./../firebase/deleteExpense";
import styles from "./ListOfExpenses.module.css";

const ListOfExpenses = () => {
  const [expenses, getMoreExpenses, thereIsMoreToUpload, removeExpenseFromState] = useGetExpenses();

  const formatDate = (date) => {
    return format(fromUnixTime(date), "dd 'de' MMMM 'de' yyyy");
  };

  const dateIsEqual = (expensesList, index, expense) => {
    if (index !== 0) {
      const currentDate = formatDate(expense.date);
      const previousExpenseDate = formatDate(expensesList[index - 1].date);
      return currentDate === previousExpenseDate;
    }

    return false;
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      await deleteExpense(expenseId);
      removeExpenseFromState(expenseId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>List Of Expenses</title>
      </Helmet>

      <main className={styles.page}>
        <header className={styles.topBar}>
          <div className={styles.titleWrap}>
            <h1 className={styles.title}>List Of Expenses</h1>
            <p className={styles.subtitle}>Review, edit or remove your records by date.</p>
          </div>

          <nav className={styles.actions}>
            <Link to="/" className={styles.headerBtn}>
              Add Expense
            </Link>
            <Link to="/expenses-by-category" className={styles.headerBtn}>
              Categories
            </Link>
          </nav>
        </header>

        <div className={styles.totalWrap}>
          <TotalSpentBar />
        </div>

        <section className={styles.listShell}>
          {expenses.length === 0 && (
            <div className={styles.emptyState}>
              <div>
                <h2 className={styles.emptyTitle}>No expenses yet</h2>
                <p className={styles.emptyText}>Start by adding your first expense to see your history here.</p>
                <Link to="/" className={styles.primaryBtn}>
                  Add New Expense
                </Link>
              </div>
            </div>
          )}

          {expenses.map((expense, index) => (
            <div className={styles.group} key={expense.id}>
              {!dateIsEqual(expenses, index, expense) && <div className={styles.dateBadge}>{formatDate(expense.date)}</div>}

              <article className={styles.itemCard}>
                <p className={styles.category}>{expense.category}</p>
                <p className={styles.description}>{expense.description}</p>
                <p className={styles.value}>{convertToCurrency(expense.amount)}</p>
                <div className={styles.rowActions}>
                  <Link to={`/edit-expense/${expense.id}`} className={styles.actionBtn}>
                    Edit
                  </Link>
                  <button type="button" className={styles.dangerBtn} onClick={() => handleDeleteExpense(expense.id)}>
                    Delete
                  </button>
                </div>
              </article>
            </div>
          ))}

          {thereIsMoreToUpload && (
            <div className={styles.loadMoreWrap}>
              <button type="button" className={styles.loadMoreBtn} onClick={() => getMoreExpenses()}>
                Load More
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default ListOfExpenses;
