const router = require("express").Router();
const {createAlbum, audioAlbum , getRecentAlbum, getAlbums, clearAlbums, deleteAlbum,
    editAlbum2, editAlbum, searchAlbums, updateAlbum, createPhotoCover, getAlbumsByCountry, getAlbumById, getAlbumsByGenre} = require("../controllers/albumController");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

async function createFolder(albumId) {
    const DIR = "./public/album/" + albumId
    try {
        if(!fs.existsSync(DIR)) {
            fs.mkdirSync(DIR);
        }
    }catch(err) {
        console.log(err);
    }
    return DIR;
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(file);
        console.log(req.params);
        const {albumId} = req.params;
        let DIR = "./public/album/" + albumId
        async function createFolder(albumId) {
            try {
                if(!fs.existsSync(DIR)) {
                    fs.mkdirSync(DIR);
                }
            }catch(err) {
                console.log(err);
            }
        }
        createFolder(albumId);
        cb(null, DIR);
    },
    filename: function(req,file,cb) {
        const uniqueSuffix = Date.now() + Math.round(Math.random() *1E9);
        cb(null, file.fieldname + uniqueSuffix + path.extname(file.originalname));
    }
})

function fileFilter(req, file, cb) {
    if(file.mimetype.split("/")[0] === 'audio' || file.mimetype.split("/")[1] === 'image') {
        cb(null, true);
    }else {
        cb(new Error('file not of correct type'), false);
    }
}

const upload = multer({storage});
router.route("/album").post(createAlbum).get(getRecentAlbum);
router.route("/album/audios/:albumId").put(upload.array("files", 25), audioAlbum);
router.route("/album/edit2/:albumId").put(editAlbum2);
router.route("/album/edit/:albumId").put( upload.single("file"), editAlbum);
router.route("/album/audio").put(audioAlbum);
router.route("/album/:albumId").delete(deleteAlbum).put(upload.single("file"), createPhotoCover);
router.route("/album/edit1/:albumId").put(upload.single("photo"), updateAlbum);
router.route("/album/:category").get(getAlbums).delete(clearAlbums);
router.route("/album/search/:searchId").put(searchAlbums);
router.route("/album/get/:albumId").get(getAlbumById);
router.route("/album/getCountry/:country").get(getAlbumsByCountry);
router.route("/album/:genre/genre").get(getAlbumsByGenre);
module.exports = router;