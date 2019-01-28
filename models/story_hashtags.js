/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('story_hashtags', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        hashtags_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        stories_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'stories',
                key: 'id'
            }
        }
    }, {
        tableName: 'story_hashtags'
    });
};
