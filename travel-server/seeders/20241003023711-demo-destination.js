'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Destinations', [
      {
        name: 'Beach Paradise',
        description: 'A beautiful beach destination with clear waters and white sands.',
        location: 'Maldives',
        price: 1500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mountain Escape',
        description: 'A serene mountain getaway with stunning views.',
        location: 'Switzerland',
        price: 2000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Destinations', null, {});
  }
};
