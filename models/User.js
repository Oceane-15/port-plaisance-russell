const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return /^(?=.*[A-Z])(?=.*\d).{5,}$/.test(v);
            },
            message: props => "Le mot de passe doit contenir au moins 5 caractères, une majuscule et un chiffre."
        }
    }
});

module.exports = mongoose.model('User', userSchema);