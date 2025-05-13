import React, { useState, useEffect } from 'react';
import './TaskForm.css';

const TaskForm = ({ task, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        status: 'TODO',
        remarks: '',
        createdBy: '',
        lastUpdatedBy: ''
    });

    useEffect(() => {
        if (task) {
            setFormData({
                ...task,
                lastUpdatedBy: '' // Clear lastUpdatedBy when editing
            });
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString();
        
        const submitData = {
            ...formData,
            lastUpdatedOn: currentDate
        };

        if (!task) {
            // For new task
            submitData.createdOn = currentDate;
            submitData.createdBy = formData.createdBy;
            submitData.lastUpdatedBy = formData.createdBy;
        } else {
            // For updating task
            submitData.createdOn = task.createdOn;
            submitData.createdBy = task.createdBy;
            submitData.lastUpdatedBy = formData.lastUpdatedBy;
        }

        onSubmit(submitData);
        onClose(); // Close the form after submission
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="task-form-overlay" onClick={handleClose}>
            <div className="task-form" onClick={e => e.stopPropagation()}>
                <div className="form-header">
                    <h2>{task ? 'Edit Task' : 'Create New Task'}</h2>
                    <button className="close-btn" onClick={handleClose}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Task Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="Enter task title"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            placeholder="Enter task description"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dueDate">Due Date</label>
                        <input
                            type="datetime-local"
                            id="dueDate"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="TODO">To Do</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="COMPLETED">Completed</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="remarks">Remarks</label>
                        <textarea
                            id="remarks"
                            name="remarks"
                            value={formData.remarks}
                            onChange={handleChange}
                            placeholder="Enter any additional remarks"
                        />
                    </div>

                    {!task && (
                        <div className="form-group">
                            <label htmlFor="createdBy">Created By</label>
                            <input
                                type="text"
                                id="createdBy"
                                name="createdBy"
                                value={formData.createdBy}
                                onChange={handleChange}
                                required
                                placeholder="Enter your name"
                            />
                        </div>
                    )}

                    {task && (
                        <div className="form-group">
                            <label htmlFor="lastUpdatedBy">Updated By</label>
                            <input
                                type="text"
                                id="lastUpdatedBy"
                                name="lastUpdatedBy"
                                value={formData.lastUpdatedBy}
                                onChange={handleChange}
                                required
                                placeholder="Enter your name"
                            />
                        </div>
                    )}

                    <div className="form-actions">
                        <button type="submit" className="submit-btn">
                            {task ? 'Update Task' : 'Create Task'}
                        </button>
                        <button type="button" className="cancel-btn" onClick={handleClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm; 