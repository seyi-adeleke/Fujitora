const express = require('express');
const app = express();

const env = process.env.NODE_ENV =  process.env.NODE_ENV || 'development';
const config = require("./config")[env];

require('./routes/routes')(app);
require('./mongo/db')(config);

app.listen(config.port);