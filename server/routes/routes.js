const identifier = require('idgen');
//TODO - use custom id generator
const validUrl = require('valid-url');
//TODO - use regex instead
const Url = require('../models/url');
const handleMongoError = require('../utils/handleMongoError');

module.exports = (app, config) => {
    
    const updateHitCount = (url, res) => {
        return Url.findOne({
            id: url.id
        },  (error, url) => {
            if (url) {
                url.hits = url.hits + 1;
                url.save();
            }
            res.redirect(301, url.long);
        });
    };

    app.get(/^\/([\w=]+)$/, (req, res) => {
        Url.findOne({
            id: req.params[0]
        }, (error, url) => {
            if (error) {
                res.redirect(config.baseUrl);
            }
            if (url) {
                updateHitCount(url, res);
            }
            else {
                res.redirect(config.baseUrl);
            }
        })
    });

    app.post('/api/v1/shorten', (req, res) => {
        const id = identifier(3);
        const shortened = config.baseUrl + id;

        if (!validUrl.isUri(req.body.url)){
            res.status(400).json({
                message: 'Please input a valid url'
            });
        } else {
            const shortenedUrl  = new Url({
                long: req.body.url,
                short: shortened,
                id,
            });
            shortenedUrl.save((error, url) => {
                if (error) {
                    handleMongoError(error, req, res);
                }
                else {
                    res.status(201).json({
                        long: req.body.url,
                        short: shortened,
                        id,
                        message:'Your short URL',
                        hits: url.hits,
                    })
                }
            });
        }
    });

};
