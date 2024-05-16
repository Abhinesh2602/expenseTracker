import sharedStyles from "./SharedEdit.module.css";
import styles from "./AddBalance.module.css";
import { useExpense } from "../Services/ExpenseContext";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export const AddBalance = () => {
  const { setAddIncome, setBalance, balance } = useExpense();

  const [newBalance, setNewBalance] = useState("");

  const handleCancel = () => {
    setAddIncome(false);
  };

  const handleChange = (e) => {
    setNewBalance(parseFloat(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBalance((prev) => prev + newBalance);

    setAddIncome(false);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={sharedStyles.title}>Add Balance</div>
        <div>
          <form
            action=""
            className={styles.balanceWrapper}
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Income Amount"
              className={sharedStyles.input}
              onChange={handleChange}
              value={newBalance}
              required
            />
            <button type="submit" className={sharedStyles.submitBtn}>
              Add Balance
            </button>
            <button
              type="button"
              className={sharedStyles.cancelBtn}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
