const express = require('express');
const Task = require('../Model/Task');
const { post, get, search, put } = require('../Routes/routes');

const testFunction = (req, res, next) => {
    res.status(201).send("Hello world from Todo Controller");
}

const createTask = async (req, res, next) => {
    const { taskName, taskDescription, taskPriority } = req.body;
    console.log("From the body:" + taskName, taskDescription, taskPriority);
    if (!taskName || !taskDescription || !taskPriority) {
        res.status(400).send("Please fill all the fields");
    }

    try {
        const post = await Task.create({
            taskName, taskDescription, taskPriority
        })
            .then((result) => {
                res.status(201).json({ message: "Task created sucessfully", task: result });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    catch (error) {
        console.log(error);
    }
}

const getAllTask = async (req, res, next) => {
    let getTask
    try {
        getTask = await Task.findAll().then((result) => {
            return res.status(201).json({ message: "Found all the Task in Database", result: result });
        }).catch(err => console.log(err));
    }
    catch (error) {
        console.log(error);
    }

    if (!getTask) {
        return res.status(401).json({ message: "Unable to collect task from database" });
    }

}

const getSingleTask = async (req, res, next) => {
    const data = req.params.taskId;
    console.log("Task ki id", data);
    let task;
    try {
        task = await Task.findByPk(data).then((result) => {
            return res.status(201).json({ message: "Found a single Todo in Database", result: result });
        }).catch(err => console.log(err));
    }
    catch (error) {
        console.log(error);
    }
    if (!task) {
        return res.status(401).json({ message: "Unable to get a single task from database" });
    }
}

//Todo Update task - also decide which method to use Patch or Put?
//Implement Both

const updatePatch = async (req, res, next) => {
    const task = req.params.taskId;
    const { taskName, taskDescription, taskPriority } = req.body;
    console.log("Patch task:" + task);

    let searchTask;

    try {
        searchTask = await Task.findOne({
            where: {
                taskId: task
            }
        })
    }
    catch (error) {
        console.log(error);
    }

    if (!searchTask) {
        return res.status(400).json({ message: "Unable to find the task" });
    }
    else {
        let patchUpdate;

        try {
            patchUpdate = await Task.update({
                taskName: taskName == undefined || taskName == "" ? searchTask.taskName : taskName,
                taskDescription: taskDescription == undefined || taskDescription == "" ? searchTask.taskDescription : taskDescription,
                taskPriority: taskPriority == undefined || taskPriority == "" ? searchTask.taskPriority : taskPriority
            }, {
                where: {
                    taskId: task
                }
            });
        }
        catch (error) {
            console.log(error);
        }

        if (!patchUpdate) {
            return res.status(400).json({ message: "Unable to update task for the selected fields" });
        }
        else {
            return res.status(201).json({ message: "Updated the task", result: patchUpdate });
        }
    }
}


const updatePut = async (req, res, next) => {
    const { taskId } = req.params;
    const { taskName, taskDescription, taskPriority } = req.body;
    console.log("Task Id:" + taskId + "task name:" + taskName + "task desc:" + taskDescription + "task priority: " + taskPriority);

    let foundTask;

    try {
        foundTask = await Task.findOne({
            where: {
                taskId: taskId
            }
        });
    }
    catch (error) {
        console.log(error);
    }

    if (!foundTask) {
        return res.status(400).json({ message: "Unable to find the task" });
    }
    else {
        let putUpdate;
        try {
            putUpdate = await Task.update({
                taskName: taskName,
                taskDescription: taskDescription,
                taskPriority: taskPriority
            }, {
                where: {
                    taskId: taskId
                }
            });
        }
        catch (error) {
            console.log(error);
        }

        if (!putUpdate) {
            return res.status(400).json({ message: "Unable to update the task" });
        }
        else {
            return res.status(201).json({ message: "Updated the task", result: putUpdate });
        }
    }
}

module.exports = {
    createTask,
    getAllTask,
    getSingleTask,
    updatePatch,
    updatePut
}
