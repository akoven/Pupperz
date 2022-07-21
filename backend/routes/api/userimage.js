const express = require('express');
const asyncHandler = require('express-async-handler');
const {UserImage} = require('../../db/models');

const router = express.Router();

router.post('/', asyncHandler(async(req,res) =>{
    const {userId, imageUrl, content} = req.body;
    const newImage = await UserImage.create({userId,imageUrl,content});
    return res.json(newImage);
}));

router.get('/:userId', asyncHandler(async(req,res) =>{
        console.log('get route for displaying logged in user images!!!');
        const userId = parseInt(req.params.userId, 10);
        console.log('user id from backend: ', userId);
        const getImages = await UserImage.findAll();
        console.log('images from api route!!! ', getImages);
        return res.json(getImages);
    }));
