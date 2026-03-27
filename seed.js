const mongoose = require('mongoose');
const fs = require('fs');
const bcrypt = require('bcrypt');
require('dotenv').config();
const Catway = require('./models/Catway');
const Reservation = require('./models/Reservation');
const User = require('./models/User');

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

        await User.deleteMany({});
        const passwordToHash = process.env.ADMIN_PASSWORD || "DefaultPass123";
        const hashedPassword = await bcrypt.hash(passwordToHash, 10);
        const admin = new User({
            username: "Marie",
            email: "marie05@gmail.com",
            password: hashedPassword
        });
        await admin.save();
        console.log("Succès : L'utilisateur Marie a été créé avec le MDP du .env");
        console.log("\nBase de données prête pour le test");
        process.exit(0);

    } catch (error){
        console.error("Erreur seed :", error);
        process.exit(1);
    }
}

seedDatabase();