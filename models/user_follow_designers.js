/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user_follow_designers', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        designers_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'designers',
                key: 'id'
            }
        }
    }, {
        tableName: 'user_follow_designers'
    });
};
