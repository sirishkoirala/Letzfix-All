'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        firstName: 'Harry',
        lastName: 'puttar',
        email: 'HP@gmail.com',
        password: 'admin',
        isVerified: false,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        password: 'admin',
        isVerified: false,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Robert',
        lastName: 'Garcia',
        email: 'robert.garcia@example.com',
        password: 'admin',
        isVerified: false,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Jessica',
        lastName: 'Williams',
        email: 'jessica.williams@example.com',
        password: 'admin',
        isVerified: false,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Daniel',
        lastName: 'Martinez',
        email: 'daniel.martinez@example.com',
        password: 'admin',
        isVerified: false,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Sarah',
        lastName: 'Davis',
        email: 'sarah.davis@example.com',
        password: 'admin',
        isVerified: false,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
