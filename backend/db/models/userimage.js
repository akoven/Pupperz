'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserImage = sequelize.define('UserImage', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imageUrl:{
      type: DataTypes.STRING,
      allowNull: false
    },
    // favoriteId:DataTypes.INTEGER,
    liked:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  UserImage.associate = function(models) {
    // associations can be defined here
    UserImage.belongsTo(models.User,{foreignKey:'userId'});
    const columnMapping = {
      through: 'LikedPhoto',
      otherKey: 'favId',
      foreignKey:'userImageId'
    }
    UserImage.belongsToMany(models.Favorite,columnMapping);
  };
  return UserImage;
};
