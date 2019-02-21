const {searchHashtags} = require('../models/hashtags');

/*
    [GET] /api/hashtags?name=

    해시태그를 검색하는 기능
 */
exports.getHashtags = async (req, res, next)=>{

    let name = req.query.name;

    let result = [];
    try {
        if(name) {
            result = await searchHashtags(name);
        }

        res.status(200).json({
            hashtags: result
        });
    } catch (err) {
        next(err);
    }

};