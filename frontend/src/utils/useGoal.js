import { useState, useEffect } from "react";

// ✅ 本地模拟的用户数据
const fakeUsers = ["Alice", "Bob", "Charlie"];

// ✅ 本地模拟的目标金额数据
const fakeGoals = {
  Alice: { userName: "Alice", goalAmount: 5000 },
  Bob: { userName: "Bob", goalAmount: 7000 },
  Charlie: { userName: "Charlie", goalAmount: 3000 },
};

const useGoal = (userName) => {
  const [goal, setGoal] = useState(fakeGoals[userName] || { userName: "Guest", goalAmount: 5000 });
  const [userList, setUserList] = useState(fakeUsers); // ✅ 账户列表
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ✅ 切换用户名时，加载对应的目标数据
    setGoal(fakeGoals[userName] || { userName: "Guest", goalAmount: 5000 });
  }, [userName]);

  // ✅ 更新目标金额
  const updateGoal = (newUserName, newGoalAmount) => {
    fakeGoals[newUserName] = { userName: newUserName, goalAmount: Number(newGoalAmount) };
    setGoal(fakeGoals[newUserName]);
  };

  return { goal, updateGoal, userList, loading };
};

export default useGoal;


