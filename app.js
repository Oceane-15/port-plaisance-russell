const verifyToken = require('./middleware/verifyToken');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const catwayRoute = require('./routes/catway');
const reservationRoute = require('./routes/reservation');
const userRoute = require('./routes/userRoutes');
const authRoute = require('./routes/auth');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(methodOverride('_method'));

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connexion à MongoDB réussie'))
.catch((err) => console.error('Erreur de connexion :', err));

app.use('/api/catways',verifyToken, catwayRoute);
app.use('/api/catways',verifyToken, reservationRoute);
app.use('/users',verifyToken, userRoute);
app.use('/', authRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));