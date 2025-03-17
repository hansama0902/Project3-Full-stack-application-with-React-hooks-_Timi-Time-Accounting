import { useMemo } from "react";

const useDashboard = (transactions) => {
  const totalIncome = useMemo(() => {
    return transactions.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return transactions.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);
  }, [transactions]);

  return { totalIncome, totalExpenses };
};

export default useDashboard;
