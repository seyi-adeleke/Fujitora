const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const webpack = require('webpack');

const app = express();

const env = process.env.NODE_ENV =  process.env.NODE_ENV || 'development';
const config = require("./config")[env];
const indexPath = path.join(__dirname, '../public/index.html');


// if (env === 'development') {
//     const webpackConfig = require('../webpack.config');
//     const compiler = webpack(webpackConfig);
//     app.use(require('webpack-dev-middleware')(compiler, {
//         noInfo: true, publicPath: webpackConfig.output.publicPath
//     }));
//     app.use(require('webpack-hot-middleware')(compiler));
// }


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true,
}));


require('./routes/routes')(app, config);
require('./mongo/db')(config);


app.use(express.static('public'));
app.use('*', (req, res) => {
    res.sendFile(indexPath);
});


app.listen(config.port);
