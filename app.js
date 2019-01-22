const express = require('express');
const app = express();
const router = require('./router');
// const models = require('./models/index');

log = (req, res, next)=>{
    let method = req.method;
    let url = __dirname + req.url;

    console.log('[URL, METHOD] ' + url + ', ' + method);
    next(); // next()를 통해서 다음 api 실행
}

app.use('/', log);
app.use(express.static(__dirname + '/uploads'));

/*
models.sequelize.sync().then(()=>{
    console.log('DB연결 성공');
}).catch((err)=>{
    console.log("DB연결 실패");
    console.log(err);
})
*/

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
