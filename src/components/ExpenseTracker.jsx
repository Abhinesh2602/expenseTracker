import { useEffect, useRef, useState } from "react";
import { useExpense } from "../Services/ExpenseContext";
import styles from "./ExpenseTracker.module.css";
import { PieChartRep } from "./PieChartRep";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ExpenseTracker = () => {
  const { setAddExpense, setAddIncome, balance, expense } = useExpense();

  const handleAddExpense = (e) => {
    setAddExpense((prev) => !prev);
  };

  const handleAddIncome = (e) => {
    e.preventDefault();
    setAddIncome((prev) => !prev);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.balance}>
          <div className={styles.textContainer}>
            <p>Wallet Balance:</p>
            <p style={{ color: "#9DFF5B", fontWeight: "bold" }}>₹{balance}</p>
          </div>
          <button className={styles.IncomeButton} onClick={handleAddIncome}>
            + Add Income
          </button>
        </div>

        <div className={styles.balance}>
          <div className={styles.textContainer}>
            <p>Expenses: </p>
            <p style={{ color: "#F4BB4A", fontWeight: "bold" }}>₹{expense}</p>
          </div>
          <button className={styles.expenseButton} onClick={handleAddExpense}>
            + Add Expense
          </button>
        </div>

        <div className={styles.chart}>
          <PieChartRep />
          <div className={styles.chartDetails}>
            <div className={styles.entertainment}></div>
            <div className={styles.chartDetailFont}>Entertainment</div>
            <div className={styles.food}></div>
            <div className={styles.chartDetailFont}>Food</div>
            <div className={styles.travel}></div>
            <div className={styles.chartDetailFont}>Travel</div>
          </div>
        </div>
      </div>
    </>
  );
};
