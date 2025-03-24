import { useState, useRef } from "react";
import useUser from "./hooks/useUser";
import useTransactions from "./hooks/useTransactions";
import useDashboard from "./hooks/useDashboard";
import AccountSwitcher from "./components/AccountSwitcher";
import Dashboard from "./components/Dashboard";
import AddForm from "./components/AddForm";
import TransactionList from "./components/TransactionList";
import GoalProgress from "./components/GoalProgress";
import FinanceChart from "./components/FinanceChart";
import "./stylesheets/AppHeader.css";

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

  const [editingTransaction, setEditingTransaction] = useState(null);

  const addFormRef = useRef(null);

  const onTransactionAdded = async (newTransaction) => {
    await handleAddTransaction(newTransaction);
    setEditingTransaction(null);
  };

  const onTransactionUpdated = async (transactionId, updatedData) => {
    await handleUpdateTransaction(transactionId, updatedData);
    setEditingTransaction(null);
  };

  const onTransactionDeleted = async (transactionId) => {
    await handleDeleteTransaction(transactionId);
  };

  const onTransactionEdit = (transaction) => {
    setEditingTransaction(transaction);
    addFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Timi Time Accounting</h1>

      <AccountSwitcher
        userList={userList}
        currentUser={currentUser}
        onSwitch={setCurrentUser}
      />

      {!currentUser ? (
        <p className="text-muted text-center mt-3">
          Please switch your account to view data.
        </p>
      ) : (
        <>
          <GoalProgress
            key={currentUser}
            userId={currentUser}
            balance={balance}
          />
          <Dashboard
            key={transactions.length}
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            balance={balance}
          />
          <div ref={addFormRef}>
            <AddForm
              onTransactionAdded={onTransactionAdded}
              onTransactionUpdated={onTransactionUpdated}
              userName={currentUser}
              editingTransaction={editingTransaction}
            />
          </div>

          {loading ? (
            <p className="text-center mt-3">⏳ Loading transactions...</p>
          ) : transactions.length === 0 ? (
            <p className="text-muted text-center mt-3">
              No transactions found.
            </p>
          ) : (
            <TransactionList
              transactions={transactions}
              onDelete={onTransactionDeleted}
              onEdit={onTransactionEdit}
            />
          )}

          {transactions.length > 0 && <FinanceChart data={transactions} />}
        </>
      )}
    </div>
  );
};

export default App;
