import { Router } from "express";
import { ObjectId } from "mongodb";
import { getCollection } from "../db/dbControl.js"; // ✅ 使用 dbControl.js

const router = Router();

// 获取所有用户
router.get("/", async (req, res) => {
  try {
    const userCollection = await getCollection("user");
    const users = await userCollection.find().toArray();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 添加用户
router.post("/", async (req, res) => {
  try {
    const userCollection = await getCollection("user");
    const newUser = { ...req.body };
    const result = await userCollection.insertOne(newUser);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ message: "Failed to insert user" });
  }
});

// 删除用户
router.delete("/:id", async (req, res) => {
  try {
    const userCollection = await getCollection("user");
    const { id } = req.params;
    await userCollection.deleteOne({ _id: new ObjectId(id) });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

export default router;
