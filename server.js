server.js
const express = require('express');
const cors = require('cors');
const db = require('./db'); // base de donnée
const app = express();

app.use(cors()); // Autorise les requêtes provenant d'autres domaines

// exemple de requête SQL :

// app.get('/api/dashboard/categories', (req, res) => {

//     db.query(`
// SELECT c.nom AS categorie, COUNT(p.id) AS total
// FROM categorie c
// LEFT JOIN produit p ON c.id = p.categorie_id
// GROUP BY c.nom
// `, (err, results) => {
//         res.json(results);
//     });
// });

app.listen(3000, () => console.log('API démarrée sur http://localhost:3000')); // pour lancer l'api , dans la console : node server.js