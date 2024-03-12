const { Op} = require('sequelize')
const Event = require('../models/eventModel')


module.exports = {
    list: async (req,res) => {
        const events = await Event.findAll({raw:true})
        res.render('events_list', events)
    }
}