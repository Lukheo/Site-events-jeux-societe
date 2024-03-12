const { DataTypes} = require('sequelize')
const bcrypt = require('bcrypt')
const config = require('../../config')
const Game = require('./gameModel')
const Categorie = require('./categorieModel')


const Event = config.sequelize.define('events', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    event_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    players_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

Event.hasOne(Game)

module.exports = Event