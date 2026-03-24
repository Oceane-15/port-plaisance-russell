const Catway = require('../models/Catway');
const Reservation = require('../models/Reservation');

exports.getAllForDashboard = async () => {
    try {
        return await Catway.find(); 
    } catch (error) {
        throw error;
    }
};

exports.create = async (req, res) => {
    try{
        const catway = new Catway(req.body);
        await catway.save();
        res.redirect('/api/catways/dashboard');
    } catch (error){
        res.status(400).json({message: error.message});
    }
};

exports.getAll = async(req, res) => {
    try{
        const catways = await Catway.find();
        res.status(200).json(catways);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

exports.getById = async (req, res) => {
    try {
        const catway = await Catway.findById(req.params.id);
        if (catway) {
            const reservations = await Reservation.find({catwayNumber: catway.catwayNumber});
            res.render('catway_details', { catway, reservations});
        } else {
            res.status(404).send('Catway non trouvé');
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

exports.update = async (req, res) => {
    try{
        const catway = await Catway.findByIdAndUpdate
        (req.params.id,
            {catwayState: req.body.catwayState},
            {returnDocument: 'after'}
        );
        res.redirect('/api/catways/dashboard');
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

exports.delete = async (req, res) => {
    try{
        await Catway.findByIdAndDelete(req.params.id);
        res.redirect('/api/catways/dashboard');
    } catch (error){
        res.status(500).json({message: error.message});
    }
};