const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();
app.use(express.json());
app.use(cors());

require('dotenv').config();


const uri = "mongodb+srv://veleswaran:Vels344@cluster0.u1fy5bo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db, usersCollection;

async function connectToDB() {
  try {
    await client.connect();
    db = client.db('DummyApi');
    usersCollection = db.collection('users');
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
  }
}
connectToDB();

// Routes (same as before)
app.get('/api/users', async (req, res) => {
  const users = await usersCollection.find().toArray();
  res.json(users);
});
app.post('/api/users', async (req, res) => {
  const result = await usersCollection.insertOne(req.body);
  res.status(201).json(result);
});
app.get('/api/users/:id', async (req, res) => {
  const user = await usersCollection.findOne({ _id: new ObjectId(req.params.id) });
  res.json(user);
});
app.put('/api/users/:id', async (req, res) => {
  const result = await usersCollection.findOneAndUpdate(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body },
    { returnDocument: 'after' }
  );
  res.json(result.value);
});
app.delete('/api/users/:id', async (req, res) => {
  const result = await usersCollection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ deleted: result.deletedCount > 0 });
});

// Export for Vercel serverless
module.exports = app;
module.exports.handler = serverless(app);
