import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import './TaskList.css'; // Ensure this is updated with new styles

const TaskList = ({ refresh }) => {
    const [tasks, setTasks] = useState([]);
    const [sortBy, setSortBy] = useState('title'); // Sort by 'title' or 'date'
    const [searchQuery, setSearchQuery] = useState(''); // Search query

    // Fetch tasks from the server
    const fetchTasks = async () => {
        const { data } = await axios.get('/api/tasks');
        // Sort tasks based on selected criteria (default to ascending order)
        const sortedTasks = data.sort((a, b) => {
            let comparison = 0;
            if (sortBy === 'title') {
                comparison = a.title.localeCompare(b.title);
            } else if (sortBy === 'date') {
                comparison = new Date(a.createdAt) - new Date(b.createdAt);
            }
            return comparison; // Default is ascending
        });
        setTasks(sortedTasks);
    };

    useEffect(() => {
        fetchTasks();
    }, [refresh, sortBy]);

    // Filter tasks based on the search query
    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="task-list">
            <div className="controls">
                <div className="control-group">
                    <label htmlFor="search">Search:</label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="control-group">
                    <label htmlFor="sort">Sort By:</label>
                    <select id="sort" onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                        <option value="title">Title</option>
                        <option value="date">Date</option>
                    </select>
                </div>
            </div>
            {filteredTasks.map((task) => (
                <TaskItem key={task._id} task={task} fetchTasks={fetchTasks} />
            ))}
        </div>
    );
};

export default TaskList;
