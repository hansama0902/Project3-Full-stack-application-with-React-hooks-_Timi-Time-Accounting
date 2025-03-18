import { useState } from "react";
import PropTypes from "prop-types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "react-bootstrap";

const FinanceChart = ({ data }) => {
  const [chartType, setChartType] = useState("income"); // 默认显示 Expense

  // ✅ 过滤数据，根据 `chartType` 选择展示 `income` 或 `expense`
  const filteredData = data.filter((t) => t.type === chartType);

  return (
    <div className="mt-4">
      {/* ✅ 添加 FinanceChart 标题 */}
      <h3>Finance Chart</h3>

      {/* ✅ 交换 Show Income 和 Show Expense 位置 */}
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

      {/* ✅ 渲染柱状图 */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={filteredData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill={chartType === "income" ? "#28a745" : "#dc3545"} />
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
      type: PropTypes.oneOf(["income", "expense"]).isRequired, // ✅ 确保 `type` 只接受 `income` 或 `expense`
    })
  ).isRequired,
};

export default FinanceChart;


