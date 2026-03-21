const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.post('/:id/reservations', reservationController.create);
router.delete('/:id/reservations/:idReservation', reservationController.delete);
router.get('/:id/reservations', reservationController.getByCatway);

module.exports = router;
