import express from 'express';
import {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost
} from '../controllers/postController.js';

const postRouter = express.Router();

postRouter.get('/posts', getAllPosts);
postRouter.post('/posts', createPost);
postRouter.get('/posts/:id', getPostById);
postRouter.put('/posts/:id', updatePost);
postRouter.delete('/posts/:id', deletePost);

export default postRouter;
