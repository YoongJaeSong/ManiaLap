const {searchHashtags, selectHashtags} = require('../models/hashtags');

/*
    [GET] /api/hashtags/auto?name=

    해시태그를 검색하는 기능
 */
exports.autoHashtags = async (req, res, next) => {

    let name = req.query.name;

    if(!name){
        let error = new Error("name is null");
        error.status = 404;

        return next(error);
    }

    let result = [];
    try {
        result = await searchHashtags(name);

        res.status(200).json({
            hashtags: result
        });
    } catch (err) {
        next(err);
    }

};


/*
    [GET] /api/hashtags?storyId=
 */
exports.getHashtags = async (req, res, next)=>{

    const storyId = req.query.storyId;

    try {
        let result = await selectHashtags(storyId);

        res.status(200);
        res.json({
            temp: result
        });
    } catch (err) {
        next(err);
    }

};