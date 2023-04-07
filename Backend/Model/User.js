const { Sequelize } = require('sequelize');
const sequelize = require('../Util/todoDatabase');

const User = sequelize.define('user', {
    userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userFirstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    userLastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userEmail: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userPassword: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

User.sync()
    .then(() => {
        console.log("User's table created sucessfully");
    })
    .catch((error) => {
        console.log("Unable to create the User's table", error);
    });

module.exports = User