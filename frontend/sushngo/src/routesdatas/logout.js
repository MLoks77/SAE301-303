// maxime derènes , fichier pour le logout
const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/logout', (req, res) => {

    const token = req.headers['authorization'];
    if (!token) {
        return res.status(200).json({ message: "Déjà déconnecté (pas de token fourni)" });
    }
    // Supprimer le token en bdd (le mettre à NULL ou vide)
    const sql = "UPDATE utilisateur SET api_token = NULL WHERE api_token = ?";
    db.query(sql, [token], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la déconnexion" });
        }
        res.json({ message: "Déconnexion réussie" });
    });
});

// ATTENTION

// QUAND VOUS L'APPELEZ :
// N'oublie pas côté Angular qu'il faudra bien envoyer le token dans le header Authorization 
// lors de l'appel à cette route, puis supprimer le token du localStorage

// pour supprimer du localstorage -> localStorage.removeItem('token');
// pour récupérer du localstorage -> localStorage.getItem('token');
// pour envoyer dans le header Authorization ->  

// commande trouvé sur stackoverflow :
// const token = localStorage.getItem('token');
// const headers = new HttpHeaders({
//     'Authorization': token
// });

// par exemple dans le footer j'utilise pour la déconnexion :

//   logout() {
//     localStorage.removeItem('token');
//     this.isLoggedIn = false;
//     this.router.navigate(['/accueil']);
//   }


module.exports = router;