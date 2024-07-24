const router = require('express').Router();
const multer = require("multer");
const path = require("path");
const DIR = "./public/artist";
const fs = require("fs");
const { getAllArtist, getArtistById, createArtist, getArtistName, editArtist, deleteArtist, getFriends, getArtistByLetter } = require('../controllers/artistController');

const artistFolder = async (DIR) => {
    try {
        if(!fs.existsSync(DIR)) {
            fs.mkdirSync(DIR);
        }else {

        }
    }catch(error) {
        console.log("err");
        console.error(error);
    }
}
artistFolder(DIR);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DIR);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() +  Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "_" + uniqueSuffix + path.extname(file.originalname));
    }
})

function fileFilter(req, file, cb) {
    console.log(file);
    if(file.mimetype.split("/")[0] === "image") {
        cb(null, true);
    }
    else {
        cb(new Error('File not of the correct type'), false);
    }
}

const upload = multer({storage: storage })

router.route("/artist").post(upload.single("photo"), createArtist).get(getAllArtist);
router.route("/artistName").get(getArtistName);
router.route("/artist/friends").get(getFriends);
router.route("/artist/:artistId").put(upload.single("photo"), editArtist).delete(deleteArtist).get(getArtistById);
router.route("/artist/:letter/search").get(getArtistByLetter)
module.exports = router;
