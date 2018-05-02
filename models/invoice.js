"use strict";

let mongoose = require('mongoose');

let InvoiceSchema = mongoose.Schema({
    userId: String,
    services: [],
    cost: Number,
    period: Number
});

InvoiceSchema.virtual('id').get(function(){
    return this._id.toHexString();
  });
  
  InvoiceSchema.set('toObject', {
    virtuals: true
  });
  
  InvoiceSchema.methods.toJSON = function(){
    var obj = this.toObject();
    delete obj._id;
    delete obj.__v;
    return obj;
  }
  
module.exports = mongoose.model('invoice', InvoiceSchema);
