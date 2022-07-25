'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    userId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    liked: DataTypes.BOOLEAN
  }, {});
  Favorite.associate = function(models) {
    // associations can be defined here
    Favorite.belongsTo(models.User,{foreignKey:'userId'});
    const columnMapping = {
      through: 'LikedPhoto',
      otherKey: 'userImageId',
      foreignKey:'favId'
    }
    Favorite.belongsToMany(models.UserImage,columnMapping);
  };
  return Favorite;
};
