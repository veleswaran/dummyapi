import express from 'express';
import {
    getAllDepartments,
    createDepartment,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
} from '../controllers/departmentController.js';

const departmentRouter = express.Router();

departmentRouter.get('/departments', getAllDepartments);
departmentRouter.post('/departments', createDepartment);
departmentRouter.get('/departments/:id', getDepartmentById);
departmentRouter.put('/departments/:id', updateDepartment);
departmentRouter.delete('/departments/:id', deleteDepartment);

export default departmentRouter;
