'use strict';

let options = {};
if (process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Albums';
    return queryInterface.bulkInsert(options,[
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
    options.tableName = 'Albums';
    return queryInterface.bulkDelete(options, null, {});
  }
};
