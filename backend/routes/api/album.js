const express = require('express');
const asyncHandler = require('express-async-handler');
const {Albums} = require('../../db/models/album');
// const { check } = require('express-validator');


const router = express.Router();

// const validator = [
//     check('title')
//         .exists({checkFalsy: true})
//         .withMessage('Please provide a title for your album')
// ]

router.post('/', asyncHandler(async (req,res) =>{
    const {userId, title} = req.body;
    const newPhotoAlbum = await Albums.create({userId, title});
    console.log(newPhotoAlbum);
    return res.json(newPhotoAlbum);
}));

module.export = router;
