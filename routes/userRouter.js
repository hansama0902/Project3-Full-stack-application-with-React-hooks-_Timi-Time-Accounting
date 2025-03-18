import { Router } from "express";
import { getCollection } from "../db/dbControl.js";

const router = Router();

// ✅ 获取所有用户
router.get("/", async (req, res) => {
  try {
    const userCollection = await getCollection("user");
    const users = await userCollection.find().toArray();
    res.json(users);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ 获取单个用户 (`GET /api/user/:userName`)
router.get("/:userName", async (req, res) => {
  try {
    const userCollection = await getCollection("user");
    
    // 🔹 不区分大小写匹配 `userName`
    const user = await userCollection.findOne({ userName: { $regex: new RegExp(`^${req.params.userName}$`, "i") } });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ 添加新用户 (`POST /api/user`)
router.post("/", async (req, res) => {
  try {
    const userCollection = await getCollection("user");
    const { userName, goalAmount } = req.body;

    if (!userName) {
      return res.status(400).json({ message: "userName is required" });
    }

    const newUser = { userName, goalAmount: goalAmount || 0 };
    const result = await userCollection.insertOne(newUser);
    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    console.error("❌ Error inserting user:", error);
    res.status(500).json({ message: "Failed to insert user" });
  }
});

// ✅ 更新用户目标金额 (`PUT /api/user/:userName`)
router.put("/:userName", async (req, res) => {
  try {
    const userCollection = await getCollection("user");
    const { goalAmount } = req.body;

    if (!goalAmount) {
      return res.status(400).json({ message: "goalAmount is required" });
    }

    const result = await userCollection.updateOne(
      { userName: { $regex: new RegExp(`^${req.params.userName}$`, "i") } }, 
      { $set: { goalAmount: Number(goalAmount) } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User goal updated successfully" });
  } catch (error) {
    console.error("❌ Error updating user goal:", error);
    res.status(500).json({ message: "Failed to update user goal" });
  }
});

// ✅ 删除用户 (`DELETE /api/user/:userName`)
router.delete("/:userName", async (req, res) => {
  try {
    const userCollection = await getCollection("user");
    const result = await userCollection.deleteOne({ userName: { $regex: new RegExp(`^${req.params.userName}$`, "i") } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

export default router;




