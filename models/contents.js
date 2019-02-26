/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contents', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
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
    stories_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'stories',
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
    tableName: 'contents'
  });
};
