import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ExpenseListItem from "./../ExpenseListItem";
import useSwipeReveal from "./../../hooks/useSwipeReveal";
import styles from "./SwipeableExpenseRow.module.css";

const EditIcon = () => (
  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
    <path d="M3 17.25V21h3.75L17.8 9.94l-3.75-3.75L3 17.25Zm14.71-9.04a1 1 0 0 0 0-1.41l-2.5-2.5a1 1 0 0 0-1.41 0l-1.42 1.42 3.75 3.75 1.58-1.26Z" />
  </svg>
);

const DeleteIcon = () => (
  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
    <path d="M9 3h6l1 2h5v2H3V5h5l1-2Zm1 6h2v9h-2V9Zm4 0h2v9h-2V9ZM6 9h2v9H6V9Z" />
  </svg>
);

const SwipeableExpenseRow = ({ expense, onRequestDelete }) => {
  const { offset, isDragging, close, handlers } = useSwipeReveal();

  return (
    <div className={styles.wrapper}>
      <div className={styles.actions}>
        <Link
          to={`/edit-expense/${expense.id}`}
          className={`${styles.actionBtn} ${styles.editBtn}`}
          aria-label="Editar gasto"
          title="Editar"
          onClick={close}
        >
          <EditIcon />
        </Link>
        <button
          type="button"
          className={`${styles.actionBtn} ${styles.deleteBtn}`}
          aria-label="Eliminar gasto"
          title="Eliminar"
          onClick={() => {
            close();
            onRequestDelete(expense.id);
          }}
        >
          <DeleteIcon />
        </button>
      </div>

      <div
        className={styles.content}
        style={{ transform: `translateX(${offset}px)`, transition: isDragging ? "none" : "transform 0.2s ease" }}
        {...handlers}
      >
        <ExpenseListItem expense={expense} />
      </div>
    </div>
  );
};

SwipeableExpenseRow.propTypes = {
  expense: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
  onRequestDelete: PropTypes.func.isRequired,
};

export default SwipeableExpenseRow;
