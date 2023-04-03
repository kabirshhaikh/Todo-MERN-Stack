const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./Routes/routes');
const sequelize = require('./Util/todoDatabase');
const Task = require('./Model/Task');

app.use(bodyParser.json());
app.use(router);

sequelize.sync({ force: false }).then((req) => {
    app.listen(8000, () => {
        console.log("Server running at localhost:8000");
    })
})
    .catch(err => console.log(err));

