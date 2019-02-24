/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stories_collections', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    contents_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'contents',
        key: 'id'
      }
    },
    users_collections_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users_collections',
        key: 'id'
      }
    }
  }, {
    tableName: 'stories_collections'
  });
};
