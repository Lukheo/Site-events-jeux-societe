const {Op} = require('sequelize')
const gameCat = require('../models/categorieModel')
const {validationResult} = require('express-validator')
const { Request, Response } = require('express');
const Categorie = require('../models/categorieModel');

module.exports = {
    listCat: async (req,res) => {
        const categories = await gameCat.findAll({raw:true})
        console.log(categories);
        res.render('category_list', {categories})
    }, 
    get: async (req,res) => {
    },

    createCat: async (req, res) => { // <---- affichage de la page catégories ---->
        const navCatCreate = true
        res.render('category_create', { navCatCreate })
    },
    postCat: async (req, res) => { // <---- création de la catégorie ---->
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('category_create', { errors: errors.array() });

            }
            const catCorres = await gameCat.findOne({
                where: {
                    cat_name: req.body.catName.trim()
                }
            }, {
                where: {
                    id: req.params.id
                },
                returning: true
            });

            console.log("Correspondance trouvée :", catCorres); // log affichage de la correspondance

            if (catCorres !== null) {
                const error = "Cette catégorie existe déjà";
                return res.render('category_create', { error: error });
            } else {
                const categorycreated = await gameCat.create({
                    cat_name: req.body.catName.trim()
                });
                console.log("Catégorie créée :", categorycreated); // log confirmation de la création d'une catégorie
                return res.redirect('/category/list');
            }
        } catch (error) {
            console.error("Erreur lors de la création de la catégorie :", error);
            return res.status(500).send("Une erreur est survenue lors de la création de la catégorie.");
        }

    },
        
    getCatUpdate: async (req, res) => { // <---- récupérer la catégorie à modifier ---->
        const gameCategory = await gameCat.findByPk(req.params.id, { raw: true })
        res.render('category_update', { gameCategory })
    },

    postCatUpdate: async (req, res) => { // <---- fonction de modification de de la catégorie ---->
        try {
            const [updatedRowsCount, updatedRows] = await gameCat.update({
                    cat_name: req.body.catName,
            }, {
                where: {
                    id: req.params.id
                },
                returning: true
            });

            if (updatedRowsCount === 0) {
                return res.status(404).send("La catégorie à modifier n'a pas été trouvée.");
            }

            const updatedCat = updatedRows[0];
            res.redirect('/category/list');
        } catch (error) {
            console.error("Une erreur s'est produite lors de la mise à jour de la catégorie :", error);
            return res.status(500).send("Une erreur est survenue lors de la mise à jour de la catégorie");
        }
    },

    catDelete: async (req, res) => { // <---- fonction suppression d'un jeu' ---->
        await gameCat.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/category/list')
    }
}