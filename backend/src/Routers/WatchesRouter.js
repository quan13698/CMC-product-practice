const express = require('express');
const router = express.Router();
const homeController = require('../Apps/Controllers/homeController');

router.get('/home-page', homeController.homePage);

module.exports = router;