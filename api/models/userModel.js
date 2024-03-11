const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const config = require('../../config')
const Event = require('./eventModel')

const User = config.sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate: (User) => {
            {
                User.password = User.password && User.password != "" ? bcrypt.hashSync(User.password, 10) : ""
            }
        },
        beforeUpdate: (User) => {

            User.password = User.password && User.password != "" ? bcrypt.hashSync(User.password, 10) : ""

        }
    }
})

User.hasMany(Event)






module.exports = User