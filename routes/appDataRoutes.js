const { getAppData, createAppData, editAppData, deleteAppData } = require('../controllers/AppDataController');

const router = require('express').Router();

router.route('/appData').get(getAppData).post(createAppData);
router.route('/appData/:id').put(editAppData).delete(deleteAppData);

module.exports = router;