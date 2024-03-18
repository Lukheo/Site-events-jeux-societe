const { validationResult } = require('express-validator')
const sequelize = require('../../config')
const GamePicture = require('../models/gamepictureModel')
const User = require('../models/userModel')

module.exports = {
    post: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { path } = req.body;

            // Créer une nouvelle entrée pour l'image du jeu
            await GamePicture.create({ path });
            return res.json({ message: 'Image du jeu ajoutée avec succès' });
        } catch (error) {
            console.error('Erreur lors de la gestion de l\'image du jeu :', error);
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }
}

