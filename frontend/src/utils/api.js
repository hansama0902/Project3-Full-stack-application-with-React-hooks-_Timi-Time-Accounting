const API_URL = "http://localhost:5000/api/projects"; // 你的后端API

// 模拟数据
const fakeTransactions = [
  { _id: "1", amount: 500, category: "Salary", description: "Monthly Salary", type: "income", account: "Personal" },
  { _id: "2", amount: 200, category: "Groceries", description: "Supermarket", type: "expense", account: "Personal" },
  { _id: "3", amount: 100, category: "Transport", description: "Bus Ticket", type: "expense", account: "Business" },
  { _id: "4", amount: 1000, category: "Freelance", description: "Project Payment", type: "income", account: "Business" },
];

// 模拟获取交易数据
export const fetchTransactions = () =>
  new Promise((resolve) => setTimeout(() => resolve(fakeTransactions), 500));

// 模拟添加交易数据
export const createTransaction = (transaction) =>
  new Promise((resolve) => {
    fakeTransactions.push({ ...transaction, _id: String(fakeTransactions.length + 1) });
    resolve({ success: true });
  });

// 模拟删除交易数据
export const deleteTransaction = (id) =>
  new Promise((resolve) => {
    resolve({ success: true });
  });

