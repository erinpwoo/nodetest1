var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//New Code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost27017/nodetest1'); //27017 default port for database

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express(); //This one's important. It instantiates Express and assigns our app variable to it

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Make our db accessible to our router
app.use(function(req, res, next) {
  req.db = db;
  next();
});

//app.use statements provide functionality that rest of app can use (middleware for Express)
//comes before route statements so route can use them
app.use('/', indexRouter); //different routes-- for now we'll ignore usersRouter
app.use('/users', usersRouter);

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
