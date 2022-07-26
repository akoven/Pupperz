const express = require('express');
const asyncHandler = require('express-async-handler');
const {UserImage} = require('../../db/models');

const router = express.Router();

router.post('/', asyncHandler(async(req,res) =>{
    const {userId, imageUrl, liked} = req.body;
    const newImage = await UserImage.create({userId,imageUrl,liked});
    return res.json(newImage);
}));

router.get('/:userId', asyncHandler(async(req,res) =>{
    console.log('get route for displaying logged in user images!!!');
    const userId = parseInt(req.params.userId, 10);
    console.log('user id from backend: ', userId);
    const getImages = await UserImage.findAll({where:{userId}});
    console.log('images from api route!!! ', getImages);
    return res.json(getImages);
}));

router.get('/', asyncHandler(async(req,res) =>{
    const getAllImages = await UserImage.findAll();
    console.log('images from api route!!! ', getAllImages);
    return res.json(getAllImages);
}))

router.delete('/:id', asyncHandler(async(req,res) =>{
    const imageId = Number(req.params.id);
    const deletedImage = await UserImage.findByPk(imageId);
    await deletedImage.destroy();
    res.status(204).end();
}))

module.exports = router;
