import { Router } from "express";
import { MongoClient, ObjectId } from "mongodb";

const router = Router();

// MongoDB连接地址
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

let transactionsCollection;

// 立即连接MongoDB
(async () => {
  await client.connect();
  transactionsCollection = client.db("timi-accounting").collection("transactions");
  console.log("MongoDB connected");
})();

// 获取所有账单数据
router.get("/", async (req, res) => {
  const transactions = await transactionsCollection.find().sort({ date: -1 }).toArray();
  res.json(transactions);
});

// 添加一条账单数据
router.post("/", async (req, res) => {
  const newTransaction = { ...req.body, date: new Date() };
  const result = await transactionsCollection.insertOne(newTransaction);
  res.status(201).json(result);
});

// 根据ID删除账单数据
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await transactionsCollection.deleteOne({ _id: new ObjectId(id) });
  res.status(204).send();
});

export default router;
