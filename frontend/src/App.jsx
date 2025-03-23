import useUser from "./hooks/useUser";
import useTransactions from "./hooks/useTransactions";
import useDashboard from "./hooks/useDashboard";
import AccountSwitcher from "./components/AccountSwitcher";
import Dashboard from "./components/Dashboard";
import ExpenseForm from "./components/ExpenseForm";
import TransactionList from "./components/TransactionList";
import GoalProgress from "./components/GoalProgress";
import FinanceChart from "./components/FinanceChart";

const App = () => {
  const { userList, currentUser, setCurrentUser } = useUser();
  const { transactions, setTransactions, handleDeleteTransaction, loading } = useTransactions(currentUser);
  const { totalIncome, totalExpenses, balance } = useDashboard(transactions);

  const onTransactionAdded = (newTransaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
  };

  const onTransactionDeleted = async (transactionId) => {
    await handleDeleteTransaction(transactionId);
    setTransactions((prevTransactions) => prevTransactions.filter((t) => t._id !== transactionId));
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

          <ExpenseForm onTransactionAdded={onTransactionAdded} userName={currentUser} />

          {loading ? (
            <p className="text-center mt-3">⏳ Loading transactions...</p>
          ) : transactions.length === 0 ? (
            <p className="text-muted text-center mt-3">No transactions found.</p>
          ) : (
            <TransactionList transactions={transactions} onDelete={onTransactionDeleted} />
          )}

          {transactions.length > 0 && <FinanceChart data={transactions} />}
        </>
      )}
    </div>
  );
};

export default App;








