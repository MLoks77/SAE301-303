// par maxime derènes
const mysql = require('mysql2');
module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sushngo'
});

// le code provient du cours de m.balbali où on l'avait utilisé en local