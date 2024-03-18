const { Op } = require('sequelize')
const Event = require('../models/eventModel')
const { validationResult } = require('express-validator');
const { Request, Response } = require('express');


module.exports = {
    list: async (req, res) => { //  <---- fonction affichage de tous les events ---->
        const events = await Event.findAll({ raw: true })
        const navEvents = true
        console.log(events)
        res.render('events_list', { events, navEvents })
    },

    createEvent: async (req, res) => { // <---- fonction affichage de la page event ---->
        const navEventCreate = true
        res.render('event_create', { navEventCreate })
    },

    postEvent: async (req, res) => { // <---- fonction de création d'event ---->
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('event_create', { errors: errors.array() });

            }
            const event = await Event.findOne({
                where: {
                    name: req.body.eventName,
                    event_time: req.body.eventTime,
                    event_date: req.body.eventDate
                }
            });

            console.log("Correspondance trouvé :", event); // log affichage de la correspondance

            if (event !== null) {
                const error = "Cet événement existe déjà";
                return res.render('event_create', { error: error });
            } else {
                const eventcreated = await Event.create({
                    name: req.body.eventName,
                    description: req.body.eventDescription,
                    event_date: req.body.eventDate,
                    event_time: req.body.eventTime,
                    players_number: req.body.playersNumber
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
        try {
            
            console.log("ID de l'événement à rechercher :", req.params.id); // log pour afficher l'ID
    
            let event = await Event.findByPk(req.params.id);
            if (!event) {
                return res.status(404).send("L'événement n'a pas été trouvé.");
            }
            event = event.toJSON();
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.render('event_read', { event, navEvent, errors: result.errors });
            } else {
                return res.render('event_read', { event, navEvent });
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la lecture de l'événement :", error);
            return res.status(500).send("Une erreur est survenue lors de la lecture de l'événement.");
        }
    },
    getEventUpdate: async (req, res) => { // <---- fonction récupérer l'event ---->
        const event = await Event.findByPk(req.params.id, { raw: true })
        res.render('event_update', { event })
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
    
    eventDelete: async (req, res) => { // <---- fonction suppression d'event ---->
        await Event.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/events/list')
    },
}