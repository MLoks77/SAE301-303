// maxime derènes , fichier pour le login
const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/login', (req, res) => {
    // a remplir avec login
    res.json({ message: "route du login opérationnelle" });
});

module.exports = router;