import Task from '../models/Task';

class TaskController {
    constructor() {
        // Initialize with test data
        this.tasks = [
            new Task(
                1,
                'Complete Project Documentation',
                'Write comprehensive documentation for the new feature',
                '2024-03-20',
                'IN_PROGRESS',
                'Need to include API endpoints',
                '2024-03-15',
                '2024-03-15',
                'John Doe',
                'John Doe'
            ),
            new Task(
                2,
                'Code Review',
                'Review pull requests from team members',
                '2024-03-18',
                'TODO',
                'Priority: High',
                '2024-03-15',
                '2024-03-15',
                'Jane Smith',
                'Jane Smith'
            ),
            new Task(
                3,
                'Bug Fixes',
                'Fix reported bugs in production',
                '2024-03-17',
                'COMPLETED',
                'All critical bugs resolved',
                '2024-03-14',
                '2024-03-15',
                'Mike Johnson',
                'Mike Johnson'
            )
        ];
    }

    // Create
    async createTask(taskData) {
        const newTask = new Task(
            this.tasks.length + 1,
            taskData.title,
            taskData.description,
            taskData.dueDate,
            taskData.status || 'TODO',
            taskData.remarks || '',
            new Date().toISOString().split('T')[0],
            new Date().toISOString().split('T')[0],
            taskData.createdBy,
            taskData.createdBy
        );
        this.tasks.push(newTask);
        return newTask;
    }

    // Read
    async getAllTasks() {
        return this.tasks;
    }

    async getTaskById(id) {
        return this.tasks.find(task => task.id === id);
    }

    // Update
    async updateTask(id, taskData) {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            this.tasks[index] = {
                ...this.tasks[index],
                ...taskData,
                lastUpdatedOn: new Date().toISOString().split('T')[0]
            };
            return this.tasks[index];
        }
        throw new Error('Task not found');
    }

    // Delete
    async deleteTask(id) {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            return true;
        }
        throw new Error('Task not found');
    }

    // Search
    async searchTasks(query) {
        const searchTerm = query.toLowerCase();
        return this.tasks.filter(task => 
            task.title.toLowerCase().includes(searchTerm) ||
            task.description.toLowerCase().includes(searchTerm) ||
            task.remarks.toLowerCase().includes(searchTerm)
        );
    }
}

export default new TaskController(); 