const {Op, Model} = require('sequelize')
const Game = require('../models/gameModel')
const {validationResult} = require('express-validator')
const { Request, Response } = require('express');
const gameCat = require('../models/categorieModel');
const Categorie = require('../models/categorieModel');

module.exports = {
    list: async (req,res) => {
        const games = await Game.findAll({
            include: [{ model: Categorie}],
            raw: true
          })
        console.log(games);
        res.render('game_list', {games})
    }, 
    createGame: async (req, res) => { // <---- fonction affichage de la page game ---->
        const navGameCreate = true
        const categories = await Categorie.findAll({raw:true})
        res.render('game_create', { navGameCreate, categories })
    },
    postGame: async (req, res) => { // <---- fonction de création de jeu---->
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('game_create', { errors: errors.array() });
            }
            const game = await Game.findOne({
                where: {
                    game_name: req.body.gameName.trim(),
                    game_desc: req.body.gameDescription.trim(),
                    player_number: req.body.playerNumber,
                    imageUrl: req.body.imgGame,
                    // rate: req.body.rate
                }
            }, {
                where: {
                    id: req.params.id
                },
                returning: true
            });

            console.log("Correspondance trouvé :", game); // log affichage de la correspondance

            if (game !== null) {
                const error = "Ce jeu existe déjà";
                return res.render('game_create', { error: error });
            } else {
                const gamecreated = await Game.create({
                    game_name: req.body.gameName.trim(),
                    game_desc: req.body.gameDescription.trim(),
                    player_number: req.body.playerNumber,
                    imageUrl: req.body.imgGame,
                    categoryId: req.body.catId
                    // rate: req.body.rate
                });
                console.log("Jeu créé :", gamecreated); // log confirmation de la création d'un jeu
                return res.redirect('/game/list');
            }
        } catch (error) {
            console.error("Erreur lors de la création du jeu :", error);
            return res.status(500).send("Une erreur est survenue lors de la création du jeu.");
        }

    },
    read: async (req, res) => { //<---- fonction pour voir le jeu via l'ID ---->
        const navGame = true;
        try {
            
            console.log("ID du jeu à rechercher :", req.params.id); // log pour afficher l'ID

            let game = await Game.findByPk(req.params.id);
            if (!game) {
                return res.status(404).send("Le jeu n'a pas été trouvé.");
            }
            game = game.toJSON();
            
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.render('game_read', { game, navGame, errors: result.errors });
            } else {
                return res.render('game_read', { game, navGame});
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la lecture du jeu :", error);
            return res.status(500).send("Une erreur est survenue lors de la lecture du jeu.");
        }
    },
    rate: async(req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            res.redirect('/')
        }
        else {
            const gameId = req.body.gameId;
            const rating = req.body.rating;

            await Game.update({rate: rating}, {
                where: {
                    id: gameId
                }
            })
            return res.redirect('back')
        }
    },
    getGameDetail: async (req,res) => {
        const game = await Game.findByPk(req.params.id, {raw: true})
        res.render('game_page', {game})
    },


    getGameUpdate: async (req, res) => { // <---- fonction pour récupérer le jeu à modifier ---->
        const game = await Game.findByPk(req.params.id, { raw: true })
        const categories = await Categorie.findAll({raw:true})
        res.render('game_update', { game, categories })
    },

    postGameUpdate: async (req, res) => { // <---- fonction de modification de jeu ---->
        try {
            const [updatedRowsCount, updatedRows] = await Game.update({
                    game_name: req.body.gameName,
                    game_desc: req.body.gameDescription,
                    player_number: req.body.playerNumber,
                    imageUrl: req.body.imgGame,
                    categoryId: req.body.catId
            }, {
                where: {
                    id: req.params.id
                },
                returning: true
            });

            if (updatedRowsCount === 0) {
                return res.status(404).send("Le jeu à modifier n'a pas été trouvé.");
            }

            const updatedGame = updatedRows[0];
            res.redirect('/game/list');
        } catch (error) {
            console.error("Une erreur s'est produite lors de la mise à jour du jeu :", error);
            return res.status(500).send("Une erreur est survenue lors de la mise à jour du jeu.");
        }
    },

    gameDelete: async (req, res) => { // <---- fonction suppression d'un jeu' ---->
        await Game.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/game/list')
    }
}