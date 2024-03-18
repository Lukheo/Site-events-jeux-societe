const {DataTypes} = require('sequelize'); 
const config = require('../../config');
const Game = require('./gameModel');

const GamePicture = config.sequelize.define('gamePictures', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    path: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true
    }
});

Game.hasOne(GamePicture);
GamePicture.belongsTo(Game);

module.exports = GamePicture;