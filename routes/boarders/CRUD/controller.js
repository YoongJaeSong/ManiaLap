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
let uploads = exports.upload = upload.single('image');

// image uploads 요청
exports.createStroy = (req, res) => {

    let story = {};
    story = req.body;
    story['image'] = req.file;

    res.status(201);
    res.json({
        'msg': 'success',
        'story': story
    });
};

exports.createContent = (req, res) => {

    let content = {};
    content = req.body;
    content['image'] = req.file;

    res.status(201);
    res.json({
        'msg': 'success',
        'content': content
    });
};