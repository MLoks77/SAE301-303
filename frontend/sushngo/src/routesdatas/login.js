// maxime derènes , fichier pour le login
const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs'); // Pour les mots de passe
const { v4: uuidv4 } = require('uuid'); // Pour générer un token unique

router.post('/login', (req, res) => {

    const { email, password } = req.body;

    db.query('SELECT * FROM utilisateur WHERE email = ?', [email], async (err, results) => { // err = erreur, results = résultats, async = asynchrone : permet de faire des opérations en parallèle
        if (err) return res.status(500).json({ error: err.message }); // res.status(500) = erreur serveur

        if (results.length === 0) {
            return res.status(401).json({ message: 'Utilisateur non trouvé' });
        }
        const user = results[0];
        // vérification du mot de passe
        const passwordMatch = await bcrypt.compare(password, user.Mot_de_passe); // vu que c'est hashé : bcrypt.compare = compare le mot de passe avec le hash
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }
        // Génération du token (api_token)
        const token = uuidv4(); // uuidv4 : génère un unique id

        // met a jour en bdd
        db.query('UPDATE utilisateur SET api_token = ? WHERE id_user = ?', [token, user.id_user], (updateErr) => {
            if (updateErr) return res.status(500).json({ error: updateErr.message }); // ipdateErr = erreur de mise a jour
            // Renvoyer les infos et le token au frontend
            res.json({
                message: 'Connexion réussie',
                token: token,
                user: {
                    id: user.id_user,
                    nom: user.nom,
                    prenom: user.prenom,
                    email: user.email,
                    role: user.statut_etud // ou autre champ de rôle
                }
            });
        });
    });
});

module.exports = router;