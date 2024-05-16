import { PieChart, Pie, Cell } from "recharts";
import { useExpense } from "../Services/ExpenseContext";

export const PieChartRep = () => {
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

  const COLORS = ["#FF9304", "#A000FF", "#FDE006"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
      <PieChart width={199} height={199}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};
