"use strict";

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var pug = require('pug');

// var indexRouter = require('./routes/index');
var emailRouter = require('./routes/emails');

var app = express();

// view engine setup
app.set('view engine', 'pug');
app.set('views',  './views');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/services', function(req, res) {
  res.render('services');
});

app.get('/dashboard', function(req, res) {
  res.render('dashboard');
});

app.get('/app-estimate', function(req, res) {
  res.render('cost-estimator');
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.get('/pricing', function(req, res) {
  res.render('pricing');
});

app.use('/email', emailRouter); 

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
