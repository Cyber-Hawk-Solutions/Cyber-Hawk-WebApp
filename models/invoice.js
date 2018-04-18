"use strict";

let mongoose = require('mongoose');

let invoiceSchema = mongoose.Schema({
    userId: String,
    items: [],
    totalCost: Number,
    period: Number
});

module.exports = mongoose.model('invoice', invoiceSchema);
