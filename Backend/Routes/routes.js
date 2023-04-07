const express = require('express');
const router = express.Router();
const todoController = require('../Controller/todo-controller');

router.post('/create-task', todoController.createTask);
router.get('/get-all-task', todoController.getAllTask);
router.get('/get-single-task/:taskId', todoController.getSingleTask);
router.patch('/update-task/:taskId', todoController.updatePatch);
router.put('/update-task/:taskId', todoController.updatePut);
router.delete('/delete-task/:taskId', todoController.deleteTask);

module.exports = router;