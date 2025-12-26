// maxime derènes , fichier pour fetch les données produits, pour la page menu ou accueil si on veut
const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/produits', (req, res) => {
    db.query('SELECT * FROM produits', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "route du produits opérationnelle" });
        res.json({
            message: 'Produits récupérés avec succès',
            produits: results.map(produit => ({
                id: produit.id_produit,
                nom: produit.nom,
                description: produit.description,
                saveurs: produit.saveurs,
                aliments: produit.aliments,
                prix: produit.prix,
                pieces: produit.pieces,
                id_souscat: produit.id_souscat,
                image: produit.image
            }))
        });
    });
});

module.exports = router; // À LA FIN : On exporte le router pour pouvoir l'utiliser ailleurs