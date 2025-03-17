import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Button, Form, ProgressBar } from "react-bootstrap";
import useUser from "../hooks/useUser"; 

const GoalProgress = ({ userId }) => {
  const { user, handleUpdateGoal, loading } = useUser(userId);
  const [newGoal, setNewGoal] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (user) {
      setUserName(user?.userName || ""); 
      setNewGoal(user?.goalAmount || ""); 
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;  // ✅ 数据加载中
  if (!user) return <p>No user data found.</p>;  // ✅ user 为空时提示

  const progress = user.goalAmount 
    ? Math.min((Number(user.goalAmount) / 10000) * 100, 100) 
    : 0; // ✅ 确保 `progress` 始终为数值

  return (
    <Card className="p-3 mt-3">
      <h4>Saving Goal</h4>
      <p><strong>Goal Amount:</strong> ${user.goalAmount || 0}</p>
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
      <Button 
        onClick={() => handleUpdateGoal(newGoal)}  // ✅ 只更新目标金额
        className="mt-2"
      >
        Set Goal
      </Button>
    </Card>
  );
};

GoalProgress.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default GoalProgress;



