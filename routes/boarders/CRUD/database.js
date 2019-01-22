// 나중에 DB작업할 때 여기서
const {Content} = require('../../../models');

exports.read = async (req, res)=>{
    let temp = null;

    temp = await Content.findAll();

    res.status(200);
    res.json({
        "msg": "success",
        "data": temp
    });
}