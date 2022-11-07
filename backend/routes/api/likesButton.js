const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();

router.get('/:userId', asyncHandler(async(req,res) =>{
    const userId = parseInt(req.params.userId, 10);
    const getLikes = await Favorites.findAll()
}));
