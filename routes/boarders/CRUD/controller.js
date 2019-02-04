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
let uploads = exports.upload = upload.single('image');

/*
    upload과정에서 error가 발생하면 업로드된 image를 다시 삭제하는 방식
    try/catch문을 활용해 처리했습니다.
*/
exports.createStroy = async (req, res) => {
    // token에서 user_id를 받는다.
    const userId = 3;
    let storyObj = {};
    let hashtags = [];

    storyObj = req.body;
    storyObj['user_id'] = userId;
    storyObj['image_url'] = req.file.filename;

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
        fs.unlink(__dirname + "/../../../uploads/" + req.file.filename, (e)=>{
            if(e) {
                res.status(400);
                res.send(e);
            }
        });

        res.status(400);
        res.send(err.errors[0].message);
    }
};

exports.createContent = async (req, res) => {
    // token으로 user_id값을 받는다.
    let userId = 3;
    let storyId = 1;

    /*
        req.body에 담긴 데이터
        title, description, image_url
    */
    let contentObj = {};
    contentObj = req.body;
    contentObj['image_url'] = req.file.filename;
    contentObj['user_id'] = userId;
    contentObj['story_id'] = storyId;


    try {
        await content.create(contentObj);

        res.status(201);
        res.json({
            'msg': 'success',
            'content': content
        });
    } catch (e) {
        fs.unlink(__dirname + "/../../../uploads/" + req.file.filename, (e)=>{
            if(e) {
                res.status(400);
                res.send(e);
            }
        });

        res.status(400);
        res.send(err.errors[0].message);
    }
};