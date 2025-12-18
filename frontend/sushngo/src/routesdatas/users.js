// maxime derènes , fichier pour fetch les données users, genre pour la page stats
const express = require('express');
const router = express.Router();
const db = require('../db');


// Définir la route de login ici (note: on met juste '/login', car le préfixe sera ajouté ailleurs)

router.post('/users', (req, res) => {
    // a remplir avec login
    res.json({ message: "route pour allez fetch les users" });
});

// À LA FIN : On exporte le router pour pouvoir l'utiliser ailleurs
module.exports = router;