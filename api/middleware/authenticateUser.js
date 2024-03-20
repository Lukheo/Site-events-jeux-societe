const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = {
    authenticateUser(req, res, next) {
        // Récupérer le token d'authentification du header de la requête
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "Authorization token is required." });
        }

        try {
            // Vérifier et décoder le token
            const decoded = jwt.verify(token, config.JWT_SECRET);
            req.user = decoded.user; // Ajouter l'utilisateur décodé à l'objet req
            next(); // Passer à l'étape suivante du middleware
        } catch (error) {
            console.error("Authentication error:", error);
            return res.status(401).json({ message: "Invalid token." });
        }
    }
};
