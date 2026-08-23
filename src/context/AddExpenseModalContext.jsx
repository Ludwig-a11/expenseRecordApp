import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const AddExpenseModalContext = createContext();

const AddExpenseModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState(null);

  const value = useMemo(
    () => ({
      isOpen,
      prefill,
      open: (nextPrefill = null) => {
        setPrefill(nextPrefill);
        setIsOpen(true);
      },
      close: () => {
        setIsOpen(false);
        setPrefill(null);
      },
    }),
    [isOpen, prefill]
  );

  return <AddExpenseModalContext.Provider value={value}>{children}</AddExpenseModalContext.Provider>;
};

AddExpenseModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAddExpenseModal = () => useContext(AddExpenseModalContext);

export { AddExpenseModalProvider, useAddExpenseModal };
