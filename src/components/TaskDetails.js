import React from 'react';
import './TaskDetails.css';

const TaskDetails = ({ task, onClose, onEdit }) => {
    if (!task) return null;

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'TODO':
                return '#ff9800';
            case 'IN_PROGRESS':
                return '#2196f3';
            case 'COMPLETED':
                return '#4caf50';
            default:
                return '#666';
        }
    };

    return (
        <div className="task-details-overlay" onClick={onClose}>
            <div className="task-details" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>
                
                <div className="details-header">
                    <h2>{task.title}</h2>
                </div>

                <div className="details-content">
                    <div className="details-section">
                        <h3>Description</h3>
                        <p>{task.description}</p>
                    </div>

                    <div className="details-section">
                        <h3>Status</h3>
                        <span 
                            className="status-badge"
                            style={{ backgroundColor: getStatusColor(task.status) }}
                        >
                            {task.status.replace('_', ' ')}
                        </span>
                    </div>

                    <div className="details-section">
                        <h3>Due Date</h3>
                        <p>{formatDate(task.dueDate)}</p>
                    </div>

                    {task.remarks && (
                        <div className="details-section">
                            <h3>Remarks</h3>
                            <p>{task.remarks}</p>
                        </div>
                    )}

                    <div className="details-section">
                        <h3>Created</h3>
                        <p>By: {task.createdBy}</p>
                        <p>On: {formatDate(task.createdOn)}</p>
                    </div>

                    <div className="details-section">
                        <h3>Last Updated</h3>
                        <p>By: {task.lastUpdatedBy}</p>
                        <p>On: {formatDate(task.lastUpdatedOn)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetails; 