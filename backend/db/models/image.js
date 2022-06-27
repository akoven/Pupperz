'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imageUrl:{
      type:DataTypes.STRING,
      allowNull: false
    },
    content: {
      type:DataTypes.TEXT
    }
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
    Image.hasOne(models.User,{foreignKey:'userId'})
    Image.hasOne(models.Album,{foreignKey: 'albumId'})
  };
  return Image;
};
