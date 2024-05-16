import { useEffect, useState } from "react";
import { useExpense } from "../Services/ExpenseContext";
import styles from "./AddExpense.module.css";
import sharedStyles from "./SharedEdit.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const EditExpenses = () => {
  const {
    setEditExpense,
    setExpenseDetails,
    expenseDetails,
    balance,
    expense,
    editId,
  } = useExpense();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editId !== null) {
      const editedExpense = expenseDetails.find(
        (expense) => expense.id === editId
      );
      if (editedExpense) {
        setTitle(editedExpense.title);
        setPrice(editedExpense.price);
        setCategory(editedExpense.category);
        setDate(editedExpense.date);
      }
    }
  }, [editId, expenseDetails]);

  const handleCancel = (e) => {
    e.preventDefault();
    setEditExpense(false);
  };

  const totalExpense = parseFloat(expense) + parseFloat(price);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (totalExpense > parseFloat(balance)) {
      setError(true);
      toast.error("You dont have enough Balance", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    const updatedExpenseDetails = expenseDetails.map((expense) => {
      if (editId === expense.id) return { title, price, category, date };
      else {
        return expense;
      }
    });

    setExpenseDetails(updatedExpenseDetails);

    setTitle("");
    setPrice("");
    setCategory("");
    setDate("");
    setEditExpense(false);
  };

  return (
    <>
      {error && (
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      )}
      <div className={styles.wrapper}>
        <div className={sharedStyles.title}>Edit Expenses</div>
        <div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className={sharedStyles.input}
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Price"
              className={sharedStyles.input}
              value={price}
              required
              onChange={(e) => setPrice(e.target.value)}
            />
            <select
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}
              className={sharedStyles.input}
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Travel">Travel</option>
            </select>
            <input
              type="date"
              placeholder="dd/mm/yyyy"
              value={date}
              required
              className={sharedStyles.input}
              onChange={(e) => setDate(e.target.value)}
              style={{ paddingRight: "20px" }}
            />
            <button type="submit" className={sharedStyles.submitBtn}>
              Edit Expense
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
