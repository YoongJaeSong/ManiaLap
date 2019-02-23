const {hashtags, storyHashtags, Op} = require('../../models/index');

/*
    새로 들어온 해시태그를 등록하는 Query

    파라미터로 해시태그 객체 배열을 받는다.
    비어있는 id가 있으면 해시태그를 만들고 만들어진 id값을 객체에 넣어준다.

    [for-of대신 for-in을 쓴 이유]
     for-of를 쓰게 되면 직접적으로 수정이 불가능하기 때문에
     직접적으로 수정하기 위해서 for-in을 사용했다.
 */
exports.insertHashtag = async (hashtag, transaction) => {

    try {
        for(obj of hashtag){
            if(!obj.id) {
                let arr = await hashtags.create({
                    name: obj.name
                }, {transaction});
                obj.id = arr.id;
            }
        }

        return hashtag;
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


/*
    특정 스토리의 해시태그들을 가져오는 작업
 */
exports.selectHashtags = async (storyId) => {

    let option = {
        attributes: ['hashtag_id'],
        where: {story_id: storyId}
    }

    try {
        let hashtagsId = await storyHashtags.findAll(option);

        if (!Object.keys(hashtagsId).length) {
            let error = new Error("No Query Result");
            error.status = 404;

            throw error;
        }

        let arrId = [];
        for(let obj of hashtagsId){
            arrId.push(obj.dataValues.hashtag_id);
        }

        let result = await hashtags.findAll({
            where: {id: {[Op.or]: arrId}}
        });

        return result;
    } catch (err) {
        throw err
    }

};