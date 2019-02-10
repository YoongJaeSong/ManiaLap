const key = require('../../key');

const authData = {"pw": key.password};

exports.loginApi = (req, res) => {
    res.send("<form action='/swagger-ui' method='get'>" +
        "비밀번호<input type='password' name='pw' id='pw'>" +
        "<button type='submit'>확인</button> " +
        "</form>");
};

exports.checkSession = (req, res, next) => {
    let pw = req.query.pw;

    if(pw == authData.pw){
        req.session.isLogin = true;
        next();
    }else{
        req.session.isLogin = false;
        res.redirect('/api-docs');
    }
};