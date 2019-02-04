const multer = require('multer');
const path = require('path');
const {Story, StoryHashtags} = require('../../../models/index');


// imagae 저장시 어디에 저장할지 정하는 코드
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file != null)
            cb(null, __dirname + '/../../../uploads/');
    },
    filename: (req, file, cb) => {
        if(file != null) {
            const extension = path.extname(file.originalname);
            const basename = path.basename(file.originalname, extension);
            cb(null, basename + '-' + Date.now() + extension);
        }
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
exports.createStroy = async (req, res) => {
    // token에서 user_id를 받는다.
    const userId = 3;
    let story = {};
    let hashtags = [];

    story = req.body;
    story['userId'] = userId;
    if(req.file != null)
        story['image_url'] = req.file.filename;

    // result: create작업 후 생성된 객체를 담는 변수
    let result = await Story.create(story);

    /*
        result.dataValues.id: 생성된 객체에서 작업으로 생성된 id값을 의미
     */
    for (i in story.hashtagId) {
        let obj = {}
        obj.storyId = result.dataValues.id;
        obj.hashtagId = parseInt(story.hashtagId[i]);

        hashtags.push(obj);
    }

    for (i in hashtags) {
        StoryHashtags.create(hashtags[i]);
    }

    res.status(201);
    res.json({
        'msg': 'success'
    });
};

exports.createContent = (req, res) => {
    // token으로 user_id값을 받는다.
    let userId = 3;
    let storyId = 20;

    /*
        req.body에 담긴 데이터:   
    */
    let content = {};
    content = req.body;
    content['image'] = req.file;

    res.status(201);
    res.json({
        'msg': 'success',
        'content': content
    });
};