const express = require('express');
const asyncHandler = require('express-async-handler');
const {Comment} = require('../../db/models');

const router = express.Router();

router.post('/:userId/:imageId', asyncHandler(async(req,res) =>{
    const {userId, imageId, content} = req.body;
    const newComment = await Comment.create({userId, imageId, content});
    return res.json(newComment);
}));

router.get('/:imageId', asyncHandler(async(req,res) =>{
    const imageId = parseInt(req.params.imageId, 10);
    const getComments = await Comment.findAll({where:{imageId}});
    return res.json(getComments);
}));

module.exports = router;
