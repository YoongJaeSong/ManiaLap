const fs = require('fs');
const aysnc = require('async');
const {insertContent, selectContent} = require('../models/contents');

/*
    [POST] /stories/:storyId/contents

    해야 할 것
     (1) error 처리에서 파일 삭제를 마치고 next로 넘어가도록 수정이 필요
*/
exports.createContent = async (req, res, next) => {
    // token으로 user_id값을 받는다.
    let userId = 3;
    let url = process.env.URL;

    /*
        req.body에 담긴 데이터
        title, description, image_url
    */
    let contentObj = {};
    contentObj = req.body;
    contentObj['user_id'] = userId;
    contentObj['story_id'] = req.params.storyId;


    try {
        /*
            image_url은 필수 데이터 이기 때문 파일이 없으면 catch로 보내는 것이 아니라
            바로 error handler로 보낸다.
         */
        if (req.file != null) {
            contentObj['image_url'] = url + req.file.filename;
        } else {
            let error = new Error("An image file is required. You didn't send an image file");
            error.status = 400;

            return next(error);
        }

        let result = await insertContent(contentObj);

        // 방금 생성된 컨텐츠의 id, image_url를 보내주기 위해 필요한 데이터
        let content = {};
        content.id = result.dataValues.id;
        content.image_url = result.dataValues.image_url;

        res.status(201);
        res.json({
            'msg': 'success',
            'content': content
        });
    } catch (err) {
        fs.unlink(req.file.path, (e) => {
            if (e) {
                next(e);
            }
            next(err);
        });
    }
};


/*
    [GET] /stories/:storyId/contents/:contentId

    해야 할 일
     (1) section에 대한 처리
     (2) query 결과물이 없을 경우에 대한 error처리가 미흡
 */
exports.getContent = async (req, res, next) => {
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