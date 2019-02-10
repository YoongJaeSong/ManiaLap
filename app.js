const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const router = require('./routes/index');
const stories = require('./routes/stories');
require('dotenv').config();

const app = express();

console.log(process.env.NODE_ENV);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(bodyParser.urlencoded({extend: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/public')));
// cors를 해결하기 위한 미들웨어
app.use('/', (req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-Width");
    next();
});

app.use('/', router);
app.use('/stories', stories);


// catch 404 and forward to error handler
app.use((req, res, next) =>{
    next(new Error("Not Find: " + req.URL));
});


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.json({
        "error": err.message
    });
});

module.exports = app;