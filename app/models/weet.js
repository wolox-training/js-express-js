'use strict';

const db = require('./index');

module.exports = (sequelize, DataTypes) => {
  const Weet = sequelize.define(
    'Weet',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.UUIDV1
      },
      content: {
        type: DataTypes.STRING
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: db.User,
          key: 'id'
        },
        field: 'user_id'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    },
    {
      tableName: 'weets'
    }
  );
  Weet.associate = models => {
    Weet.belongsTo(models.User, { as: 'user' });
  };
  return Weet;
};
