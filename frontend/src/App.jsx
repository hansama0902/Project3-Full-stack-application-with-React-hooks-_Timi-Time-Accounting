// import useUser from "./hooks/useUser";
// import useTransactions from "./hooks/useTransactions";
// import useDashboard from "./hooks/useDashboard";
// import AccountSwitcher from "./components/AccountSwitcher";
// import Dashboard from "./components/Dashboard";
// import AddForm from "./components/AddForm";
// import TransactionList from "./components/TransactionList";
// import GoalProgress from "./components/GoalProgress";
// import FinanceChart from "./components/FinanceChart";

// const App = () => {
//   const { userList, currentUser, setCurrentUser } = useUser();
//   const { transactions, setTransactions, handleDeleteTransaction, loading } = useTransactions(currentUser);
//   const { totalIncome, totalExpenses, balance } = useDashboard(transactions);

//   const onTransactionAdded = (newTransaction) => {
//     setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
//   };

//   const onTransactionDeleted = async (transactionId) => {
//     await handleDeleteTransaction(transactionId);
//     setTransactions((prevTransactions) => prevTransactions.filter((t) => t._id !== transactionId));
//   };

//   return (
//     <div className="app-container">
//       <h1>Timi Time Accounting</h1>

//       <AccountSwitcher userList={userList} currentUser={currentUser} onSwitch={setCurrentUser} />

//       {!currentUser ? (
//         <p className="text-muted text-center mt-3">🚀 Please switch your account to view data.</p>
//       ) : (
//         <>
//           <GoalProgress userId={currentUser} balance={balance} />

//           <Dashboard totalIncome={totalIncome} totalExpenses={totalExpenses} balance={balance} />

//           <AddForm onTransactionAdded={onTransactionAdded} userName={currentUser} />

//           {loading ? (
//             <p className="text-center mt-3">⏳ Loading transactions...</p>
//           ) : transactions.length === 0 ? (
//             <p className="text-muted text-center mt-3">No transactions found.</p>
//           ) : (
//             <TransactionList transactions={transactions} onDelete={onTransactionDeleted} />
//           )}

//           {transactions.length > 0 && <FinanceChart data={transactions} />}
//         </>
//       )}
//     </div>
//   );
// };

// export default App;
import { useState } from "react";
import useUser from "./hooks/useUser";
import useTransactions from "./hooks/useTransactions";
import useDashboard from "./hooks/useDashboard";
import AccountSwitcher from "./components/AccountSwitcher";
import Dashboard from "./components/Dashboard";
import AddForm from "./components/AddForm";
import TransactionList from "./components/TransactionList";
import GoalProgress from "./components/GoalProgress";
import FinanceChart from "./components/FinanceChart";

const App = () => {
  const { userList, currentUser, setCurrentUser } = useUser();
  const {
    transactions,
    handleAddTransaction,
    handleUpdateTransaction,
    handleDeleteTransaction,
    loading,
  } = useTransactions(currentUser);

  const { totalIncome, totalExpenses, balance } = useDashboard(transactions);

  const [editingTransaction, setEditingTransaction] = useState(null); // ✅ 新增：当前正在编辑的交易

  // 添加交易
  const onTransactionAdded = async (newTransaction) => {
    await handleAddTransaction(newTransaction);
    setEditingTransaction(null); // 添加完成后清除编辑状态
  };

  // 更新交易
  const onTransactionUpdated = async (transactionId, updatedData) => {
    await handleUpdateTransaction(transactionId, updatedData);
    setEditingTransaction(null); // 更新完成后清除编辑状态
  };

  // 删除交易
  const onTransactionDeleted = async (transactionId) => {
    await handleDeleteTransaction(transactionId);
  };

  return (
    <div className="app-container">
      <h1>Timi Time Accounting</h1>

      <AccountSwitcher userList={userList} currentUser={currentUser} onSwitch={setCurrentUser} />

      {!currentUser ? (
        <p className="text-muted text-center mt-3">🚀 Please switch your account to view data.</p>
      ) : (
        <>
          <GoalProgress userId={currentUser} balance={balance} />

          <Dashboard totalIncome={totalIncome} totalExpenses={totalExpenses} balance={balance} />

          <AddForm
            onTransactionAdded={onTransactionAdded}
            onTransactionUpdated={onTransactionUpdated} // ✅ 新增
            userName={currentUser}
            editingTransaction={editingTransaction}     // ✅ 新增
          />

          {loading ? (
            <p className="text-center mt-3">⏳ Loading transactions...</p>
          ) : transactions.length === 0 ? (
            <p className="text-muted text-center mt-3">No transactions found.</p>
          ) : (
            <TransactionList
              transactions={transactions}
              onDelete={onTransactionDeleted}
              onEdit={(transaction) => setEditingTransaction(transaction)} // ✅ 新增
            />
          )}

          {transactions.length > 0 && <FinanceChart data={transactions} />}
        </>
      )}
    </div>
  );
};

export default App;









