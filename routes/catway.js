const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');

router.get('/', catwayController.getAll);
router.get('/:id', catwayController.getById);
router.post('/', catwayController.create);
router.put('/:id', catwayController.update);
router.delete('/:id', catwayController.delete);

module.exports = router;