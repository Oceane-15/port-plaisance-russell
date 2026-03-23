const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');

router.get('/dashboard', async (req, res) => {
    try {
        const catways = await catwayController.getAllForDashboard();
        res.render('dashboard', { catways });
    } catch (error) {
       res.status(500).send("L'erreur est : " + error.message);
    }
});

router.get('/', catwayController.getAll);
router.get('/:id', catwayController.getById);
router.post('/', catwayController.create);
router.put('/:id', catwayController.update);
router.delete('/:id', catwayController.delete);

module.exports = router;