import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css'; // Import the stylesheet

const App = () => {
    const [refresh, setRefresh] = useState(false);

    const fetchTasks = async () => {
        setRefresh(!refresh);
    };

    return (
        <div className="app-container">
            <h1 className="heading">To-Do List</h1>
            <TaskForm fetchTasks={fetchTasks} />
            <TaskList refresh={refresh} />
        </div>
    );
};

export default App;
