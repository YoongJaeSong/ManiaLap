/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stories', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    image_url: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true
    },
    private_status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
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
    creator_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'creators',
        key: 'id'
      }
    }
  }, {
    tableName: 'stories'
  });
};
