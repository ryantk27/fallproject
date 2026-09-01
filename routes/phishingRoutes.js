const express = require('express');
const router = express.Router();
const phishingController = require('../controllers/phishingController');

router.post('/check', phishingController.checkUrl);
router.post('/add', phishingController.addUrl);
router.get('/all', phishingController.getAllUrls);

module.exports = router;