/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('creator_category', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    creator_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'creators',
        key: 'id'
      }
    },
    category_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      }
    }
  }, {
    tableName: 'creator_category'
  });
};
