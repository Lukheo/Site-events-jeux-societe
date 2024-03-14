const { Op } = require('sequelize');
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');
const { Request, Response } = require('express');
const User = require('../models/userModel')

module.exports = {
    list: async (req, res) => {

    },
    get: (req, res) => {  // Donne la page d'inscription
        const navInscription = true // sert à mettre le lien active 
        res.render('user_create', { navInscription })
    },
    post: async (req, res) => { // enregistre un user dans la base
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('user_create', { errors: errors.array() });
        }
        // Application du trim sur les valeurs des champs

        const prenom = req.body.prenom.trim();
        const nom = req.body.nom.trim()
        const email = req.body.email.trim();
        const password = req.body.password;


        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: email }
                ]
            }
        })
        if (user) {
            const error = "Ces identifiants existent déjà"
            return res.render('user_create', { error })
        } else {
            await User.create({
                prenom: prenom,
                nom: nom,
                email: email,
                password: password
            })
            return res.redirect('/')
        }
    },
    getAccount: async (req, res) => {
        const account = await User.findByPk(req.params.id, { raw: true })
        res.render('my_account', { account })
    },
    getLogin: async (req, res) => { // Renvoie la page de connexion
        res.render('log_in')
    },
    postLogin: async (req, res) => { //
        // cherche en base l'utilisateur par son email 
        const user = await User.findOne({
            where: {email: req.body.email}
        })
        if (!user) { //si on trouve pas d'user -> retour à la page de inscription
            res.redirect('/user/register')
        } else {
            //sinon 
            // compare les mot de passe (formulaire, base de donnée)
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                //si faux 
                if (!result) {
                    // -> renvoie sur la page login
                    res.status(401).render('log_in', { 'error': 'identifiant incorrect' })
                } else {
                    //sinon inscription dans la session
                    req.session.prenom = user.prenom
                    res.redirect('/')
                }
            })

        }

    },
    logout: (req, res) => {
        req.session.destroy()
        res.redirect('/')
    }
}