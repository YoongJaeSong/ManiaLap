/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_flow_stories', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    users_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
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
    tableName: 'user_flow_stories'
  });
};
