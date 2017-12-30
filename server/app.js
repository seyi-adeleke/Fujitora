const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const env = process.env.NODE_ENV =  process.env.NODE_ENV || 'development';
const config = require("./config")[env];


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

require('./routes/routes')(app, config);
require('./mongo/db')(config);

app.listen(config.port);