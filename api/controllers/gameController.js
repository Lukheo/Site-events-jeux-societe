const {Op} = require('sequelize')
const Game = require('../models/gameModel')

module.exports = {
    list: async (req,res) => {
        const games = await Game.findAll({raw:true})
        res.render('game_page', games)
    }, 
    get: async (req,res) => {
    }
}