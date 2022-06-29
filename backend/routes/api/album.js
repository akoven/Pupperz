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
    // console.log('made it to backend');
    const albumId = parseInt(req.params.id);
    const editAlbum = await Album.findByPk(albumId);
    //or : await editAlbum.update({title: req.body.title}, {where:{id:albumId}})

    await editAlbum.update({title: req.body.title})
    return res.json(editAlbum);

}));

router.delete('/:id', asyncHandler(async (req,res) =>{
    const albumId = parseInt(req.params.id);
    const deletedAlbum = await Album.findByPk(albumId);
    // const {userId,title} = req.body;
    await deletedAlbum.destroy();
    // return res.json(deletedAlbum);
    res.status(204).end();
}));


module.exports = router;
