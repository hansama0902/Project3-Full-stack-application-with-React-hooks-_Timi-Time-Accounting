import { useState, useEffect } from "react";
import { fetchTransactions } from "../utils/api";

const useTransactions = (userName) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userName) {
      console.warn("⚠️ No user selected, skipping transaction fetch.");
      setTransactions([]); // ✅ 用户未选择时清空数据
      setLoading(false);
      return;
    }

    console.log("📥 Fetching transactions for:", userName);
    const loadTransactions = async () => {
      try {
        const userTransactions = await fetchTransactions(userName);
        setTransactions(userTransactions);
      } catch (error) {
        console.error("❌ Error loading transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, [userName]);

  return { transactions, loading };
};

export default useTransactions;








