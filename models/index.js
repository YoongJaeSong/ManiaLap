const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// config.json을 통해서 DB정보를 확인 및 접속하기 위한 데이터들이 담겨져 있다.
const config = require('../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
.forEach(file => {
        // 현재 폴더내에 있는 파일들을 불러오는 작업
        // 이 작업으로 model정의들과 같은 object를 생성한다.
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        // 정의된 model들 사이의 관계를 정의
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Sequelize.Op;


db.users = require('./users')(sequelize, Sequelize);
db.stories = require('./stories')(sequelize, Sequelize);
db.contents = require('./contents')(sequelize, Sequelize);
db.hashtags = require('./hashtags')(sequelize, Sequelize);
db.storyHashtags = require('./story_hashtags')(sequelize, Sequelize);
db.userFollowDesigners = require('./user_follow_designers')(sequelize, Sequelize);
db.userFollowStories = require('./user_follow_stories')(sequelize, Sequelize);
db.usersDesingersComments = require('./users_designers_comments')(sequelize, Sequelize);
db.designers = require('./designers')(sequelize, Sequelize);
db.comments = require('./comments')(sequelize, Sequelize);

db.designers.hasMany(db.stories, {foreignKey: 'designers_id'});
db.users.hasOne(db.designers, {foreignKey: 'users_id', targetKey: 'users_id'});
db.designers.belongsTo(db.users, {foreignKey: 'users_id', targetKey: 'id'});

module.exports = db;

// model를 만들기위해 먼저 실행해야 하는 명령문
// sequelize-auto -h <host> -d <databaseName> -u <user> -x <password> -p <port> -e <sql type>