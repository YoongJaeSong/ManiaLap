const {designers, stories, sequelize, users} = require('../../models/index');


/*
    작가의 정보(작가 활동 명, 소개)를 가져오는 작업
    + 스토리의 개수 + 유저의 프로필 사진
 */
exports.selectDesigner = async (designerId)=>{
    // query에서 적용할 option에 대한 정보
    let option = {
        attributes: ["name", "description", [sequelize.fn('count', '*'), 'storyNum']],
        where: {id: designerId},
        include: [
            {model: stories, required: true, attributes: []},
            {model: users, required: true, attributes: ["profile_image_url"]}
        ]
    }

    try {
        let result = await designers.findAll(option);

        // 결과가 없는지 확인하는 작업
        if(!Object.keys(result).length){
            let error = new Error("No Query Result");
            error.status(400);

            throw error;
        }

        return result;
    } catch (err) {
        throw err;
    }
};