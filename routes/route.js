"use strict";

var User = require('../models/user');
var Invoice = require('../models/invoice');


module.exports = function(app, passport) {

  // =====================================
  // LOGIN ===============================
  // =====================================

  // process the login form

  //login route
  app.get('/login', function(req, res) {
    res.render('login');
  });

  app.post("/login", function(req,res){
    passport.authenticate('local')(req, res, function(){
      res.redirect("/dashboard"); //once the user sign up
      console.log(res);
    }); 
  });
/*
  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', function(req, res) {

      // render the page and pass in any flash data if it exists
      res.render('signup.ejs', { message: req.flash('signupMessage') });
  });
*/

  // process the signup form
  // app.post('/signup', do all our passport stuff here);

  // =====================================
  // PROFILE SECTION =====================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/dashboard', isLoggedIn, function(req, res) {
    let user = req.user;
    Invoice.find({userId: user.id}).sort({id: 'descending'}).exec(function(err, invoices){
      res.render('dashboard', {
        debug: true,
        invoices: invoices,
        user : req.user // get the user out of session and pass to template
      });
    })
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  //handling user sign up
app.get('/signup', function(req, res) {
  res.render('signup');
});

app.post("/signup", function(req, res){
  User.register(new User({username:req.body.username}),req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render('signup');
    } //user stragety
    passport.authenticate("local")(req, res, function(){
        res.redirect("/dashboard"); //once the user sign up
    }); 
  });
});


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
      return next();
    

  // if they aren't redirect them to the home page
  res.redirect('/login');
}



};