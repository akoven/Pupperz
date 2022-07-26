'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserImage = sequelize.define('UserImage', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    favoritesId:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    imageUrl: DataTypes.STRING,
    liked: DataTypes.BOOLEAN
  }, {});
  UserImage.associate = function(models) {
    // associations can be defined here
    UserImage.belongsTo(models.User, {foreignKey:'userId'})
    UserImage.belongsTo(models.Favorite,{foreignKey:'favoritesId'})
  };
  return UserImage;
};
