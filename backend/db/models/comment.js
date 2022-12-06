'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    userImageId: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.User,{foreignKey:'userId', onDelete:'CASCADE', hooks:'true'})
    Comment.belongsTo(models.UserImage,{foreignKey:'userImageId', onDelete:'CASCADE', hooks:'true'})
  };
  return Comment;
};
