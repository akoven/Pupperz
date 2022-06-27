'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    userId: DataTypes.INTEGER,
    title:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        len:[1,20]
      }
    }
  }, {});
  Album.associate = function(models) {
    // associations can be defined here
    Album.hasOne(models.User,{foreignKey:'userId'})
  };
  return Album;
};
