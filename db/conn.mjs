import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config(); // Make sure this is at the top!

const uri = process.env.ATLAS_URI;

if (!uri) {
  throw new Error("❌ MongoDB connection string (ATLAS_URI) is missing in .env");
}

const client = new MongoClient(uri);

let dbConnection;

export async function connectToServer() {
  try {
    await client.connect();
    dbConnection = client.db("your_database_name"); // 🔁 Replace with your actual DB name
    console.log("✅ Successfully connected to MongoDB.");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  }
}

export function getDb() {
  return dbConnection;
}