import {
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Bar,
} from "recharts";
import styles from "./TopExpenses.module.css";
import { useExpense } from "../Services/ExpenseContext";

export const TopExpenses = () => {
  const { expenseDetails } = useExpense();

  const categoryExpenses = expenseDetails.reduce((acc, expense) => {
    // Check if the category exists in the accumulator
    if (!acc[expense.category]) {
      // If the category doesn't exist, initialize it with the expense value
      acc[expense.category] = parseFloat(expense.price);
    } else {
      // If the category exists, add the expense value to the existing total
      acc[expense.category] += parseFloat(expense.price);
    }
    return acc;
  }, {});

  const data = Object.entries(categoryExpenses).map(([category, value]) => ({
    name: category,
    value,
  }));

  return (
    <div className={styles.wrapper}>
      <ResponsiveContainer
        width="85%"
        height="85%"
        style={{ marginTop: "40px" }}
      >
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            right: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8784D2" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
