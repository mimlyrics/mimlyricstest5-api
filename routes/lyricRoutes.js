const router = require('express').Router();
const multer = require('multer');
const DIR = "./public/lyrics";
const path = require('path');
const fs = require('fs');

async function createLyricsFolder(DIR) {
    try {
        if(!fs.existsSync(DIR)) {
            fs.mkdirSync(DIR);    
        }
    }catch(err) {
        console.log(err);
    }
}

const Lyric = require("../models/Lyric");
const asyncHandler = require("express-async-handler");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        createLyricsFolder(DIR);
        cb(null, DIR);
    },
    filename: function(req, file, cb) {
        console.log(file);
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "_" + uniqueSuffix + path.extname(file.originalname) );
    }
})

function fileFilter(req, file, cb) {
    if(file.mimetype.split("/")[0] === "image") {
        cb(null, true);
    }else {
        cb(new Error('Not an audio file type'), false);
    }
} 

function fileFilter1(req, file, cb) {
    if(file.mimetype.split("/")[0] === "image") {
        cb(null, true);
    }else {
        cb(new Error('Not an image file type'), false)
    }
}

function fileFilter2(req, file, cb) {
    if(file.mimetype.split("/")[0] === "audio") {
        cb(null, true);
    }else {
        cb(new Error('Not an audio file typr'), false);
    }
}

const ROOM_URL = "/api/v1/room";
const LYRIC_URL = "/api/v1/lyric";
const GET_LYRIC_URL = "/api/v1/lyric/get";
const EDIT_LYRIC_URL = "/api/v1/lyric/edit";
const DELETE_LYRIC_URL = "/api/v1/lyric";
const VIEWS_LYRIC_URL = "/api/v1/lyric/views";
const LIKES_LYRIC_URL = "/api/v1/lyric/likes";
const RECOMMENDED_LYRIC_URL = "/api/v1/lyric/recommendation";
const SEARCH_LYRIC_URL = "/api/v1/lyric/search";

//const upload = multer({storage,limits: {fileSize: 2000_000_000}});
const upload1 = multer({storage, fileFilter1, limits: {fileSize: 40_000_000} });
const upload2 = multer({storage, fileFilter2, limits: {fileSize: 250_000_000}})
const { searchLyrics, EditLyric, deleteLyric, postLyric, createLyric, createPhotoCover, getLyric, 
    getLyricById, lyricViews, likeLyric, updateOnlyLyric, lyricRecommendation} = require("../controllers/lyricController");
//router.route("/lyric").post(upload.array("files", 2),postLyric);
router.route("/lyric/:id/cover").put(upload1.single("photo"), createPhotoCover);
router.route("/lyric").post(upload2.single("audio"),createLyric);
router.route("/lyric/:category").get(getLyric);
router.route("/lyric/get/:id").get(getLyricById);
router.route("/onlyLyric/:id").put(updateOnlyLyric);
//router.route("/lyric/edit/:id").put(upload.array("files", 2),EditLyric);
router.route("/lyric/:id").delete(deleteLyric);
router.route("/lyric/search/:searchId").get(searchLyrics);
router.route("/lyric/views/:mediaId").put(lyricViews);
router.route("/lyric/likes/:mediaId").put(likeLyric);
router.route("/lyric/:category/recommendation").put(lyricRecommendation);
module.exports = router;