require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 
const User = require('./models/User');

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await User.deleteOne({ email: "marie05@gmail.com" });

       
        const saltRounds = 10;
        const plainPassword = "Essaiencore1fois008";
        
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
      

        const newAdmin = new User({
            username: "Marie",
            email: "marie05@gmail.com",
            password: hashedPassword 
        });

        await newAdmin.save();
        console.log("Marie a été créée avec un mot de passe HACHÉ !");
    } catch (err) {
        console.error("Erreur :", err.message);
    } finally {
        mongoose.connection.close();
    }
}
createAdmin();