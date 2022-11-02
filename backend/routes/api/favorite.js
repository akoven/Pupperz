const express = require('express');
const asyncHandler = require('express-async-handler');
const {Favorite} = require('../../db/models');

const router = express.Router();

router.post('/', asyncHandler(async(req,res) =>{
    const {userId, imageId} = req.body;
    const newFaveImg = await Favorite.create({userId,imageId});
    return res.json(newFaveImg);
}));

router.get('/', asyncHandler(async(req,res) =>{
    const getFaveImages = await Favorite.findAll();
    return res.json(getFaveImages);
}))

module.exports = router;
