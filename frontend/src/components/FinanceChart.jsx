import { useState } from "react";
import PropTypes from "prop-types";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { Button } from "react-bootstrap";

const aggregateByCategory = (transactions) => {
  const summary = {};

  for (const t of transactions) {
    if (!summary[t.category]) {
      summary[t.category] = 0;
    }
    summary[t.category] += Number(t.amount);
  }

  return Object.entries(summary).map(([category, amount]) => ({
    category,
    amount,
  }));
};

const FinanceChart = ({ data }) => {
  const [chartType, setChartType] = useState("income");

  const filteredData = data.filter((t) => t.type === chartType);
  const aggregatedData = aggregateByCategory(filteredData);

  return (
    <div className="mt-4">
      <h3>Finance Chart</h3>

      <div className="d-flex justify-content-center mb-3">
        <Button
          variant={chartType === "income" ? "success" : "outline-success"}
          className="me-2"
          onClick={() => setChartType("income")}
        >
          Show Income
        </Button>
        <Button
          variant={chartType === "expense" ? "danger" : "outline-danger"}
          onClick={() => setChartType("expense")}
        >
          Show Expenses
        </Button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={aggregatedData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="amount"
            fill={chartType === "income" ? "#28a745" : "#dc3545"}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

FinanceChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      type: PropTypes.oneOf(["income", "expense"]).isRequired,
    })
  ).isRequired,
};

export default FinanceChart;



