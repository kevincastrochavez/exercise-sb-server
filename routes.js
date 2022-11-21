const express = require('express');
const router = express.Router();
const controller = require('./controller.js');

router.get('/', controller.getAllBusinesses);
router.post('/', controller.createBusiness);
router.get('/:id', controller.getBusiness);
router.put('/:id', controller.updateBusiness);

module.exports = router;
