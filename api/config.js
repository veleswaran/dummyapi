import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI;

let cachedClient = null;
let cachedDb = null;

 export default async function connectToDB() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  await client.connect();
  const db = client.db('DummyApi');
  cachedClient = client;
  cachedDb = db;
  console.log("MongoDB connected");
  return { client, db };
}
