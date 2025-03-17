import { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button, Form, ProgressBar } from "react-bootstrap";
import useGoal from "../utils/useGoal"; // 使用 useGoal Hook

const GoalProgress = ({ userId, account }) => {
  const { goal, updateGoal, loading } = useGoal(userId, account);
  const [newGoal, setNewGoal] = useState("");
  const [userName, setUserName] = useState(goal.userName || "");

  if (loading) return <p>Loading...</p>;

  const progress = Math.min((goal.goalAmount / 10000) * 100, 100); // 进度条 0-100%

  return (
    <Card className="p-3 mt-3">
      <h4>Saving Goal</h4>
      <p><strong>Goal Amount:</strong> ${goal.goalAmount}</p>
      <ProgressBar now={progress} label={`${Math.round(progress)}%`} />

      <Form.Control
        type="text"
        placeholder="Enter Your Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="mt-2"
      />
      <Form.Control
        type="number"
        placeholder="Set Goal Amount"
        value={newGoal}
        onChange={(e) => setNewGoal(e.target.value)}
        className="mt-2"
      />
      <Button onClick={() => updateGoal(userName, newGoal)} className="mt-2">Set Goal</Button>
    </Card>
  );
};

GoalProgress.propTypes = {
  userId: PropTypes.string.isRequired,
  account: PropTypes.string.isRequired,
};

export default GoalProgress;
