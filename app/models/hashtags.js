const {hashtags} = require('../../models/index');

/*
    새로 들어온 해시태그를 등록하는 Query

    필요한 데이터: 해시태그 이름(hashtagName)

    return: 만들어진 해시태그들의 id값을 list로 담아서 보내준다.
 */
exports.insertHashtag = async (hashtagName, transaction)=>{

    let result = [];

    try {
        for (i in hashtagName) {
            console.log(hashtagName[i]);
            let arr = await hashtags.create(hashtagName[i], {transaction});
            result.push(arr.dataValues.id);
        }

        return result;
    } catch (err) {
        throw err;
    }

};