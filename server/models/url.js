const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
    long: {
        type: String,
        required: true,
        unique: true,
    },
    short: {
        type: String,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Url', urlSchema);