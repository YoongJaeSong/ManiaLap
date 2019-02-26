const {hashtags, storyHashtags, Op} = require('../../models/index');

/*
    해시태그 이름들의 존재여부 확인 후
    있으면 id, name으로 객체를 만든다.
    없으면 name으로 해시태그를 만든후 객체 생성
 */
exports.checkHashtag = async (hashtagNames, transaction) => {

    try {
        let hashtagsObj = [];
        for (name of hashtagNames) {
            let result = await hashtags.findOrCreate({
                where: {name: name},
                defaults: {name: name},
                transaction: transaction
            });

            let obj = {};
            obj.id = result[0].id;
            obj.name = result[0].name;
            hashtagsObj.push(obj);
        }

        return hashtagsObj;
    } catch (err) {
        throw err;
    }

};


/*
    해시태그를 특정 단어로 검색해 정보를 가져오는 작업
    해시태그 정보: id, name

    더 좋은 검색구현 찾아 볼 것
 */
exports.searchHashtags = (name) => {

    let option = {
        attributes: ['id', 'name'],
        where: {name: {like: `%${name}%`}}
    };

    try {
        return hashtags.findAll(option);
    } catch (err) {
        throw err;
    }

};


/*
    특정 스토리의 해시태그들을 가져오는 작업
 */
exports.selectHashtags = async (storyId) => {

    let option = {
        attributes: ['hashtags_id'],
        where: {stories_id: storyId}
    }

    try {
        let hashtagsId = await storyHashtags.findAll(option);

        if (!Object.keys(hashtagsId).length) {
            let error = new Error("No Query Result");
            error.status = 404;

            throw error;
        }

        let arrId = [];
        for (let obj of hashtagsId) {
            arrId.push(obj.dataValues.hashtags_id);
        }

        let result = await hashtags.findAll({
            attributes: ['id', 'name'],
            where: {id: {[Op.or]: arrId}}
        });

        return result;
    } catch (err) {
        throw err
    }

};