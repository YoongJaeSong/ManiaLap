const moment = require('moment');
const {sequelize} = require('../../models/index');
const {applyCreator, registerCreator, findSnsUrl, findBrandName, findNickname} = require('../models/creators');
const {saveapplication} = require('../models/certifications');
const {checkValid, filterFacebook, filterInsta, filterYoutube} = require('../../services/filter_sns');

/*
    작가 신청
    [POST] /api/creators/apply
    작가 이름, 브랜드 명, 인증 sns 주소, 프로모션 코드 or 디자인 저작권 or 사업자 등록증
 */
exports.applyCreators = async (req, res, next) => {

    let userId = req.authInfo.userId;
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
        if (input["promotionCode"] !== '1') {
            let error = new Error("Not Valid promotion code");
            error.status = 404;

            return next(error);
        } else {
            creatorObj["register_type"] = input["registerType"];
        }
    }
    else if (input["registerType"] === '2') {
        applicationObj["image"] = req.file.filename;
        creatorObj['register_type'] = input['registerType'];
    }
    else {
        let error = new Error("Not Valid input data");
        error['status'] = 404;

        return next(error);
    }

    // 적어도 sns주소가 하나 이상인지 확인하는 작업
    try {
        checkValid(input['instaUrl'], input['fbUrl'], input['youtubeUrl'], input['webUrl']);
    } catch (err) {
        return next(err);
    }

    creatorObj["insta_url"] = filterInsta(input['instaUrl']);
    creatorObj['fb_url'] = filterFacebook(input['fbUrl']);
    creatorObj['youtube_url'] = filterYoutube(input['youtube']);
    creatorObj["webUrl"] = input["webUrl"].replace('https://', '');

    // get transaction
    let transaction = await sequelize.transaction();
    let creator = {};
    let application = {};

    try {
        // creator row 생성
        creator = await applyCreator(creatorObj, transaction);

        if (input['registerType'] === '2') {
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

    let userId = req.authInfo.userId;

    let input = req.body;
    let creatorObj = {};

    creatorObj['nickname'] = input['nickname'];
    creatorObj['description'] = input['description'];
    if (req.file) {
        creatorObj['profile_image_url'] = `${process.env.URL}/uploads/${req.file.filename}`;
    }

    try {
        checkValid(input['instaUrl'], input['fbUrl'], input['youtubeUrl'], input['webUrl']);
    } catch (err) {
        return next(err);
    }

    creatorObj["insta_url"] = filterInsta(input['instaUrl']);
    creatorObj['fb_url'] = filterFacebook(input['fbUrl']);
    creatorObj['youtube_url'] = filterYoutube(input['youtube']);
    creatorObj["webUrl"] = input["webUrl"].replace('https://');

    creatorObj['register_date'] = moment().format('YYYY-MM-DD HH:mm:ss');

    let result = {};
    try {
        result = await registerCreator(creatorObj, userId);
    } catch (err) {
        return next(err);
    }

    res.status(200);
    res.json({
        msg: 'success',
        creator: result,
    });
};


/*
    [GET] /api/creators/sns?type=&url=
    sns 주소 중복 확인을 위한 api

    query parameter
     - type: 어떤 sns의 주소인지 확인을 위해 필요
             0-insta, 1-facebook, 2-youtube, 3-web
 */
exports.doubleCheckSns = async (req, res, next) => {

    let userId = req.authInfo.userId;
    let type = parseInt(req.query.type);
    let url = req.query.url;

    try {
        await findSnsUrl(type, url, userId);
    } catch (err) {
        return next(err);
    }

    res.status(200);
    res.json({
        msg: `${url} is existed`,
    });
};


/*
    [GET] /api/creators/brand?name=
    작가 신청시 브랜드 이름 중복확인

    query parameter
     - name: 브랜드 명
 */
exports.doubleCheckBrand = async (req, res, next) => {

    let userId = req.authInfo.userId;
    const brandName = req.query.name;

    try {
        await findBrandName(brandName, userId);
    } catch (err) {
        return next(err);
    }

    res.status(200);
    res.json({
        msg: `${brandName} is existed`,
    });
};


/*
    [GET] /api/creators/nickname?name=
    작가 등록시 활동명 중복 확인

    Query Parameter
     - name: 작가 활동 명
 */
exports.doubleCheckNickname = async (req, res, next) =>{

    let userId = req.authInfo.userId;
    const nickname = req.query.name;

    try {
        await findNickname(nickname, userId);
    } catch (err) {
        return next(err);
    }

    res.status(200);
    res.json({
        msg: `${nickname} is existed`,
    });

};