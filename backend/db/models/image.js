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
    Image.belongsTo(models.User,{foreignKey:'userId'})
    Image.belongsTo(models.Album,{foreignKey:'albumId'})
    Image.hasMany(models.Favorite, {foreignKey:'imageId'})
  };
  return Image;
};
