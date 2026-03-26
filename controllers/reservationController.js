const Catway = require('../models/Catway');
const Reservation = require('../models/Reservation');

exports.create = async (req, res) => {
    try{
        const catway = await Catway.findById(req.params.id); 
        const reservation = new Reservation({
            catwayNumber: catway.catwayNumber, 
            clientName: req.body.clientName,
            boatName: req.body.boatName,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        });
        await reservation.save();
        res.redirect(`/api/catways/${req.params.id}`);
    } catch (error){
        res.status(400).send("Erreur : " + error.message);
    }
};

exports.delete = async (req, res) => {
    try{
        await Reservation.findByIdAndDelete(req.params.idReservation);
        res.redirect(`/api/catways/${req.params.id}`);
    } catch (error){
        res.status(500).send("Erreur : " + error.message);
    }
};

exports.getByCatway = async (req, res) => {
    try{
        const reservations = await Reservation.find({catwayNumber: req.params.id});
        res.status(200).json(reservations);
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

exports.getById = async (req, res) => {
    try {
        const catway = await Catway.findById(req.params.id);
        const reservations = await Reservation.find({catwayNumber: req.params.id});
        res.render('catway_details', {catway, reservations});
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.update = async (req, res) => {
    try {
        const {id_reservation, id} = req.params;
        const {clientName, checkIn, checkOut} = req.body;

        await Reservation.findByIdAndUpdate(id_reservation, {
            clientName,
            checkIn,
            checkOut
        });

        res.redirect(`/api/catways/${id}`);
    } catch (error) {
        res.status(500).send("Erreur lors de la modification");
    }
};