// par maxime derènes
// le code provient du cours de m.balbali où on l'avait utilisé en local pour chartJS, puis maxime derènes l'a utilisé, adapté, et appris
const express = require('express');
const cors = require('cors');
const db = require('./db'); // base de donnée
const app = express();

// on définit les routes en constante
const produitsRouter = require('./routesdatas/produits');
const addusersRouter = require('./routesdatas/addusers');
const loginRouter = require('./routesdatas/login');
const logoutRouter = require('./routesdatas/logout');

app.use(cors()); // Autorise les requêtes provenant d'autres domaines
app.use(express.json()); // IMPORTANT: Permet de lire les req.body en JSON req.body -> https://stackoverflow.com/questions/67557955/what-is-the-purpose-of-req-body-in-express-js
// req permet de récupérer les données envoyées par le client sur le serveur, lire le lien pour mieux comprendre y'a un gars qui explique et un exemple

// Je dis à Express : "Tout ce qui commence par /routesdatas doit être géré par leur const qui est définit plus haut"
app.use('/routesdatas/produits', produitsRouter);
// http://localhost:3000/routesdatas/produits
app.use('/routesdatas/addusers', addusersRouter);
// http://localhost:3000/routesdatas/addusers
app.use('/routesdatas/login', loginRouter);
// http://localhost:3000/routesdatas/login
app.use('/routesdatas/logout', logoutRouter);
// http://localhost:3000/routesdatas/logout



app.listen(3000, () => console.log('API démarrée sur http://localhost:3000')); // pour lancer l'api , dans la console : 'node server.js'

// exemple de requête SQL :
// faites le dans les js de routesdatas

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
// requête pour récupérer les boxes