import PropTypes from "prop-types";
import { Table, Button } from "react-bootstrap";

const TransactionList = ({ transactions, onDelete, loading }) => {
  if (loading) return <p>Loading transactions...</p>;

  return (
    <div className="mt-4">
      <h3>Transaction History</h3>
      {transactions.length === 0 ? (
        <p className="text-danger">No Transactions Found</p>
      ) : (
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
            {transactions.map((transaction) => (
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
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

TransactionList.propTypes = {
  transactions: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default TransactionList;
