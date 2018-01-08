const Url = require('../models/url');

module.exports = (error, req, res) => {
    if (error.code === 11000) {
        Url.findOne({
            long: req.body.url,
        }, (err, url) => {
            res.status(200).json({
                short: url.short,
                message:'This url has been saved already!',
            })
        })
    }
};