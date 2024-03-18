
const { DataTypes} = require('sequelize')
const config = require('../../config')
const Game = require('./gameModel')
const User = require('./userModel')
const Room = require('./roomModel')

const Event = config.sequelize.define('events', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false
        }, 
    description:{
        type: DataTypes.STRING,
    },
    event_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    event_time:{
        type: DataTypes.TIME,
        allowNull:false,
    },
    players_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})



Event.hasOne(Game)
Event.hasOne(Room)


module.exports = Event


