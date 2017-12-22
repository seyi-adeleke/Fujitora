const Url = require('../models/url');

module.exports = (app) => {
    app.get('/', (req, res) => res.send('Hello World!'));

    app.post('/api/v1/shorten', (req, res) => {
        //TODO
    });

    app.get('/:encoded_id', (req, res) => {
        //TODO
    });
};