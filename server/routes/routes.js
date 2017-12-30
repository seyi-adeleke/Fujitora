const Url = require('../models/url');
const id = require('idgen');

module.exports = (app, config) => {

    app.get('/', (req, res) => res.send('Hello World!'));

    app.post('/api/v1/shorten', (req, res) => {
        let shortened = config.baseUrl + id(3);
        const shortenedUrl  = new Url({
            long: req.body.url,
            short: shortened
        });
        shortenedUrl.save((error) => {
            if (error) {
                res.status(400).json({
                    message: "Error saving to db",
                    error,
                })
            } else {
                res.status(201).json({
                    long: req.body.url,
                    short: shortened,
                })
            }
        });
    });

    app.get('/:encoded_id', (req, res) => {
        //TODO
    });
};