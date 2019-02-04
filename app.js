const express = require('express');
const router = require('./router');
const session = require('express-session');
const bodyParser = require('body-parser');
const key = require('./key');

const app = express();

app.use(bodyParser.urlencoded({extend: true}));
app.use(bodyParser.json());
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
app.use('/', log = (req, res, next)=>{
    let method = req.method;
    let url = __dirname + req.url;

    console.log('[URL, METHOD] ' + url + ', ' + method);
    next(); // next()를 통해서 다음 api 실행
});
app.use(express.static(__dirname + '/uploads'));


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
