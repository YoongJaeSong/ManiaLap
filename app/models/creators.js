const {creators, Op} = require('../../models/index');
const {filterYoutube, filterFacebook, filterInsta} = require('../../services/filter_sns');

/*
    creators 테이블에 row를 추가하는 작업
 */
exports.applyCreator = async (creatorObj, transaction) => {
    try {
        return await creators.create(creatorObj, {transaction});
    } catch (err) {
        throw err;
    }
};


/*
    creator row를 수정하는 작업
 */
exports.registerCreator = async (creatorObj, userId) => {

    let options = {where: {user_id: userId}, returning: true, plain: true};

    try {
        return await creators.update(creatorObj, options);
    } catch (err) {
        throw err;
    }
};


/*
    creator 등록시 sns주소 중복 여부 확인
 */
exports.findSnsUrl = async (type, url, userId) => {

    let options = {
        attributes: ['id', 'insta_url', 'fb_url', 'youtube_url', 'web_url'],
    };

    options['where'] = {};
    switch (type) {
        case 0: {
            url = filterInsta(url);
            options['where'] = {'insta_url': url};
            break;
        }
        case 1: {
            url = filterFacebook(url);
            options['where'] = {'fb_url': url};
            break;
        }
        case 2: {
            url = filterYoutube(url);
            options['where'] = {'youtube_url': url};
            break;
        }
        case 3: {
            url = url.replace('https://', '');
            options['where'] = {'web_url': url};
            break;
        }
    }

    if(type) {
        options['where']['user_id'] = {[Op.ne]: userId};
    }else{
        options['where'] = {user_id: userId};
    }

    let result = null;
    try {
        result = await creators.findOne(options);
    } catch (err) {
        throw err;
    }

    if (result) {
        return result;
    } else {
        let error = new Error('No query result');
        error['status'] = 404;

        throw error;
    }
};