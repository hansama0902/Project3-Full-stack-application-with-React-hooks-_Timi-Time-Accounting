import { useState, useEffect } from "react";
import { fetchUser, updateUserGoal } from "../utils/api"; 

const useUser = (userName) => {
  const [user, setUser] = useState({ userName: "Guest", goalAmount: 5000 });

  useEffect(() => {
    const loadUser = async () => {
      if (!userName) return; // ✅ 避免 `userName` 为空时报错

      try {
        const userData = await fetchUser(userName);
        if (userData) {
          setUser(userData);
        } else {
          console.warn(`No user found for: ${userName}`);
        }
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };

    loadUser();
  }, [userName]);

  const handleUpdateGoal = async (newGoalAmount) => {
    if (!userName) return; // ✅ 确保 `userName` 存在

    try {
      await updateUserGoal(userName, newGoalAmount);
      setUser((prev) => ({ ...prev, goalAmount: newGoalAmount }));
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  return { user, handleUpdateGoal };
};

export default useUser;






