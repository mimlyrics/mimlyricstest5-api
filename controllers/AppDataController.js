const AppData = require('../models/AppData');
const asyncHandler = require('express-async-handler');
const createAppData = asyncHandler (async (req, res) => {
    const {about, genres} = req.body;
    const appData = await AppData.create({about: about, genres: genres});
    console.log(appData);
    return res.status(201).json({appData});
})

const deleteAppData = asyncHandler(async (req, res) => {
    const {dataId} = req.params;
    await AppData.findByIdAndDeleteOne({_id: dataId});
    return res.status(201).json({message: 'app data has been posted successfully'});
})

const getAppData = asyncHandler (async (req, res) => {
    const appData = await AppData.find({});
    return res.status(201).json({appData})
})

const editAppData = asyncHandler(async (req, res) => {
    const {dataId} = req.params;
    const appData = await AppData.findById({_id: dataId});
    if(dataId) {
        appData.about = req.body.about || appData.about;
        appData.genres = req.body.genres || appData.genres;
    }
    return res.status(201).json({appData});
})

module.exports = {createAppData, getAppData, deleteAppData, editAppData}