const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const PORT = 3000;
const cors = require("cors");
// Middleware to parse JSON
app.use(express.json());
app.use(cors())

// MongoDB Atlas URI
const uri = "mongodb+srv://veleswaran:Vels344@cluster0.u1fy5bo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// MongoClient with options
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
    db = client.db('DummyApi'); // You can change db name
    usersCollection = db.collection('users');
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
  }
}

// Call DB connection
connectToDB();

// CREATE
app.post('/api/users', async (req, res) => {
  try {
    const result = await usersCollection.insertOne(req.body);
    res.status(201).json(result.ops?.[0] || req.body);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
app.get('/api/users', async (req, res) => {
  try {
    const users = await usersCollection.find().toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await usersCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
app.put('/api/users/:id', async (req, res) => {
  try {
    const result = await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: 'after' }
    );
    if (!result.value) return res.status(404).json({ error: 'User not found' });
    res.json(result.value);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
app.delete('/api/users/:id', async (req, res) => {
  try {
    const result = await usersCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
