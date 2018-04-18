"use strict";

let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    company: String
});

module.exports = mongoose.model('user', userSchema);