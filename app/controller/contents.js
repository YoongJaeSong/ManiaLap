const fs = require('fs');
const {insertContent, selectContent} = require('../models/contents');

/*
    해야 할 것
     (1) insert 작업이 정상 수행을 하지만 결과가 없을 때 catch로 넘겨주는 작업
*/
exports.createContent = async (req, res, next) => {
    // token으로 user_id값을 받는다.
    let userId = 3;
    let url = "http://localhost:3100/uploads/";

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
        if(req.file != null) {
            contentObj['image_url'] = url + req.file.filename;
        }else{
            throw new Error("No File");
        }

        await insertContent(contentObj);

        res.status(201);
        res.json({
            'msg': 'success'
        });
    } catch (err) {
        if(req.file != null) {
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
    [GET] /stories/:storyId/contents/:contentId

    해야 할 일
     (1) section에 대한 처리
     (2) query 결과물이 없을 경우에 대한 error처리가 미흡
 */
exports.getContent =async (req, res, next) => {
    // token으로 가져올 데이터
    let userId = 3;
    let contentId = req.params.contentId;
    let storyId = req.params.storyId;

    console.log(req);
    console.log(req.params);
    try {
        let content = await selectContent(contentId, userId, storyId);

        res.status(200);
        res.json({
            'msg': 'success',
            'content': content
        });
    } catch (err) {
        next(err);
    }
};