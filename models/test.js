/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('test', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    contentId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    contents_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'contents',
        key: 'id'
      }
    }
  }, {
    tableName: 'test'
  });
};
