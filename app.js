"use strict";

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var pug = require('pug');
var port = process.env.PORT || 3000;
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

var configDB = require('./config/database.js');

//mongoose.connect(configDB.url);

//var indexRouter = require('./routes/index');
var route = require('./routes/route');

var app = express();

// view engine setup
app.set('view engine', 'pug');
app.set('views',  './views');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
/*
app.use(session({ secret: 'cyberHawkEatEagle' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
*/

//routes
require('./routes/route.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.get('/', function(req, res) {
  res.render('index.pug');
});

app.get('/services', function(req, res) {
  res.render('single-page-header');
});

app.get('/dashboard', function(req, res) {
  res.render('dashboard');
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.get('/dashboard', isLoggedIn, function(req, res) {
  res.render('dashboard', {
      user : req.user // get the user out of session and pass to template
  });
});

// =====================================
// LOGOUT ==============================
// =====================================
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
//};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

// if user is authenticated in the session, carry on 
if (req.isAuthenticated())
  return next();


// if they aren't redirect them to the home page
res.redirect('/login');
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
