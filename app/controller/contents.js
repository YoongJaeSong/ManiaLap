const fs = require('fs');
const {insertContent, selectContent, selectContents} = require('../models/contents');

/*
    [POST] /api/stories/:storyId/contents
*/
exports.createContent = async (req, res, next) => {
    // token으로 designerId값을 받는다.
    let designerId = 3;
    let url = process.env.URL;

    /*
        req.body에 담긴 데이터
        title, description, image_url
    */
    let contentObj = {};
    contentObj = req.body;
    contentObj['designers_id'] = designerId;
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
        content.id = result.id;
        content.image_url = result.image_url;

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
    [GET] /api/stories/:storyId/contents

    storyId를 가진 스토리에 해당된 content들을 다 가져온다.
    content 정보: id, 제목, 설명, 이미지
 */
exports.getContents = async (req, res, next) =>{

    let storyId = req.params.storyId;

    try {
        let contents = await selectContents(storyId);

        res.status(200);
        res.json({
            'msg': "success",
            'contents': contents
        });
    } catch (err) {
        next(err);
    }

};


/*
    [GET] /api/stories/:storyId/contents/:contentId

    contentId의 content의 정보를 가져오는 api
    content 정보: 제목, 설명, 이미지

    issue
     (1) 전 화면에서 이미 컨텐츠에 대한 모든 정보를 가지고 있는데 다시 요청을 해야함?
 */
exports.getContent = async (req, res, next) => {

    let contentId = req.params.contentId;
    let storyId = req.params.storyId;

    try {
        let content = await selectContent(contentId, storyId);

        res.status(200);
        res.json({
            'msg': 'success',
            'content': content
        });
    } catch (err) {
        next(err);
    }
};