const express = require('express');
const Task = require('../Model/Task');
const { post } = require('../Routes/routes');

const testFunction = (req, res, next) => {
    res.status(201).send("Hello world from Todo Controller");
}

const createTask = async (req, res, next) => {
    const { taskName, taskDescription, taskPriority } = req.body;
    console.log("From the body:" +taskName, taskDescription, taskPriority);
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

module.exports = {
    createTask
}