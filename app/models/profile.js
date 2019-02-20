const {designers, stories, sequelize, users} = require('../../models/index');


/*
    작가의 정보(작가 활동 명, 소개)를 가져오는 작업
 */
exports.selectDesigner = async (designerId)=>{
    // query에서 적용할 option에 대한 정보
    let option = {
        attributes: ["designers.name", "description", [sequelize.fn('count', '*'), 'count'], "user.profile_image_url"],
        where: {id: designerId},
        include: [
            {model: stories, required: true, attributes: []},
            {model: users, required: true, attributes: ["profile_image_url"]}
        ]
    }

    try {
        let result = await designers.findAll(option);
        return result;
    } catch (err) {
        throw err;
    }
};

/*
    해당 작가의 스토리의 개수를 가져오는 작업
 */