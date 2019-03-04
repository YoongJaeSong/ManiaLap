/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('content_comments', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    text: {
      type: DataTypes.STRING(100),
      allowNull: false
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
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    content_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'contents',
        key: 'id'
      }
    }
  }, {
    tableName: 'content_comments'
  });
};
