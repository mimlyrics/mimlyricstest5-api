const router = require('express').Router();

const {HttpToHttps, HttpsToHttp} = require('../controllers/editorController');

router.route('/convert_http').put(HttpsToHttp);
router.route('/convert_https').put(HttpToHttps);

module.exports = router;