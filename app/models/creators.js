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