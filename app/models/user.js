'use strict';

const { roles } = require('../constants');

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
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'last_name'
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.ENUM,
        values: Object.values(roles)
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
  return User;
};
