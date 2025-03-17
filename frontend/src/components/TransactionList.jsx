import { useEffect } from "react";
import PropTypes from "prop-types";
import { Table, Button } from "react-bootstrap";

const TransactionList = ({ transactions, onDelete }) => {
  useEffect(() => {
    console.log("📌 交易列表接收到的数据:", transactions);
  }, [transactions]);

  return (
    <div className="mt-4">
      <h3>Transaction History</h3>
      <Table striped bordered hover responsive className="mt-3">
        <thead className="table-dark">
          <tr>
            <th>Type</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td className={transaction.type === "income" ? "text-success" : "text-danger"}>
                  {transaction.type === "income" ? "[Income]" : "[Expense]"}
                </td>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
                <td className={transaction.type === "income" ? "text-success" : "text-danger"}>
                  {transaction.type === "income" ? `+ $${transaction.amount}` : `- $${transaction.amount}`}
                </td>
                <td>{transaction.date ? new Date(transaction.date).toLocaleDateString() : "N/A"}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => onDelete(transaction._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No Transactions Found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

TransactionList.propTypes = {
  transactions: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TransactionList;

