'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Tasks', [
      {
        title: 'Tarea de ejemplo 1',
        area: 'Desarrollo',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Tarea de ejemplo 2',
        area: 'Marketing',
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Tarea de ejemplo 3',
        area: 'Finanzas',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
