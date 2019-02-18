const {story, content, storyHashtags} = require('../../models/index');

exports.insertStory = async (storyObj) => {
    try {
        return await story.create(storyObj);
    } catch (err) {
        throw err;
    }
};


/*
    기존의 문자를 숫자로 바꾸는 작업을 제거 문자열로 해도 정상 작동
*/
exports.insertStoryHashtag = async (id, hashtagId)=>{
    try {
        for (i in hashtagId) {
            console.log("hashtagId: " + hashtagId[i]);
            await storyHashtags.create({
                story_id: id,
                hashtag_id: hashtagId[i]
            });
        }
    } catch (err) {
        throw err;
    }
};

exports.selectStories = async (userId, page) => {
    let option = {
        attributes: ["id", "image_url"],
        where: {user_id: userId},
        limit: 4,
        offset: (page - 1) * 4,
        order: [['id', 'desc']]
    };

    let result = [];
    try {
        let arr = await story.findAll(option);
        console.log(2);
        console.log(arr);
        if(arr == null){
            let error = new Error("No Query Result");
            error.status = 400;

            throw error;
        }

        for(let i in arr){
            result.push(arr[i].dataValues);
        }

        return result;
    } catch (err) {
        throw err;
    }
};

exports.selectStory = async (storyId, userId, page) =>{
    let option = {
        attributes: ["id", "image_url"],
        where: {story_id: storyId, user_id: userId},
        limit: 4,
        offset: (page - 1) * 4,
        order: [['id', 'desc']]
    };

    let result = [];
    try {
        let arr = await content.findAll(option);

        if(arr.dataValues == null){
            let error = new Error("No Query Result");
            error.status = 400;

            throw error;
        }

        for(let i in arr){
            result.push(arr[i].dataValues);
        }

        return result;
    } catch (err) {
        throw err;
    }
};