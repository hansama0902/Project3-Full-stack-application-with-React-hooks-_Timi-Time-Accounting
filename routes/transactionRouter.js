import { Router } from "express";
import { ObjectId } from "mongodb";
import { getCollection } from "../db/database.js"; 

const router = Router();

// GET 
router.get("/", async (req, res) => {
  try {
    const transactionCollection = await getCollection("transaction");
    const transactions = await transactionCollection.find().toArray();
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET
router.get("/user/:userName", async (req, res) => {
  try {
    const transactionCollection = await getCollection("transaction");
    const transactions = await transactionCollection.find({ userName: req.params.userName }).toArray();

    if (!transactions.length) {
      return res.status(404).json({ message: `No transactions found for user: ${req.params.userName}` });
    }

    res.json(transactions);
  } catch (error) {
    console.error("Error fetching user transactions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST 
router.post("/", async (req, res) => {
  try {
    const { amount, category, description, type, userName, date } = req.body;

    if (!amount || !category || !description || !type || !userName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTransaction = {
      amount: Number(amount), 
      category,
      description,
      type,
      userName,
      date: date || new Date().toISOString(), 
    };

    res.status(201).json({ message: "Transaction added successfully", transaction: newTransaction });
  } catch (error) {
    console.error("Error inserting transaction:", error);
    res.status(500).json({ message: "Failed to insert transaction" });
  }
});

// DELETE 
router.delete("/:id", async (req, res) => {
  try {
    const transactionCollection = await getCollection("transaction");

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid transaction ID" });
    }

    const result = await transactionCollection.deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error(" Error deleting transaction:", error);
    res.status(500).json({ message: "Failed to delete transaction" });
  }
});

export default router;


