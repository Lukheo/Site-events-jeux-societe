const { DataTypes} = require('sequelize')
const config = require('../../config')
const Event = require('./eventModel')

const Room = config.sequelize.define('rooms', {
   id:{
    type: DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement: true
   },
   room_name:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
   }
})


module.exports = Room


