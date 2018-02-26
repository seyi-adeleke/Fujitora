const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
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
    hits: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Url', urlSchema);
