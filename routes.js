const express = require('express');
const router = express.Router();
const controller = require('./controller.js');

router.get('/', controller.getAllBusinesses);

module.exports = router;
