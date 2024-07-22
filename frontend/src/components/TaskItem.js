import React from 'react';
import axios from 'axios';
import './TaskItem.css';

const TaskItem = ({ task, fetchTasks }) => {
    const toggleComplete = async () => {
        await axios.put(`/api/tasks/${task._id}`, { ...task, completed: !task.completed });
        fetchTasks();
    };

    const deleteTask = async () => {
        await axios.delete(`/api/tasks/${task._id}`);
        fetchTasks();
    };

    return (
        <div className="task-item">
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
            </span>
            <button onClick={toggleComplete}>
                {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={deleteTask}>Delete</button>
        </div>
    );
};

export default TaskItem;
