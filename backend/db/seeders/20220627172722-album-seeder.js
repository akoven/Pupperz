'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Albums',[
      {
        userId: 1,
        title:'test-album'
      },
      {
        userId:2,
        title:'dogAlbum1'
      },
      {
        userId:2,
        title:'dogAlbum2'
      }

    ], {})
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Albums', null, {});
  }
};
