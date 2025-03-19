const Task = require('../models/task.models');

class TaskService {
  async getAllTasks() {
    return await Task.findAll();
  }

  async createTask(title, area, completed) {
    return await Task.create({ title, area, completed });
  }

  async updateTask(id, completed) {
    const task = await Task.findByPk(id);
    if (!task) return null;
    
    task.completed = completed;
    await task.save();
    return task;
  }

  async deleteTask(id) {
    const task = await Task.findByPk(id);
    if (!task) return null;

    await task.destroy();
    return task;
  }
}

module.exports = new TaskService();
