import { useState, useEffect } from "react";
import AccountSwitcher from "./components/AccountSwitcher";
import Dashboard from "./components/Dashboard";
import ExpenseChart from "./components/ExpenseChart";
import ExpenseForm from "./components/ExpenseForm";
import TransactionList from "./components/TransactionList";
import GoalProgress from "./components/GoalProgress";
import { fetchTransactions, createTransaction, deleteTransaction } from "./utils/api";
import useGoal from "./utils/useGoal";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentUser, setCurrentUser] = useState("Alice");

  // ✅ 获取用户名列表和当前目标金额
  const { goal, updateGoal, userList } = useGoal(currentUser);
  const userName = goal.userName || "Guest";

  // ✅ 交易数据（本地模拟）
  const fakeTransactions = [
    { _id: "1", amount: 1200, category: "Salary", description: "Monthly Salary", type: "income", userName: "Alice" },
    { _id: "2", amount: 500, category: "Rent", description: "Apartment Rent", type: "expense", userName: "Alice" },
    { _id: "3", amount: 100, category: "Groceries", description: "Supermarket", type: "expense", userName: "Alice" },
    { _id: "4", amount: 200, category: "Transport", description: "Gasoline", type: "expense", userName: "Bob" },
    { _id: "5", amount: 1500, category: "Freelance", description: "Freelance Project", type: "income", userName: "Bob" },
    { _id: "6", amount: 300, category: "Investment", description: "Stock Profit", type: "income", userName: "Charlie" },
  ];

  // ✅ 交易数据按 `userName` 过滤
  useEffect(() => {
    setTransactions(fakeTransactions.filter((transaction) => transaction.userName === userName));
  }, [userName]);

  const handleAdd = (transaction) => {
    setTransactions([...transactions, { ...transaction, _id: Date.now().toString(), userName }]);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t._id !== id));
  };

  return (
    <div className="app-container">
      <h1>Timi Time Accounting</h1>
      <AccountSwitcher userList={userList} currentUser={currentUser} onSwitch={setCurrentUser} />
      <GoalProgress userId="user123" account={currentUser} />
      <Dashboard 
        totalIncome={transactions.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0)} 
        totalExpenses={transactions.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0)} 
      />
      <ExpenseForm onAdd={handleAdd} userName={userName} />
      <ExpenseChart data={transactions.filter(t => t.type === "expense")} />
      <TransactionList transactions={transactions} onDelete={handleDelete} />
    </div>
  );
};

export default App;

