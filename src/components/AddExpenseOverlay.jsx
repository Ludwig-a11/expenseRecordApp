import Modal from "./../elements/Modal";
import ExpenseForm from "./ExpenseForm";
import { useAddExpenseModal } from "./../context/AddExpenseModalContext";
import styles from "./AddExpenseOverlay.module.css";

const AddExpenseOverlay = () => {
  const { isOpen, prefill, close } = useAddExpenseModal();

  return (
    <Modal isOpen={isOpen} onClose={close} labelledBy="add-expense-title">
      <h2 id="add-expense-title" className={styles.title}>Agregar gasto</h2>
      <ExpenseForm onSuccess={close} initialValues={prefill} />
    </Modal>
  );
};

export default AddExpenseOverlay;
