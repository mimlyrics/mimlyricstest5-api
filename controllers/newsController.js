const News = require("../models/News");
const asyncHandler = require('express-async-handler');
const fs = require('fs');
const path = require('path');
const createNews = asyncHandler( async (req, res) => {
    console.log(req.body);
    //console.log(req.files);
    if(req.files) {
        let photox = [];    
        const {description, category, about} = req.body;
        console.log(req.files.length);
        for(i=0;i<req.files.length; i++) {
            photox.push(req.protocol + "://" + req.get("host") + "/" + req.files[i].path);
        }
        console.log(photox);
        //const news = new News({photos: photox, description: description, category: category, about: about});
        //await news.save();
        //console.log(news);
        const news = await News.create({photos: photox, description: description, category: category, about: about});
        console.log(news);
        return res.status(201).json({news});
    }else {
        const {description, category, about} = req.body;
        const news = await News.create({description: description, category:category, about: about});
        return res.status(201).json({news});
    }
})

const getAllNews = asyncHandler(async (req, res) => {
    const news = await News.find({}).sort({createdAt: -1});
    return res.status(201).json({news});
}) 

const getRecentNews = asyncHandler(async (req, res) => {
    const news = await News.find({}).limit(10);
})

const getRecentNewsByCategory = asyncHandler(async (req, res) => {
    const {category} = req.params;
    const news = await News.find({category: category});
    return res.status(201).json({news});

})

const getRecentNewsByAbout = asyncHandler(async (req, res) => {
    const {about} = req.params;
    const news = await News.find({about: about});
    return res.status(201).json({news});
})

const deleteNews = asyncHandler(async (req, res) => {
    const {newsId} = req.params;
    const news = await News.findByIdAndDeleteOne({_id: newsId});
    return res.status(201).json('news has been deleted successfully');
})

const editNews = asyncHandler(async (req, res) => {
    const {newsId} = req.params;
    const news = await News.findById({_id: newsId});
    if(news && news.photos) {
        const splitPhotoPath = news.photos[0].split(req.get("host"));
        const deletePhoto =  "." + splitPhotoPath;
        news.description = req.body.description || news.description;
        news.category = req.body.category || news.category;
        news.about = req.body.about || news.about
        await news.save();
        return res.status(201).json(news);
    }
})


module.exports = {createNews, deleteNews, editNews, getAllNews, getRecentNews, getRecentNewsByAbout, getRecentNewsByCategory};