import React, { useState, useEffect } from 'react';
import TaskController from '../controllers/TaskController';
import TaskForm from './TaskForm';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = () => {
        const allTasks = TaskController.getAllTasks();
        setTasks(allTasks);
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim() === '') {
            loadTasks();
        } else {
            const searchResults = TaskController.searchTasks(query);
            setTasks(searchResults);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            TaskController.deleteTask(id);
            loadTasks();
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const handleFormSubmit = (taskData) => {
        if (editingTask) {
            TaskController.updateTask(editingTask.id, {
                ...taskData,
                lastUpdatedBy: 'Current User'
            });
        } else {
            TaskController.createTask({
                ...taskData,
                createdBy: 'Current User'
            });
        }
        setShowForm(false);
        setEditingTask(null);
        loadTasks();
    };

    return (
        <div className="task-list-container">
            <div className="task-header">
                <h2>Task Management</h2>
                <div className="task-actions">
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
                            <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                            <p><strong>Status:</strong> {task.status}</p>
                            <p><strong>Remarks:</strong> {task.remarks}</p>
                            <p><strong>Created:</strong> {new Date(task.createdOn).toLocaleString()}</p>
                            <p><strong>Created By:</strong> {task.createdBy}</p>
                            <p><strong>Last Updated:</strong> {new Date(task.lastUpdatedOn).toLocaleString()}</p>
                            <p><strong>Last Updated By:</strong> {task.lastUpdatedBy}</p>
                        </div>
                        <div className="task-actions">
                            <button onClick={() => handleEdit(task)} className="edit-btn">Edit</button>
                            <button onClick={() => handleDelete(task.id)} className="delete-btn">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList; 