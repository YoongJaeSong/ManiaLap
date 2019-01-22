const multer = require('multer');
const path = require('path');
const gm = require('gm');

// imagae 저장시 어디에 저장할지 정하는 코드
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/../../../uploads/');
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const basename = path.basename(file.originalname, extension);
        cb(null, basename + '-' + Date.now() + extension);
    }

});

// image의 제약을 할 수 있는 코드
const upload = multer({
    storage: storage,
    limits: {
        fileSize: '10kb'
    }
});

let uploads = exports.upload = upload.array('images', 10);

// image uploads 요청
exports.boardUpload = (req, res) => {

    // upload된 file들은 req.fies로 받을 수 있다.
    let images = req.files;
    for (let id of images) {
        console.log(id);
    }

    res.status(201);
    res.json({
        'msg': 'success',
        'files': req.files
    });
}

// url = __dirname + '\\image.png';
// url = __dirname + '\\..\\..\\../uploads\\image2.png'
url = __dirname + '/../../../uploads/';
exports.createThumbnail = async (req, res) => {

    //이미지를 붙이는 작업
    // let img = await gm(url + 'image.jpg')
    //     .append(url + 'image2.png', true)
    //     .thumb(100, 100, url + 'test1.jpg', 100, (err) => {
    //         if (err) {
    //             console.log('err: ' + err);
    //             res.status(404);
    //             res.json({
    //                 'msg': err
    //             });
    //         }
    //     });
    //
    // let img2 = await gm(url + 'image3.jpg')
    //     .append(url + 'image4.jpg', true)
    //     .thumb(100, 100, url + 'test2.jpg', 100, (err) => {
    //         if (err) {
    //             console.log('err: ' + err);
    //             res.status(404);
    //             res.json({
    //                 'msg': err
    //             });
    //         }
    //     });

    let img3 = await gm(url + 'test1.jpg')
        .append(url + 'test2.jpg')
        .thumb(400, 400, url + 'test3.jpg', 100, (err) => {
            if (err) {
                console.log('err: ' + err);
                res.status(404);
                res.json({
                    'msg': err
                });
            }
        });

    // console.log(img.outname);

    res.status(200);
    res.json({
        'msg': 'success'
    });

}

exports.test = (req, res) => {
    url = '/image.jpg'
    res.send('<img src=?>', url);
}
