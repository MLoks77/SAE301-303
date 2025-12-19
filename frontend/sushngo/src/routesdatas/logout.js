// maxime derènes , fichier pour le logout
const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/logout', (req, res) => {

    const token = req.headers['authorization'];
    if (!token) {
        return res.status(200).json({ message: "Déjà déconnecté (pas de token fourni)" });
    }
    // Supprimer le token en bdd (le mettre à NULL ou vide)
    const sql = "UPDATE utilisateur SET api_token = NULL WHERE api_token = ?";
    db.query(sql, [token], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la déconnexion" });
        }
        res.json({ message: "Déconnexion réussie" });
    });
});

module.exports = router;