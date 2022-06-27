const express = require('express');
const asyncHandler = require('express-async-handler');
const {Albums} = require('../../db/models/album');

const router = express.Router();

router.get('/', asyncHandler(async (_req,res) =>{
    const getAlbums = await Albums.findAll();
    return res.json(getAlbums);
}));
