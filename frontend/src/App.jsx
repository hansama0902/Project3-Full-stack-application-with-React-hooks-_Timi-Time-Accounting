// import { useState, useRef } from "react";
// import useUser from "./hooks/useUser";
// import useTransactions from "./hooks/useTransactions";
// import useDashboard from "./hooks/useDashboard";
// import AccountSwitcher from "./components/AccountSwitcher";
// import Dashboard from "./components/Dashboard";
// import AddForm from "./components/AddForm";
// import TransactionList from "./components/TransactionList";
// import GoalProgress from "./components/GoalProgress";
// import FinanceChart from "./components/FinanceChart";
// import "./stylesheets/AppHeader.css";

// const App = () => {
//   const { userList, currentUser, setCurrentUser } = useUser();
//   const {
//     transactions,
//     handleAddTransaction,
//     handleUpdateTransaction,
//     handleDeleteTransaction,
//     loading,
//   } = useTransactions(currentUser);

//   const { totalIncome, totalExpenses, balance } = useDashboard(transactions);

//   const [editingTransaction, setEditingTransaction] = useState(null);

//   const addFormRef = useRef(null);

//   const onTransactionAdded = async (newTransaction) => {
//     await handleAddTransaction(newTransaction);
//     setEditingTransaction(null);
//   };

//   const onTransactionUpdated = async (transactionId, updatedData) => {
//     await handleUpdateTransaction(transactionId, updatedData);
//     setEditingTransaction(null);
//   };

//   const onTransactionDeleted = async (transactionId) => {
//     await handleDeleteTransaction(transactionId);
//   };

//   const onTransactionEdit = (transaction) => {
//     setEditingTransaction(transaction);
//     addFormRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <div className="app-container">
//       <h1 className="app-title">Timi Time Accounting</h1>

//       <AccountSwitcher
//         userList={userList}
//         currentUser={currentUser}
//         onSwitch={setCurrentUser}
//       />

//       {!currentUser ? (
//         <p className="text-muted text-center mt-3">
//           Please switch your account to view data.
//         </p>
//       ) : (
//         <>
//           <GoalProgress
//             key={currentUser}
//             userId={currentUser}
//             balance={balance}
//           />
//           <Dashboard
//             key={transactions.length}
//             totalIncome={totalIncome}
//             totalExpenses={totalExpenses}
//             balance={balance}
//           />
//           <div ref={addFormRef}>
//             <AddForm
//               onTransactionAdded={onTransactionAdded}
//               onTransactionUpdated={onTransactionUpdated}
//               userName={currentUser}
//               editingTransaction={editingTransaction}
//             />
//           </div>

//           {loading ? (
//             <p className="text-center mt-3">⏳ Loading transactions...</p>
//           ) : transactions.length === 0 ? (
//             <p className="text-muted text-center mt-3">
//               No transactions found.
//             </p>
//           ) : (
//             <TransactionList
//               transactions={transactions}
//               onDelete={onTransactionDeleted}
//               onEdit={onTransactionEdit}
//             />
//           )}

//           {transactions.length > 0 && <FinanceChart data={transactions} />}
//         </>
//       )}
//     </div>
//   );
// };

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
import DateRangeFilter from "./components/DateRangeFilter";
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

  const [editingTransaction, setEditingTransaction] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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

  // 修正日期偏移问题的解析函数
  const parseDateLocal = (dateStr) => new Date(dateStr + "T00:00:00");

  const filteredTransactions = transactions.filter((t) => {
    const tDate = parseDateLocal(t.date);
    const afterStart = startDate ? parseDateLocal(startDate) <= tDate : true;
    const beforeEnd = endDate ? tDate <= new Date(endDate + "T23:59:59") : true;
    return afterStart && beforeEnd;
  });

  const { totalIncome, totalExpenses, balance } =
    useDashboard(filteredTransactions);

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
          <DateRangeFilter
            startDate={startDate}
            endDate={endDate}
            onChange={(type, value) => {
              if (type === "start") setStartDate(value);
              else setEndDate(value);
            }}
          />

          <GoalProgress
            key={currentUser}
            userId={currentUser}
            balance={balance}
          />

          <Dashboard
            key={filteredTransactions.length}
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
            <p className="text-center mt-3">Loading transactions...</p>
          ) : filteredTransactions.length === 0 ? (
            <p className="text-muted text-center mt-3">
              No transactions found.
            </p>
          ) : (
            <TransactionList
              transactions={filteredTransactions}
              onDelete={onTransactionDeleted}
              onEdit={onTransactionEdit}
            />
          )}

          {filteredTransactions.length > 0 && (
            <FinanceChart data={filteredTransactions} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
