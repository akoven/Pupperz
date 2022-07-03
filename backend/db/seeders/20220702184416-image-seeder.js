'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('UserImage', [{
        imageUrl: 'https://chico.ca.us/sites/main/files/imagecache/lightbox/main-images/dog_license.jpg',
        userId: 1
        },
        {
          imageUrl: 'https://cdn.britannica.com/49/161649-050-3F458ECF/Bernese-mountain-dog-grass.jpg?q=60',
          userId: 1
        },
        {
          imageUrl: 'http://cdn.akc.org/content/article-body-image/lab_puppy_dog_pictures.jpg',
          userId: 1
        },
        {

        },
        {
          imageUrl: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg',
          userId: 1
        },
        {
          imageUrl: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*',
          userId: 1
        },
        {
          imageUrl: 'https://e3.365dm.com/22/05/2048x1152/skynews-pug-dog_5774995.jpg',
          userId: 1
        },
        {
          imageUrl: 'https://content.fortune.com/wp-content/uploads/2019/01/boo.jpg',
          userId: 1
        },
        {
          imageUrl: 'https://media.nature.com/lw800/magazine-assets/d41586-020-01443-0/d41586-020-01443-0_17985512.jpg',
          userId: 1
        }
      ], {});

  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('UserImages', {
      userId: { [Op.in]: [1] }
    }, {});
  }
};
