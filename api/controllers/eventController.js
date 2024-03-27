const { Op } = require('sequelize')

const Event = require('../models/eventModel')
const Game = require('../models/gameModel')
const User = require('../models/userModel')
const Categorie = require('../models/categorieModel')
const EventUser = require('../models/eventUserModel')
const { validationResult } = require('express-validator');
const { Request, Response } = require('express');


module.exports = {
    list: async (req, res) => { //  <---- fonction affichage de tous les events ---->
        const events = await Event.findAll(
            {
                include:
                    [{
                        model: Game,
                        raw: true,
                        include: Categorie
                    }
                    ], 
                    raw : true
            },
        )
        const navEvents = true
        console.log(events)
        res.render('events_list', { events, navEvents })
    },

    createEvent: async (req, res) => { // <---- fonction affichage de la page event ---->
        const navEventCreate = true
        const games = await Game.findAll({raw:true})
        res.render('event_create', { navEventCreate, games })
    },

    postEvent: async (req, res) => { // <---- fonction de création d'event ---->
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('event_create', { errors: errors.array() });
            }
            const event = await Event.findOne({
                where: {
                    name: req.body.eventName.trim(),
                    event_time: req.body.eventTime,
                    event_date: req.body.eventDate,
                    address: req.body.address
                }
            });

            console.log("Correspondance trouvé :", event); // log affichage de la correspondance

            if (event !== null) {
                const error = "Cet événement existe déjà";
                return res.render('event_create', { error: error });
            } else {
                console.log(req.body.eventDate)
                const eventcreated = await Event.create({
                    name: req.body.eventName.trim(),
                    description: req.body.eventDescription.trim(),
                    event_date: req.body.eventDate,
                    event_time: req.body.eventTime,
                    players_number: req.body.playersNumber,
                    address: req.body.address,
                    gameId: req.body.gameID
                });
                console.log("Événement créé :", eventcreated); // log confirmation de la création d'un évenement 
                return res.redirect('/events/list');
            }
        } catch (error) {
            console.error("Erreur lors de la création de l'événement :", error);
            return res.status(500).send("Une erreur est survenue lors de la création de l'événement.");
        }

    },
    read: async (req, res) => { //<---- fonction pour lire l'event via l'ID ---->
        const navEvent = true;
        // try {

        console.log("ID de l'événement à rechercher :", req.params.id); // log pour afficher l'ID

        let event = await Event.findByPk(req.params.id, {
            include: {
                model: Game,
                include : Categorie
            },
        });
        if (!event) {
            return res.status(404).send("L'événement n'a pas été trouvé.");
        } else {
            event = event.toJSON();
            // Appel à la fonction getAvailablePlaces pour obtenir le nombre de places restantes
            const availablePlaces = await module.exports.getAvailablePlaces(req, res);
            const result = validationResult(req);

            if (!result.isEmpty()) {
                return res.render('event_read', { event, navEvent, errors: result.errors });
            } else {
                console.log(event)
                res.render('event_read', { event, navEvent, availablePlaces });
            }
        }
        // } catch (error) {
        //     console.error("Une erreur s'est produite lors de la lecture de l'événement :", error);
        //     return res.status(500).send("Une erreur est survenue lors de la lecture de l'événement.");
        // }
    },
    getAvailablePlaces: async (req, res) => { // <------- fonction pour récupèrer le nombre de place disponibles ------>
        try {
            const eventId = req.params.id;
            const event = await Event.findByPk(eventId);

            if (!event) {
                return res.status(404).send("L'événement n'a pas été trouvé.");
            } else {
                const participantsCount = await EventUser.count({
                    where: {
                        eventId: eventId
                    }
                });
                const remainingPlaces = event.players_number - participantsCount;
                // Si le nombre de places restantes est égal ou inférieur à zéro
                if (remainingPlaces <= 0) {
                    return res.status(403).json({ message: "Désolé, il n'y a plus de places disponibles." });
                } else {
                    return remainingPlaces;
                }
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération du nombre de places restantes :", error);
            return res.status(500).json({ error: "Erreur lors de la récupération du nombre de places restantes." });
        }
    },
    registerUserToEvent: async (req, res) => { // <----- Fonction pour inscrire l'utilisateur à l'événement ---->
        try {
            const eventId = req.params.id;
            const userId = req.session.uid;

            //Vérifier si il y a encore des places dans l'event
            const availablePlaces = await module.exports.getAvailablePlaces(req, res);

            if (availablePlaces <= 0) {
                return res.status(403).json({ message: "Désolé, il n'y a plus de places disponibles." });
            } else {

                // Vérifier si l'utilisateur est déjà inscrit à l'événement
                const existingParticipant = await EventUser.findOne({
                    
                    where: { [Op.and] : 
                        {
                        eventId: eventId,
                        userId: userId
                        }
                        
                    }
                });

                if (existingParticipant) {
                    let event = await Event.findByPk(req.params.id, {
                        include: {
                            model: Game,
                            include : Categorie
                        },
                    });
                    event = event.toJSON()
                    return res.render('event_read', {event, availablePlaces, message: "Vous êtes déjà inscrit à cet événement." });
                } else {
                    // Inscrire l'utilisateur à l'événement
                    await EventUser.create({
                        eventId: eventId,
                        userId: userId
                    });

                    let event = await Event.findByPk(req.params.id, {
                        include: {
                            model: Game,
                            include : Categorie
                        },
                    });
                    event = event.toJSON()
                    res.render('event_read', { event, availablePlaces, message: "Inscription validée" })
                     
                }
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de l'inscription de l'utilisateur à l'événement :", error);
            return res.status(500).json({ error: "Une erreur est survenue lors de l'inscription à l'événement." });
        }
    },

    getEventUpdate: async (req, res) => { // <---- fonction récupérer l'event ---->
        const event = await Event.findByPk(req.params.id, { raw: true })
        const games = await Game.findAll({raw: true})
        res.render('event_update', { event, games })
    },

    postUpdate: async (req, res) => { // <---- fonction modification d'event ---->
        try {
            const [updatedRowsCount, updatedRows] = await Event.update({
                name: req.body.eventName,
                description: req.body.eventDescription,
                event_date: req.body.eventDate,
                event_time: req.body.eventTime,
                players_number: req.body.playersNumber,
            }, {
                where: {
                    id: req.params.id
                },
                returning: true
            });

            if (updatedRowsCount === 0) {
                return res.status(404).send("L'article à mettre à jour n'a pas été trouvé.");
            }

            const updatedArticle = updatedRows[0];
            res.redirect('/events/list');
        } catch (error) {
            console.error("Une erreur s'est produite lors de la mise à jour de l'article :", error);
            return res.status(500).send("Une erreur est survenue lors de la mise à jour de l'article.");
        }
    },
    // Fonction pour obtenir le nombre de places restantes dans un événement

    eventDelete: async (req, res) => { // <---- fonction suppression d'event ---->
        await Event.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/events/list')
    },
    getRegistratedUsers: async (req, res) => { // <---- fonction pour récuperer la liste des utilisateurs inscris aux évenements ---->
        const navEventUser = true;
        // Récupérer tous les utilisateurs avec leurs événements inscrits
        const events = await Event.findAll({
            // include: [{
            //     model: EventUser,
            //     // through: EventUser // Assurez-vous que le nom du modèle est correctement orthographié
            // }]

            include: [{
                model: User,
                through: EventUser
            }]
        });
        console.log(events);
        res.render('event_registration', { events, navEventUser });
    },
    deleteRegistratedUsers: async(req,res)=>{ //<----- fonction pour supprimer l'utilisateur inscris à un event ---->
        
        await EventUser.destroy( { where: {
            [Op.and]: [
                { userId: req.params.userId },
                { eventId: req.params.eventId }
            ]
        } } )
        res.redirect('/event/registrated/users')
    } ,
}