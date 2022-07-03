'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserImage = sequelize.define('UserImage', {
    imageUrl: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  UserImage.associate = function(models) {
    // associations can be defined here
    UserImage.belongsTo(models.User, {foreignKey:'userId'})
  };
  return UserImage;
};
