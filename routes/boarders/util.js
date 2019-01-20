const fs = require('fs');

// thumbnail 내려주는 api
exports.boardlist = (req, res) => {
    let thumbnails = '/image.jpg';

    res.status(200);
    res.json({
        "msg": 'success',
        'thumbnail': thumbnails
    });
    // res.render('test', {url:thumbnails});
}

// 각 board의 이미지를 내려주는 기능
exports.imagelist = async (req, res) => {

    let standard = req.params.standard;
    let images = new Array();


    res.status(200);
    res.json({
        'msg': 'success',
        'images': images
    });

}



