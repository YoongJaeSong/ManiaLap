const {creators} = require('../../models/index');

/*
    creators 테이블에 row를 추가하는 작업
 */
exports.applyCreator = async (creatorObj, transaction)=>{
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