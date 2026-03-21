const Reservation = require('../models/Reservation');

exports.create = async (req, res) => {
    try{
        const reservation = new Reservation({
            catwayNumber: req.params.id,
            clientName: req.body.clientName,
            boatName: req.body.boatName,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        });
        await reservation.save();
        res.status(201).json(reservation);
    } catch (error){
        res.status(400).json({message: error.message});
    }
};

exports.delete = async (req, res) => {
    try{
        await Reservation.findByIdAndDelete(req.params.idReservation);
        res.status(200).json({message: "Réservation supprimée"});
    } catch (error){
        res.status(500).json({message: error.message});
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