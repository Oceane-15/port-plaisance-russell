const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const catwayRoute = require('./routes/catway');
const reservationRoute = require('./routes/reservation');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connexion à MongoDB réussie'))
.catch((err) => console.error('Erreur de connexion :', err));

app.use('/api/catways', catwayRoute);
app.use('/api/catways', reservationRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));