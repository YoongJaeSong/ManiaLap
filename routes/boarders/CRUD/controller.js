const multer = require('multer');
const path = require('path');
const gm = require('gm');

// imagae 저장시 어디에 저장할지 정하는 코드
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // 서버에서 실행할 때 경로를 제대로 잡지 못해 절대경로로 잡아줬다.
        // 수정이 필요한 부분
        cb(null, __dirname + '/../../../uploads/');
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const basename = path.basename(file.originalname, extension);
        // 정책과 DB가 설계되면 이미지 이름 변경해야 한다.
        cb(null, basename + '-' + Date.now() + extension);
    }

});

// image의 제약을 할 수 있는 코드
// 현재는 아무것도 없다.
const upload = multer({
    storage: storage,
    limits: {}
});

// upload.single -> 파일 한개만
// upload.array -> 여러개의 파일을 받을 수 있다.
let uploads = exports.upload = upload.array('images', 10);

// image uploads 요청
exports.boardUpload = (req, res) => {

    // upload된 file들은 req.fies로 받을 수 있다.
    let images = req.files;

    res.status(201);
    res.json({
        'msg': 'success',
        'files': req.files
    });
}




url = __dirname + '/../../../uploads/';
exports.createThumbnail = async (req, res) => {

    //이미지를 붙이는 작업
    // let img3 = await gm(url + 'test1.jpg')
    //     .append(url + 'test2.jpg')
    //     .thumb(400, 400, url + 'test3.jpg', 100, (err) => {
    //         if (err) {
    //             console.log('err: ' + err);
    //             res.status(404);
    //             res.json({
    //                 'msg': err
    //             });
    //         }
    //     });

    res.status(200);
    res.json({
        'msg': 'success'
    });
}
