const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');

router.get('/', catwayController.getAll);
router.post('/', catwayController.create);

module.exports = router;