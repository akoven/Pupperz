const express = require('express');
const asyncHandler = require('express-async-handler');
const {Favorite} = require('../../db/models');

const router = express.Router();

router.post('/', asyncHandler(async(req,res) =>{
    const {userId, title} = req.body;
    const newFile = await Favorite.create({userId,title});
    return res.json(newFile);
}));

router.get('/', asyncHandler(async(req,res) =>{
    const getFaveImages = await Favorite.findAll();
    return res.json(getFaveImages);
}))

module.exports = router;
