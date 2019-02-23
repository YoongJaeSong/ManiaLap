const {contents} = require('../../models/index');

exports.insertContent = async (contentObj) => {
    try {
        return await contents.create(contentObj);
    } catch (err) {
        throw err;
    }
};

/*
    스토리에 해당되는 content를 모두 가져오는 작업
 */
exports.selectContents = async (storyId) => {

    let option = {
        attributes: ['id', 'title', 'description', 'image_url'],
        where: {story_id: storyId},
        order: [['id', 'desc']]
    };

    let result = [];
    try {
        result = await contents.findAll(option);
    } catch (err) {
        throw err;
    }

    // findAll은 결과가 없으면 빈 object로 반환
    // Object.keys(object).length를 이용
    if (!Object.keys(result).length) {
        let error = new Error("No Query Result");
        error.status = 400;

        throw error;
    }

    return result;

};

exports.selectContent = async (contentId, storyId) => {
    let option = {
        attributes: ['title', 'description', 'image_url'],
        where: {id: contentId, story_id: storyId}
    };

    let result = null;
    try {
        result = await contents.findOne(option);
    } catch (err) {
        throw err;
    }

    // findOne은 결과가 없으면 null로 반환
    // 결과가 있는지 없는지 확인하는 작업
    if (!result) {
        let error = new Error("No Query Result");
        error.status = 400;

        throw error;
    }

    return result;
};