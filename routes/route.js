"use strict";

var User = require('../models/user');
var Invoice = require('../models/invoice');


module.exports = function(app, passport) {

  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  //app.get('/login', function(req, res) {

      // render the page and pass in any flash data if it exists
 //     res.render('login.ejs', { message: req.flash('loginMessage') }); 
//  });

  // process the login form
   app.post('/login', function(req,res){
        console.log(req);
        res.render('login');
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

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/dashboard', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
      return next();
    

  // if they aren't redirect them to the home page
  res.redirect('/login');
}

// process the signup form


