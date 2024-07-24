const router = require('express').Router();
const multer = require('multer');

const DIR = "./public/videos";
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');

createVideoFolder(DIR);
async function createVideoFolder(DIR) {
    try {
        if(!fs.existsSync(DIR)) {
            fs.mkdirSync(DIR);
        }
    }catch(err) {
        console.log(err);
    }
}

const Video = require('../models/Video');
const asyncHandler = require("express-async-handler");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file);
        console.log(req.params);
        const {genre} = req.params;
        let DIR = "./public/videos/" + genre
        async function createFolder() {
            try {
                if(!fs.existsSync(DIR)) {
                    fs.mkdirSync(DIR);
                }
            }catch(err) {
                console.log(err);
            }
        }
        createFolder();
        cb(null, DIR);
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + uniqueSuffix + path.extname(file.originalname));
    }
})

function fileFilter(req, file, cb) {
    if(file.mimetype.split("/")[0] === "video") {
        cb(null, true);
    }else {
        cb(new Error('Not a video file type'), false);
    }
} 

const upload = multer({storage,fileFilter, limits: {fileSize: 200_000_000}});

const {deleteVideo, similarVideo, putVideos, videoViews, likeVideo, 
    getVideo, postVideo, searchVideo, getVideoById, EditVideo, downloadVideo,
    searchVideoByCategoryAndGenre, searchVideoByGenre } = require("../controllers/videoController");

router.route("/video/:genre/post").post(upload.single("video"),postVideo);
router.route("/video/:category/category").get(getVideo);
router.route("/video/:videoId/get").get(getVideoById);
router.route("/video/:videoId/edit").put(upload.single("video"),EditVideo);
router.route("/video/:videoId/similar").get(similarVideo);
router.route("/video/:category/:genre/search3").get(searchVideoByCategoryAndGenre);
router.route("/video/:genre/search2").get(searchVideoByGenre);
router.route("/video/:videoId").put(putVideos).delete(deleteVideo);
router.route("/video/:searchId/search").get(searchVideo);
router.route("/video/:videoId/download").get(downloadVideo);
router.route("/video/:videoId/views").put(videoViews);
// like and dislike
router.route("/video/:videoId/likes").put(likeVideo);;
module.exports = router;