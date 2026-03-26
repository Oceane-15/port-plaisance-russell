const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', (req, res) => {
    res.redirect('/login');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;