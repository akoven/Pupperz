const express = require('express');
const asyncHandler = require('express-async-handler');
const {Image} = require('../../db/models');

const router = express.Router();

router.post('/', asyncHandler(async (req,res) =>{
    const {userId,albumId,imageUrl,content} = req.body;
    const newImage = await Image.create({userId, albumId, imageUrl, content});
    // console.log('Did I create a new album? ',newPhotoAlbum);
    return res.json(newImage);
}));

router.get('/', asyncHandler(async(req,res) =>{
    const getImages = await Image.findAll();
    return res.json(getImages);
}));

// router.put('/:id',asyncHandler(async(req,res) =>{
//     // console.log('made it to backend');
//     const albumId = parseInt(req.params.id);
//     const editAlbum = await Album.findByPk(albumId);
//     //or : await editAlbum.update({title: req.body.title}, {where:{id:albumId}})

//     await editAlbum.update({title: req.body.title})
//     return res.json(editAlbum);

// }));

// router.delete('/:id', asyncHandler(async (req,res) =>{
//     const albumId = parseInt(req.params.id);
//     const deletedAlbum = await Album.findByPk(albumId);
//     // const {userId,title} = req.body;
//     await deletedAlbum.destroy();
//     // return res.json(deletedAlbum);
//     res.status(204).end();

// }));


module.exports = router;
