const { Sequelize } = require('sequelize');
const sequelize = require('../Util/todoDatabase');

const Task = sequelize.define('task', {
    taskId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    taskName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    taskDescription: {
        type: Sequelize.STRING,
        allowNull: false
    },
    taskPriority: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Task.sync()
    .then(() => {
        console.log("Task's table created sucessfully");
    })
    .catch((error) => {
        console.log('Unable to create the Task table', error);
    });

module.exports = Task;