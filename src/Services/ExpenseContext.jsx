import { createContext, useContext, useEffect, useState } from "react";
const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => {
  const [addExpense, setAddExpense] = useState(false);
  const [addIncome, setAddIncome] = useState(false);
  const [editExpense, setEditExpense] = useState(false);
  const [balance, setBalance] = useState(5000);
  const [expense, setExpense] = useState(500);
  const [expenseDetails, setExpenseDetails] = useState([]);
  const [editId, setEditId] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedExpenseDetails = JSON.parse(
      localStorage.getItem("expenseDetails")
    );
    if (storedExpenseDetails) {
      setExpenseDetails(storedExpenseDetails);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      if (expenseDetails.length > 0) {
        const lastExpense = expenseDetails[expenseDetails.length - 1];

        if (lastExpense.price !== 0) {
          const newExpense = expense + parseFloat(lastExpense.price);
          setBalance((prev) => prev - lastExpense.price);
          setExpense(newExpense);
        }
      }
      localStorage.setItem("expenseDetails", JSON.stringify(expenseDetails));
    }
  }, [expenseDetails, isLoaded]);

  return (
    <>
      <ExpenseContext.Provider
        value={{
          setAddExpense,
          addExpense,
          addIncome,
          setAddIncome,
          editExpense,
          setEditExpense,
          balance,
          setBalance,
          expenseDetails,
          setExpenseDetails,
          setExpense,
          expense,
          setEditId,
          editId,
        }}
      >
        {children}
      </ExpenseContext.Provider>
    </>
  );
};

const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error("context used outside the provider");
  }
  return context;
};

export { ExpenseProvider, useExpense };
