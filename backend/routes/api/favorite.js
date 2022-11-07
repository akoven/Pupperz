const express = require('express');
const asyncHandler = require('express-async-handler');
const {Favorite} = require('../../db/models');

const router = express.Router();

router.post('/', asyncHandler(async(req,res) =>{
    console.log('MADE IT TO POST ROUTE IN BACKEND!!!!!!!!!!!!!!!')
    console.log(req.body)
    const {userId, imageId, liked} = req.body;
    const newFaveImg = await Favorite.create({userId,imageId,liked});
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~',newFaveImg);
    return res.json(newFaveImg);
}));

router.get('/:userId', asyncHandler(async(req,res) =>{
    const userId = parseInt(req.params.userId, 10);
    const getFaveImages = await Favorite.findAll({where:{userId}});

    // const displayFaveImg = await UserImage.findAll({where:{imageId}})
    // const getUserFaves = await Favorite.findAll({where: {userId}});
    //try $and: if && doesn't work
    console.log('!!!!!!!!!!!!!!!!!!!!!!!User Faves!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',getFaveImages)
    return res.json(getFaveImages);
}));
//make a get request that takes in a user id
//query the favorites table for all instances where user id is used
//use the data to find all images that have been liked by the logged in user
//take  returned imageIds and query Image table with these ids to render imageUrl
router.delete('/:userId/:imageId', asyncHandler(async(req, res) =>{
    const userId = parseInt(req.params.userId, 10);
    const imageId = parseInt(req.params.imageId, 10);

    const deleteFaveImg = await Favorite.destroy({where:{imageId: imageId, userId:userId}});
    // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~',deleteFaveImg,'~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    // await deleteFaveImg.destroy();
    return res.status(204).end();
}));

module.exports = router;
