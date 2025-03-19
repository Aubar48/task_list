const TaskService = require('../services/task.services');

class TaskController {
    async getTasks(req, res) {
        try {
            const tasks = await TaskService.getAllTasks();
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener las tareas' });
        }
    }

    async createTask(req, res) {
        const { title, area, completed } = req.body;
        if (!title) {
            return res.status(400).json({ error: 'El título es requerido' });
        }
        if (!area) {
            return res.status(400).json({ error: 'El area es requerida' });
        }

        try {
            const newTask = await TaskService.createTask(title, area, completed);
            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear la tarea' });
        }
    }

    async updateTask(req, res) {
        const { id } = req.params;
        const { completed } = req.body;

        try {
            const task = await TaskService.updateTask(id, completed);
            if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });

            res.json(task);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar la tarea' });
        }
    }

    async deleteTask(req, res) {
        const { id } = req.params;

        try {
            const task = await TaskService.deleteTask(id);
            if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar la tarea' });
        }
    }
}

module.exports = new TaskController();
