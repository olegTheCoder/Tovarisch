"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Incidents",
      [
        {
          title: "Пожар",
          description: "Горит гараж",
          category: "nature",
          address: "Москва",
          coords: [55.75, 37.61],

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Потоп",
          description: "Горит гараж",
          category: "tech",
          address: "Москва",
          coords: [55.7545, 37.6134],

          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Incidents", null, {});
  },
};
