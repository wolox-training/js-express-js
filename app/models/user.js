'use strict';

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      tableName: 'users'
    }
  );
  user.associate = () => {
    // associations can be defined here
  };
  return user;
};
