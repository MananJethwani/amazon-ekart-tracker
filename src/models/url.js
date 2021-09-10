const mongoose = require("mongoose");

const urlSchhema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    imageUrl: {
        type:String,
        required: true,
    },
    values: [Number],
    dates: [Date],
    created_at: {
        type: Date
    },
    minimum_value: {
        type: Number,
        required: true
    }
});

const Url = mongoose.model('url', urlSchhema);

exports.Url = Url;