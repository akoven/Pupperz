const express = require('express');
const asyncHandler = require('express-async-handler');
const {Favorite} = require('../../db/models');

const router = express.Router();

router.post('/', asyncHandler(async(req,res) =>{
    const {userId, imageUrl, liked} = req.body;
    const newFave = await Favorite.create({userId,imageUrl,liked});
    return res.json(newFave);
}));

router.get('/', asyncHandler(async(req,res) =>{
    const getFaveImages = await Favorite.findAll();
    return res.json(getFaveImages);
}))

module.exports = router;
