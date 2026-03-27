const mongoose = require('mongoose');
const Catway = require('./models/Catway');
const Reservation = require('./models/Reservation');
const fs = require('fs');
require('dotenv').config();

async function seedDatabase() {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connecté à MongoDB pour l'import");
        const data = JSON.parse(fs.readFileSync('./catways.json', 'utf-8'));
        await Catway.deleteMany({});
        console.log("Anciennes données supprimées.");
        await Catway.insertMany(data);
        console.log("Succès : les 24 catways ont été bien importés.");
        if (fs.existsSync('./reservations.json')) {
            const resData = JSON.parse(fs.readFileSync('./reservations.json', 'utf-8'));
            await Reservation.deleteMany({}); 
            await Reservation.insertMany(resData);
            console.log("Succès : les réservations ont été importées.");
        }
        process.exit();
    } catch (error){
        console.error("Erreur d'import :", error);
        process.exit(1);
    }
}

seedDatabase();