const API_URL = "/api"; // ✅ 直接使用相对路径，Vite 会自动代理

// ✅ 获取所有交易数据
export const fetchTransactions = async () => {
  try {
    const response = await fetch(`${API_URL}/transaction`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return [];
  }
};

// ✅ 添加交易
export const createTransaction = async (transaction) => {
  try {
    const response = await fetch(`${API_URL}/transaction`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding transaction:", error);
    return null;
  }
};

// ✅ 删除交易
export const deleteTransaction = async (id) => {
  try {
    await fetch(`${API_URL}/transaction/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
  }
};

// ✅ 获取所有用户
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/user`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return [];
  }
};

export const fetchUser = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/user/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch user data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return null; 
  }
};

export const updateUserGoal = async (userId, goalAmount) => {
  try {
    await fetch(`${API_URL}/user/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goalAmount }), 
    });
  } catch (error) {
    console.error("Error updating user goal:", error);
  }
};



