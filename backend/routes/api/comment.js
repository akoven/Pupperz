const express = require('express');
const asyncHandler = require('express-async-handler');
const {Comment} = require('../../db/models');

const router = express.Router();

router.post('/', asyncHandler(async(req,res) =>{
    const {userId, imageId, comment} = req.body;
    const newComment = await Comment.create({userId, imageId, comment});
    return res.json(newComment);
}));

router.get('/:imageId', asyncHandler(async(req,res) =>{
    const imageId = parseInt(req.params.imageId, 10);
    const getComments = await Comment.findAll({where:{imageId}});
    return res.json(getComments);
}));

module.exports = router;
