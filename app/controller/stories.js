const fs = require('fs');
const {sequelize} = require('../../models/index');
const {insertStory, selectStories, selectStory, insertStoryHashtag} = require('../models/stories');
const {checkHashtag} = require('../models/hashtags');


/*
    [POST] /api/stories
 */
exports.createStory = async (req, res, next) => {
    // token에서 designerd를 받는다.
    let designerId = req.authInfo.designerId;

    if (!designerId) {
        let error = new Error('Invalid approach');
        error.status = 404;

        return next(error);
    }

    let url = process.env.URL;

    /*
        body 내용
         - required: title(string), description(string), hashtageId(array-string or int)
         - Not required: image
    */
    let storyObj = {};
    storyObj.title = req.body.title;
    storyObj.description = req.body.description;
    storyObj.designers_id = designerId;
    if (req.file != null) {
        storyObj.image_url = url + req.file.filename;
    }

    // get transaction
    let transaction = await sequelize.transaction();

    try {
        // result: create작업 후 생성된 객체를 담는 변수
        let result = await insertStory(storyObj, transaction);

        // 해시태그 이름들의 중복을 제거하기 위해 set자료 사용
        let hashtagNamesSet = new Set(req.body.hashtagNames);
        let hashtagsObj = await checkHashtag(hashtagNamesSet, transaction);

        // story와 hashtag를 맵피하는 테이블 작업
        await insertStoryHashtag(result.id, hashtagsObj, transaction);

        let story = {};
        story.id = result.id;
        story.title = result.title;
        story.description = result.description;
        story.image_url = result.image_url;
        story.hashtags = [];
        for (obj of hashtagsObj) {
            story.hashtags.push(obj);
        }

        await transaction.commit();

        res.status(201);
        res.json({
            'msg': 'success',
            'story': story
        });
    }
    catch (err) {
        // if any errors were occurred, rollback transaction
        await transaction.rollback();

        /*
            방금 업로드된 파일을 remove하는 작업

            대표 이미지가 없는데 error가 발생할 수도 있기 때문에  if-else 추가
         */
        if (req.file != null) {
            fs.unlink(req.file.path, (e) => {
                if (e) {
                    next(e);
                }
                next(err);
            });
        } else {
            next(err);
        }
    }
};

/*
    [GET] /api/stories?designerId=&page=

    스토리 정보를 객체 list로 가져오는 api
    스토리 정보: id, 제목, 설명, 대표 이미지
 */
exports.getStories = async (req, res, next) => {
    // 이전 page에서 해당 page로 접근할 때 designerId값을 가지고 넘어온다.
    let designerId = null;
    let page = 1;
    let flag = 0; // 0: 본인의 page 1: 타인의 page

    if (req.query.designerId) {
        designerId = req.query.designerId
        flag = 1;
    } else {
        designerId = req.authInfo.designerId;
    }

    if (req.query.page != null)
        page = req.query.page;

    try {
        let stories = await selectStories(designerId, page, flag);

        res.status(200);
        res.json({
            "msg": 'success',
            "stories": stories
        });
    } catch (err) {
        next(err);
    }
};


/*
    [GET] /stories/:storyId

    스토리 정보(id, 제목, 설명, 대표 이미지)를 가져오는 api
*/
exports.getStory = async (req, res, next) => {
    let storyId = req.params.storyId;

    try {
        let story = await selectStory(storyId);

        res.status(200);
        res.json({
            'msg': 'success',
            'story': story
        });
    } catch (err) {
        next(err);
    }
};