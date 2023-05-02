const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize('bfcsqqenowpthmlam2ty', 'uwwrowokua2uw6uh', 'wVocFA1R2xwM9SLlT59k', { dialect: 'mysql', host: 'bfcsqqenowpthmlam2ty-mysql.services.clever-cloud.com' });

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established sucessfully");
    })
    .catch((error) => {
        console.log('Unable to connect to the database', error);
    });

module.exports = sequelize;