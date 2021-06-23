'use strict';

const { roles } = require('../../app/constants');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'role', {
      allowNull: false,
      type: Sequelize.ENUM,
      values: Object.values(roles),
      defaultValue: roles.REGULAR,
      after: 'last_name'
    }),
  down: async queryInterface => [
    await queryInterface.removeColumn('users', 'role'),
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_users_role')
  ]
};
