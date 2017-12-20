const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = (config) => {
    mongoose.connect(config.db, {
        useMongoClient: true,
    }).then(
        () => {
            console.info('connection established')
        },
        error => {
            /** handle initial connection error */
        }
    );
};