'use strict';

const { getPosition } = require('../helpers/utils');
const { roles, positions } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.UUIDV1
      },
      name: {
        require: true,
        type: DataTypes.STRING
      },
      lastName: {
        require: true,
        type: DataTypes.STRING,
        field: 'last_name'
      },
      email: {
        require: true,
        type: DataTypes.STRING
      },
      password: {
        require: true,
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.ENUM,
        values: Object.values(roles)
      },
      position: {
        type: DataTypes.ENUM,
        values: Object.values(positions)
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
      tableName: 'users'
    }
  );
  User.associate = models => {
    User.hasMany(models.Weet, { as: 'weets', foreignKey: 'user_id' });
    User.hasMany(models.Classification, { as: 'classifications', foreignKey: 'rating_user_id' });
  };
  User.prototype.getPosition = score => {
    const position = getPosition(score);
    return position;
  };
  return User;
};
