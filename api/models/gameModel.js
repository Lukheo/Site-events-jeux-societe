const { DataTypes} = require('sequelize')
const bcrypt = require('bcrypt')
const config = require('../../config')
const Event = require('./eventModel')
const Categorie = require('./categorieModel')


const Game = config.sequelize.define('games', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    game_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    game_desc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    player_number: {
        type: DataTypes.INTEGER
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

Game.belongsTo(Categorie)

module.exports = Game