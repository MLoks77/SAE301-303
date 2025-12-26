// maxime derènes , fichier pour fetch les données users ou en créer, genre pour la page stats et inscription
const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid'); // Pour générer un token unique
const bcrypt = require('bcryptjs'); // Pour les mots de passe


router.post('/addusers', (req, res) => {
    // a remplir avec ajout utilisateur
    res.json({ message: "route pour allez fetch les users" });
});

// À LA FIN : On exporte le router pour pouvoir l'utiliser ailleurs
module.exports = router;