var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var jangbooRouter = require('./routes/jangboo');
var adminsRouter = require('./routes/admins');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('!@#%%@#@'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser());



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/jangboo', jangbooRouter);
app.use('/admins', adminsRouter);




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


app.set('myPort', process.env.PORT || 2575);
app.listen(app.get('myPort'), function() {
    console.log("this app is listening --> http://localhost:" + app.get('myPort'))
})

module.exports = app;