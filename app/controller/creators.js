const {sequelize} = require('../../models/index');
const {applyCreator, registerCreator} = require('../models/creators');
const {saveapplication} = require('../models/certifications');

/*
    작가 신청
    [POST] /api/creators/apply
    작가 이름, 브랜드 명, 인증 sns 주소, 프로모션 코드 or 디자인 저작권 or 사업자 등록증
 */
exports.applyCreators = async (req, res, next) => {

    // let userId = req.authInfo.userId;
    let userId = 6;
    let creatorObj = {};
    let input = req.body;
    let applicationObj = {};

    creatorObj["name"] = input["name"];
    creatorObj["brand_name"] = input["brandName"];
    creatorObj['user_id'] = userId;

    /*
        [register_type]
        1: 프로모션 코드로 신청
        2: 사업자/디자인 등록증으로 신청
     */
    if (input["registerType"] === '1') {
        if(input["promotionCode"] !== '1') {
            let error = new Error("Not Valid promotion code");
            error.status = 404;

            return next(error);
        }else{
            creatorObj["register_type"] = input["registerType"];
        }
    }
    else if(input["registerType"] === '2'){
        applicationObj["image"] = req.file.filename;
        creatorObj['register_type'] = input['registerType'];
    }
    else{
        let error = new Error("Not Valid input data");
        error['status'] = 404;

        return next(error);
    }

    if(!(input["instaUrl"] || input["fbUrl"] || input["youtubeUrl"] || input["webUrl"])){
        let error = new Error("No sns url");
        error['status'] = 404;

        return next(error);
    }

    if(input["instaUrl"]){
        let strArr = input["instaUrl"].split('/');
        creatorObj["insta_url"] = strArr[1];
    }

    if(input["fbUrl"]){
        input["fbUrl"] = input["fbUrl"].replace("https://", "");

        let strArr = input["fbUrl"].split('/');
        if(strArr[1].includes("profile.php?")){
            fbProfile = strArr[1].split('=');
            creatorObj["fb_url"] = fbProfile[1];
        }else{
            creatorObj["fb_url"] = strArr[1];
        }
    }

    if(input["youtubUrl"]){
        input["youtubeUrl"] = input["youtubeUrl"].replace("https://", "");

        let strArr = input["youtubeUrl"].split('/');
        if(strArr[1] === "channel"){
            let error = new Error("Not Valid youtube url");
            error["status"] = 404;

            return next(error);
        }
    }

    if(input["webUrl"]){
        creatorObj["webUrl"] = input["webUrl"];
    }

    // get transaction
    let transaction = await sequelize.transaction();
    let creator = {};
    let application = {};

    try {
        // creator row 생성
        creator = await applyCreator(creatorObj, transaction);

        if(input['registerType'] === '2'){
            applicationObj['creator_id'] = creator['id'];
            application = await saveapplication(applicationObj, transaction);
        }
        
        creator['dataValues']['certification_image'] = application['image'];
    } catch (err) {
        await transaction.rollback();
        return next(err);
    }

    transaction.commit();

    res.status(200);
    res.json({
        creator: creator,
    });

};


/*
    [POST] /api/creators/register
    작가 등록 api

    필요한 데이터
     - 닉네임, 소개, 프로필 이미지,
 */
exports.registerCreators = async (req, res, next) => {

    // let userId = req.authInfo.userId;
    let userId = 6;

    let input = req.body;
    let creatorObj = {};

    creatorObj['nickname'] = input['nickname'];
    creatorObj['description'] = input['description'];
    if(req.file){
        creatorObj['profile_image_url'] = `${process.env.URL}/uploads/${req.file.filename}`;
    }

    if(!(input["instaUrl"] || input["fbUrl"] || input["youtubeUrl"] || input["webUrl"])){
        let error = new Error("No sns url");
        error['status'] = 404;

        return next(error);
    }

    if(input["instaUrl"]){
        let strArr = input["instaUrl"].split('/');
        creatorObj["insta_url"] = strArr[1];
    }

    if(input["fbUrl"]){
        input["fbUrl"] = input["fbUrl"].replace("https://", "");

        let strArr = input["fbUrl"].split('/');
        if(strArr[1].includes("profile.php?")){
            fbProfile = strArr[1].split('=');
            creatorObj["fb_url"] = fbProfile[1];
        }else{
            creatorObj["fb_url"] = strArr[1];
        }
    }

    if(input["youtubUrl"]){
        input["youtubeUrl"] = input["youtubeUrl"].replace("https://", "");

        let strArr = input["youtubeUrl"].split('/');
        if(strArr[1] === "channel"){
            let error = new Error("Not Valid youtube url");
            error["status"] = 404;

            return next(error);
        }
    }

    if(input["webUrl"]){
        creatorObj["webUrl"] = input["webUrl"];
    }

    let result = {};
    try {
        result = await registerCreator(creatorObj, userId);
    } catch (err) {
        return next(err);
    }

    res.status(200);
    res.json({
        msg:'success',
        creator: result,
    });
};