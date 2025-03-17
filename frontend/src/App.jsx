import useUser from "./hooks/useUser";
import useTransactions from "./hooks/useTransactions";
import useDashboard from "./hooks/useDashboard";
import AccountSwitcher from "./components/AccountSwitcher";
import Dashboard from "./components/Dashboard";
import ExpenseChart from "./components/ExpenseChart";
import ExpenseForm from "./components/ExpenseForm";
import TransactionList from "./components/TransactionList";
import GoalProgress from "./components/GoalProgress";

const App = () => {
  // ✅ 用户管理
  const { userList, currentUser, setCurrentUser } = useUser();
  
  // ✅ 交易管理
  const { transactions, handleAddTransaction, handleDeleteTransaction } = useTransactions(currentUser);
  
  // ✅ 收支计算
  const { totalIncome, totalExpenses } = useDashboard(transactions);

  return (
    <div className="app-container">
      <h1>Timi Time Accounting</h1>

      <AccountSwitcher userList={userList} currentUser={currentUser} onSwitch={setCurrentUser} />
      <GoalProgress userId={currentUser} account={currentUser} />
      <Dashboard totalIncome={totalIncome} totalExpenses={totalExpenses} />
      <ExpenseForm onAdd={handleAddTransaction} userName={currentUser} />
      <ExpenseChart data={transactions.filter(t => t.type === "expense")} />
      <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
    </div>
  );
};
// import { useState } from "react";
// import AccountSwitcher from "./components/AccountSwitcher";
// import Dashboard from "./components/Dashboard";
// import ExpenseForm from "./components/ExpenseForm";
// import TransactionList from "./components/TransactionList";
// import useTransactions from "./hooks/useTransactions";

// const App = () => {
//   const [currentUser, setCurrentUser] = useState("user_1");
//   const { transactions, handleAddTransaction, handleDeleteTransaction } = useTransactions(currentUser);

//   return (
//     <div className="app-container">
//       <h1>Timi Time Accounting</h1>
//       <AccountSwitcher
//         userList={["user_1", "user_2", "user_3", "user_4"]}
//         currentUser={currentUser}
//         onSwitch={setCurrentUser}
//       />
//       <Dashboard totalIncome={1000} totalExpenses={500} />
//       <ExpenseForm onAdd={handleAddTransaction} />
//       <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
//     </div>
//   );
// };



export default App;



