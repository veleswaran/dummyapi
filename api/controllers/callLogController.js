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

    if (Array.isArray(req.body)) {
      const result = await db.collection('callLogs').insertMany(req.body);
      res.status(201).json(result);
    } else {
      const result = await db.collection('callLogs').insertOne(req.body);
      res.status(201).json(result);
    }
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

// DELETE call log by type OR number with partial match
export const deleteCallLogByTypeOrNumberLike = async (req, res) => {
  try {
    const { db } = await connectToDB();
    const { type, number } = req.body;

    if (!type && !number) {
      return res.status(400).json({ error: "Provide at least 'type' or 'number'" });
    }

    const query = { $or: [] };

    if (type) {
      query.$or.push({ type: { $regex: type, $options: "i" } }); // case-insensitive
    }

    if (number) {
      query.$or.push({ number: { $regex: number, $options: "i" } }); // case-insensitive
    }

    const result = await db.collection('callLogs').deleteMany(query);

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'No matching call logs found' });
    }

    res.json({ message: `${result.deletedCount} call log(s) deleted` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST call logs by name, number, and type (supports partial match)
export const getCallLogsByFilters = async (req, res) => {
  try {
    const { db } = await connectToDB();
    const { name, number, type } = req.body; // filters from request body

    // Build query dynamically
    const query = { $and: [] };

    if (name) query.$and.push({ name: { $regex: name, $options: "i" } });
    if (number) query.$and.push({ number: { $regex: number, $options: "i" } });
    if (type) query.$and.push({ type: { $regex: type, $options: "i" } });

    // If no filters provided, return all call logs
    const finalQuery = query.$and.length > 0 ? query : {};

    const callLogs = await db.collection('callLogs').find(finalQuery).toArray();

    res.json(callLogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
