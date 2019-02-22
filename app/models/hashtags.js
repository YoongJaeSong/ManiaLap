const {hashtags} = require('../../models/index');

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
        for (let i in hashtag) {
            if (!hashtag[i].id) {
                let arr = await hashtags.create({
                    name: hashtag[i].name
                }, {transaction});
                hashtag[i].id = arr.id;
            }
        }

        return hashtag;
    } catch (err) {
        throw err;
    }

};