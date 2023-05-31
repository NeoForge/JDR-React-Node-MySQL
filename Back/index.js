const express = require('express');
const cors = require('cors');
const {startDBConnection} = require("./data/sequelize.js");


const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
startDBConnection().then(r => console.log("DB connected"));