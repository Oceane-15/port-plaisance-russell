const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catwaySchema = new Schema({
    catwayNumber: {type: Number, required: true, unique: true, min:[0]},
    catwayType: {type: String, enum: ['long', 'short'], required: true},
    catwayState: {type: String, required: true}
});

module.exports = mongoose.model('Catway', catwaySchema);