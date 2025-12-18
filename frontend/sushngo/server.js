// par maxime derènes
// le code provient du cours de m.balbali où on l'avait utilisé en local pour chartJS, puis maxime derènes l'a utilisé, adapté, et appris
const express = require('express');
const cors = require('cors');
const db = require('./db'); // base de donnée
const app = express();

// on définit les routes en constante
const produitsRouter = require('./routesdatas/produits');
const usersRouter = require('./routesdatas/users');
const loginRouter = require('./routesdatas/login');
const logoutRouter = require('./routesdatas/logout');

app.use(cors()); // Autorise les requêtes provenant d'autres domaines

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

// Je dis à Express : "Tout ce qui commence par /routesdatas doit être géré par leur const qui est définit plus haut"
app.use('/routesdatas/produits', produitsRouter);
// http://localhost:3000/routesdatas/produits
app.use('/routesdatas/users', usersRouter);
// http://localhost:3000/routesdatas/users
app.use('/routesdatas/login', loginRouter);
// http://localhost:3000/routesdatas/login
app.use('/routesdatas/logout', logoutRouter);
// http://localhost:3000/routesdatas/logout



app.listen(3000, () => console.log('API démarrée sur http://localhost:3000')); // pour lancer l'api , dans la console : 'node server.js'

