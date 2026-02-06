const express = require('express');
const router = express.Router();
const siteConfigController = require('../controllers/siteConfigController');
const auth = require('../middleware/auth');

router.get('/:key', siteConfigController.getConfig);
router.post('/', auth, siteConfigController.updateConfig);

module.exports = router;
