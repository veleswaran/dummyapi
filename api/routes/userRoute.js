import express from 'express';
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/users', getAllUsers);
userRouter.post('/users', createUser);
userRouter.get('/users/:id', getUserById);
userRouter.put('/users/:id', updateUser);
userRouter.delete('/users/:id', deleteUser);

export default userRouter;
