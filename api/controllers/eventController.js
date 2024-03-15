const { Op } = require('sequelize')
const Event = require('../models/eventModel')
const { validationResult } = require('express-validator');
const { Request, Response } = require('express');


module.exports = {
    list: async (req, res) => {
        const events = await Event.findAll({ raw: true })
        const navEvents = true
        console.log(events)
        res.render('events_list', { events, navEvents })
    },
    createEvent: async (req, res) => {
        const navEventCreate = true
        res.render('event_create', { navEventCreate })
    },
    postEvent: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('event_create', { errors: errors.array() });

            }
            console.log("Données reçues depuis le formulaire :", req.body);
            const event = await Event.findOne({
                where: {
                    name: req.body.eventName,
                    event_time: req.body.eventTime,
                    event_date: req.body.eventDate
                }
            });

            console.log("Correspondance trouvé :", event);

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
                console.log("Événement créé :", eventcreated);
                return res.redirect('/events/list');
            }
        } catch (error) {
            console.error("Erreur lors de la création de l'événement :", error);
            return res.status(500).send("Une erreur est survenue lors de la création de l'événement.");
        }

    }
}