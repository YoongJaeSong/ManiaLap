const {certificationImage} = require('../../models/index');

/*
    사업자/디자인 등록증을 저장하는 작업
 */
exports.saveapplication = async (applicationObj, transaction) => {
    try{
        return await certificationImage.create(applicationObj, {transaction});
    }catch (err) {
        throw err
    }
};