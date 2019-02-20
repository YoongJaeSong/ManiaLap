const {selectDesigner} = require('../models/profile');


/*
    [GET] /api/profile?designerId=&userId=

    작가 or 유저의 정보를 가져오는 api
    designerId인 경우 작가의 프로필 정보
    userId인 경우 유저의 프로필 정보를 가져온다.
 */
exports.getProfile = async (req, res)=>{

    let designerId = null;
    let userId = null;
    let query = req.query;
    let flag = 0; // switch문에서 사용하기 위해

    if(query.designerId != null){
        designerId = query.designerId;
    }else if(query.userId != null){
        userId = query.userId;
        flag = 1;
    }else{
        designerId = query.designerId;
        userId = query.userId;
        flag = 2;
    }

    let designer = {};
    switch (flag) {
        case 0:
            // 작가에 대한 정보를 가져오는 작업
            // designers table에서 작가 활동 명, 소개 정보를 가져온다.
            designer = await selectDesigner(designerId);
            console.log(designer[0].dataValues);
            res.json({temp: designer});
            // 스토리의 개수 가져오는 작업
            break;
        case 1:
            // 유저에 대한 정보를 가져오는 작업
            break;
        case 2:
            // 두 정보를 모두 다 가져오는 작업
            break;
    }

};