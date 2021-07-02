'use strict';

const db = require('./index');
const { scores } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  const Classification = sequelize.define(
    'Classification',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.UUIDV1
      },
      ratingUserId: {
        type: DataTypes.INTEGER,
        require: true,
        references: {
          model: db.User,
          key: 'id'
        },
        field: 'rating_user_id'
      },
      weetId: {
        type: DataTypes.INTEGER,
        require: true,
        references: {
          model: db.Weet,
          key: 'id'
        },
        field: 'weet_id'
      },
      score: {
        type: DataTypes.ENUM,
        values: Object.values(scores)
      },
      createdAt: {
        type: DataTypes.DATE,
        require: true,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    },
    {
      tableName: 'classifications'
    }
  );
  Classification.associate = models => {
    Classification.belongsTo(models.User, { as: 'user', foreignKey: 'rating_user_id' });
    Classification.belongsTo(models.Weet, { as: 'weet', foreignKey: 'weet_id' });
  };
  return Classification;
};
