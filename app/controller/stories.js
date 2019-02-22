const fs = require('fs');
const {sequelize} = require('../../models/index');
const {insertStory, selectStories, selectStory, insertStoryHashtag} = require('../models/stories');
const {insertHashtag} = require('../models/hashtags');


/*
    [POST] /stories
 */
exports.createStory = async (req, res, next) => {
    // token에서 designerd를 받는다. req.designerId가 있을 예정
    const designerId = 3;
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

    /*
        hashtagId, hashtagName 각각의 배열을 객체로 묶어 배열로 만든다.
        {
            id: integer
            name: string
        }
     */
    let flag = 0; // 나중에 insertStory에 들어갈지 안 들어갈지 결정하기 위한 데이터
    storyObj.hashtags = [];
    for (let i = 0; i < req.body.hashtagName.length; i++){
        let obj = {};

        if(!req.body.hashtagId[i]) {flag = 1;}

        obj.id = req.body.hashtagId[i];
        obj.name = req.body.hashtagName[i];

        storyObj.hashtags.push(obj);
    }

    // get transaction
    let transaction = await sequelize.transaction();

    try {
        // result: create작업 후 생성된 객체를 담는 변수
        let result = await insertStory(storyObj, transaction);

        /*
            새로 등록된 해시태그들의 id값을 기존의 hashtag에 추가한다.
         */
        if(flag) {
            storyObj.hashtags = await insertHashtag(storyObj.hashtags, transaction);
        }

        // story와 hashtag를 맵피하는 테이블 작업
        await insertStoryHashtag(result.id, storyObj.hashtags, transaction);

        let story = {};
        story.id = result.id;
        story.title = result.title;
        story.description = result.description;
        story.image_url = result.image_url;
        story.hashtags = storyObj.hashtags;
        // story = result;

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

    designerId = req.query.designerId;
    if (req.query.page != null)
        page = req.query.page;

    try {
        let stories = await selectStories(designerId, page);

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