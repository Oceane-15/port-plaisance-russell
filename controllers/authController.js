const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) =>{
    const{email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).send('Identifiants invalides');
        }

        const correct = await bcrypt.compare(password, user.password);
        if(!correct){
            return res.status(401).send('Identifiants invalides');
        }

        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        );

        res.cookie('token', token, {httpOnly: true});

        res.redirect('/api/catways/dashboard');
    } catch (error){
        res.status(500).send('Une erreur est survenue lors de la connexion');
    }
};

exports.logout = (req, res) =>{
    res.clearCookie('token');
    res.redirect('/login');
};