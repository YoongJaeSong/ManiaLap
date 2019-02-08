const fs = require('fs');
const {insertStory, selectStories, selectStory, insertStoryHashtag} = require('../models/stories');

exports.createStory = async (req, res, next) => {
    // token에서 user_id를 받는다.
    const userId = 3;
    let storyObj = {};
    let url = "http://localhost:3100/uploads/";

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
        let result = await insertStory(storyObj);

        // story와 hashtag를 맵피하는 테이블 작업
        await insertStoryHashtag(result.id, storyObj.hashtagId);

        res.status(201);
        res.json({
            'msg': 'success'
        });
    }
    catch (err) {
        // 방금 업로드된 파일을 remove하는 작업
        if (req.file != null) {
            fs.unlink(__dirname + "/../../public/uploads/" + req.file.filename, (e) => {
                if (e) {
                    // res.status(400);
                    // res.json({
                    //     "msg": "File remove error",
                    //     "error": e.message
                    // });
                    next(e);
                }
            });
        }

        // res.status(503);
        // res.send({
        //     "msg": "DB error occurred",
        //     "error": err.message
        // });
        next(err);
    }
};

/*
    [GET] /stories
 */
exports.getStories = async (req, res, next) => {
    // 이전 page에서 해당 page로 접근할 때 user_id값을 가지고 넘어온다.
    let userId = 3;
    let page = 1;
    if (req.query.page != null)
        page = req.query.page;

    try {
        let stories = await selectStories(userId, page);

        res.status(200);
        res.json({
            "msg": 'success',
            "stories": stories
        });
    } catch (err) {
        // res.status(503);
        // res.json({
        //     "msg": "DB error occurred",
        //     "error": err.message
        // });
        next(err);
    }
};


/*
    [GET] /stories/:storyId

    해야 할 일
     (1) section에 대한 처리
*/
exports.getStory = async (req, res, next) => {

    let userId = 3;
    let storyId = req.params.storyId;
    let page = 1;
    if(req.query.page != null){
        page = req.query.page;
    }

    try {
        let contents = await selectStory(storyId, userId, page);

        res.status(200);
        res.json({
            'msg': 'success',
            'contents': contents
        });
    } catch (err) {
        // res.status(503);
        // res.json({
        //     "msg": "DB error occurred",
        //     "error": err.message
        // });
        next(err);
    }
};