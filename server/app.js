const express = require('express');
const app = express();

require('./routes/routes')(app);

const env = process.env.NODE_ENV =  process.env.NODE_ENV || "development";
const config = require("./config")[env];

app.listen(config.port);