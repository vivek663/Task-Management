import React, { useState, useEffect } from 'react';
import TaskController from '../controllers/TaskController';
import TaskForm from './TaskForm';
import TaskDetails from './TaskDetails';
import './TaskList.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

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
        try {
            if (window.confirm('Are you sure you want to delete this task?')) {
                const success = await TaskController.deleteTask(id);
                if (success) {
                    await loadTasks();
                    // If the deleted task was selected, clear the selection
                    if (selectedTask && selectedTask.id === id) {
                        setSelectedTask(null);
                    }
                    // If the deleted task was being edited, clear the edit state
                    if (editingTask && editingTask.id === id) {
                        setEditingTask(null);
                        setShowForm(false);
                    }
                } else {
                    alert('Failed to delete task. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('An error occurred while deleting the task. Please try again.');
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
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

    const handleFormClose = () => {
        setShowForm(false);
        setEditingTask(null);
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
                    onClose={handleFormClose}
                />
            )}

            {selectedTask && (
                <TaskDetails
                    task={selectedTask}
                    onClose={() => setSelectedTask(null)}
                    onEdit={() => {
                        setEditingTask(selectedTask);
                        setShowForm(true);
                        setSelectedTask(null);
                    }}
                />
            )}

            <div className="tasks-grid">
                {tasks.map(task => (
                    <div 
                        key={task.id} 
                        className="task-card"
                        onClick={() => handleTaskClick(task)}
                    >
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <div className="task-details">
                            <span className={`status ${task.status.toLowerCase()}`}>
                                {task.status}
                            </span>
                            <span className="due-date">Due: {task.dueDate}</span>
                        </div>
                        <div className="task-actions">
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(task);
                                }} 
                                className="edit-btn"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(task.id);
                                }} 
                                className="delete-btn"
                            >
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