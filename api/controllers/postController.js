import { ObjectId } from 'mongodb';
import connectToDB from '../config.js';

export const getAllPosts = async (req, res) => {
  try {
    const { db } = await connectToDB();
    const posts = await db.collection('posts').find().toArray();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { db } = await connectToDB();
    const result = await db.collection('posts').insertOne(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { db } = await connectToDB();
    const post = await db.collection('posts').findOne({ _id: new ObjectId(req.params.id) });
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { db } = await connectToDB();
    const result = await db.collection('posts').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: 'after' }
    );
    if (!result.value) return res.status(404).json({ error: 'Post not found' });
    res.json(result.value);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { db } = await connectToDB();
    const result = await db.collection('posts').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
