import { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, ToggleButton, ButtonGroup } from "react-bootstrap";

const ExpenseForm = ({ onAdd, userName }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("expense"); // ✅ 切换类型 (默认是支出)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !category || !description) return;

    onAdd({
      amount: parseFloat(amount),
      category,
      description,
      type,
      userName, // ✅ 绑定用户名
      date: new Date(),
    });

    setAmount("");
    setCategory("");
    setDescription("");
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <h4>Add Transaction</h4>

      {/* ✅ 收入/支出切换按钮 */}
      <ButtonGroup className="mb-3">
        <ToggleButton
          type="radio"
          variant={type === "income" ? "success" : "outline-success"}
          checked={type === "income"}
          onClick={() => setType("income")}
        >
          Income
        </ToggleButton>
        <ToggleButton
          type="radio"
          variant={type === "expense" ? "danger" : "outline-danger"}
          checked={type === "expense"}
          onClick={() => setType("expense")}
        >
          Expense
        </ToggleButton>
      </ButtonGroup>

      <Form.Group>
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </Form.Group>

      <Form.Group className="mt-2">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g., Rent, Salary, Groceries"
        />
      </Form.Group>

      <Form.Group className="mt-2">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details"
        />
      </Form.Group>

      <Button type="submit" variant={type === "income" ? "success" : "danger"} className="mt-3">
        Add {type === "income" ? "Income" : "Expense"}
      </Button>
    </Form>
  );
};

ExpenseForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
};

export default ExpenseForm;


