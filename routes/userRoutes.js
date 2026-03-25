const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.post('/add', userController.createUser);
router.post('/delete/:id', userController.deleteUser);

module.exports = router;