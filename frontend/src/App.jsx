import { useState } from "react";
import useUser from "./hooks/useUser";
import useTransactions from "./hooks/useTransactions";
import useDashboard from "./hooks/useDashboard";
import AccountSwitcher from "./components/AccountSwitcher";
import Dashboard from "./components/Dashboard";
import ExpenseChart from "./components/FinanceChart";
import ExpenseForm from "./components/ExpenseForm";
import TransactionList from "./components/TransactionList";
import GoalProgress from "./components/GoalProgress";
import UserManagement from "./components/UserManagement"; 

const App = () => {
  const { userList, currentUser, setCurrentUser } = useUser();
  const { transactions, handleAddTransaction, handleDeleteTransaction, loading } = useTransactions(currentUser);
  const { totalIncome, totalExpenses, balance } = useDashboard(transactions);
  const [showUserModal, setShowUserModal] = useState(false); // ✅ 控制模态框显示

  return (
    <div className="app-container">
      <h1>Timi Time Accounting</h1>

      <div className="d-flex justify-content-between align-items-center">
        {/* ✅ 用户切换 */}
        <AccountSwitcher userList={userList} currentUser={currentUser} onSwitch={setCurrentUser} />
      </div>

      {/* ✅ 用户管理模态框 */}
      <UserManagement show={showUserModal} onClose={() => setShowUserModal(false)} onUserChange={setCurrentUser} />

      {!currentUser ? (
        <p className="text-muted text-center mt-3">🚀 Please switch your account to view data.</p>
      ) : (
        <>
          <GoalProgress userId={currentUser} balance={balance} />
          <Dashboard totalIncome={totalIncome} totalExpenses={totalExpenses} balance={balance} />
          <ExpenseForm onAdd={handleAddTransaction} userName={currentUser} />
          {transactions.length > 0 && (
            <ExpenseChart data={transactions} />
          )}
          {loading ? (
            <p className="text-center mt-3">⏳ Loading transactions...</p>
          ) : transactions.length === 0 ? (
            <p className="text-muted text-center mt-3">📭 No transactions found.</p>
          ) : (
            <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
          )}
        </>
      )}
    </div>
  );
};

export default App;







