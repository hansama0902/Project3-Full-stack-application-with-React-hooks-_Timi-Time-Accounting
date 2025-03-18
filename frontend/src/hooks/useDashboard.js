import { useMemo } from "react";

const useDashboard = (transactions) => {
  const totalIncome = useMemo(() => {
    return transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0);
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);
  }, [transactions]);

  const balance = useMemo(() => {
    return totalIncome - totalExpenses; // ✅ 计算 Balance
  }, [totalIncome, totalExpenses]);

  return { totalIncome, totalExpenses, balance }; // ✅ 现在 balance 也可以被导出了
};

export default useDashboard;

