const { Op } = require('sequelize');
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');
const { Request, Response } = require('express');
const User = require('../models/userModel');
const Event = require('../models/eventModel')
const EventUser = require('../models/eventUserModel');

module.exports = {
    list: async (req, res) => { // <---- montre la liste des utilisateurs existants/displays the existing users list ---->
        const users = await User.findAll({raw:true})
    res.render('user_list', {users})
    },

    get: (req, res) => {  // <---- Donne la page d'inscription ---->
        const navInscription = true // sert à mettre le lien active 
        res.render('user_create', { navInscription })
    },

    post: async (req, res) => { // <---- enregistre un user dans la base ---->
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
                    { email: email },
                    { prenom: req.body.prenom }
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
            return res.redirect('/user/personal_board')
        }
    },
    getAccount: async (req, res) => { 
        // Chercher l'utilisateur correspondant à l'id -- find the right user in the database according to his id
        const account = await User.findOne({
            where: { id: req.params.id }, 
            include: [{
                model: Event,
                through: { model: EventUser } // Utilisation de `model` pour spécifier le modèle de liaison
            }],
        });

        console.log(account);
        console.log(req.session);
        res.render('my_account', { account })
    },
    getLogin: async (req, res) => { // <---- Donne la page de connexion ---->
        res.render('login')
    },
    postLogin: async (req, res) => { // <---- permet de connecter un user au site ---->
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('login', {errors: errors.array() });
        }
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

                    res.status(401).render('login', {errors: errors.array()})

                } else {
                    //sinon inscription dans la session
                    req.session.prenom = user.prenom

                    req.session.uid = user.id

                    if(user.isAdmin) {
                        req.session.isAdmin = true
                    }
                    res.redirect('/user/personal_board')
                }
            })

        }

    },
    logout: (req, res) => { // <---- deconnecte l'user  ---->
        req.session.destroy()
        res.redirect('/')
    },
    addalarm: (req,res) => {
        req.session.alarm = true
        res.redirect('/user/read/'+req.params.id)
        // res.render('my_account')
    },
    removeregister: async (req,res) => {
        await EventUser.destroy({
            where: {
                [Op.and]: [
                    { userId: req.params.userId },
                    { eventId: req.params.eventId }
                ]
            }
        })
        res.redirect('/')
    },
    update: async (req,res) => {
        const user = await User.findByPk(req.params.id, { raw: true })
        res.render("user_create", {user})
    }
}