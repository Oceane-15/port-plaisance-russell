const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');

router.get('/', catwayController.getAll);
router.get('/:id', catwayController.getById);
router.post('/', catwayController.create);

module.exports = router;