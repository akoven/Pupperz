'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    userId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    liked: DataTypes.BOOLEAN
  }, {});
  Favorite.associate = function(models) {
    // associations can be defined here
  };
  return Favorite;
};