/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
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
    gender: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    phone: {
      type: DataTypes.CHAR(13),
      allowNull: true
    },
    token: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    fb_token: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    insta_token: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    kakao_token: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    support: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'users'
  });
};
