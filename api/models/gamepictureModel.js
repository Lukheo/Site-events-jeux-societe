const {DataTypes} = require('sequelize'); 
const config = require('../../config');
// const Game = require('./gameModel');

const GamePicture = config.sequelize.define('gamePictures', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    path: {
        type: DataTypes.STRING,
        allowNull: false, 
    }, 
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

// Game.hasOne(GamePicture);
// GamePicture.belongsTo(Game);

module.exports = GamePicture;