const {stories, storyHashtags} = require('../../models/index');

/*
    story만드는 Query

    transaction 작업을 하기 위해서 transaction을 두번째 인자로 넘겨줘야 한다.
 */
exports.insertStory = async (storyObj, transaction) => {
    try {
        let result = await stories.create(storyObj, {transaction});

        return result.dataValues;
    } catch (err) {
        throw err;
    }
};


/*
    기존의 문자를 숫자로 바꾸는 작업을 제거 문자열로 해도 정상 작동
*/
exports.insertStoryHashtag = async (storyId, hashtags, transaction)=>{
    try {
        for (let obj of hashtags) {
            await storyHashtags.create({
                story_id: storyId,
                hashtag_id: obj.id
            }, {transaction});
        }
    } catch (err) {
        throw err;
    }
};


/*
    스토리의 정보를 가져오는 Query
    스토리 정보: id, 제목, 설명, 대표 이미지
 */
exports.selectStories = async (designerId, page) => {
    let option = {
        attributes: ["id", "title", "description", "image_url"],
        where: {designers_id: designerId},
        limit: 4,
        offset: (page - 1) * 4,
        order: [['id', 'desc']]
    };

    try {
        let result = await stories.findAll(option);

        // 가져온 데이터가 없는 경우
        if(!Object.keys(result).length){
            let error = new Error("No Query Result");
            error.status = 400;

            throw error;
        }

        return result;
    } catch (err) {
        throw err;
    }
};

/*
    스토리 하나의 정보를 가져오는 api
    스토리 정보: id, 제목, 설명, 대표 이미지
 */
exports.selectStory = async (storyId) =>{
    let option = {
        attributes: ["id", "title", "description", "image_url"],
        where: {id: storyId}
    };

    try {
        let result = await stories.findOne(option);

        if(!result){
            let error = new Error("No Query Result");
            error.status = 400;

            throw error;
        }

        return result;
    } catch (err) {
        throw err;
    }
};