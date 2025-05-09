import Task from '../models/Task';

class TaskController {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    // Create
    createTask(taskData) {
        const newTask = new Task(
            Date.now().toString(),
            taskData.title,
            taskData.description,
            taskData.dueDate,
            taskData.status || 'Pending',
            taskData.remarks,
            new Date().toISOString(),
            new Date().toISOString(),
            taskData.createdBy,
            taskData.createdBy
        );
        this.tasks.push(newTask);
        this.saveTasks();
        return newTask;
    }

    // Read
    getAllTasks() {
        return this.tasks;
    }

    getTaskById(id) {
        return this.tasks.find(task => task.id === id);
    }

    // Update
    updateTask(id, taskData) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            this.tasks[taskIndex] = {
                ...this.tasks[taskIndex],
                ...taskData,
                lastUpdatedOn: new Date().toISOString(),
                lastUpdatedBy: taskData.lastUpdatedBy
            };
            this.saveTasks();
            return this.tasks[taskIndex];
        }
        return null;
    }

    // Delete
    deleteTask(id) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
            this.saveTasks();
            return true;
        }
        return false;
    }

    // Search
    searchTasks(query) {
        const searchTerm = query.toLowerCase();
        return this.tasks.filter(task => 
            task.title.toLowerCase().includes(searchTerm) ||
            task.description.toLowerCase().includes(searchTerm) ||
            task.status.toLowerCase().includes(searchTerm) ||
            task.remarks.toLowerCase().includes(searchTerm)
        );
    }

    // Helper method to save tasks to localStorage
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}

export default new TaskController(); 