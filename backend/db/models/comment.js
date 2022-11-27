'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.User,{foreignKey:'userId', onDelete:'CASCADE', hooks:'true'})
    Comment.belongsTo(models.Image,{foreignKey:'imageId', onDelete:'CASCADE', hooks:'true'})
  };
  return Comment;
};
