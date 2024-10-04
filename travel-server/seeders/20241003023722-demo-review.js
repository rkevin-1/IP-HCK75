'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      {
        content: 'Amazing destination, had a wonderful time!',
        rating: 5,
        UserId: 1, // Replace with valid UserId
        DestinationId: 1, // Replace with valid DestinationId
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Beautiful place, but quite expensive.',
        rating: 4,
        UserId: 2, // Replace with valid UserId
        DestinationId: 2, // Replace with valid DestinationId
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
