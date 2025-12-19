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

        req.user = results[0];
        next();
    });
};


// pour protéger une route ( A essayé sur la page compte par exemple, j'ai pas essayé ) :

//  Route protégée : Seul un utilisateur avec un token valide peut voir ceci
// app.get('/api/panier', verifierToken, (req, res) => {
//     req.user contient maintenant les infos de l'utilisateur trouvé grâce au token
//     console.log("Utilisateur connecté :", req.user.email);

//     Logique pour récupérer le panier de req.user.id_user...
//     res.json({ message: "Voici votre panier" });
// });

module.exports = verifierToken; // À LA FIN : On exporte le router pour pouvoir l'utiliser ailleurs