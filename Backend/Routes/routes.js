const express = require('express');
const router = express.Router();
const todoController = require('../Controller/todo-controller');
const userController = require('../Controller/user-controller');
const userAuthenticaton = require('../Middlewear/user-middlewear');
const taskAuthentication = require('../Middlewear/todo-middlewear');

//User Routes:
router.post('/create-user', userController.createUser);
router.get('/get-all-users', userController.getAllUser);
router.get('/get-single-user/:userId', userController.getSingleUser);
router.post('/login', userController.login);

//Task Routes:
router.post('/create-task/:userId', todoController.createTask);
router.get('/get-all-task', todoController.getAllTask);
router.get('/get-single-task/:userId/:taskId', taskAuthentication, todoController.getSingleTask);
router.patch('/update-task/:userId/:taskId', taskAuthentication, todoController.updatePatch);
router.put('/update-task/:userId/:taskId', todoController.updatePut);
router.delete('/delete-task/:userId/:taskId', todoController.deleteTask);
router.get('/get-task-user/:userId', todoController.getAllTaskOfAUser);

module.exports = router;