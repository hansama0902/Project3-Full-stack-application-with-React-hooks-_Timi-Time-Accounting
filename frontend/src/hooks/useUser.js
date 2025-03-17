import { useState, useEffect } from "react";
import { fetchUser, updateUserGoal } from "../utils/api"; 

const useUser = (userName) => {
  const [user, setUser] = useState(null);  // ✅ 初始状态为 `null`
  const [loading, setLoading] = useState(true); // ✅ 增加 `loading` 变量

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUser(userName);
        setUser(userData);
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setLoading(false); 
      }
    };

    if (userName) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [userName]);

  const handleUpdateGoal = async (newGoalAmount) => {
    try {
      await updateUserGoal(userName, newGoalAmount);
      setUser((prev) => prev ? { ...prev, goalAmount: newGoalAmount } : prev);
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  return { user, handleUpdateGoal, loading };
};

export default useUser;

