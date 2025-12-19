const express = require('express');
const router = express.Router();
const db = require('../db');

// cette partie va permettre de check si dans la req, le token est présent, cela permet par exemple de protéger certaines routes comme celle du compte

const verifierToken = (req, res, next) => {
    // Le token est souvent envoyé dans le header 'Authorization'
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'Aucun token fourni' });
    }
    // On vérifie si ce token existe en BDD
    db.query('SELECT * FROM utilisateur WHERE api_token = ?', [token], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ message: 'Token invalide ou expiré' });
        }

        // On attache l'utilisateur à la requête pour l'utiliser plus tard
        req.user = results[0];
        next(); // On passe à la suite
    });
};

module.exports = verifierToken; // À LA FIN : On exporte le router pour pouvoir l'utiliser ailleurs