import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://veleswaran:Vels344@cluster0.nlwhzwz.mongodb.net/?appName=Cluster0";

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
