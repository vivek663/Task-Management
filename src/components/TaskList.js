import React, { useState, useEffect } from 'react';
import TaskController from '../controllers/TaskController';
import TaskForm from './TaskForm';
import './TaskList.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const allTasks = await TaskController.getAllTasks();
        setTasks(allTasks);
    };

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim() === '') {
            await loadTasks();
        } else {
            const searchResults = await TaskController.searchTasks(query);
            setTasks(searchResults);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            await TaskController.deleteTask(id);
            await loadTasks();
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const handleFormSubmit = async (taskData) => {
        if (editingTask) {
            await TaskController.updateTask(editingTask.id, {
                ...taskData,
                lastUpdatedBy: 'Current User'
            });
        } else {
            await TaskController.createTask({
                ...taskData,
                createdBy: 'Current User'
            });
        }
        setShowForm(false);
        setEditingTask(null);
        await loadTasks();
    };

    return (
        <div className="task-list">
            <div className="task-list-header">
                <h2>Tasks</h2>
                <div className="task-list-actions">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="search-input"
                    />
                    <button onClick={() => setShowForm(true)} className="add-task-btn">
                        Add New Task
                    </button>
                </div>
            </div>

            {showForm && (
                <TaskForm
                    task={editingTask}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingTask(null);
                    }}
                />
            )}

            <div className="tasks-grid">
                {tasks.map(task => (
                    <div key={task.id} className="task-card">
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <div className="task-details">
                            <p className={`status ${task.status.toLowerCase()}`}>
                                {task.status}
                            </p>
                            <p className="due-date">Due: {task.dueDate}</p>
                        </div>
                        <div className="task-actions">
                            <button onClick={() => handleEdit(task)} className="edit-btn">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(task.id)} className="delete-btn">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList; 