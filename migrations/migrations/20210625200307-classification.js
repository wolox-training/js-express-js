'use strict';

const { scores, positions } = require('../../app/constants');

module.exports = {
  up: async (queryInterface, Sequelize) => [
    await queryInterface.createTable('classifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rating_user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' }
      },
      weet_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'weets', key: 'id' }
      },
      score: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: Object.values(scores)
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
    await queryInterface.addColumn('users', 'position', {
      allowNull: false,
      type: Sequelize.ENUM,
      values: Object.values(positions),
      defaultValue: positions.DEVELOPER
    })
  ],
  down: async queryInterface => [
    await queryInterface.dropTable('classifications'),
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_classifications_score'),
    await queryInterface.removeColumn('users', 'position'),
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_users_position')
  ]
};
