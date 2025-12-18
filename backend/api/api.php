<?php
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $content = file_get_contents('php://input');
    $data = json_decode($content, true);

    // Vérif pour savoir si c'est une inscription -> email_inscr vient de la page insconnex.ts de joachim
    if (isset($data['nom']) && (isset($data['email']) || isset($data['email_inscr']))) {
        require_once 'users/manager/UserManager.php';

        // Note: configdb.php crée $pdo. UserManager attend $pdo dans le constructeur.
        global $pdo;

        try {
            $userManager = new UserManager($pdo);
            $userManager->insertUser($data);

            http_response_code(201);
            echo json_encode(['reponse' => 'utilisateur créé']);
            exit;
        } catch (Exception $e) {
            // Gestion des erreurs (conflit email ou champs manquants)
            if ($e->getMessage() === "L'email existe déjà") {
                http_response_code(409);
            } else {
                http_response_code(400); // 400 Bad Request pour données manquantes
            }
            echo json_encode(['error' => $e->getMessage()]);
            exit;
        }
    }
}

require_once '../api/produits/boxmanager.php';
// box bouffe
if (isset($_GET['id_produit'])) {
    $boxManager = new BoxManager();
    $boxes = $boxManager->findById($_GET['id_produit']);
} else {
    $boxManager = new BoxManager();
    $boxes = $boxManager->findAll();
}

// Déclare le type de contenu json au serveur, afficher le résultat en encodant le tableau en json grâce à json_encode : 
header('Content-Type: application/json: charset=utf-8');

echo json_encode($boxes);

// ajouter les autres API

?>