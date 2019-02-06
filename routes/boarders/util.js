const {story, content} = require('../../models/index');


/*
    [GET] /stories
 */
exports.getStories = async (req, res) => {

    // 이전 page에서 해당 page로 접근할 때 user_id값을 가지고 넘어온다.
    let userId = 3;
    let page = 1;
    if (req.query.page != null)
        page = req.query.page;

    let options = {
        attributes: ["id", "image_url"],
        where: {user_id: userId},
        limit: 4,
        offset: (page - 1) * 4,
        order: [['id', 'desc']]
    };


    try {
        let storyArr = await story.findAll(options);

        let stories = [];
        for (let i in storyArr) {
            stories.push(storyArr[i].dataValues);
        }

        res.status(200);
        res.json({
            "msg": 'success',
            "stories": stories
        });
    } catch (err) {
        res.status(503);
        res.json({
            "msg": "DB error occurred",
            "error": err.errors[0].message
        });
    }
};


/*
    [GET] /stories/:storyId

    해야 할 일
     (1) section에 대한 처리
*/
exports.getStory = async (req, res) => {

    let userId = 3;
    let storyId = req.params.storyId;
    let option = {
        attributes: ["id", "image_url"],
        where: {story_id: storyId}
    };

    try {
        let result = await content.findAll(option);

        let contents = [];
        for (let i in result) {
            contents.push(result[i].dataValues);
        }

        res.status(200);
        res.json({
            'msg': 'success',
            'contents': contents
        });
    } catch (err) {
        res.status(503);
        res.json({
            "msg": "DB error occurred",
            "error": err.errors[0].message
        });
    }
};


/*
    [GET] /stories/:storyId/contents/:contentId

    해야 할 일
     (1) section에 대한 처리
     (2) query 결과물이 없을 경우에 대한 error처리가 미흡
 */
exports.getContent =async (req, res) => {
    // token으로 가져올 데이터
    let userId = 3;
    let contentId = req.params.contentId;
    let storyId = req.params.storyId;
    let option = {
        attributes: ['title', 'description', 'image_url'],
        where: {id: contentId, user_id: userId, story_id: storyId}
    };

    try {
        let result = await content.find(option);

        res.status(200);
        res.json({
            'msg': 'success',
            'content': result.dataValues
        });
    } catch (err) {
        res.status(503);
        res.json({
            "msg": "DB error occurred",
            "error": err.errors
        });
    }
};

