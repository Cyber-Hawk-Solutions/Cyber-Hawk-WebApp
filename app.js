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


// var indexRouter = require('./routes/index');
var emailRouter = require('./routes/emails');

var app = express();

// view engine setup
app.set('view engine', 'pug');
app.set('views', './views');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// required for passport

app.use(session({ secret: 'cyberHawkEatEagle' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


require('./config/passport')(passport); // pass passport for configuration

//routes
require('./routes/route.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.get('/', function(req, res) {
  res.render('index.pug');
});

app.get('/services', function(req, res) {
  res.render('services');
});

app.get('/app-estimate', function(req, res) {
  res.render('cost-estimator');
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.get('/signup', function(req, res) {
  res.render('signup');
});

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
