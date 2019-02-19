const fs = require('fs');
const {insertStory, selectStories, selectStory, insertStoryHashtag} = require('../models/stories');


/*
    [POST] /stories

    해야 할 것
     (1) transaction 구현
 */
exports.createStory = async (req, res, next) => {
    // token에서 user_id를 받는다.
    const userId = 3;
    let storyObj = {};
    let url = process.env.URL;

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
        await insertStoryHashtag(result.dataValues.id, storyObj.hashtagId);

        let story = {};
        story.id = result.dataValues.id;
        story.image_url = result.dataValues.image_url;

        res.status(201);
        res.json({
            'msg': 'success',
            'story': story
        });
    }
    catch (err) {
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
    // 이전 page에서 해당 page로 접근할 때 user_id값을 가지고 넘어온다.
    let designerId = null;
    let page = 1;

    designerId = req.query.designerId;
    if (req.query.page != null)
        page = req.query.page;

    try {
        let stories = await selectStories(designerId, page);
        console.log(stories);
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