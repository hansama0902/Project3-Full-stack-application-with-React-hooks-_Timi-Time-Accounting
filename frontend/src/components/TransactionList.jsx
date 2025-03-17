import { useState } from "react";
import PropTypes from "prop-types";
import { Table, Button, Modal, Form } from "react-bootstrap";

const TransactionList = ({ transactions, onDelete, onEdit }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);

  // ✅ 打开编辑弹窗
  const handleEditClick = (transaction) => {
    setCurrentTransaction(transaction);
    setShowModal(true);
  };

  // ✅ 处理编辑提交
  const handleSaveEdit = () => {
    onEdit(currentTransaction);
    setShowModal(false);
  };

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
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditClick(transaction)}>
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => onDelete(transaction._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ✅ 编辑交易的模态框 */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentTransaction && (
            <Form>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  value={currentTransaction.category}
                  onChange={(e) => setCurrentTransaction({ ...currentTransaction, category: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={currentTransaction.description}
                  onChange={(e) => setCurrentTransaction({ ...currentTransaction, description: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={currentTransaction.amount}
                  onChange={(e) => setCurrentTransaction({ ...currentTransaction, amount: parseFloat(e.target.value) })}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

TransactionList.propTypes = {
  transactions: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default TransactionList;
