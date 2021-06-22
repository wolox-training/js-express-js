'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'role', {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0,
      after: 'last_name'
    }),
  down: queryInterface => queryInterface.removeColumn('users', 'role')
};
