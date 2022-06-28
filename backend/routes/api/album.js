const express = require('express');
const asyncHandler = require('express-async-handler');
const {Album} = require('../../db/models');
// const { check } = require('express-validator');


const router = express.Router();

// const validator = [
//     check('title')
//         .exists({checkFalsy: true})
//         .withMessage('Please provide a title for your album')
// ]

router.post('/', asyncHandler(async (req,res) =>{
    const {userId, title} = req.body;
    const newPhotoAlbum = await Album.create({userId, title});
    // console.log('Did I create a new album? ',newPhotoAlbum);
    return res.json(newPhotoAlbum);
}));

router.get('/', asyncHandler(async(req,res) =>{
    const getAlbums = await Album.findAll();
    return res.json(getAlbums);
}));

router.put('/:id',asyncHandler(async(req,res) =>{
    const id = await Album.update(req.body);
    const editAlbum = await Album.one(id);
    return res.json(editAlbum);
}));


module.exports = router;
