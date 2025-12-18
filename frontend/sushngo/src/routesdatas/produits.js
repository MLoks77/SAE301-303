// maxime derènes , fichier pour fetch les données produits, pour la page menu ou accueil si on veut
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/api/produits', (req, res) => {
    db.query('SELECT * FROM produits', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "route du produits opérationnelle" });
        res.json(results);
    });
});

module.exports = router;