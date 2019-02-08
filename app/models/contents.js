const {content} = require('./index');

exports.insertContent = async (contentObj)=>{
    try {
        await content.create(contentObj);
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
            throw new Error("Not Find");
        }

        return result.dataValues;
    } catch (err) {
        throw err;
    }
};