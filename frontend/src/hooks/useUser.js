import { useState, useEffect } from "react";
import { fetchUsers } from "../utils/api";

const useUser = () => {
  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await fetchUsers();
        const userNames = users.map(user => user.userName);
        setUserList(userNames);       
        // if (userNames.length > 0) {
        //   setCurrentUser(userNames[0]); // ✅ 确保第一个用户被正确选择
        //   console.log("✅ Default user set:", userNames[0]);
        // }
      } catch (error) {
        console.error("❌ Error fetching users:", error);
      }
    };
    loadUsers();
  }, []);

  return { userList, currentUser, setCurrentUser };
};


export default useUser;



