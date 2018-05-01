"use strict";

let mongoose = require('mongoose');

let EstimateSchema = mongoose.Schema({
    email: String,
    services: [],
    cost: Number,
    period: Number
});

EstimateSchema.virtual('id').get(function(){
    return this._id.toHexString();
  });
  
  EstimateSchema.set('toObject', {
    virtuals: true
  });
  
  EstimateSchema.methods.toJSON = function(){
    var obj = this.toObject();
    delete obj._id;
    delete obj.__v;
    return obj;
  }
  

module.exports = mongoose.model('estimate', EstimateSchema);
