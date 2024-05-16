import styles from "./App.module.css"; // Import CSS module
import { ExpenseProvider } from "./Services/ExpenseContext";
import { Backdrop } from "./components/Backdrop";

import { ExpenseTracker } from "./components/ExpenseTracker";
import { RecentTransactions } from "./components/RecentTransactions";
import { TopExpenses } from "./components/TopExpenses";

function App() {
  return (
    <>
      <ExpenseProvider>
        <div className={styles.wrapper}>
          <Backdrop />
          <div className={styles.textContainer}>
            <h1>Expense Tracker</h1>
          </div>
          <ExpenseTracker />

          <div className={styles.textContainer}>
            <h3>Recent Transactions</h3>
            <h3>Top Expenses</h3>
          </div>

          <div className={styles.bottomContainer}>
            <RecentTransactions />
            <TopExpenses />
          </div>
        </div>
      </ExpenseProvider>
    </>
  ); // Use styles.wrapper
}

export default App;
