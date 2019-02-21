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


/*
    해시태그를 특정 단어로 검색해 정보를 가져오는 작업
    해시태그 정보: id, name

    더 좋은 검색구현 찾아 볼 것
 */
exports.searchHashtags = async (name) => {

    let option = {
        attributes: ['id', 'name'],
        where: {name: {like: `%${name}%`}}
    };

    try {
        return await hashtags.findAll(option);
    } catch (err) {
        throw err;
    }

};