const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const DIR = './public/news';

const createNewsFolder =  async (DIR) => {
    try {
        if(!fs.existsSync(DIR)) {
            fs.mkdirSync(DIR)
        }
    }catch(err) {
        console.log(err);
    }
}

createNewsFolder(DIR);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DIR);        
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + Math.floor(Math.random() * 1E9);
        cb(null, file.fieldname + "_" + uniqueSuffix + path.extname(file.originalname));
    }
})

function fileFilter (req, file, cb) {
    if(file.mimetype.split("/")[0] === 'image') {
        cb(null, true);
    }else {
        cb(new Error ('file not of the correct type'));
    }
}

const upload = multer({storage, fileFilter});

const {createNews, editNews, getAllNews, getRecentNews, getRecentNewsByAbout, getRecentNewsByCategory}  = require('../controllers/newsController');

router.route('/news').post(upload.array('files', 5), createNews);
router.route('/news/:category/category').get(getRecentNewsByCategory);
router.route('/news/:about/about').get(getRecentNewsByAbout);
router.route('/news/:id/edit').put(editNews);
router.route('/news').get(getAllNews);
router.route('/news/recents').get(getRecentNews);

module.exports = router;