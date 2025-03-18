import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let db;

async function connectDB() {
  if (!db) {
    try {
      await client.connect();
      console.log("Successfully connected to MongoDB Atlas");
      db = client.db("TimiTimeAccounting"); 
    } catch (error) {
      console.error("❌ MongoDB Connection Error:", error);
      process.exit(1);
    }
  }
  return db;
}

async function getCollection(name) {
  const database = await connectDB();
  return database.collection(name);
}

export { connectDB, getCollection };
