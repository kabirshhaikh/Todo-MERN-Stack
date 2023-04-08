const express = require('express');
const router = express.Router();
const todoController = require('../Controller/todo-controller');
const userController = require('../Controller/user-controller');
const userAuthenticaton = require('../Middlewear/user-middlewear');

//User Routes:
router.post('/create-user', userController.createUser);
router.get('/get-all-users', userController.getAllUser);
router.get('/get-single-user/:userId', userController.getSingleUser);

//Task Routes:
router.post('/create-task/:userId', userAuthenticaton, todoController.createTask);
router.get('/get-all-task', todoController.getAllTask);
router.get('/get-single-task/:taskId', todoController.getSingleTask);
router.patch('/update-task/:taskId', todoController.updatePatch);
router.put('/update-task/:taskId', todoController.updatePut);
router.delete('/delete-task/:taskId', todoController.deleteTask);

module.exports = router;