
const { DataTypes } = require('sequelize')
const config = require('../../config')
const Game = require('./gameModel')



const Categorie = config.sequelize.define('categories', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cat_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

// Categorie.hasMany(Game)


module.exports = Categorie