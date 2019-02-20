const {contents} = require('../../models/index');

exports.insertContent = async (contentObj) => {
    try {
        return await contents.create(contentObj);
    } catch (err) {
        throw err;
    }
};

exports.selectContents = async (storyId) => {

    let option = {
        attributes: ['id', 'title', 'description', 'image_url'],
        where: {story_id: storyId},
        order: [['id', 'desc']]
    };

    try {
        let arr = await contents.findAll(option);

        if (arr == null) {
            let error = new Error("No Query Result");
            error.status = 400;

            throw error;
        }

        let result = [];
        for (i in arr) {
            result.push(arr[i].dataValues);
        }

        return result;
    } catch (err) {
        throw(err);
    }

};

exports.selectContent = async (contentId, storyId) => {
    let option = {
        attributes: ['title', 'description', 'image_url'],
        where: {id: contentId, story_id: storyId}
    };

    try {
        let result = await contents.findOne(option);

        if (result == null) {
            let error = new Error("No Query Result");
            error.status = 400;

            throw error;
        }

        return result;
    } catch (err) {
        throw err;
    }
};