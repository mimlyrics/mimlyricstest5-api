const router = require("express").Router();

const {TestSchemaModels} = require("../controllers/testController")

router.route('/test').get(TestSchemaModels)

module.exports = router;