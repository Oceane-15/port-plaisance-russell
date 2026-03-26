const jwt = require('jsonwebtoken');
const User = require('../models/User');
const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');

router.get('/dashboard', async (req, res) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        
        const catways = await catwayController.getAllForDashboard();

        res.render('dashboard', { 
            catways, 
            user: user, 
            date: new Date().toLocaleDateString('fr-FR') 
        });
    } catch (error) {
       res.redirect('/login');
    }
});

  

router.get('/', catwayController.getAll);
router.get('/:id', catwayController.getById);
router.post('/', catwayController.create);
router.put('/:id', catwayController.update);
router.delete('/:id', catwayController.delete);

module.exports = router;