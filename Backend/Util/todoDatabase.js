const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize('todomern', 'admin', 'kabirshaikh', { dialect: 'mysql', host: 'todo-mern.cipmk4rzmoih.us-east-1.rds.amazonaws.com' });

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established sucessfully");
    })
    .catch((error) => {
        console.log('Unable to connect to the database', error);
    });

module.exports = sequelize;
