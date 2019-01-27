// 나중에 DB작업할 때 여기서
const {User} = require('../../../models');

exports.read = async (req, res)=>{
    let temp = null;

    temp = await User.findAll({
        attributes: ['id', 'email', 'name']
    });

    res.status(200);
    res.json({
        "msg": "success",
        "data": temp
    });
}

exports.create = (req, res)=>{
    insert_data = {
        'email': "eonju14@naver.com",
        'name': "송윤재",
        'description': '자기소개',
        'phone': '010-7288-5260',
        'created_at': Date.now(),
        'gender': 1,
        'desginer': 1
    }

    User.create(insert_data);

    res.json({
        'msg': 'excute'
    });
}

exports.update = (req, res)=>{
    User.update({
        'name': 'Song'
        },{
        where: {id: 1}
        });

    res.json({
        msg: "success"
    });
}