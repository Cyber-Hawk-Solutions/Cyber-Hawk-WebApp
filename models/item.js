"use strict";

let mongoose = require('mongoose');

let itemSchema = mongoose.Schema({
    name: String,
    cost: Number,
    period: Number
});

module.exports = mongoose.model('item', itemSchema);