import { Router } from "express";
import { ObjectId } from "mongodb";
import { getCollection } from "../db/dbControl.js"; 

const router = Router();

router.get("/", async (req, res) => {
  try {
    const transactionCollection = await getCollection("transaction");
    const transactions = await transactionCollection.find().toArray();
    console.log("✅ Transactions from MongoDB:", transactions); // 确保数据库返回数据
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 添加交易
router.post("/", async (req, res) => {
  try {
    const transactionCollection = await getCollection("transaction");
    const newTransaction = { ...req.body, date: new Date() };
    const result = await transactionCollection.insertOne(newTransaction);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error inserting transaction:", error);
    res.status(500).json({ message: "Failed to insert transaction" });
  }
});

// 删除交易
router.delete("/:id", async (req, res) => {
  try {
    const transactionCollection = await getCollection("transaction");
    const { id } = req.params;
    await transactionCollection.deleteOne({ _id: new ObjectId(id) });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ message: "Failed to delete transaction" });
  }
});

export default router;
