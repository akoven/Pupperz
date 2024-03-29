'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    userId: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER,
    liked: DataTypes.BOOLEAN
  }, {});
  Favorite.associate = function(models) {
    // associations can be defined here
    Favorite.belongsTo(models.User,{foreignKey:'userId'})
    Favorite.belongsTo(models.Image,{foreignKey:'imageId', onDelete:'CASCADE',hooks:'true'})
  };
  return Favorite;
};
