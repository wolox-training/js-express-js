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
  };
  return User;
};
