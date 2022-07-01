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

router.get('/:albumId', asyncHandler(async(req,res) =>{
    const albumId = parseInt(req.params.albumId, 10);
    const getImages = await Image.findAll({where:{albumId}});
    // console.log(res.body);
    return res.json(getImages);
}));

router.get('/:userId', asyncHandler(async(req,res) =>{
    const userId = parseInt(req.params.userId);
    const getImages = await Image.findAll({where:{userId}});
    return res.json(getImages);
}));

router.put('/:id',asyncHandler(async(req,res) =>{
    // console.log('made it to backend');
    const imageId = parseInt(req.params.id, 10);
    const editImage = await Image.findByPk(imageId);
    //or : await editAlbum.update({title: req.body.title}, {where:{id:albumId}})
    //const editImage = await Image.findByPk(imageId) becomes unnecessary if the code above is
    //used instead
    console.log('REQUEST BODY: ',req.body);
    await editImage.update({imageUrl: req.body.imageUrl});
    await editImage.update({content: req.body.content});
    // await editImage.update();
    return res.json(editImage);

}));

router.delete('/:id', asyncHandler(async (req,res) =>{
    const imageId = parseInt(req.params.id, 10);
    // console.log(imageId);
    const deletedImage = await Image.findByPk(imageId);
    // console.log(deletedImage);
    await deletedImage.destroy();
    // return res.json(deletedAlbum);
    res.status(204).end();

}));


module.exports = router;
