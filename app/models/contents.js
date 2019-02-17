const {content} = require('../../models/index');

exports.insertContent = async (contentObj)=>{
    try {
        return await content.create(contentObj);
    } catch (err) {
        throw err;
    }
};

exports.selectContent = async (contentId, userId, storyId)=>{
    let option = {
        attributes: ['title', 'description', 'image_url'],
        where: {id: contentId, user_id: userId, story_id: storyId}
    };

    console.log(`contentId: ${contentId}, userId: ${userId}, storyId: ${storyId}`);
    try {
        let result = await content.find(option);

        if(result == null){
            let error = new Error("No Query Result");
            error.status = 400;

            throw error;
        }

        return result;
    } catch (err) {
        throw err;
    }
};