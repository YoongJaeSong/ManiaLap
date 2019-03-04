/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_interest', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    interests_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'interests',
        key: 'id'
      }
    },
    users_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'user_interest'
  });
};
