import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, ToggleButtonGroup, ToggleButton } from "react-bootstrap";

const ExpenseForm = ({ onTransactionAdded, userName }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(""); 
  const [isIncome, setIsIncome] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!amount || !category || !description || !date) {
      alert("Please fill in all fields.");
      return;
    }

    const newTransaction = {
      amount: Number(amount),
      category,
      description,
      type: isIncome ? "income" : "expense",
      userName,
      date, 
    };

    try {
      await onTransactionAdded(newTransaction); 
      setAmount("");
      setCategory("");
      setDescription("");
      setDate(""); 
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <ToggleButtonGroup type="radio" name="transactionType" className="mb-3" value={isIncome} onChange={() => setIsIncome(!isIncome)}>
        <ToggleButton variant="success" value={true}>Income</ToggleButton>
        <ToggleButton variant="danger" value={false}>Expense</ToggleButton>
      </ToggleButtonGroup>

      <Form.Group>
        <Form.Label>Amount</Form.Label>
        <Form.Control type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" required />
      </Form.Group>

      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g., Rent, Salary, Groceries" required />
      </Form.Group>

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add details" required />
      </Form.Group>

      <Form.Group>
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </Form.Group>

      <Button type="submit" variant={isIncome ? "success" : "danger"} className="mt-3">
        {isIncome ? "Add Income" : "Add Expense"}
      </Button>
    </Form>
  );
};

ExpenseForm.propTypes = {
  onTransactionAdded: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
};

export default ExpenseForm;



