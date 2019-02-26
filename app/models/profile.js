const {designers, stories, sequelize} = require('../../models/index');


/*
    작가의 정보(작가 활동 명, 소개)를 가져오는 작업
    + 스토리의 개수 + 유저의 프로필 사진
 */
exports.selectDesigner = async (designerId, flag)=>{
    // query에서 적용할 option에 대한 정보
    let option = {
        attributes: [
            'name',
            'description',
            'profile_image_url',
            'insta_url',
            'fb_url',
            'youtube_url',
            'web_url',
            [
                sequelize.literal(
                    `(SELECT COUNT(*) 
                        FROM stories 
                       WHERE designers_id = ${designerId} AND private_status <= ${flag})`
                ),
                'storyNum'
            ],
            [
                sequelize.literal(
                    `(SELECT COUNT(*)
                        FROM user_follow_designers
                       WHERE designers_id = ${designerId})`
                ),
                'followNum'
            ],
            [
                sequelize.literal(
                    `(SELECT COUNT(*)
                        FROM user_support_designers
                       WHERE designers_id = ${designerId})`
                ),
                'supportNum'
            ]
        ],
        where: {id: designerId},
        include: [
            {model: stories, required: false, attributes: []}
        ]
    };

    let result = [];
    try {
        result = await designers.findAll(option);
    } catch (err) {
        throw err;
    }

    // 결과가 없는지 확인하는 작업
    if(!Object.keys(result).length){
        let error = new Error("No Query Result");
        error.status(400);

        throw error;
    }

    return result;
};