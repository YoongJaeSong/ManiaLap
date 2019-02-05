const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {story, storyHashtags, content} = require('../../../models/index');


// imagae 저장시 어디에 저장할지 정하는 코드
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file != null)
            cb(null, __dirname + '/../../../uploads/');
    },
    filename: (req, file, cb) => {
        if (file != null) {
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
exports.upload = upload.single('image');


/*
    story등록 작업 중 error가 발생하면 업로드된 image를 다시 삭제하는 방식
    try/catch문을 활용해 처리했습니다.

    해야할 것
     (1) 이미지 사이즈 제한을 어떻게 할 것인지
*/
exports.createStroy = async (req, res) => {
    // token에서 user_id를 받는다.
    const userId = 3;
    let storyObj = {};
    let hashtags = [];
    let url = "http://kalin.iptime.org:3100/"

    /*
        body 내용
         - required: title(string), description(string), hashtageId(array-string or int)
         - Not required: image
    */
    storyObj = req.body;
    storyObj['user_id'] = userId;
    if (req.file != null) {
        storyObj['image_url'] = url + req.file.filename;
    }

    try {
        // result: create작업 후 생성된 객체를 담는 변수
        let result = await story.create(storyObj);

        /*
            result.dataValues.id: 생성된 객체에서 작업으로 생성된 id값을 의미
            기존의 문자를 숫자로 바꾸는 작업을 제거 문자열로 해도 정상 작동
        */
        for (i in storyObj.hashtagId) {
            storyHashtags.create({
                story_id: result.dataValues.id,
                hashtag_id: storyObj.hashtagId[i]
            });
        }

        res.status(201);
        res.json({
            'msg': 'success'
        });
    }
    catch (err) {
        // 방금 업로드된 파일을 remove하는 작업
        fs.unlink(__dirname + "/../../../uploads/" + req.file.filename, (e) => {
            if (e) {
                res.status(400);
                res.send(e);
            }
        });

        res.status(400);
        res.send(err.errors[0].message);
    }
};


/*
    해야 할 것
     (1) insert 작업이 정상 수행을 하지만 결과가 없을 때 catch로 넘겨주는 작업
*/
exports.createContent = async (req, res) => {
    // token으로 user_id값을 받는다.
    let userId = 3;
    let storyId = 6;
    let url = "http://kalin.iptime.org:3100/"

    /*
        req.body에 담긴 데이터
        title, description, image_url
    */
    let contentObj = {};
    contentObj = req.body;
    contentObj['user_id'] = userId;
    contentObj['story_id'] = req.params.storyId;


    try {
        // image_url은 필수 데이터 이기 때문
        contentObj['image_url'] = url + req.file.filename;

        await content.create(contentObj);

        res.status(201);
        res.json({
            'msg': 'success'
        });
    } catch (err) {
        fs.unlink(__dirname + "/../../../uploads/" + req.file.filename, (e) => {
            if (e) {
                res.status(400);
                res.send(e);
            }
        });

        res.status(400);
        res.send(err.errors);
    }
};