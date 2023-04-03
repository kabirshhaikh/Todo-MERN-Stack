const Sequelize = require('sequelize');

const sequelize = new Sequelize('Todo', 'root', 'Kabir@123', { dialect: 'mysql', host: 'localhost' });

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established sucessfully");
    })
    .catch((error) => {
        console.log('Unable to connect to the database', error);
    });

module.exports = sequelize;