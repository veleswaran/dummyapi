import { ObjectId } from 'mongodb';
import connectToDB from '../config.js';

export const getAllCallLogs = async (req, res) => {
  try {
    const { db } = await connectToDB();
    const callLogs = await db.collection('callLogs').find().toArray();
    res.json(callLogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCallLog = async (req, res) => {
  try {
    const { db } = await connectToDB();
    const result = await db.collection('callLogs').insertOne(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCallLogById = async (req, res) => {
  try {
    const { db } = await connectToDB();
    const callLog = await db.collection('callLogs').findOne({ _id: new ObjectId(req.params.id) });
    if (!callLog) return res.status(404).json({ error: "CallLog not found" });
    res.json(callLog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateCallLog = async (req, res) => {
  try {
    const { db } = await connectToDB();
    const result = await db.collection('callLogs').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: 'after' }
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteCallLog = async (req, res) => {
  try {
    const { db } = await connectToDB();
    const result = await db.collection('callLogs').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'CallLog not found' });
    res.json({ message: 'CallLog deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
