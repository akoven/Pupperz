'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {});
  Favorite.associate = function(models) {
    // associations can be defined here
    Favorite.belongsTo(models.User,{foreignKey:'userId'})
    // Favorite.hasMany(models.UserImage,{foreignKey:'favoritesId'})
  };
  return Favorite;
};
