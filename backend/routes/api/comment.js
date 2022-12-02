const express = require('express');
const asyncHandler = require('express-async-handler');
const {Comment} = require('../../db/models');

const router = express.Router();

router.post('/', asyncHandler(async(req,res) =>{
    const {userId, userImageId, comment} = req.body;
    const newComment = await Comment.create({userId, userImageId, comment});
    return res.json(newComment);
}));

router.get('/:imageId', asyncHandler(async(req,res) =>{
    const imageId = parseInt(req.params.imageId, 10);
    const getComments = await Comment.findAll({where:{userImageId: imageId}});
    return res.json(getComments);
}));

router.delete('/:id', asyncHandler(async(req, res) =>{
    const commentId = parseInt(req.params.id, 10);
    // const deletedComment = await Comment.findByPk(commentId);
    // await deletedComment.destroy();
    const deletedComment = await Comment.destroy({where:{id: commentId}});

    res.status(204).end();
}));

module.exports = router;
