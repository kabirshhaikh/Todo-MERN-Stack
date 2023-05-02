const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.TABLENAME, process.env.USERNAME, process.env.PASSWORD, { dialect: 'mysql', host: process.env.HOST });

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established sucessfully");
    })
    .catch((error) => {
        console.log('Unable to connect to the database', error);
    });

module.exports = sequelize;
