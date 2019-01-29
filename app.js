const express = require('express');
const router = require('./router');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

const app = express();

// cors를 해결하기 위한 미들웨어
app.use('/', (req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-Width");
    next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

log = (req, res, next)=>{
    let method = req.method;
    let url = __dirname + req.url;

    console.log('[URL, METHOD] ' + url + ', ' + method);
    next(); // next()를 통해서 다음 api 실행
}

app.use('/', log);
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
