const express = require('express');
const path = require('path');
const router = require('./router');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const key = require('./key');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extend: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/uploads')));
app.use(session({
    secret: key.sessionKey,
    resave: false,
    saveUninitialized: true
}));
// cors를 해결하기 위한 미들웨어
app.use('/', (req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-Width");
    next();
});


app.get('/', (req, res)=>{
    res.status(200);
    res.json({
        'msg': 'success'
    });
});

app.use('/', router);

app.listen(3100, ()=>{
    console.log('Server Running Port 3100~~~');
});
