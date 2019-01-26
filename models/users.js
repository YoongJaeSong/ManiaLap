/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        description: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        phone: {
            type: DataTypes.CHAR(13),
            allowNull: true
        },
        profile_image_url: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        token: {
            type: DataTypes.STRING(60),
            allowNull: true
        },
        fb_token: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        insta_token: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        gender: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        },
        desginer: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        }
    }, {
        tableName: 'users'
    });
};
