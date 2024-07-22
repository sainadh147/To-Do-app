const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Task Schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model('Task', taskSchema);

// Task Routes and Controller Functions
router.get('/api/tasks', async (req, res) => {
    const tasks = await Task.find({});
    res.json(tasks);
});

router.post('/api/tasks', async (req, res) => {
    const { title } = req.body;
    const task = new Task({ title });
    await task.save();
    res.status(201).json(task);
});

router.put('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    const task = await Task.findByIdAndUpdate(id, { title, completed }, { new: true });
    res.json(task);
});

router.delete('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(204).end();
});

module.exports = router;
