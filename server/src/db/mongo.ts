import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

const DB_NAME = process.env.MONGODB_DB_NAME || "task_manager";

let client: MongoClient | null = null;
let db: Db | null = null;

export const connectToDatabase = async (): Promise<Db> => {
  if (db) {
    return db;
  }

  // create the client only on the first connection attempt
  client = new MongoClient(uri || "mongodb://localhost:27017");

  try {
    await client.connect();
    db = client.db(DB_NAME);

    console.log(`MongoDB connected to database: ${DB_NAME}`);

    return db;
  } catch (error) {
    if (client) {
      await client.close().catch(console.error);
      client = null;
    }
    db = null;

    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export const getDb = (): Db => {
  if (!db) {
    throw new Error("Database not connected. Call connectToDatabase() first.");
  }
  return db;
};
