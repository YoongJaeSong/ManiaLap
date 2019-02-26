const {selectDesigner} = require('../models/profile');


/*
    [GET] /api/profile?designerId=

    작가의 프로필 정보를 가져온다.
    정보: id, 활동 명, 소개, 프로필 이미지, 스토리 수
 */
exports.getDesignerProfile = async (req, res, next) => {

    let designerId = null;
    flag = 0; // 0: 본인의 프로필 조회 1: 타인의 프로필 조회

    /*
        본인의 경우 desginerId = null
     */
    if(req.query.designerId){
        designerId = req.query.designerId;
        flag = 1;
    }else{
        designerId = req.authInfo.designerId;
    }

    let profile = {};
    try {
        // 작가에 대한 정보를 가져오는 작업
        // designers table에서 작가 활동 명, 소개 정보를 가져온다.
        profile = await selectDesigner(designerId, flag);
    } catch (err) {
        next(err);
    }

    res.status(200);
    res.json({
        msg: 'success',
        profile: profile
    });
};