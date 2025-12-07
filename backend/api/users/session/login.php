<!-- par maxime derènes -->
<!-- normalement c'est prêt et adapté pour être utilisé -->

<?php
session_start();
include_once '../../../config/configdb.php';
if (isset($_POST['envoyer'])) {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $identifiant = $_POST['email'];
        $mot_de_passe = $_POST['password'];

        // Requête pour trouver l'utilisateur
        $sql = "SELECT * FROM utilisateur WHERE email = :email";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['id_user' => $identifiant]);
        $utilisateur = $stmt->fetch();

        if (
            !isset($utilisateur['id_user'])
        ) {
            http_response_code(401);
            header('Content-Type: application/json');
            echo json_encode(['reponse' => 'utilisateur existe pas']);
            exit;
        }

        if ($utilisateur && password_verify($mot_de_passe, $utilisateur['Mot_de_passe'])) {
            $token = bin2hex(random_bytes(32));
            // update du token
            $sql = "UPDATE utilisateur SET api_token = :token WHERE id_user = :id_user;";
            $stmt = $pdo->prepare($sql);
            $stmt->execute(['token' => $token, 'id_user' => $utilisateur['id_user']]);

            // Met les données en session
            $_SESSION['id_user'] = $utilisateur['id_user'];
            $_SESSION['api_token'] = $utilisateur['api_token'];
            $_SESSION['statut_etud'] = $utilisateur['statut_etud'];
            $_SESSION['email'] = $utilisateur['email'];
            $_SESSION['nom'] = $utilisateur['nom'];
            $_SESSION['prenom'] = $utilisateur['prenom'];
            $_SESSION['tel'] = $utilisateur['tel'];
            $_SESSION['adresse'] = $utilisateur['adresse'];
            $_SESSION['fidelite'] = $utilisateur['fidelite'];
            $_SESSION['logged_in'] = true;

            echo "Connexion réussie !";
            http_response_code(201);
            header('Content-Type: application/json');
            echo json_encode(['reponse' => 'Connexion réussie']);

            header("Location: /accueil"); // mettre le bon chemin
            exit;
        } else {
            echo "Email ou mot de passe incorrect.";
            http_response_code(401);
            header('Content-Type: application/json');
            echo json_encode(['reponse' => 'email ou mot de passe incorrect']);
            header("Location: /accueil?erreur=1"); // mettre le bon chemin
        }
    }
}