'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'user1@example.com',
        password: await bcrypt.hash('password123', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user2@example.com',
        password: await bcrypt.hash('password123', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
