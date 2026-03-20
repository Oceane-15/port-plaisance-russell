const express = require('express');
const mongoose = require('mongoose');
const catwayRoute = require('./routes/catway');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connexion à MongoDB réussie'))
.catch((err) => console.error('Erreur de connexion :', err));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/catways', catwayRoute);

app.set('view engine' , 'ejs');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));