'use strict';
module.exports = (sequelize, DataTypes) => {
  const LikedPhoto = sequelize.define('LikedPhoto', {
    userImageId: DataTypes.INTEGER,
    favId: DataTypes.INTEGER
  }, {});
  LikedPhoto.associate = function(models) {
    // associations can be defined here
  };
  return LikedPhoto;
};