import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Button, Form, ProgressBar } from "react-bootstrap";
import useGoal from "../hooks/useGoal"; 

const GoalProgress = ({ userId, balance }) => {
  const { goalAmount, handleUpdateGoal, loading } = useGoal(userId);
  const [newGoal, setNewGoal] = useState("");

  useEffect(() => {
    setNewGoal(goalAmount || ""); 
  }, [goalAmount]);

  if (loading) return <p>Loading...</p>;
  if (!userId) return <p className="text-muted">Please select a user.</p>;

  const progress = goalAmount && balance 
    ? Math.min((balance / Number(goalAmount)) * 100, 100) 
    : 0; 

  return (
    <Card className="p-3 mt-3">
      <h4>Saving Goal</h4>
      <p><strong>Goal Amount:</strong> ${goalAmount || 0}</p>
      <ProgressBar now={progress} label={`${Math.round(progress)}%`} />

      <Form.Control
        type="number"
        placeholder="Set Goal Amount"
        value={newGoal}
        onChange={(e) => setNewGoal(e.target.value)}
        className="mt-2"
      />
      <Button 
        onClick={() => handleUpdateGoal(Number(newGoal))} 
        className="mt-2"
      >
        Set Goal
      </Button>
    </Card>
  );
};

GoalProgress.propTypes = {
  userId: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired, 
};

export default GoalProgress;





