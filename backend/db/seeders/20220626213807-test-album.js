'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Albums', [
    {
      title:'tester-album'
    }
   ],{})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Albums', {
      username: { [Op.in]: ['tester-album'] }
    }, {});
  }
};
