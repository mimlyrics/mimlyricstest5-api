const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const Video = require("../models/Video");
const postVideo =  asyncHandler ( async (req, res) => {
    try {
        console.log("video__ has been posted");
        console.log(req.file);
        const {category, title, description, artists, genre, points, isPopular,
            country, isReviewed, isShort} = req.body;
        const pathx = req.protocol + "://" + req.get("host") + "/" + req.file.path;
        const video = new Video({path:pathx, 
             category: category, title:title, description: description, artists: artists, points: points,
              country: country, genre: genre , isPopular: isPopular, isReviewed: isReviewed, isShort: isShort });
        await video.save();
        return res.status(201).json({video});
    }catch(err) {
        console.log(err);
        console.log("An error occured ");
    }
})

const getVideo =  async (req, res) => {
    try {
        const {category} = req.params;
        const videos = await Video.find({category: category}).sort({createdAt:-1});
        return res.status(201).json({videos});
    }catch(err) {
        throw new Error(`Something went wrong, while trying get request for our videos`);
    }
}

const getVideoById = async (req, res) => {
    const {videoId} = req.params;
    try {
        const video = await Video.findById({_id: videoId});
        return res.status(201).json({video});
    }catch(err) {
        return res.status(404).json( {message: `Something went wrong, while trying get request for our videos`});
    }
}

/*const searchVideo = asyncHandler(async (req, res) => {
    const {searchId} = req.params;
    const searchvideos = await Video.find({$or: [{title:searchId}, {category:searchId}, {artistName:searchId}, {description: searchId}]});
    if(searchvideos) {
        return res.status(201).json({searchvideos});
    }else{
        return res.status(404).json({message:`No videos with such id`});
    }
})*/

const searchVideo = asyncHandler(async (req, res) => {
    const {searchId} = req.params;
    const svideos = await Video.find({});
    if(svideos) {
        const videos = svideos.filter(video => video.title.toLowerCase().includes(searchId.toLowerCase()));
        if(!videos) {
            videos = svideos.filter(video => video.artists[0].toLowerCase().includes(searchId.toLowerCase()));
        }
        if(!videos) {
            videos = svideos.filter(video => video.category.toLowerCase().includes(searchId.toLowerCase()));
        }if(!videos) {
            console.log("humm");
            videos = svideos.filter(video => video.country.toLowerCase().includes(searchId.toLowerCase()));
        }
        console.log(videos);
        return res.status(201).json({videos});
    }
})

const searchVideoByGenre = asyncHandler(async (req, res) => {
    const {genre} = req.params;
    const videos = await Video.find({genre: genre}).sort({createdAt: -1});
    return res.status(201).json({videos});
})

const searchVideoByCategoryAndGenre = asyncHandler( async (req,res) => {
    const {genre, category} = req.params;
    const videos = await Video.find({$and: [{category: category}, {genre: genre}]}).sort({createdAt:-1});
    return res.status(201).json({videos})
})

const deleteVideo =  asyncHandler( async (req, res) => {
    const {videoId} = req.params;
    console.log("Hey bro");
    const video = await Video.findByIdAndDelete({_id: videoId});
    console.log(video.pathx);
    if(video.path) {
        const splitVideo = video.path.split(":5000");
        const deletevideo = "." + splitVideo[1];
        console.log(deletevideo);
        fs.unlink(deletevideo, (err) => {
            if (err) throw err;
            console.log("file has been deleted successfully");
        });
    }
    return res.status(200).json('successfully deleted file'); 
})

const likeVideo = asyncHandler (async (req, res) => {
    const {userId} = req.body;
    const {videoId} = req.params;
    const likeExists = await Video.findOne({_id:videoId}).where({'likes': userId });
    console.log(likeExists);
    if(likeExists) {
        const video = await Video.findByIdAndUpdate({_id: videoId}, {$pull: {likes: userId}}, {new: true, validator: true, includeResultMetadata: true});
        console.log('existed and has been pulled');
        if(video) {
            return res.status(201).json({video:video.value});
        }
    }else {
        const video = await Video.findByIdAndUpdate({_id: videoId}, {$push: {likes: userId}}, {new: true, validator: true, includeResultMetadata: true});
        console.log(video);
        console.log("not existed and has been pushed");
        if(video) {
            return res.status(201).json({video:video.value});
        }
    }
})

const videoViews = asyncHandler(  async (req, res) => {
    const {videoId} = req.params;
    const video = await Video.updateOne({_id: videoId}, {$inc: {views:1}}, {new:true, validator: true});
    console.log(video);
    if(video) {
        return res.status(201).json({video});
    }
})

const downloadVideo = async (req, res) => {
    const {videoId} = req.params;
    const video = await Video.findById({_id:videoId});
    if(video) {
        const splitVideo = video.path.split(":5000");
        const downloadVideoPath = "." + splitVideo[1];
        res.download(downloadVideoPath, function(err) {
            console.log(err);
        })
    }else {
        return res.status(400).json({message: `Error while trying to download the file`});
    }
}

const EditVideo = async (req, res) => {
    const {videoId} = req.params
    const video = await Video.findById({_id:videoId});
    console.log(video);
    if(video) {
        video.artists = req.body.artists || video.artists,
        video.genre = req.body.genre || video.genre;
        video.title = req.body.title || video.title,
        video.description = req.body.description || video.description
        video.country = req.body.country || video.country
        video.category = req.body.category || video.category
        video.points = req.body.points || video.points
        video.famous = req.body.famous || video.famous
        video.isShort = req.body.isShort || video.isShort
        await video.save();
        return res.status(201).json({video});
    }else {
        return res.status(404).json({message: `No video with such id`});
    }
}

const similarVideo = asyncHandler(async (req, res) => {
   const {genre, country, room} = req.params;
    const videos = await Video.find({$or: [{genre: genre}, {country: country}, {room:room}] }).sort({createdAt: -1});
    return res.status(201).json({videos});    
})

const putVideos = async (req, res) => {
    console.log(req.params);
    /*const {id} = req.params;
    let {views} = req.body;
    parseInt(views);
    views +=views;
    const video = await Video.findById({_id: id});
    if(video) {
        video.views = parseInt(video.views) + 1 || views
    }
    return res.status(201).json({video});*/
}

module.exports = {postVideo, similarVideo, videoViews, likeVideo, getVideo, 
    putVideos, deleteVideo, searchVideo, searchVideoByGenre, searchVideoByCategoryAndGenre, getVideoById, EditVideo, downloadVideo};