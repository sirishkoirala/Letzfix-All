'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE "appointments"
      ADD COLUMN "isArchived" BOOLEAN DEFAULT FALSE;
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE "appointments"
      DROP COLUMN "isArchived";
    `);
  }
};
