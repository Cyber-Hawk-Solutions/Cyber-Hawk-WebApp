"use strict";

// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var passportLocalMongoose = require("passport-local-mongoose"); 

// define the schema for our user model
var UserSchema = new mongoose.Schema({
    username:String,    
    password:String
    
}); 

UserSchema.plugin(passportLocalMongoose);  

//module.exports = mongoose.model("User",UserSchema);

// methods ======================
// generating a hash

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

UserSchema.virtual('id').get(function(){
    return this._id.toHexString();
  });
  
UserSchema.set('toObject', {
virtuals: true
});

UserSchema.methods.toJSON = function(){
var obj = this.toObject();
delete obj._id;
delete obj.__v;
return obj;
}
  

// create the model for users and expose it to our app
module.exports = mongoose.model('User', UserSchema);



/*
let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    company: String
});

module.exports = mongoose.model('user', userSchema);
*/
