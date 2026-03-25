const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getAllUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.render('users', {users}); 
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération des utilisateurs');
    }
};

exports.createUser = async (req, res) => {
    try{
        const {username, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.redirect('/users');
    } catch (error) {
        res.status(500).send('Erreur lors de la création de l\'utilisateur');
    }
};

exports.deleteUser = async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/users');
    } catch (error) {
        res.status(500).send('Erreur lors de la suppression');
    }
};