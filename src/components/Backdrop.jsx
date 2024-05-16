import styles from "./Backdrop.module.css";
import { AddBalance } from "./AddBalance";
import { AddExpense } from "./AddExpense";
import { EditExpenses } from "./EditExpenses";
import { useExpense } from "../Services/ExpenseContext";

export const Backdrop = () => {
  const {
    addIncome,
    addExpense,
    editExpense,
    setAddIncome,
    setAddExpense,
    setEditExpense,
  } = useExpense();

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setAddIncome(false);
      setAddExpense(false);
      setEditExpense(false);
    }
  };

  if (addIncome || addExpense || editExpense) {
    return (
      <div className={styles.backdrop} onClick={handleBackdropClick}>
        {addIncome && <AddBalance />}
        {addExpense && <AddExpense />}
        {editExpense && <EditExpenses />}
      </div>
    );
  }
  return null;
};
