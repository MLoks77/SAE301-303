<?php

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// imports
require_once __DIR__ . '/../config/configdb.php';
require_once __DIR__ . '/PHP/users/manager/UserManager.php';
require_once __DIR__ . '/PHP/boxes/boxmanager.php';

$content = file_get_contents('php://input');
$data = json_decode($content, true);
$userManager = new UserManager($pdo);

// Utilisateur
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Inscription
    if (isset($data['nom'])) {
        try {
            $userManager->insertUser($data);
            http_response_code(201);
            echo json_encode(['reponse' => 'utilisateur créé']);
            exit;
        } catch (Exception $e) {
            http_response_code($e->getMessage() === "L'email existe déjà" ? 409 : 400);
            echo json_encode(['error' => $e->getMessage()]);
            exit;
        }
    }
    // Connexion
    if (isset($data['email']) && isset($data['password'])) {
        $result = $userManager->login($data['email'], $data['password']);
        if ($result['success']) {
            http_response_code(200);
            echo json_encode($result);
        } else {
            http_response_code(401);
            echo json_encode(['reponse' => $result['message']]);
        }
        exit;
    }
}

// Boxes
$boxManager = new BoxManager($pdo);
try {
    if (isset($_GET['id_produit'])) {
        $boxes = $boxManager->findById($_GET['id_produit']);
    } else {
        $boxes = $boxManager->findAll();
    }
    echo json_encode($boxes);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur lors de la récupération des produits']);
}
exit;
?>