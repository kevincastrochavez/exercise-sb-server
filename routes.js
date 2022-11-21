const express = require('express');
const router = express.Router();
const controller = require('./controller.js');

router.get('/', controller.getAllBusinesses);
router.get('/:id', controller.getBusiness);

module.exports = router;
