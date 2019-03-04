/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('certification_applications', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    image: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    creators_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'creators',
        key: 'id'
      }
    }
  }, {
    tableName: 'certification_applications'
  });
};
