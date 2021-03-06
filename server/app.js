var createError = require('http-errors');
var express     = require('express');
var path        = require('path');
var logger      = require('morgan');
var cors        = require('cors');

/**
* 
* DB Connection
*
**/

const db = require('./config/database');
db.connect();


/**
* 
* Routes
*
**/


const posts = require('./routes/posts');
const users = require('./routes/users');
const auth = require('./routes/auth');


var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.json({});
});


/**
* 
* URls
*
**/

app.use('/', auth);
app.use('/users', users)
app.use('/posts', posts)



/**
* 
* Catch 404 and forward to error handler
*
**/

app.use(function(req, res, next) {
  next(createError(404));
});


/**
* 
* Error Handler
*
**/

app.use(function(err, req, res, next) {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
