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
    Album.belongsTo(models.User,{foreignKey:'userId', onDelete:'CASCADE', hooks: true})
    Album.hasMany(models.Image,{foreignKey:'albumId', onDelete:'CASCADE', hooks: true});
  };
  return Album;
};
