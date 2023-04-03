const express = require('express');
const router = express.Router();
const todoController = require('../Controller/todo-controller');

router.post('/create-task', todoController.createTask);

module.exports = router;