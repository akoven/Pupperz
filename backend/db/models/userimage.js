'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserImage = sequelize.define('UserImage', {
    userId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING
  }, {});
  UserImage.associate = function(models) {
    // associations can be defined here
    UserImage.belongsTo(models.User,{foreignKey:'userId'})
  };
  return UserImage;
};
