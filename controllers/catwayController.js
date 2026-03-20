const Catway = require ('../models/Catway');

exports.create = async (req, res) => {
    try{
        const catway = new Catway(req.body);
        await catway.save();
        res.status(201).json(catway);
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