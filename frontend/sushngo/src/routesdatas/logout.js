// maxime derènes , fichier pour le logout
const express = require('express');
const router = express.Router();
const db = require('../db');


router.post('/logout', (req, res) => {
    //a remplir avec logout
    res.json({ message: "route du logout opérationnelle" });
});

module.exports = router; // À LA FIN : On exporte le router pour pouvoir l'utiliser ailleurs