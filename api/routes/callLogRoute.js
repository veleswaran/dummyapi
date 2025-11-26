import express from 'express';
import {
  getAllCallLogs,
  createCallLog,
  getCallLogById,
  updateCallLog,
  deleteCallLog
} from '../controllers/callLogController.js';

const callLogRouter = express.Router();

callLogRouter.get('/call-logs', getAllCallLogs);
callLogRouter.post('/call-logs', createCallLog);
callLogRouter.get('/call-logs/:id', getCallLogById);
callLogRouter.put('/call-logs/:id', updateCallLog);
callLogRouter.delete('/call-logs/:id', deleteCallLog);

export default callLogRouter;
