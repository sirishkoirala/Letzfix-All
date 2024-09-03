'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    ALTER TABLE "users" 
    ADD COLUMN "storeId" INTEGER;
`)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE "users"
      DROP COLUMN "storeId";
    `);
  }
};
