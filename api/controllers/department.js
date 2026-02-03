import { ObjectId } from 'mongodb';
import connectToDB from '../config.js';

export const getAllDepartments = async (req, res) => {
    try {
        const { db } = await connectToDB();
        const departments = await db.collection('departments').find().toArray();
        res.json(departments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createDepartment = async (req, res) => {
    try {
        const { db } = await connectToDB();
        const result = await db.collection('departments').insertOne(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getDepartmentById = async (req, res) => {
    try {
        const { db } = await connectToDB();
        const department = await db.collection('departments').findOne({ _id: new ObjectId(req.params.id) });
        if (!department) return res.status(404).json({ error: "Department not found" });
        res.json(department);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const updateDepartment = async (req, res) => {
    try {
        const { db } = await connectToDB();
        const result = await db.collection('departments').findOneAndUpdate(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body },
            { returnDocument: 'after' }
        );
        if (!result.value) return res.status(404).json({ error: 'Department not found' });
        res.json(result.value);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteDepartment = async (req, res) => {
    try {
        const { db } = await connectToDB();
        const result = await db.collection('departments').deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).json({ error: 'Department not found' });
        res.json({ message: 'Department deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
