const express = require('express');
const TaskController = require('../controller/task.controller');

const router = express.Router();

router.get('/', TaskController.getTasks);
router.post('/', TaskController.createTask);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

module.exports = router;
