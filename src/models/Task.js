class Task {
    constructor(id, title, description, dueDate, status, remarks, createdOn, lastUpdatedOn, createdBy, lastUpdatedBy) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
        this.remarks = remarks;
        this.createdOn = createdOn;
        this.lastUpdatedOn = lastUpdatedOn;
        this.createdBy = createdBy;
        this.lastUpdatedBy = lastUpdatedBy;
    }
}

export default Task; 