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

db.creators = require('./creators')(sequelize, Sequelize);

db.stories = require('./stories')(sequelize, Sequelize);
db.storyComments = require('./story_comments')(sequelize, Sequelize);

db.contents = require('./contents')(sequelize, Sequelize);
db.contentComments = require('./content_comments')(sequelize, Sequelize);

db.hashtags = require('./hashtags')(sequelize, Sequelize);
db.categories = require('./categories')(sequelize, Sequelize);
db.interests = require('./interests')(sequelize, Sequelize);
db.certificationImage = require('./certification_applications')(sequelize, Sequelize);

// 매핑 테이블
db.userFollowcreators = require('./user_follow_creators')(sequelize, Sequelize);
db.userFollowStories = require('./user_follow_stories')(sequelize, Sequelize);
db.userLikeContents = require('./user_like_contents')(sequelize, Sequelize);
db.storyCollections = require('./story_collections')(sequelize, Sequelize);
db.storyHashtags = require('./story_hashtags')(sequelize, Sequelize);
db.userCollections = require('./user_collections')(sequelize, Sequelize);
db.userLikeStories = require('./user_like_stories')(sequelize, Sequelize);
db.userSupportcreators = require('./user_support_creators')(sequelize, Sequelize);
db.creatorCateogory = require('./creator_category')(sequelize, Sequelize);
db.userInterest = require('./user_interest')(sequelize, Sequelize);
db.userCategory = require('./user_categories')(sequelize, Sequelize);

// 테이블 관계 연결
db.users.hasOne(db.creators, {foreignKey: 'user_id', targetKey: 'user_id'});
db.users.hasMany(db.contentComments, {foreignKey: 'user_id'});
db.users.hasMany(db.userSupportcreators, {foreignKey: 'user_id'});

db.creators.hasMany(db.stories, {foreignKey: 'creator_id'});
db.creators.hasMany(db.contents, {foreignKey: 'creator_id'});
db.creators.belongsTo(db.users, {foreignKey: 'user_id', targetKey: 'id'});
db.creators.hasMany(db.userSupportcreators, {foreignKey: 'creator_id'});
db.creators.hasMany(db.userFollowcreators, {foreignKey: 'creator_id'});

db.stories.hasMany(db.contents, {foreignKey: 'story_id'});
db.stories.hasMany(db.storyComments, {foreignKey: 'story_id'});
db.stories.hasMany(db.userLikeStories, {foreignKey: 'story_id'});
db.stories.hasMany(db.storyCollections, {foreignKey: 'story_id'});
db.stories.hasMany(db.storyHashtags, {foreignKey: 'story_id'});

db.contents.hasMany(db.contentComments, {foreignKey: 'content_id'});
db.contents.hasMany(db.userLikeContents, {foreignKey: 'content_id'});

db.hashtags.hasMany(db.storyHashtags, {foreignKey: 'hashtag_id'});

module.exports = db;

// model를 만들기위해 먼저 실행해야 하는 명령문
// sequelize-auto -h <host> -d <databaseName> -u <user> -x <password> -p <port> -e <sql type>