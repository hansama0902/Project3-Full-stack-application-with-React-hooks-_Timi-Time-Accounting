import { useState, useEffect } from "react";
import { fetchTransactions, createTransaction, deleteTransaction } from "../utils/api";

const useTransactions = (userName) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!userName) return;

    const loadTransactions = async () => {
      try {
        const allTransactions = await fetchTransactions();
        console.log("🔍 API 返回的所有交易数据:", allTransactions);  
        console.log("✅ 当前用户:", userName);

        // 确保数据正确过滤
        const userTransactions = allTransactions.filter(t => t.userName === userName);
        console.log("📊 过滤后的交易数据:", userTransactions);

        setTransactions(userTransactions);
      } catch (error) {
        console.error("❌ 加载交易数据失败:", error);
      }
    };

    loadTransactions();
  }, [userName]);

  // ✅ 添加交易
  const handleAddTransaction = async (transaction) => {
    try {
      await createTransaction({ ...transaction, userName });
      const updatedTransactions = await fetchTransactions();
      setTransactions(updatedTransactions.filter(t => t.userName === userName));
    } catch (error) {
      console.error("❌ 添加交易失败:", error);
    }
  };

  // ✅ 删除交易
  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      const updatedTransactions = await fetchTransactions();
      setTransactions(updatedTransactions.filter(t => t.userName === userName));
    } catch (error) {
      console.error("❌ 删除交易失败:", error);
    }
  };

  return { transactions, handleAddTransaction, handleDeleteTransaction };
};

export default useTransactions;


