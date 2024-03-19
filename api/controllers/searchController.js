const Game = require('../models/gameModel')
const Event = require('../models/eventModel')
const { Op } = require("sequelize");

module.exports = {
//recherche concernant les events
    search: async(req, res)=>{
        console.log(req.body.search);
        const {count: eventCount, rows: eventResults} = await Event.findAndCountAll({
            where: {
                [Op.or]: [
                {name: {[Op.substring]: req.body.search}},
                {description:{[Op.substring]: req.body.search}},
                {event_date:{[Op.substring]: req.body.search}},
                {event_time:{[Op.substring]: req.body.search}},
                {players_number:{[Op.substring]: req.body.search}}
            ]
            },
            raw: true
        });
        //recherche concernant les jeux
        const {count: gameCount, rows: gameResults} = await Game.findAndCountAll({
            where: {
                [Op.or]: [
                {game_name:{[Op.substring]: req.body.search}},
                {game_desc:{[Op.substring]: req.body.search}},
                {player_number:{[Op.substring]: req.body.search}}
            ]
            },
            raw: true
        })
        
        res.render('search_results', {gameResults, gameCount, eventResults, eventCount});

    }
}